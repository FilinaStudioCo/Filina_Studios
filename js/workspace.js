var TEAM_PASSWORD = "-20MarchNewGirl26-";
var SESSION_KEY = "filina_auth";
var DATA_KEY = "filina_data";

function doLogin() {
  var name = document.getElementById("login-name").value.trim();
  var pass = document.getElementById("login-pass").value;
  if (!name) { showLoginError("Please enter your name!"); return; }
  if (pass !== TEAM_PASSWORD) { showLoginError("❌ Wrong password. Try again!"); return; }
  sessionStorage.setItem(SESSION_KEY, name);
  showWorkspace(name);
}

function showLoginError(msg) {
  var el = document.getElementById("login-error");
  if (el) { el.textContent = msg; el.style.display = "block"; }
}

function showWorkspace(name) {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("workspace").classList.remove("hidden");
  var g = document.getElementById("greeting-name");
  if (g) g.textContent = name;
  loadData();
  showSection("dashboard");
}

function doLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
}

function showSection(id) {
  document.querySelectorAll(".ws-section").forEach(function(s){ s.classList.remove("active"); });
  document.querySelectorAll(".nav-item").forEach(function(n){ n.classList.remove("active"); });
  var sec = document.getElementById("sec-" + id);
  if (sec) sec.classList.add("active");
  var nav = document.querySelector('[data-section="' + id + '"]');
  if (nav) nav.classList.add("active");
  if (id === "dashboard") renderDashboard();
}

// DATA
function getData() {
  try { return JSON.parse(localStorage.getItem(DATA_KEY)) || {}; } catch(e) { return {}; }
}
function saveData(d) { localStorage.setItem(DATA_KEY, JSON.stringify(d)); }

function loadData() {
  renderDashboard();
  renderEpisodes();
  renderProjects();
  renderTasks();
  renderGoals();
  renderFinance();
  renderCalendar();
  renderContacts();
  renderTeam();
  renderDocs();
  renderKanban();
  loadNotes();
  loadIdeas();
}

// DASHBOARD
function renderDashboard() {
  var d = getData();
  var eps = d.episodes || [];
  var tasks = d.tasks || [];
  var projs = d.projects || [];
  var fin = d.finance || [];
  setText("stat-episodes", eps.length);
  setText("stat-tasks", tasks.filter(function(t){ return t.status !== "Done"; }).length);
  setText("stat-projects", projs.filter(function(p){ return p.status === "In Progress"; }).length);
  var income = fin.filter(function(f){ return f.type === "Income"; }).reduce(function(a,b){ return a + parseFloat(b.amount||0); }, 0);
  var expense = fin.filter(function(f){ return f.type === "Expense"; }).reduce(function(a,b){ return a + parseFloat(b.amount||0); }, 0);
  setText("stat-balance", "€" + (income - expense).toFixed(2));
  var pl = document.getElementById("dash-projects-list");
  if (pl) {
    pl.innerHTML = projs.slice(0,5).map(function(p){
      return '<div class="project-item"><span>' + esc(p.name) + '</span><span class="badge badge-' + statusClass(p.status) + '">' + esc(p.status) + '</span></div>';
    }).join("") || '<p style="color:var(--text-muted);font-size:0.85rem">No projects yet.</p>';
  }
  renderGoals();
}

function setText(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }

function statusClass(s) {
  if (!s) return "planned";
  s = s.toLowerCase();
  if (s.includes("progress")) return "progress";
  if (s.includes("done") || s.includes("complete")) return "done";
  if (s.includes("urgent")) return "urgent";
  return "planned";
}

// EPISODES
function renderEpisodes() {
  var d = getData(); var eps = d.episodes || [];
  var tb = document.getElementById("episodes-tbody");
  if (!tb) return;
  tb.innerHTML = eps.map(function(e, i){
    return '<tr><td>' + (i+1) + '</td><td>' + esc(e.title) + '</td><td><span class="badge badge-' + statusClass(e.status) + '">' + esc(e.status) + '</span></td><td>' + esc(e.recordDate||"") + '</td><td>' + esc(e.publishDate||"") + '</td><td>' + esc(e.guest||"") + '</td><td><button class="row-btn edit-btn" onclick="editEpisode(' + i + ')">✏️</button><button class="row-btn del-btn" onclick="delItem(\'episodes\',' + i + ')">🗑️</button></td></tr>';
  }).join("") || '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">No episodes yet.</td></tr>';
}

function openEpisodeModal(ep, idx) {
  var edit = ep != null;
  openModal("🎙️ " + (edit ? "Edit" : "New") + " Episode",
    '<div class="modal-form">' +
    '<input id="mf-title" placeholder="Episode title" value="' + esc(edit ? ep.title : "") + '"/>' +
    '<select id="mf-status"><option>Idea</option><option>Scripting</option><option>Recording</option><option>Editing</option><option>Done</option></select>' +
    '<input id="mf-record" type="date" value="' + esc(edit ? ep.recordDate||"" : "") + '"/>' +
    '<input id="mf-publish" type="date" value="' + esc(edit ? ep.publishDate||"" : "") + '"/>' +
    '<input id="mf-guest" placeholder="Guest name (optional)" value="' + esc(edit ? ep.guest||"" : "") + '"/>' +
    '<div class="modal-actions">' +
    '<button class="add-btn-lg" onclick="saveEpisode(' + (edit ? idx : -1) + ')">💾 Save</button>' +
    '<button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>'
  );
  if (edit) document.getElementById("mf-status").value = ep.status;
}

function saveEpisode(idx) {
  var d = getData(); if (!d.episodes) d.episodes = [];
  var ep = {
    title: document.getElementById("mf-title").value,
    status: document.getElementById("mf-status").value,
    recordDate: document.getElementById("mf-record").value,
    publishDate: document.getElementById("mf-publish").value,
    guest: document.getElementById("mf-guest").value
  };
  if (idx >= 0) d.episodes[idx] = ep; else d.episodes.push(ep);
  saveData(d); closeModal(); renderEpisodes(); renderDashboard();
}

function editEpisode(i) { var d = getData(); openEpisodeModal(d.episodes[i], i); }

// PROJECTS
function renderProjects() {
  var d = getData(); var items = d.projects || [];
  var tb = document.getElementById("projects-tbody");
  if (!tb) return;
  tb.innerHTML = items.map(function(e, i){
    return '<tr><td>' + esc(e.name) + '</td><td><span class="badge badge-' + statusClass(e.status) + '">' + esc(e.status) + '</span></td><td>' + esc(e.priority||"") + '</td><td>' + esc(e.owner||"") + '</td><td>' + esc(e.due||"") + '</td><td>' + esc(e.tags||"") + '</td><td><button class="row-btn edit-btn" onclick="editProject(' + i + ')">✏️</button><button class="row-btn del-btn" onclick="delItem(\'projects\',' + i + ')">🗑️</button></td></tr>';
  }).join("") || '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">No projects yet.</td></tr>';
}

function openProjectModal(p, idx) {
  var edit = p != null;
  openModal("📋 " + (edit ? "Edit" : "New") + " Project",
    '<div class="modal-form">' +
    '<input id="mf-name" placeholder="Project name" value="' + esc(edit ? p.name : "") + '"/>' +
    '<select id="mf-status"><option>Planned</option><option>In Progress</option><option>On Hold</option><option>Done</option></select>' +
    '<select id="mf-priority"><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>' +
    '<input id="mf-owner" placeholder="Owner" value="' + esc(edit ? p.owner||"" : "") + '"/>' +
    '<input id="mf-due" type="date" value="' + esc(edit ? p.due||"" : "") + '"/>' +
    '<input id="mf-tags" placeholder="Tags (comma separated)" value="' + esc(edit ? p.tags||"" : "") + '"/>' +
    '<div class="modal-actions"><button class="add-btn-lg" onclick="saveProject(' + (edit ? idx : -1) + ')">💾 Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>'
  );
  if (edit) { document.getElementById("mf-status").value = p.status; document.getElementById("mf-priority").value = p.priority||"Medium"; }
}

function saveProject(idx) {
  var d = getData(); if (!d.projects) d.projects = [];
  var p = { name: document.getElementById("mf-name").value, status: document.getElementById("mf-status").value, priority: document.getElementById("mf-priority").value, owner: document.getElementById("mf-owner").value, due: document.getElementById("mf-due").value, tags: document.getElementById("mf-tags").value };
  if (idx >= 0) d.projects[idx] = p; else d.projects.push(p);
  saveData(d); closeModal(); renderProjects(); renderDashboard();
}
function editProject(i) { var d = getData(); openProjectModal(d.projects[i], i); }

// TASKS
function renderTasks() {
  var d = getData(); var items = d.tasks || [];
  var tb = document.getElementById("tasks-tbody");
  if (!tb) return;
  tb.innerHTML = items.map(function(e, i){
    return '<tr><td>' + esc(e.name) + '</td><td><span class="badge badge-' + statusClass(e.status) + '">' + esc(e.status) + '</span></td><td>' + esc(e.priority||"") + '</td><td>' + esc(e.owner||"") + '</td><td>' + esc(e.due||"") + '</td><td><button class="row-btn edit-btn" onclick="editTask(' + i + ')">✏️</button><button class="row-btn del-btn" onclick="delItem(\'tasks\',' + i + ')">🗑️</button></td></tr>';
  }).join("") || '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:2rem">No tasks yet.</td></tr>';
}

function openTaskModal(t, idx) {
  var edit = t != null;
  openModal("✅ " + (edit ? "Edit" : "New") + " Task",
    '<div class="modal-form">' +
    '<input id="mf-name" placeholder="Task name" value="' + esc(edit ? t.name : "") + '"/>' +
    '<select id="mf-status"><option>To Do</option><option>In Progress</option><option>Done</option></select>' +
    '<select id="mf-priority"><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>' +
    '<input id="mf-owner" placeholder="Owner" value="' + esc(edit ? t.owner||"" : "") + '"/>' +
    '<input id="mf-due" type="date" value="' + esc(edit ? t.due||"" : "") + '"/>' +
    '<div class="modal-actions"><button class="add-btn-lg" onclick="saveTask(' + (edit ? idx : -1) + ')">💾 Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>'
  );
  if (edit) { document.getElementById("mf-status").value = t.status; document.getElementById("mf-priority").value = t.priority||"Medium"; }
}

function saveTask(idx) {
  var d = getData(); if (!d.tasks) d.tasks = [];
  var t = { name: document.getElementById("mf-name").value, status: document.getElementById("mf-status").value, priority: document.getElementById("mf-priority").value, owner: document.getElementById("mf-owner").value, due: document.getElementById("mf-due").value };
  if (idx >= 0) d.tasks[idx] = t; else d.tasks.push(t);
  saveData(d); closeModal(); renderTasks(); renderDashboard();
}
function editTask(i) { var d = getData(); openTaskModal(d.tasks[i], i); }

// GOALS
function renderGoals() {
  var d = getData(); var goals = d.goals || [];
  var el = document.getElementById("goals-list");
  var del = document.getElementById("dash-goals-list");
  var html = goals.map(function(g, i){
    var pct = Math.min(100, Math.max(0, parseInt(g.progress)||0));
    return '<div class="goal-item"><div class="goal-header"><span class="goal-title">' + esc(g.name) + '</span><span class="goal-meta">' + esc(g.due||"") + '</span><button class="row-btn edit-btn" onclick="editGoal(' + i + ')">✏️</button><button class="row-btn del-btn" onclick="delItem(\'goals\',' + i + ')">🗑️</button></div><div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div><div class="goal-percent">' + pct + '% complete</div></div>';
  }).join("") || '<p style="color:var(--text-muted);font-size:0.85rem">No goals yet.</p>';
  if (el) el.innerHTML = html;
  if (del) del.innerHTML = html;
}

function openGoalModal(g, idx) {
  var edit = g != null;
  openModal("🎯 " + (edit ? "Edit" : "New") + " Goal",
    '<div class="modal-form">' +
    '<input id="mf-name" placeholder="Goal name" value="' + esc(edit ? g.name : "") + '"/>' +
    '<input id="mf-progress" type="number" min="0" max="100" placeholder="Progress % (0-100)" value="' + esc(edit ? g.progress||"0" : "0") + '"/>' +
    '<input id="mf-due" placeholder="Target date" value="' + esc(edit ? g.due||"" : "") + '"/>' +
    '<div class="modal-actions"><button class="add-btn-lg" onclick="saveGoal(' + (edit ? idx : -1) + ')">💾 Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>'
  );
}
function saveGoal(idx) {
  var d = getData(); if (!d.goals) d.goals = [];
  var g = { name: document.getElementById("mf-name").value, progress: document.getElementById("mf-progress").value, due: document.getElementById("mf-due").value };
  if (idx >= 0) d.goals[idx] = g; else d.goals.push(g);
  saveData(d); closeModal(); renderGoals();
}
function editGoal(i) { var d = getData(); openGoalModal(d.goals[i], i); }

// FINANCE
function renderFinance() {
  var d = getData(); var items = d.finance || [];
  var tb = document.getElementById("finance-tbody");
  if (tb) tb.innerHTML = items.map(function(e, i){
    return '<tr><td>' + esc(e.name) + '</td><td>' + esc(e.type) + '</td><td>' + esc(e.category||"") + '</td><td>€' + parseFloat(e.amount||0).toFixed(2) + '</td><td><span class="badge badge-' + statusClass(e.status) + '">' + esc(e.status||"") + '</span></td><td>' + esc(e.date||"") + '</td><td><button class="row-btn del-btn" onclick="delItem(\'finance\',' + i + ')">🗑️</button></td></tr>';
  }).join("") || '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">No entries yet.</td></tr>';
  var income = items.filter(function(f){ return f.type==="Income"; }).reduce(function(a,b){ return a+parseFloat(b.amount||0); },0);
  var expense = items.filter(function(f){ return f.type==="Expense"; }).reduce(function(a,b){ return a+parseFloat(b.amount||0); },0);
  setText("fin-income", "€"+income.toFixed(2));
  setText("fin-expense", "€"+expense.toFixed(2));
  setText("fin-balance", "€"+(income-expense).toFixed(2));
}

function openFinanceModal() {
  openModal("💰 New Finance Entry",
    '<div class="modal-form">' +
    '<input id="mf-name" placeholder="Description"/>' +
    '<select id="mf-type"><option>Expense</option><option>Income</option></select>' +
    '<input id="mf-category" placeholder="Category (e.g. Equipment, Sponsorship)"/>' +
    '<input id="mf-amount" type="number" placeholder="Amount (€)" step="0.01"/>' +
    '<select id="mf-status"><option>Paid</option><option>Pending</option><option>Cancelled</option></select>' +
    '<input id="mf-date" type="date"/>' +
    '<div class="modal-actions"><button class="add-btn-lg" onclick="saveFinance()">💾 Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>'
  );
}
function saveFinance() {
  var d = getData(); if (!d.finance) d.finance = [];
  d.finance.push({ name: document.getElementById("mf-name").value, type: document.getElementById("mf-type").value, category: document.getElementById("mf-category").value, amount: document.getElementById("mf-amount").value, status: document.getElementById("mf-status").value, date: document.getElementById("mf-date").value });
  saveData(d); closeModal(); renderFinance(); renderDashboard();
}

// CALENDAR
function renderCalendar() {
  var d = getData(); var items = d.calendar || [];
  var tb = document.getElementById("calendar-tbody");
  if (!tb) return;
  tb.innerHTML = items.map(function(e, i){
    return '<tr><td>' + esc(e.title) + '</td><td>' + esc(e.platform||"") + '</td><td><span class="badge badge-' + statusClass(e.status) + '">' + esc(e.status) + '</span></td><td>' + esc(e.creator||"") + '</td><td>' + esc(e.date||"") + '</td><td><button class="row-btn del-btn" onclick="delItem(\'calendar\',' + i + ')">🗑️</button></td></tr>';
  }).join("") || '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:2rem">No content yet.</td></tr>';
}

function openCalendarModal() {
  openModal("📣 New Content",
    '<div class="modal-form">' +
    '<input id="mf-title" placeholder="Content title"/>' +
    '<select id="mf-platform"><option>Instagram</option><option>TikTok</option><option>YouTube</option><option>Twitter/X</option><option>Facebook</option><option>Podcast</option></select>' +
    '<select id="mf-status"><option>Idea</option><option>In Progress</option><option>Scheduled</option><option>Published</option></select>' +
    '<input id="mf-creator" placeholder="Creator/Owner"/>' +
    '<input id="mf-date" type="date"/>' +
    '<div class="modal-actions"><button class="add-btn-lg" onclick="saveCalendar()">💾 Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>'
  );
}
function saveCalendar() {
  var d = getData(); if (!d.calendar) d.calendar = [];
  d.calendar.push({ title: document.getElementById("mf-title").value, platform: document.getElementById("mf-platform").value, status: document.getElementById("mf-status").value, creator: document.getElementById("mf-creator").value, date: document.getElementById("mf-date").value });
  saveData(d); closeModal(); renderCalendar();
}

// CONTACTS
function renderContacts() {
  var d = getData(); var items = d.contacts || [];
  var tb = document.getElementById("contacts-tbody");
  if (!tb) return;
  tb.innerHTML = items.map(function(e, i){
    return '<tr><td>' + esc(e.name) + '</td><td>' + esc(e.type||"") + '</td><td>' + esc(e.company||"") + '</td><td>' + esc(e.email||"") + '</td><td><span class="badge badge-' + statusClass(e.status) + '">' + esc(e.status||"") + '</span></td><td><button class="row-btn del-btn" onclick="delItem(\'contacts\',' + i + ')">🗑️</button></td></tr>';
  }).join("") || '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:2rem">No contacts yet.</td></tr>';
}

function openContactModal() {
  openModal("🤝 New Contact",
    '<div class="modal-form">' +
    '<input id="mf-name" placeholder="Name"/>' +
    '<select id="mf-type"><option>Guest</option><option>Sponsor</option><option>Collaborator</option><option>Press</option><option>Other</option></select>' +
    '<input id="mf-company" placeholder="Company/Channel"/>' +
    '<input id="mf-email" placeholder="Email"/>' +
    '<select id="mf-status"><option>Prospect</option><option>Contacted</option><option>Confirmed</option><option>Done</option></select>' +
    '<div class="modal-actions"><button class="add-btn-lg" onclick="saveContact()">💾 Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>'
  );
}
function saveContact() {
  var d = getData(); if (!d.contacts) d.contacts = [];
  d.contacts.push({ name: document.getElementById("mf-name").value, type: document.getElementById("mf-type").value, company: document.getElementById("mf-company").value, email: document.getElementById("mf-email").value, status: document.getElementById("mf-status").value });
  saveData(d); closeModal(); renderContacts();
}

// TEAM
function renderTeam() {
  var d = getData(); var members = d.team || defaultTeam();
  var el = document.getElementById("team-gallery");
  if (!el) return;
  el.innerHTML = members.map(function(m, i){
    return '<div class="team-member-card"><div class="member-avatar">' + esc(m.avatar) + '</div><h3>' + esc(m.name) + '</h3><div class="member-role">' + esc(m.role) + '</div><div class="member-status">● ' + esc(m.status||"Active") + '</div></div>';
  }).join("");
}

function defaultTeam() {
  return [
    { name: "Angelina", role: "🎨 The Architect", avatar: "👩", status: "Active" },
    { name: "Catalina", role: "🎙️ Heart of the Show", avatar: "👩", status: "Active" },
    { name: "Rosalinda", role: "📋 The Glue", avatar: "👩", status: "Active" }
  ];
}

function openTeamModal() {
  openModal("👥 Add Team Member",
    '<div class="modal-form">' +
    '<input id="mf-name" placeholder="Name"/>' +
    '<input id="mf-role" placeholder="Role"/>' +
    '<input id="mf-avatar" placeholder="Avatar emoji (e.g. 👩)"/>' +
    '<select id="mf-status"><option>Active</option><option>Inactive</option></select>' +
    '<div class="modal-actions"><button class="add-btn-lg" onclick="saveTeam()">💾 Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>'
  );
}
function saveTeam() {
  var d = getData(); if (!d.team) d.team = defaultTeam();
  d.team.push({ name: document.getElementById("mf-name").value, role: document.getElementById("mf-role").value, avatar: document.getElementById("mf-avatar").value || "👤", status: document.getElementById("mf-status").value });
  saveData(d); closeModal(); renderTeam();
}

// DOCUMENTS
function renderDocs() {
  var d = getData(); var docs = d.docs || [];
  var el = document.getElementById("doc-grid");
  if (!el) return;
  el.innerHTML = docs.map(function(doc, i){
    return '<div class="doc-card" onclick="openDoc(' + i + ')"><div class="doc-type">' + esc(doc.type||"DOC") + '</div><h4>' + esc(doc.title) + '</h4><p>' + esc(doc.updated||"") + '</p></div>';
  }).join("") || '<p style="color:var(--text-muted);font-size:0.85rem">No documents yet.</p>';
}

function openDocModal() {
  openModal("📄 New Document",
    '<div class="modal-form">' +
    '<input id="mf-title" placeholder="Document title"/>' +
    '<select id="mf-type"><option>SOP</option><option>Guide</option><option>Policy</option><option>Script</option><option>Other</option></select>' +
    '<textarea id="mf-content" placeholder="Document content..."></textarea>' +
    '<div class="modal-actions"><button class="add-btn-lg" onclick="saveDoc()">💾 Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>'
  );
}
function saveDoc() {
  var d = getData(); if (!d.docs) d.docs = [];
  d.docs.push({ title: document.getElementById("mf-title").value, type: document.getElementById("mf-type").value, content: document.getElementById("mf-content").value, updated: new Date().toLocaleDateString() });
  saveData(d); closeModal(); renderDocs();
}
function openDoc(i) {
  var d = getData(); var doc = d.docs[i];
  openModal("📄 " + esc(doc.title),
    '<div class="modal-form">' +
    '<textarea id="mf-content" style="min-height:200px">' + esc(doc.content||"") + '</textarea>' +
    '<div class="modal-actions"><button class="add-btn-lg" onclick="updateDoc(' + i + ')">💾 Save</button><button class="btn-cancel btn-del" onclick="delItem(\'docs\',' + i + ');closeModal()">🗑️ Delete</button><button class="btn-cancel" onclick="closeModal()">Close</button></div></div>'
  );
}
function updateDoc(i) {
  var d = getData();
  d.docs[i].content = document.getElementById("mf-content").value;
  d.docs[i].updated = new Date().toLocaleDateString();
  saveData(d); closeModal(); renderDocs();
}

// KANBAN
function renderKanban() {
  var d = getData(); var eps = d.episodes || [];
  var cols = { "Idea": [], "Scripting": [], "Recording": [], "Editing": [], "Done": [] };
  eps.forEach(function(e){ if (cols[e.status]) cols[e.status].push(e.title); });
  var el = document.getElementById("podcast-kanban");
  if (!el) return;
  el.innerHTML = Object.keys(cols).map(function(col){
    return '<div class="kanban-col"><div class="kanban-col-title">' + col + ' <span style="background:var(--blush);padding:0.1rem 0.5rem;border-radius:50px;font-size:0.7rem">' + cols[col].length + '</span></div>' +
    cols[col].map(function(t){ return '<div class="kanban-card">' + esc(t) + '</div>'; }).join("") +
    '</div>';
  }).join("");
}

// NOTES
function loadNotes() {
  var n = document.getElementById("personal-notes");
  if (n) n.value = localStorage.getItem("filina_notes") || "";
}
function saveNotes() {
  var n = document.getElementById("personal-notes");
  if (n) { localStorage.setItem("filina_notes", n.value); showToast("📝 Notes saved!"); }
}

// IDEAS
function loadIdeas() {
  var ideas = JSON.parse(localStorage.getItem("filina_ideas") || "[]");
  var list = document.getElementById("ideas-list");
  if (!list) return;
  list.innerHTML = ideas.map(function(idea, i){
    return '<li><span>💡 ' + esc(idea) + '</span><button class="del-idea" onclick="delIdea(' + i + ')">✕</button></li>';
  }).join("");
}
function addIdea() {
  var inp = document.getElementById("idea-input");
  if (!inp || !inp.value.trim()) return;
  var ideas = JSON.parse(localStorage.getItem("filina_ideas") || "[]");
  ideas.unshift(inp.value.trim());
  localStorage.setItem("filina_ideas", JSON.stringify(ideas));
  inp.value = ""; loadIdeas();
}
function delIdea(i) {
  var ideas = JSON.parse(localStorage.getItem("filina_ideas") || "[]");
  ideas.splice(i, 1);
  localStorage.setItem("filina_ideas", JSON.stringify(ideas));
  loadIdeas();
}

// GENERIC DELETE
function delItem(key, idx) {
  if (!confirm("Delete this item?")) return;
  var d = getData();
  if (d[key]) d[key].splice(idx, 1);
  saveData(d);
  loadData();
}

// MODAL
function openModal(title, body) {
  var m = document.getElementById("modal");
  var mc = document.getElementById("modal-content");
  if (!m || !mc) return;
  mc.innerHTML = '<h2>' + title + '</h2>' + body;
  m.classList.remove("hidden");
}
function closeModal() {
  var m = document.getElementById("modal");
  if (m) m.classList.add("hidden");
}

// TOAST
function showToast(msg) {
  var t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg; t.style.display = "block";
  setTimeout(function(){ t.style.display = "none"; }, 2500);
}

// ESCAPE
function esc(str) {
  if (!str) return "";
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// EQUIPMENT
function renderEquipment() {
  var d = getData(); var items = d.equipment || [];
  var tb = document.getElementById("equipment-tbody");
  if (!tb) return;
  tb.innerHTML = items.map(function(e, i){
    return '<tr><td>' + esc(e.name) + '</td><td>' + esc(e.category||"") + '</td><td>' + esc(e.brand||"") + '</td><td>' + esc(e.model||"") + '</td><td>' + esc(e.condition||"") + '</td><td>€' + parseFloat(e.price||0).toFixed(2) + '</td><td><button class="row-btn del-btn" onclick="delItem(\'equipment\',' + i + ')">🗑️</button></td></tr>';
  }).join("") || '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem">No equipment yet.</td></tr>';
}

function openEquipmentModal() {
  openModal("🛠️ Add Equipment",
    '<div class="modal-form">' +
    '<input id="mf-name" placeholder="Equipment name"/>' +
    '<select id="mf-category"><option>Microphone</option><option>Interface</option><option>Headphones</option><option>Camera</option><option>Lighting</option><option>Software</option><option>Other</option></select>' +
    '<input id="mf-brand" placeholder="Brand"/>' +
    '<input id="mf-model" placeholder="Model"/>' +
    '<select id="mf-condition"><option>New</option><option>Good</option><option>Fair</option><option>Needs Repair</option></select>' +
    '<input id="mf-price" type="number" placeholder="Price (€)" step="0.01"/>' +
    '<div class="modal-actions"><button class="add-btn-lg" onclick="saveEquipment()">💾 Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>'
  );
}
function saveEquipment() {
  var d = getData(); if (!d.equipment) d.equipment = [];
  d.equipment.push({ name: document.getElementById("mf-name").value, category: document.getElementById("mf-category").value, brand: document.getElementById("mf-brand").value, model: document.getElementById("mf-model").value, condition: document.getElementById("mf-condition").value, price: document.getElementById("mf-price").value });
  saveData(d); closeModal(); renderEquipment();
}

// INIT
document.addEventListener("DOMContentLoaded", function() {
  var user = sessionStorage.getItem(SESSION_KEY);
  if (user) { showWorkspace(user); } 
  else {
    document.getElementById("login-screen").classList.remove("hidden");
    document.getElementById("workspace").classList.add("hidden");
  }
  var modal = document.getElementById("modal");
  if (modal) modal.addEventListener("click", function(e){ if (e.target === modal) closeModal(); });
});
