// =============================================
//  FILINA STUDIOS WORKSPACE — workspace.js
//  Pure GitHub Pages — NO Netlify dependency
//  Simple password login stored in localStorage
// =============================================

// ---------- TEAM PASSWORD ----------
// Change this to your actual team password!
var TEAM_PASSWORD = " -20MarchNewGirl26- ";

// ---------- LOGIN ----------
function doLogin() {
  var name = document.getElementById("login-name").value.trim();
  var pass = document.getElementById("login-pass").value;
  var err  = document.getElementById("login-error");
  if (!name) { err.style.display = "block"; err.textContent = "❌ Please enter your name!"; return; }
  if (pass !== TEAM_PASSWORD) { err.style.display = "block"; err.textContent = "❌ Wrong password. Try again!"; return; }
  err.style.display = "none";
  localStorage.setItem("fs_loggedin", "true");
  localStorage.setItem("fs_username", name);
  showWorkspace(name);
}

function doLogout() {
  localStorage.removeItem("fs_loggedin");
  localStorage.removeItem("fs_username");
  document.getElementById("workspace").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
}

function checkLogin() {
  if (localStorage.getItem("fs_loggedin") === "true") {
    var name = localStorage.getItem("fs_username") || "Team";
    showWorkspace(name);
  }
}

function showWorkspace(name) {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("workspace").classList.remove("hidden");
  document.getElementById("user-badge").textContent = "👤 " + name;
  setGreeting(name);
  renderAll();
  loadNotes();
  loadIdeas();
}

function setGreeting(name) {
  var h = new Date().getHours();
  var g = h < 12 ? "Good morning ☀️" : h < 17 ? "Good afternoon 🌤️" : "Good evening 🌙";
  var el = document.getElementById("greeting-text");
  if (el) el.textContent = g + ", " + (name || "team") + "!";
}

// ---------- STORE (localStorage) ----------
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function save(key) { localStorage.setItem("fs_" + key, JSON.stringify(store[key])); }
function load(key, fallback) {
  try { var d = localStorage.getItem("fs_" + key); return d ? JSON.parse(d) : fallback; }
  catch(e) { return fallback; }
}

var store = {
  projects: load("projects", [
    { id: uid(), name: "Podcast Launch — Aling Lina", status: "In Progress",  priority: "Urgent", owner: "Angelina",  due: "2026-06-30", tags: "Podcast"   },
    { id: uid(), name: "Equipment Setup",              status: "Not Started",  priority: "High",   owner: "Catalina",  due: "2026-04-15", tags: "Podcast"   },
    { id: uid(), name: "Podcast Branding & Identity",  status: "Not Started",  priority: "High",   owner: "Rosalinda", due: "2026-04-30", tags: "Marketing" },
    { id: uid(), name: "Website & Landing Page",       status: "Not Started",  priority: "Medium", owner: "Rosalinda", due: "2026-05-15", tags: "Marketing" },
    { id: uid(), name: "Social Media Setup",           status: "Not Started",  priority: "Medium", owner: "Rosalinda", due: "2026-04-30", tags: "Marketing" },
    { id: uid(), name: "Launch Campaign",              status: "Not Started",  priority: "High",   owner: "Angelina",  due: "2026-06-01", tags: "Marketing" },
  ]),
  tasks: load("tasks", []),
  episodes: load("episodes", [
    { id: uid(), number: 1, title: "Episode 1 — TBD", status: "Planned", recordDate: "", publishDate: "", guest: "" },
    { id: uid(), number: 2, title: "Episode 2 — TBD", status: "Idea",    recordDate: "", publishDate: "", guest: "" },
    { id: uid(), number: 3, title: "Episode 3 — TBD", status: "Idea",    recordDate: "", publishDate: "", guest: "" },
    { id: uid(), number: 4, title: "Episode 4 — TBD", status: "Idea",    recordDate: "", publishDate: "", guest: "" },
    { id: uid(), number: 5, title: "Episode 5 — TBD", status: "Idea",    recordDate: "", publishDate: "", guest: "" },
  ]),
  team: load("team", [
    { id: uid(), name: "Angelina",  role: "Host",                  emoji: "👩", status: "Active" },
    { id: uid(), name: "Catalina",  role: "Host & Tech Lead",      emoji: "🧑", status: "Active" },
    { id: uid(), name: "Rosalinda", role: "Host & Marketing Lead", emoji: "👩", status: "Active" },
  ]),
  finance: load("finance", [
    { id: uid(), name: "Microphones x3",          type: "Expense", category: "Equipment", amount: 180, status: "Planned", date: "2026-04" },
    { id: uid(), name: "Headphones x3",           type: "Expense", category: "Equipment", amount: 135, status: "Planned", date: "2026-04" },
    { id: uid(), name: "Pop Filters x3",          type: "Expense", category: "Equipment", amount: 30,  status: "Planned", date: "2026-04" },
    { id: uid(), name: "Mic Stands x3",           type: "Expense", category: "Equipment", amount: 60,  status: "Planned", date: "2026-04" },
    { id: uid(), name: "Acoustic Panels",         type: "Expense", category: "Equipment", amount: 30,  status: "Planned", date: "2026-04" },
    { id: uid(), name: "Podcast Hosting (monthly)",type:"Expense", category: "Hosting",   amount: 12,  status: "Planned", date: "2026-04" },
  ]),
  goals: load("goals", [
    { id: uid(), goal: "Launch Aling Lina Podcast",    type: "Podcast",   quarter: "Q2 2026", target: 1,   current: 0 },
    { id: uid(), goal: "Publish 5 Episodes",           type: "Podcast",   quarter: "Q2 2026", target: 5,   current: 0 },
    { id: uid(), goal: "Reach 500 Total Downloads",    type: "Podcast",   quarter: "Q2 2026", target: 500, current: 0 },
    { id: uid(), goal: "Grow to 200 Social Followers", type: "Marketing", quarter: "Q2 2026", target: 200, current: 0 },
    { id: uid(), goal: "Secure 1 Sponsor",             type: "Financial", quarter: "Q2 2026", target: 1,   current: 0 },
  ]),
  documents: load("documents", [
    { id: uid(), title: "SOP: Recording Day Checklist", type: "SOP",   dept: "Podcast Production", content: "" },
    { id: uid(), title: "SOP: Editing Workflow",        type: "SOP",   dept: "Podcast Production", content: "" },
    { id: uid(), title: "SOP: Publishing Checklist",    type: "SOP",   dept: "Podcast Production", content: "" },
    { id: uid(), title: "SOP: Social Media Process",    type: "SOP",   dept: "Marketing",          content: "" },
    { id: uid(), title: "SOP: Expense Reporting",       type: "SOP",   dept: "Finance",            content: "" },
    { id: uid(), title: "Brand Guidelines",             type: "Guide", dept: "Marketing",          content: "" },
    { id: uid(), title: "Tools Master List",            type: "Guide", dept: "IT",                 content: "" },
    { id: uid(), title: "Team Onboarding Checklist",    type: "SOP",   dept: "HR",                 content: "" },
  ]),
  ideas:     load("ideas", []),
  contacts:  load("contacts", []),
  content:   load("content", []),
  equipment: load("equipment", []),
};

// ---------- NAVIGATION ----------
function showSection(id) {
  document.querySelectorAll(".ws-section").forEach(function(s) { s.classList.remove("active"); });
  document.querySelectorAll(".nav-item").forEach(function(n) { n.classList.remove("active"); });
  var sec = document.getElementById("section-" + id);
  if (sec) sec.classList.add("active");
  var navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(function(n) {
    if (n.getAttribute("onclick") && n.getAttribute("onclick").indexOf("'" + id + "'") !== -1)
      n.classList.add("active");
  });
}

// ---------- RENDER ALL ----------
function renderAll() {
  renderDashboard();
  renderProjects();
  renderTasks();
  renderEpisodes();
  renderTeam();
  renderFinance();
  renderGoals();
  renderDocuments();
  renderWiki();
  renderPodcastKanban();
  renderContacts();
  renderContent();
  renderEquipment();
}

function statusBadge(s) {
  var map = {
    "In Progress":"progress","Not Started":"planned","Completed":"done",
    "To Do":"planned","Done":"done","Planned":"planned","Idea":"idea",
    "Published":"done","Recording Scheduled":"progress","Editing":"progress",
    "Ready to Publish":"progress","Urgent":"urgent","High":"high",
    "Medium":"medium","Low":"medium","Expense":"planned","Income":"done",
    "Paid":"done","Pending":"progress","Active":"done","Inactive":"planned",
    "New Lead":"planned","Contacted":"progress","In Conversation":"progress",
    "Confirmed":"done","Closed":"done","Drafting":"progress","Scheduled":"progress",
    "New":"done","Excellent":"done","Good":"done","Fair":"medium","Needs Repair":"urgent"
  };
  return '<span class="badge badge-' + (map[s] || "planned") + '">' + s + '</span>';
}

// ---------- DASHBOARD ----------
function renderDashboard() {
  var stats = [
    { label: "Active Projects", value: store.projects.filter(function(p){return p.status==="In Progress";}).length, icon: "📋" },
    { label: "Episodes",        value: store.episodes.length, icon: "🎙️" },
    { label: "Published",       value: store.episodes.filter(function(e){return e.status==="Published";}).length, icon: "🟢" },
    { label: "Open Tasks",      value: store.tasks.filter(function(t){return t.status!=="Done";}).length, icon: "✅" },
    { label: "Total Expenses",  value: "€" + store.finance.filter(function(f){return f.type==="Expense";}).reduce(function(s,f){return s+Number(f.amount);},0), icon: "💰" },
    { label: "Team Members",    value: store.team.length, icon: "👥" },
  ];
  var el = document.getElementById("dashboard-stats");
  if (el) el.innerHTML = stats.map(function(s) {
    return '<div class="dash-stat-card"><div class="dash-stat-icon">' + s.icon + '</div><div class="dash-stat-value">' + s.value + '</div><div class="dash-stat-label">' + s.label + '</div></div>';
  }).join("");
  renderProjectPreview();
  renderGoals();
}

function renderProjectPreview() {
  var el = document.getElementById("project-preview");
  if (!el) return;
  var active = store.projects.filter(function(p){return p.status==="In Progress";}).slice(0,5);
  el.innerHTML = active.map(function(p) {
    return '<div class="project-item"><span>' + p.name + '</span>' + statusBadge(p.status) + '</div>';
  }).join("") || '<div style="color:#9CA3AF;font-size:0.9rem">No active projects yet.</div>';
}

// ---------- PROJECTS ----------
function renderProjects() {
  var tbody = document.getElementById("projects-table");
  if (!tbody) return;
  tbody.innerHTML = store.projects.map(function(p) {
    return '<tr><td><strong>' + p.name + '</strong></td><td>' + statusBadge(p.status) + '</td><td>' + statusBadge(p.priority) + '</td><td>' + p.owner + '</td><td>' + p.due + '</td><td><span class="badge badge-planned">' + p.tags + '</span></td><td><button class="row-btn edit-btn" onclick="editProject('' + p.id + '')">✏️</button> <button class="row-btn del-btn" onclick="deleteProject('' + p.id + '')">🗑️</button></td></tr>';
  }).join("");
  renderProjectPreview();
}
function addProject() {
  var f = getMF();
  if (!f[0]) return alert("Project name is required.");
  store.projects.push({ id: uid(), name: f[0], status: f[1]||"Not Started", priority: f[2]||"Medium", owner: f[3]||"", due: f[4]||"", tags: f[5]||"" });
  save("projects"); closeModal(); renderProjects();
}
function editProject(id) {
  var p = store.projects.find(function(x){return x.id===id;});
  if (!p) return;
  openModalHTML('<h2>✏️ Edit Project</h2><div class="modal-form"><input id="ef0" type="text" value="' + p.name + '" placeholder="Project Name"/><select id="ef1">' + opts(["Not Started","In Progress","Completed"], p.status) + '</select><select id="ef2">' + opts(["Urgent","High","Medium","Low"], p.priority) + '</select><input id="ef3" type="text" value="' + p.owner + '" placeholder="Owner"/><input id="ef4" type="date" value="' + p.due + '"/><input id="ef5" type="text" value="' + p.tags + '" placeholder="Tags"/><div class="modal-actions"><button class="add-btn-lg" onclick="saveEdit('project','' + id + '')">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>');
}
function saveEdit(type, id) {
  var map = {
    project:  function(x) { x.name=gv("ef0"); x.status=gv("ef1"); x.priority=gv("ef2"); x.owner=gv("ef3"); x.due=gv("ef4"); x.tags=gv("ef5"); },
    task:     function(x) { x.name=gv("ef0"); x.status=gv("ef1"); x.priority=gv("ef2"); x.owner=gv("ef3"); x.due=gv("ef4"); },
    episode:  function(x) { x.number=parseInt(gv("ef0"))||x.number; x.title=gv("ef1"); x.status=gv("ef2"); x.guest=gv("ef3"); x.recordDate=gv("ef4"); x.publishDate=gv("ef5"); },
    finance:  function(x) { x.name=gv("ef0"); x.type=gv("ef1"); x.category=gv("ef2"); x.amount=parseFloat(gv("ef3"))||0; x.status=gv("ef4"); x.date=gv("ef5"); },
    goal:     function(x) { x.goal=gv("ef0"); x.type=gv("ef1"); x.quarter=gv("ef2"); x.target=parseInt(gv("ef3"))||1; x.current=parseInt(gv("ef4"))||0; },
    team:     function(x) { x.name=gv("ef0"); x.role=gv("ef1"); x.emoji=gv("ef2"); x.status=gv("ef3"); },
    contact:  function(x) { x.name=gv("ef0"); x.type=gv("ef1"); x.company=gv("ef2"); x.email=gv("ef3"); x.status=gv("ef4"); },
    content:  function(x) { x.title=gv("ef0"); x.platform=gv("ef1"); x.status=gv("ef2"); x.creator=gv("ef3"); x.date=gv("ef4"); },
    equipment:function(x) { x.name=gv("ef0"); x.category=gv("ef1"); x.brand=gv("ef2"); x.model=gv("ef3"); x.condition=gv("ef4"); x.price=parseFloat(gv("ef5"))||0; },
    document: function(x) { x.title=gv("ef0"); x.type=gv("ef1"); x.dept=gv("ef2"); x.content=gv("ef3"); },
  };
  var storeKey = type === "document" ? "documents" : type + "s";
  var item = store[storeKey].find(function(x){return x.id===id;});
  if (!item) return;
  map[type](item);
  save(storeKey); closeModal();
  var renders = { project:"renderProjects", task:"renderTasks", episode:"renderEpisodes", finance:"renderFinance", goal:"renderGoals", team:"renderTeam", contact:"renderContacts", content:"renderContent", equipment:"renderEquipment", document:"renderDocuments" };
  window[renders[type]]();
}
function deleteProject(id) { if (!confirm("Delete?")) return; store.projects = store.projects.filter(function(x){return x.id!==id;}); save("projects"); renderProjects(); }

// ---------- TASKS ----------
function renderTasks() {
  var tbody = document.getElementById("tasks-table");
  if (!tbody) return;
  tbody.innerHTML = store.tasks.length
    ? store.tasks.map(function(t) { return '<tr><td>' + t.name + '</td><td>' + statusBadge(t.status) + '</td><td>' + statusBadge(t.priority) + '</td><td>' + t.owner + '</td><td>' + t.due + '</td><td><button class="row-btn edit-btn" onclick="editTask('' + t.id + '')">✏️</button> <button class="row-btn del-btn" onclick="deleteTask('' + t.id + '')">🗑️</button></td></tr>'; }).join("")
    : '<tr><td colspan="6" style="text-align:center;color:#9CA3AF;padding:2rem">No tasks yet. Add your first task!</td></tr>';
}
function addTask() {
  var f = getMF();
  if (!f[0]) return alert("Task name is required.");
  store.tasks.push({ id: uid(), name: f[0], status: f[1]||"To Do", priority: f[2]||"Medium", owner: f[3]||"", due: f[4]||"" });
  save("tasks"); closeModal(); renderTasks();
}
function editTask(id) {
  var t = store.tasks.find(function(x){return x.id===id;});
  if (!t) return;
  openModalHTML('<h2>✏️ Edit Task</h2><div class="modal-form"><input id="ef0" type="text" value="' + t.name + '" placeholder="Task Name"/><select id="ef1">' + opts(["To Do","In Progress","Done"], t.status) + '</select><select id="ef2">' + opts(["Urgent","High","Medium","Low"], t.priority) + '</select><input id="ef3" type="text" value="' + t.owner + '" placeholder="Owner"/><input id="ef4" type="date" value="' + t.due + '"/><div class="modal-actions"><button class="add-btn-lg" onclick="saveEdit('task','' + id + '')">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>');
}
function deleteTask(id) { if (!confirm("Delete?")) return; store.tasks = store.tasks.filter(function(x){return x.id!==id;}); save("tasks"); renderTasks(); }

// ---------- EPISODES ----------
function renderEpisodes() {
  var tbody = document.getElementById("episodes-table");
  if (!tbody) return;
  tbody.innerHTML = store.episodes.map(function(e) {
    return '<tr><td><strong>Ep.' + e.number + '</strong></td><td>' + e.title + '</td><td>' + statusBadge(e.status) + '</td><td>' + (e.recordDate||"—") + '</td><td>' + (e.publishDate||"—") + '</td><td>' + (e.guest||"—") + '</td><td><button class="row-btn edit-btn" onclick="editEpisode('' + e.id + '')">✏️</button> <button class="row-btn del-btn" onclick="deleteEpisode('' + e.id + '')">🗑️</button></td></tr>';
  }).join("");
  renderPodcastKanban();
}
function addEpisode() {
  var f = getMF();
  store.episodes.push({ id: uid(), number: parseInt(f[0])||store.episodes.length+1, title: f[1]||"New Episode", status: f[2]||"Idea", guest: f[3]||"", recordDate: f[4]||"", publishDate: f[5]||"" });
  save("episodes"); closeModal(); renderEpisodes();
}
function editEpisode(id) {
  var e = store.episodes.find(function(x){return x.id===id;});
  if (!e) return;
  openModalHTML('<h2>✏️ Edit Episode</h2><div class="modal-form"><input id="ef0" type="number" value="' + e.number + '" placeholder="Episode #"/><input id="ef1" type="text" value="' + e.title + '" placeholder="Title"/><select id="ef2">' + opts(["Idea","Planned","Recording Scheduled","Editing","Ready to Publish","Published"], e.status) + '</select><input id="ef3" type="text" value="' + e.guest + '" placeholder="Guest"/><label style="font-size:0.82rem;color:#6B7280">Recording Date</label><input id="ef4" type="date" value="' + e.recordDate + '"/><label style="font-size:0.82rem;color:#6B7280">Publish Date</label><input id="ef5" type="date" value="' + e.publishDate + '"/><div class="modal-actions"><button class="add-btn-lg" onclick="saveEdit('episode','' + id + '')">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>');
}
function deleteEpisode(id) { if (!confirm("Delete?")) return; store.episodes = store.episodes.filter(function(x){return x.id!==id;}); save("episodes"); renderEpisodes(); }

function renderPodcastKanban() {
  var el = document.getElementById("podcast-kanban");
  if (!el) return;
  var statuses = ["Idea","Planned","Recording Scheduled","Editing","Ready to Publish","Published"];
  var labels   = ["💡 Idea","📝 Planned","🎙️ Recording","✂️ Editing","✅ Ready","🟢 Published"];
  el.innerHTML = statuses.map(function(s, i) {
    var eps = store.episodes.filter(function(e){return e.status===s;});
    return '<div class="kanban-col"><div class="kanban-col-title">' + labels[i] + '</div>' + (eps.map(function(e){return '<div class="kanban-card">Ep.' + e.number + ': ' + e.title + '</div>';}).join("") || '<div style="color:#9CA3AF;font-size:0.8rem">Empty</div>') + '</div>';
  }).join("");
}

// ---------- TEAM ----------
function renderTeam() {
  var el = document.getElementById("team-gallery");
  if (!el) return;
  el.innerHTML = store.team.map(function(m) {
    return '<div class="team-member-card"><div class="member-avatar">' + m.emoji + '</div><h3>' + m.name + '</h3><div class="member-role">' + m.role + '</div><div class="member-status">● ' + m.status + '</div><div style="margin-top:0.8rem;display:flex;gap:0.5rem;justify-content:center"><button class="row-btn edit-btn" onclick="editTeam('' + m.id + '')">✏️</button><button class="row-btn del-btn" onclick="deleteTeam('' + m.id + '')">🗑️</button></div></div>';
  }).join("");
}
function addTeamMember() {
  var f = getMF();
  if (!f[0]) return alert("Name is required.");
  store.team.push({ id: uid(), name: f[0], role: f[1]||"Team Member", emoji: f[2]||"👤", status: f[3]||"Active" });
  save("team"); closeModal(); renderTeam();
}
function editTeam(id) {
  var m = store.team.find(function(x){return x.id===id;});
  if (!m) return;
  openModalHTML('<h2>✏️ Edit Member</h2><div class="modal-form"><input id="ef0" type="text" value="' + m.name + '" placeholder="Name"/><input id="ef1" type="text" value="' + m.role + '" placeholder="Role"/><input id="ef2" type="text" value="' + m.emoji + '" placeholder="Emoji"/><select id="ef3">' + opts(["Active","Inactive"], m.status) + '</select><div class="modal-actions"><button class="add-btn-lg" onclick="saveEdit('team','' + id + '')">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>');
}
function deleteTeam(id) { if (!confirm("Remove?")) return; store.team = store.team.filter(function(x){return x.id!==id;}); save("team"); renderTeam(); }

// ---------- FINANCE ----------
function renderFinance() {
  var tbody = document.getElementById("finance-table");
  if (!tbody) return;
  var totalExp = store.finance.filter(function(f){return f.type==="Expense";}).reduce(function(s,f){return s+Number(f.amount);},0);
  var totalInc = store.finance.filter(function(f){return f.type==="Income";}).reduce(function(s,f){return s+Number(f.amount);},0);
  var net = totalInc - totalExp;
  var summary = document.getElementById("finance-summary");
  if (summary) summary.innerHTML = '<span>💸 Expenses: <strong>€' + totalExp + '</strong></span><span>💰 Income: <strong>€' + totalInc + '</strong></span><span>📊 Net: <strong style="color:' + (net>=0?"#10B981":"#EF4444") + '">€' + net + '</strong></span>';
  tbody.innerHTML = store.finance.map(function(f) {
    return '<tr><td><strong>' + f.name + '</strong></td><td>' + statusBadge(f.type) + '</td><td>' + f.category + '</td><td>€' + f.amount + '</td><td>' + statusBadge(f.status) + '</td><td>' + f.date + '</td><td><button class="row-btn edit-btn" onclick="editFinance('' + f.id + '')">✏️</button> <button class="row-btn del-btn" onclick="deleteFinance('' + f.id + '')">🗑️</button></td></tr>';
  }).join("");
}
function addFinance() {
  var f = getMF();
  if (!f[0]) return alert("Name is required.");
  store.finance.push({ id: uid(), name: f[0], type: f[1]||"Expense", category: f[2]||"Other", amount: parseFloat(f[3])||0, status: f[4]||"Planned", date: f[5]||"" });
  save("finance"); closeModal(); renderFinance();
}
function editFinance(id) {
  var f = store.finance.find(function(x){return x.id===id;});
  if (!f) return;
  openModalHTML('<h2>✏️ Edit Finance</h2><div class="modal-form"><input id="ef0" type="text" value="' + f.name + '" placeholder="Name"/><select id="ef1">' + opts(["Expense","Income"], f.type) + '</select><select id="ef2">' + opts(["Equipment","Software","Hosting","Marketing","Salary","Sponsorship","Other"], f.category) + '</select><input id="ef3" type="number" value="' + f.amount + '" placeholder="Amount (€)"/><select id="ef4">' + opts(["Planned","Pending","Paid"], f.status) + '</select><input id="ef5" type="text" value="' + f.date + '" placeholder="Date (YYYY-MM)"/><div class="modal-actions"><button class="add-btn-lg" onclick="saveEdit('finance','' + id + '')">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>');
}
function deleteFinance(id) { if (!confirm("Delete?")) return; store.finance = store.finance.filter(function(x){return x.id!==id;}); save("finance"); renderFinance(); }

// ---------- GOALS ----------
function renderGoals() {
  var html = store.goals.map(function(g) {
    var pct = g.target > 0 ? Math.min(100, Math.round((g.current/g.target)*100)) : 0;
    return '<div class="goal-item"><div class="goal-header"><span class="goal-title">' + g.goal + '</span><span class="goal-meta">' + g.type + ' · ' + g.quarter + '</span><div style="display:flex;gap:0.4rem;margin-left:auto"><button class="row-btn edit-btn" onclick="editGoal('' + g.id + '')">✏️</button><button class="row-btn del-btn" onclick="deleteGoal('' + g.id + '')">🗑️</button></div></div><div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div><div class="goal-percent">' + pct + '% — ' + g.current + ' / ' + g.target + '</div></div>';
  }).join("");
  ["goals-preview","goals-full"].forEach(function(id) { var el=document.getElementById(id); if(el) el.innerHTML=html; });
}
function addGoal() {
  var f = getMF();
  if (!f[0]) return alert("Goal is required.");
  store.goals.push({ id: uid(), goal: f[0], type: f[1]||"Podcast", quarter: f[2]||"Q2 2026", target: parseInt(f[3])||1, current: parseInt(f[4])||0 });
  save("goals"); closeModal(); renderGoals();
}
function editGoal(id) {
  var g = store.goals.find(function(x){return x.id===id;});
  if (!g) return;
  openModalHTML('<h2>✏️ Edit Goal</h2><div class="modal-form"><input id="ef0" type="text" value="' + g.goal + '" placeholder="Goal"/><select id="ef1">' + opts(["Podcast","Marketing","Financial","Team","Content"], g.type) + '</select><input id="ef2" type="text" value="' + g.quarter + '" placeholder="Quarter"/><input id="ef3" type="number" value="' + g.target + '" placeholder="Target"/><input id="ef4" type="number" value="' + g.current + '" placeholder="Current"/><div class="modal-actions"><button class="add-btn-lg" onclick="saveEdit('goal','' + id + '')">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>');
}
function deleteGoal(id) { if (!confirm("Delete?")) return; store.goals = store.goals.filter(function(x){return x.id!==id;}); save("goals"); renderGoals(); }

// ---------- DOCUMENTS ----------
function renderDocuments() {
  var el = document.getElementById("doc-grid");
  if (!el) return;
  el.innerHTML = store.documents.map(function(d) {
    return '<div class="doc-card"><div class="doc-type">' + d.type + '</div><h4>' + d.title + '</h4><p>' + d.dept + '</p><div style="margin-top:0.8rem;display:flex;gap:0.4rem;justify-content:center"><button class="row-btn edit-btn" onclick="openDocument('' + d.id + '')">📄 Open</button><button class="row-btn del-btn" onclick="deleteDocument('' + d.id + '')">🗑️</button></div></div>';
  }).join("");
}
function addDocument() {
  var f = getMF();
  if (!f[0]) return alert("Title is required.");
  store.documents.push({ id: uid(), title: f[0], type: f[1]||"SOP", dept: f[2]||"", content: "" });
  save("documents"); closeModal(); renderDocuments();
}
function openDocument(id) {
  var d = store.documents.find(function(x){return x.id===id;});
  if (!d) return;
  openModalHTML('<h2>📄 ' + d.title + '</h2><div class="modal-form"><input id="ef0" type="text" value="' + d.title + '" placeholder="Title"/><select id="ef1">' + opts(["SOP","Guide","Policy","Template","Other"], d.type) + '</select><input id="ef2" type="text" value="' + d.dept + '" placeholder="Department"/><textarea id="ef3" rows="10" placeholder="Type content here...">' + (d.content||"") + '</textarea><div class="modal-actions"><button class="add-btn-lg" onclick="saveEdit('document','' + id + '')">💾 Save</button><button class="btn-cancel" onclick="closeModal()">Close</button></div></div>');
}
function deleteDocument(id) { if (!confirm("Delete?")) return; store.documents = store.documents.filter(function(x){return x.id!==id;}); save("documents"); renderDocuments(); }

// ---------- CONTACTS ----------
function renderContacts() {
  var el = document.getElementById("contacts-table");
  if (!el) return;
  el.innerHTML = store.contacts.length
    ? store.contacts.map(function(c) { return '<tr><td><strong>' + c.name + '</strong></td><td>' + statusBadge(c.type) + '</td><td>' + (c.company||"—") + '</td><td>' + (c.email||"—") + '</td><td>' + statusBadge(c.status) + '</td><td><button class="row-btn edit-btn" onclick="editContact('' + c.id + '')">✏️</button> <button class="row-btn del-btn" onclick="deleteContact('' + c.id + '')">🗑️</button></td></tr>'; }).join("")
    : '<tr><td colspan="6" style="text-align:center;color:#9CA3AF;padding:2rem">No contacts yet.</td></tr>';
}
function addContact() {
  var f = getMF();
  if (!f[0]) return alert("Name is required.");
  store.contacts.push({ id: uid(), name: f[0], type: f[1]||"Guest", company: f[2]||"", email: f[3]||"", status: f[4]||"New Lead" });
  save("contacts"); closeModal(); renderContacts();
}
function editContact(id) {
  var c = store.contacts.find(function(x){return x.id===id;});
  if (!c) return;
  openModalHTML('<h2>✏️ Edit Contact</h2><div class="modal-form"><input id="ef0" type="text" value="' + c.name + '" placeholder="Name"/><select id="ef1">' + opts(["Guest","Sponsor","Partner","Listener","Press"], c.type) + '</select><input id="ef2" type="text" value="' + c.company + '" placeholder="Company"/><input id="ef3" type="email" value="' + c.email + '" placeholder="Email"/><select id="ef4">' + opts(["New Lead","Contacted","In Conversation","Confirmed","Closed"], c.status) + '</select><div class="modal-actions"><button class="add-btn-lg" onclick="saveEdit('contact','' + id + '')">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>');
}
function deleteContact(id) { if (!confirm("Delete?")) return; store.contacts = store.contacts.filter(function(x){return x.id!==id;}); save("contacts"); renderContacts(); }

// ---------- CONTENT ----------
function renderContent() {
  var el = document.getElementById("content-table");
  if (!el) return;
  el.innerHTML = store.content.length
    ? store.content.map(function(c) { return '<tr><td><strong>' + c.title + '</strong></td><td>' + c.platform + '</td><td>' + statusBadge(c.status) + '</td><td>' + (c.creator||"—") + '</td><td>' + (c.date||"—") + '</td><td><button class="row-btn edit-btn" onclick="editContent('' + c.id + '')">✏️</button> <button class="row-btn del-btn" onclick="deleteContent('' + c.id + '')">🗑️</button></td></tr>'; }).join("")
    : '<tr><td colspan="6" style="text-align:center;color:#9CA3AF;padding:2rem">No content yet.</td></tr>';
}
function addContent() {
  var f = getMF();
  if (!f[0]) return alert("Title is required.");
  store.content.push({ id: uid(), title: f[0], platform: f[1]||"Instagram Post", status: f[2]||"Idea", creator: f[3]||"", date: f[4]||"" });
  save("content"); closeModal(); renderContent();
}
function editContent(id) {
  var c = store.content.find(function(x){return x.id===id;});
  if (!c) return;
  openModalHTML('<h2>✏️ Edit Content</h2><div class="modal-form"><input id="ef0" type="text" value="' + c.title + '" placeholder="Title"/><select id="ef1">' + opts(["Instagram Post","Instagram Reel","TikTok","YouTube Short","Newsletter","Twitter/X"], c.platform) + '</select><select id="ef2">' + opts(["Idea","Drafting","Scheduled","Published"], c.status) + '</select><input id="ef3" type="text" value="' + c.creator + '" placeholder="Creator"/><input id="ef4" type="date" value="' + c.date + '"/><div class="modal-actions"><button class="add-btn-lg" onclick="saveEdit('content','' + id + '')">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>');
}
function deleteContent(id) { if (!confirm("Delete?")) return; store.content = store.content.filter(function(x){return x.id!==id;}); save("content"); renderContent(); }

// ---------- EQUIPMENT ----------
function renderEquipment() {
  var el = document.getElementById("equipment-table");
  if (!el) return;
  el.innerHTML = store.equipment.length
    ? store.equipment.map(function(e) { return '<tr><td><strong>' + e.name + '</strong></td><td>' + e.category + '</td><td>' + (e.brand||"—") + '</td><td>' + (e.model||"—") + '</td><td>' + statusBadge(e.condition) + '</td><td>' + (e.price?"€"+e.price:"—") + '</td><td><button class="row-btn edit-btn" onclick="editEquipment('' + e.id + '')">✏️</button> <button class="row-btn del-btn" onclick="deleteEquipment('' + e.id + '')">🗑️</button></td></tr>'; }).join("")
    : '<tr><td colspan="7" style="text-align:center;color:#9CA3AF;padding:2rem">No equipment logged yet.</td></tr>';
}
function addEquipment() {
  var f = getMF();
  if (!f[0]) return alert("Name is required.");
  store.equipment.push({ id: uid(), name: f[0], category: f[1]||"Other", brand: f[2]||"", model: f[3]||"", condition: f[4]||"New", price: parseFloat(f[5])||0 });
  save("equipment"); closeModal(); renderEquipment();
}
function editEquipment(id) {
  var e = store.equipment.find(function(x){return x.id===id;});
  if (!e) return;
  openModalHTML('<h2>✏️ Edit Equipment</h2><div class="modal-form"><input id="ef0" type="text" value="' + e.name + '" placeholder="Name"/><select id="ef1">' + opts(["Microphone","Headphone","Interface","Computer","Camera","Lighting","Other"], e.category) + '</select><input id="ef2" type="text" value="' + e.brand + '" placeholder="Brand"/><input id="ef3" type="text" value="' + e.model + '" placeholder="Model"/><select id="ef4">' + opts(["New","Excellent","Good","Fair","Needs Repair"], e.condition) + '</select><input id="ef5" type="number" value="' + e.price + '" placeholder="Price (€)"/><div class="modal-actions"><button class="add-btn-lg" onclick="saveEdit('equipment','' + id + '')">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>');
}
function deleteEquipment(id) { if (!confirm("Delete?")) return; store.equipment = store.equipment.filter(function(x){return x.id!==id;}); save("equipment"); renderEquipment(); }

// ---------- WIKI ----------
function renderWiki() {
  var el = document.getElementById("wiki-tree");
  if (!el) return;
  el.innerHTML = '<div class="wiki-section"><h3>🏢 About Filina Studios</h3><div class="wiki-links"><span class="wiki-link">Our Story</span><span class="wiki-link">Mission & Vision</span><span class="wiki-link">Team Bios</span><span class="wiki-link">Brand Guidelines</span></div></div><div class="wiki-section"><h3>🎙️ Podcast Production</h3><div class="wiki-links"><span class="wiki-link">Recording Checklist</span><span class="wiki-link">Editing Workflow</span><span class="wiki-link">Publishing Checklist</span><span class="wiki-link">Episode Planning</span><span class="wiki-link">Guest Management</span><span class="wiki-link">Equipment Handbook</span></div></div><div class="wiki-section"><h3>📣 Marketing & Growth</h3><div class="wiki-links"><span class="wiki-link">Social Media SOP</span><span class="wiki-link">Content Approval</span><span class="wiki-link">Hashtag Library</span><span class="wiki-link">Audience Personas</span></div></div><div class="wiki-section"><h3>💰 Finance & Admin</h3><div class="wiki-links"><span class="wiki-link">Expense Reporting</span><span class="wiki-link">Invoicing Process</span><span class="wiki-link">Budget Overview</span><span class="wiki-link">Tax & Legal Notes</span></div></div><div class="wiki-section"><h3>👥 HR & Team</h3><div class="wiki-links"><span class="wiki-link">Onboarding Checklist</span><span class="wiki-link">Team Policies</span><span class="wiki-link">Communication Guidelines</span><span class="wiki-link">Meeting Cadence</span></div></div><div class="wiki-section"><h3>🔧 IT & Tools</h3><div class="wiki-links"><span class="wiki-link">Tools We Use</span><span class="wiki-link">Password Policy</span><span class="wiki-link">Data Backup Policy</span><span class="wiki-link">Access & Permissions</span></div></div>';
}

// ---------- MODAL ----------
function openModal(type) {
  var templates = {
    project:   '<h2>📋 New Project</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Project Name"/><select id="mf1"><option>Not Started</option><option>In Progress</option><option>Completed</option></select><select id="mf2"><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select><input id="mf3" type="text" placeholder="Owner"/><input id="mf4" type="date"/><input id="mf5" type="text" placeholder="Tags"/><div class="modal-actions"><button class="add-btn-lg" onclick="addProject()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>',
    task:      '<h2>✅ New Task</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Task Name"/><select id="mf1"><option>To Do</option><option>In Progress</option><option>Done</option></select><select id="mf2"><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select><input id="mf3" type="text" placeholder="Owner"/><input id="mf4" type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="addTask()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>',
    episode:   '<h2>🎙️ New Episode</h2><div class="modal-form"><input id="mf0" type="number" placeholder="Episode #"/><input id="mf1" type="text" placeholder="Title"/><select id="mf2"><option>Idea</option><option>Planned</option><option>Recording Scheduled</option><option>Editing</option><option>Ready to Publish</option></select><input id="mf3" type="text" placeholder="Guest (optional)"/><label style="font-size:0.82rem;color:#6B7280">Recording Date</label><input id="mf4" type="date"/><label style="font-size:0.82rem;color:#6B7280">Publish Date</label><input id="mf5" type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="addEpisode()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>',
    finance:   '<h2>💰 New Finance Entry</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Name"/><select id="mf1"><option>Expense</option><option>Income</option></select><select id="mf2"><option>Equipment</option><option>Software</option><option>Hosting</option><option>Marketing</option><option>Salary</option><option>Sponsorship</option></select><input id="mf3" type="number" placeholder="Amount (€)"/><select id="mf4"><option>Planned</option><option>Pending</option><option>Paid</option></select><input id="mf5" type="text" placeholder="Date (YYYY-MM)"/><div class="modal-actions"><button class="add-btn-lg" onclick="addFinance()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>',
    goal:      '<h2>🎯 New Goal</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Goal description"/><select id="mf1"><option>Podcast</option><option>Marketing</option><option>Financial</option><option>Team</option><option>Content</option></select><input id="mf2" type="text" placeholder="Quarter" value="Q2 2026"/><input id="mf3" type="number" placeholder="Target"/><input id="mf4" type="number" placeholder="Current" value="0"/><div class="modal-actions"><button class="add-btn-lg" onclick="addGoal()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>',
    contact:   '<h2>🤝 New Contact</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Full Name"/><select id="mf1"><option>Guest</option><option>Sponsor</option><option>Partner</option><option>Listener</option><option>Press</option></select><input id="mf2" type="text" placeholder="Company"/><input id="mf3" type="email" placeholder="Email"/><select id="mf4"><option>New Lead</option><option>Contacted</option><option>In Conversation</option><option>Confirmed</option><option>Closed</option></select><div class="modal-actions"><button class="add-btn-lg" onclick="addContact()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>',
    content:   '<h2>📣 New Content</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Content Title"/><select id="mf1"><option>Instagram Post</option><option>Instagram Reel</option><option>TikTok</option><option>YouTube Short</option><option>Newsletter</option><option>Twitter/X</option></select><select id="mf2"><option>Idea</option><option>Drafting</option><option>Scheduled</option><option>Published</option></select><input id="mf3" type="text" placeholder="Creator"/><input id="mf4" type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="addContent()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>',
    equipment: '<h2>🛠️ New Equipment</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Equipment Name"/><select id="mf1"><option>Microphone</option><option>Headphone</option><option>Interface</option><option>Computer</option><option>Camera</option><option>Lighting</option><option>Other</option></select><input id="mf2" type="text" placeholder="Brand"/><input id="mf3" type="text" placeholder="Model"/><select id="mf4"><option>New</option><option>Excellent</option><option>Good</option><option>Fair</option></select><input id="mf5" type="number" placeholder="Price (€)"/><div class="modal-actions"><button class="add-btn-lg" onclick="addEquipment()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>',
    document:  '<h2>📄 New Document</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Document Title"/><select id="mf1"><option>SOP</option><option>Guide</option><option>Policy</option><option>Template</option><option>Other</option></select><input id="mf2" type="text" placeholder="Department"/><div class="modal-actions"><button class="add-btn-lg" onclick="addDocument()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>',
    team:      '<h2>👥 New Team Member</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Full Name"/><input id="mf1" type="text" placeholder="Role"/><input id="mf2" type="text" placeholder="Emoji" value="👤"/><select id="mf3"><option>Active</option><option>Inactive</option></select><div class="modal-actions"><button class="add-btn-lg" onclick="addTeamMember()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>',
  };
  document.getElementById("modal-content").innerHTML = templates[type] || "";
  document.getElementById("modal").classList.remove("hidden");
}
function openModalHTML(html) {
  document.getElementById("modal-content").innerHTML = html;
  document.getElementById("modal").classList.remove("hidden");
}
function closeModal() { document.getElementById("modal").classList.add("hidden"); }
function closeModalOutside(e) { if (e.target.id === "modal") closeModal(); }

// Get modal field values by id mf0..mfN
function getMF() {
  var fields = []; var i = 0;
  while (true) { var el = document.getElementById("mf" + i); if (!el) break; fields.push(el.value.trim()); i++; }
  return fields;
}
// Get edit field value
function gv(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
// Build <option> list with selected value highlighted
function opts(arr, selected) {
  return arr.map(function(o) { return '<option' + (o===selected?' selected':'') + '>' + o + '</option>'; }).join("");
}

// ---------- NOTES & IDEAS ----------
function saveNotes() { localStorage.setItem("fs_notes", document.getElementById("personal-notes").value); }
function loadNotes() { var el = document.getElementById("personal-notes"); if (el) el.value = localStorage.getItem("fs_notes") || ""; }

function addIdea() {
  var input = document.getElementById("idea-input");
  if (!input || !input.value.trim()) return;
  store.ideas.push({ id: uid(), text: input.value.trim(), date: new Date().toLocaleDateString() });
  localStorage.setItem("fs_ideas", JSON.stringify(store.ideas));
  input.value = "";
  renderIdeas();
}
function removeIdea(id) {
  store.ideas = store.ideas.filter(function(x){ return (x.id || x) !== id; });
  localStorage.setItem("fs_ideas", JSON.stringify(store.ideas));
  renderIdeas();
}
function renderIdeas() {
  var el = document.getElementById("ideas-list");
  if (!el) return;
  el.innerHTML = store.ideas.map(function(idea) {
    var text = typeof idea === "string" ? idea : idea.text;
    var date = typeof idea === "object" && idea.date ? idea.date : "";
    var id   = typeof idea === "object" && idea.id   ? idea.id   : idea;
    return '<li><span>' + text + '</span><span style="font-size:0.75rem;color:#9CA3AF;margin:0 0.5rem">' + date + '</span><button class="del-idea" onclick="removeIdea(\'' + id + '\')">✕</button></li>';
  }).join("");
}
function loadIdeas() { renderIdeas(); }

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", function() {
  checkLogin();
});
