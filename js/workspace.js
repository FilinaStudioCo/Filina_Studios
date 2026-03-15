// =============================================
//  FILINA STUDIOS WORKSPACE — workspace.js
//  Fully functional: add, edit, delete, save
// =============================================

// ---------- STORE ----------
const store = {
  projects: JSON.parse(localStorage.getItem("fs_projects") || "null") || [
    { id: uid(), name: "Podcast Launch — Aling Lina", status: "In Progress",  priority: "Urgent", owner: "Angelina",  due: "2026-06-30", tags: "Podcast"   },
    { id: uid(), name: "Equipment Setup",              status: "Not Started",  priority: "High",   owner: "Catalina",  due: "2026-04-15", tags: "Podcast"   },
    { id: uid(), name: "Podcast Branding & Identity",  status: "Not Started",  priority: "High",   owner: "Rosalinda", due: "2026-04-30", tags: "Marketing" },
    { id: uid(), name: "Website & Landing Page",       status: "Not Started",  priority: "Medium", owner: "Rosalinda", due: "2026-05-15", tags: "Marketing" },
    { id: uid(), name: "Social Media Setup",           status: "Not Started",  priority: "Medium", owner: "Rosalinda", due: "2026-04-30", tags: "Marketing" },
    { id: uid(), name: "Launch Campaign",              status: "Not Started",  priority: "High",   owner: "Angelina",  due: "2026-06-01", tags: "Marketing" },
  ],
  tasks: JSON.parse(localStorage.getItem("fs_tasks") || "[]"),
  episodes: JSON.parse(localStorage.getItem("fs_episodes") || "null") || [
    { id: uid(), number: 1, title: "Episode 1 — TBD", status: "Planned", recordDate: "", publishDate: "", guest: "" },
    { id: uid(), number: 2, title: "Episode 2 — TBD", status: "Idea",    recordDate: "", publishDate: "", guest: "" },
    { id: uid(), number: 3, title: "Episode 3 — TBD", status: "Idea",    recordDate: "", publishDate: "", guest: "" },
    { id: uid(), number: 4, title: "Episode 4 — TBD", status: "Idea",    recordDate: "", publishDate: "", guest: "" },
    { id: uid(), number: 5, title: "Episode 5 — TBD", status: "Idea",    recordDate: "", publishDate: "", guest: "" },
  ],
  team: JSON.parse(localStorage.getItem("fs_team") || "null") || [
    { id: uid(), name: "Angelina",  role: "Host",                    emoji: "👩", status: "Active" },
    { id: uid(), name: "Catalina",  role: "Host & Tech Lead",        emoji: "🧑", status: "Active" },
    { id: uid(), name: "Rosalinda", role: "Host & Marketing Lead",   emoji: "👩", status: "Active" },
  ],
  finance: JSON.parse(localStorage.getItem("fs_finance") || "null") || [
    { id: uid(), name: "Microphones x3",          type: "Expense", category: "Equipment", amount: 180, status: "Planned", date: "2026-04" },
    { id: uid(), name: "Headphones x3",           type: "Expense", category: "Equipment", amount: 135, status: "Planned", date: "2026-04" },
    { id: uid(), name: "Pop Filters x3",          type: "Expense", category: "Equipment", amount: 30,  status: "Planned", date: "2026-04" },
    { id: uid(), name: "Mic Stands x3",           type: "Expense", category: "Equipment", amount: 60,  status: "Planned", date: "2026-04" },
    { id: uid(), name: "Acoustic Panels",         type: "Expense", category: "Equipment", amount: 30,  status: "Planned", date: "2026-04" },
    { id: uid(), name: "Podcast Hosting (monthly)", type: "Expense", category: "Hosting", amount: 12,  status: "Planned", date: "2026-04" },
  ],
  goals: JSON.parse(localStorage.getItem("fs_goals") || "null") || [
    { id: uid(), goal: "Launch Aling Lina Podcast",    type: "Podcast",    quarter: "Q2 2026", target: 1,   current: 0 },
    { id: uid(), goal: "Publish 5 Episodes",           type: "Podcast",    quarter: "Q2 2026", target: 5,   current: 0 },
    { id: uid(), goal: "Reach 500 Total Downloads",    type: "Podcast",    quarter: "Q2 2026", target: 500, current: 0 },
    { id: uid(), goal: "Grow to 200 Social Followers", type: "Marketing",  quarter: "Q2 2026", target: 200, current: 0 },
    { id: uid(), goal: "Secure 1 Sponsor",             type: "Financial",  quarter: "Q2 2026", target: 1,   current: 0 },
  ],
  documents: JSON.parse(localStorage.getItem("fs_documents") || "null") || [
    { id: uid(), title: "SOP: Recording Day Checklist", type: "SOP",   dept: "Podcast Production", content: "" },
    { id: uid(), title: "SOP: Editing Workflow",        type: "SOP",   dept: "Podcast Production", content: "" },
    { id: uid(), title: "SOP: Publishing Checklist",    type: "SOP",   dept: "Podcast Production", content: "" },
    { id: uid(), title: "SOP: Social Media Process",    type: "SOP",   dept: "Marketing",          content: "" },
    { id: uid(), title: "SOP: Expense Reporting",       type: "SOP",   dept: "Finance",            content: "" },
    { id: uid(), title: "Brand Guidelines",             type: "Guide", dept: "Marketing",          content: "" },
    { id: uid(), title: "Tools Master List",            type: "Guide", dept: "IT",                 content: "" },
    { id: uid(), title: "Team Onboarding Checklist",    type: "SOP",   dept: "HR",                 content: "" },
  ],
  ideas: JSON.parse(localStorage.getItem("fs_ideas") || "[]"),
  contacts: JSON.parse(localStorage.getItem("fs_contacts") || "[]"),
  content: JSON.parse(localStorage.getItem("fs_content") || "[]"),
  equipment: JSON.parse(localStorage.getItem("fs_equipment") || "[]"),
};

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function save(key) { localStorage.setItem("fs_" + key, JSON.stringify(store[key])); }

// ---------- AUTH ----------
let currentUser = null;

if (window.netlifyIdentity) {
  netlifyIdentity.on("init",   user => { currentUser = user; if (user) showWorkspace(user); });
  netlifyIdentity.on("login",  user => { currentUser = user; netlifyIdentity.close(); showWorkspace(user); });
  netlifyIdentity.on("logout", ()   => {
    currentUser = null;
    document.getElementById("workspace").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
  });
}

function showWorkspace(user) {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("workspace").classList.remove("hidden");
  document.getElementById("user-badge").textContent = "👤 " + (user.user_metadata?.full_name || user.email);
  setGreeting();
  renderAll();
  loadNotes();
  loadIdeas();
}

function logout() { netlifyIdentity.logout(); }

function setGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? "Good morning ☀️" : h < 17 ? "Good afternoon 🌤️" : "Good evening 🌙";
  const el = document.getElementById("greeting-text");
  if (el) el.textContent = g + (currentUser ? ", " + (currentUser.user_metadata?.full_name || "") + "!" : "!");
}

// ---------- NAVIGATION ----------
function showSection(id) {
  document.querySelectorAll(".ws-section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  const sec = document.getElementById("section-" + id);
  if (sec) sec.classList.add("active");
  const nav = document.querySelector('.nav-item[onclick*="' + id + '"]');
  if (nav) nav.classList.add("active");
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

// ---------- BADGE ----------
function statusBadge(s) {
  const map = {
    "In Progress": "progress", "Not Started": "planned", "Completed": "done",
    "Planned": "planned", "Idea": "idea", "Published": "done",
    "Urgent": "urgent", "High": "high", "Medium": "medium", "Low": "medium",
    "Expense": "planned", "Income": "done", "Paid": "done", "Pending": "progress",
    "Active": "done", "Inactive": "planned"
  };
  return '<span class="badge badge-' + (map[s] || "planned") + '">' + s + '</span>';
}

// =============================================
//  PROJECTS
// =============================================
function renderProjects() {
  const tbody = document.getElementById("projects-table");
  if (!tbody) return;
  tbody.innerHTML = store.projects.map(p => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td>${statusBadge(p.status)}</td>
      <td>${statusBadge(p.priority)}</td>
      <td>${p.owner}</td>
      <td>${p.due}</td>
      <td><span class="badge badge-planned">${p.tags}</span></td>
      <td>
        <button class="row-btn edit-btn" onclick="editProject('${p.id}')">✏️</button>
        <button class="row-btn del-btn"  onclick="deleteProject('${p.id}')">🗑️</button>
      </td>
    </tr>`).join("");
  renderProjectPreview();
}

function addProject() {
  const f = getModalFields();
  if (!f[0]) return alert("Project name is required.");
  store.projects.push({ id: uid(), name: f[0], status: f[1] || "Not Started", priority: f[2] || "Medium", owner: f[3] || "", due: f[4] || "", tags: f[5] || "" });
  save("projects"); closeModal(); renderProjects();
}

function editProject(id) {
  const p = store.projects.find(x => x.id === id);
  if (!p) return;
  openModalHTML("edit-project", `
    <h2>✏️ Edit Project</h2>
    <div class="modal-form">
      <input id="ef0" type="text" value="${p.name}" placeholder="Project Name"/>
      <select id="ef1">${["Not Started","In Progress","Completed"].map(s=>`<option ${p.status===s?"selected":""}>${s}</option>`).join("")}</select>
      <select id="ef2">${["Urgent","High","Medium","Low"].map(s=>`<option ${p.priority===s?"selected":""}>${s}</option>`).join("")}</select>
      <input id="ef3" type="text" value="${p.owner}" placeholder="Owner"/>
      <input id="ef4" type="date" value="${p.due}"/>
      <input id="ef5" type="text" value="${p.tags}" placeholder="Tags"/>
      <div class="modal-actions">
        <button class="add-btn-lg" onclick="saveEditProject('${id}')">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    </div>`);
}

function saveEditProject(id) {
  const p = store.projects.find(x => x.id === id);
  if (!p) return;
  p.name = document.getElementById("ef0").value;
  p.status = document.getElementById("ef1").value;
  p.priority = document.getElementById("ef2").value;
  p.owner = document.getElementById("ef3").value;
  p.due = document.getElementById("ef4").value;
  p.tags = document.getElementById("ef5").value;
  save("projects"); closeModal(); renderProjects();
}

function deleteProject(id) {
  if (!confirm("Delete this project?")) return;
  store.projects = store.projects.filter(x => x.id !== id);
  save("projects"); renderProjects();
}

function renderProjectPreview() {
  const el = document.getElementById("project-preview");
  if (!el) return;
  const active = store.projects.filter(p => p.status === "In Progress").slice(0, 4);
  el.innerHTML = active.map(p => `<div class="project-item"><span>${p.name}</span>${statusBadge(p.status)}</div>`).join("")
    || '<div style="color:#9CA3AF;font-size:0.9rem">No active projects yet.</div>';
}

// =============================================
//  TASKS
// =============================================
function renderTasks() {
  const tbody = document.getElementById("tasks-table");
  if (!tbody) return;
  tbody.innerHTML = store.tasks.length
    ? store.tasks.map(t => `
        <tr>
          <td>${t.name}</td>
          <td>${statusBadge(t.status)}</td>
          <td>${statusBadge(t.priority)}</td>
          <td>${t.owner}</td>
          <td>${t.due}</td>
          <td>
            <button class="row-btn edit-btn" onclick="editTask('${t.id}')">✏️</button>
            <button class="row-btn del-btn"  onclick="deleteTask('${t.id}')">🗑️</button>
          </td>
        </tr>`).join("")
    : '<tr><td colspan="6" style="text-align:center;color:#9CA3AF;padding:2rem">No tasks yet. Add your first task!</td></tr>';
}

function addTask() {
  const f = getModalFields();
  if (!f[0]) return alert("Task name is required.");
  store.tasks.push({ id: uid(), name: f[0], status: f[1] || "To Do", priority: f[2] || "Medium", owner: f[3] || "", due: f[4] || "" });
  save("tasks"); closeModal(); renderTasks();
}

function editTask(id) {
  const t = store.tasks.find(x => x.id === id);
  if (!t) return;
  openModalHTML("edit-task", `
    <h2>✏️ Edit Task</h2>
    <div class="modal-form">
      <input id="ef0" type="text" value="${t.name}" placeholder="Task Name"/>
      <select id="ef1">${["To Do","In Progress","Done"].map(s=>`<option ${t.status===s?"selected":""}>${s}</option>`).join("")}</select>
      <select id="ef2">${["Urgent","High","Medium","Low"].map(s=>`<option ${t.priority===s?"selected":""}>${s}</option>`).join("")}</select>
      <input id="ef3" type="text" value="${t.owner}" placeholder="Owner"/>
      <input id="ef4" type="date" value="${t.due}"/>
      <div class="modal-actions">
        <button class="add-btn-lg" onclick="saveEditTask('${id}')">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    </div>`);
}

function saveEditTask(id) {
  const t = store.tasks.find(x => x.id === id);
  if (!t) return;
  t.name     = document.getElementById("ef0").value;
  t.status   = document.getElementById("ef1").value;
  t.priority = document.getElementById("ef2").value;
  t.owner    = document.getElementById("ef3").value;
  t.due      = document.getElementById("ef4").value;
  save("tasks"); closeModal(); renderTasks();
}

function deleteTask(id) {
  if (!confirm("Delete this task?")) return;
  store.tasks = store.tasks.filter(x => x.id !== id);
  save("tasks"); renderTasks();
}

// =============================================
//  EPISODES
// =============================================
function renderEpisodes() {
  const tbody = document.getElementById("episodes-table");
  if (!tbody) return;
  tbody.innerHTML = store.episodes.map(e => `
    <tr>
      <td><strong>Ep. ${e.number}</strong></td>
      <td>${e.title}</td>
      <td>${statusBadge(e.status)}</td>
      <td>${e.recordDate || "—"}</td>
      <td>${e.publishDate || "—"}</td>
      <td>${e.guest || "—"}</td>
      <td>
        <button class="row-btn edit-btn" onclick="editEpisode('${e.id}')">✏️</button>
        <button class="row-btn del-btn"  onclick="deleteEpisode('${e.id}')">🗑️</button>
      </td>
    </tr>`).join("");
  renderPodcastKanban();
}

function addEpisode() {
  const f = getModalFields();
  store.episodes.push({ id: uid(), number: parseInt(f[0]) || store.episodes.length + 1, title: f[1] || "New Episode", status: f[2] || "Idea", guest: f[3] || "", recordDate: f[4] || "", publishDate: f[5] || "" });
  save("episodes"); closeModal(); renderEpisodes();
}

function editEpisode(id) {
  const e = store.episodes.find(x => x.id === id);
  if (!e) return;
  const statuses = ["Idea","Planned","Recording Scheduled","Editing","Ready to Publish","Published"];
  openModalHTML("edit-episode", `
    <h2>✏️ Edit Episode</h2>
    <div class="modal-form">
      <input id="ef0" type="number" value="${e.number}" placeholder="Episode Number"/>
      <input id="ef1" type="text"   value="${e.title}"  placeholder="Title"/>
      <select id="ef2">${statuses.map(s=>`<option ${e.status===s?"selected":""}>${s}</option>`).join("")}</select>
      <input id="ef3" type="text"   value="${e.guest}"  placeholder="Guest (optional)"/>
      <label style="font-size:0.82rem;color:#6B7280">Recording Date</label>
      <input id="ef4" type="date" value="${e.recordDate}"/>
      <label style="font-size:0.82rem;color:#6B7280">Publish Date</label>
      <input id="ef5" type="date" value="${e.publishDate}"/>
      <div class="modal-actions">
        <button class="add-btn-lg" onclick="saveEditEpisode('${id}')">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    </div>`);
}

function saveEditEpisode(id) {
  const e = store.episodes.find(x => x.id === id);
  if (!e) return;
  e.number      = parseInt(document.getElementById("ef0").value) || e.number;
  e.title       = document.getElementById("ef1").value;
  e.status      = document.getElementById("ef2").value;
  e.guest       = document.getElementById("ef3").value;
  e.recordDate  = document.getElementById("ef4").value;
  e.publishDate = document.getElementById("ef5").value;
  save("episodes"); closeModal(); renderEpisodes();
}

function deleteEpisode(id) {
  if (!confirm("Delete this episode?")) return;
  store.episodes = store.episodes.filter(x => x.id !== id);
  save("episodes"); renderEpisodes();
}

function renderPodcastKanban() {
  const el = document.getElementById("podcast-kanban");
  if (!el) return;
  const statuses = ["Idea","Planned","Recording Scheduled","Editing","Ready to Publish","Published"];
  const labels   = ["💡 Idea","📝 Planned","🎙️ Recording","✂️ Editing","✅ Ready","🟢 Published"];
  el.innerHTML = statuses.map((s, i) => {
    const eps = store.episodes.filter(e => e.status === s);
    return `<div class="kanban-col">
      <div class="kanban-col-title">${labels[i]}</div>
      ${eps.map(e => `<div class="kanban-card">Ep.${e.number}: ${e.title}</div>`).join("") || '<div style="color:#9CA3AF;font-size:0.8rem">Empty</div>'}
    </div>`;
  }).join("");
}

// =============================================
//  TEAM
// =============================================
function renderTeam() {
  const el = document.getElementById("team-gallery");
  if (!el) return;
  el.innerHTML = store.team.map(m => `
    <div class="team-member-card">
      <div class="member-avatar">${m.emoji}</div>
      <h3>${m.name}</h3>
      <div class="member-role">${m.role}</div>
      <div class="member-status">● ${m.status}</div>
      <div style="margin-top:0.8rem;display:flex;gap:0.5rem;justify-content:center">
        <button class="row-btn edit-btn" onclick="editTeamMember('${m.id}')">✏️</button>
        <button class="row-btn del-btn"  onclick="deleteTeamMember('${m.id}')">🗑️</button>
      </div>
    </div>`).join("");
}

function addTeamMember() {
  const f = getModalFields();
  if (!f[0]) return alert("Name is required.");
  store.team.push({ id: uid(), name: f[0], role: f[1] || "Team Member", emoji: f[2] || "👤", status: f[3] || "Active" });
  save("team"); closeModal(); renderTeam();
}

function editTeamMember(id) {
  const m = store.team.find(x => x.id === id);
  if (!m) return;
  openModalHTML("edit-team", `
    <h2>✏️ Edit Team Member</h2>
    <div class="modal-form">
      <input id="ef0" type="text" value="${m.name}"  placeholder="Name"/>
      <input id="ef1" type="text" value="${m.role}"  placeholder="Role"/>
      <input id="ef2" type="text" value="${m.emoji}" placeholder="Emoji (👤)"/>
      <select id="ef3">
        <option ${m.status==="Active"?"selected":""}>Active</option>
        <option ${m.status==="Inactive"?"selected":""}>Inactive</option>
      </select>
      <div class="modal-actions">
        <button class="add-btn-lg" onclick="saveEditTeam('${id}')">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    </div>`);
}

function saveEditTeam(id) {
  const m = store.team.find(x => x.id === id);
  if (!m) return;
  m.name   = document.getElementById("ef0").value;
  m.role   = document.getElementById("ef1").value;
  m.emoji  = document.getElementById("ef2").value;
  m.status = document.getElementById("ef3").value;
  save("team"); closeModal(); renderTeam();
}

function deleteTeamMember(id) {
  if (!confirm("Remove this team member?")) return;
  store.team = store.team.filter(x => x.id !== id);
  save("team"); renderTeam();
}

// =============================================
//  FINANCE
// =============================================
function renderFinance() {
  const tbody = document.getElementById("finance-table");
  if (!tbody) return;
  const totalExpense = store.finance.filter(f=>f.type==="Expense").reduce((s,f)=>s+Number(f.amount),0);
  const totalIncome  = store.finance.filter(f=>f.type==="Income").reduce((s,f)=>s+Number(f.amount),0);
  const summary = document.getElementById("finance-summary");
  if (summary) summary.innerHTML = `
    <span>💸 Total Expenses: <strong>€${totalExpense}</strong></span>
    <span>💰 Total Income: <strong>€${totalIncome}</strong></span>
    <span>📊 Net: <strong style="color:${totalIncome-totalExpense>=0?'#10B981':'#EF4444'}">€${totalIncome-totalExpense}</strong></span>`;
  tbody.innerHTML = store.finance.map(f => `
    <tr>
      <td><strong>${f.name}</strong></td>
      <td>${statusBadge(f.type)}</td>
      <td>${f.category}</td>
      <td>€${f.amount}</td>
      <td>${statusBadge(f.status)}</td>
      <td>${f.date}</td>
      <td>
        <button class="row-btn edit-btn" onclick="editFinance('${f.id}')">✏️</button>
        <button class="row-btn del-btn"  onclick="deleteFinance('${f.id}')">🗑️</button>
      </td>
    </tr>`).join("");
}

function addFinance() {
  const f = getModalFields();
  if (!f[0]) return alert("Name is required.");
  store.finance.push({ id: uid(), name: f[0], type: f[1] || "Expense", category: f[2] || "Other", amount: parseFloat(f[3]) || 0, status: f[4] || "Planned", date: f[5] || "" });
  save("finance"); closeModal(); renderFinance();
}

function editFinance(id) {
  const f = store.finance.find(x => x.id === id);
  if (!f) return;
  openModalHTML("edit-finance", `
    <h2>✏️ Edit Finance Entry</h2>
    <div class="modal-form">
      <input id="ef0" type="text"   value="${f.name}"     placeholder="Name"/>
      <select id="ef1"><option ${f.type==="Expense"?"selected":""}>Expense</option><option ${f.type==="Income"?"selected":""}>Income</option></select>
      <select id="ef2">${["Equipment","Software","Hosting","Marketing","Salary","Sponsorship","Other"].map(c=>`<option ${f.category===c?"selected":""}>${c}</option>`).join("")}</select>
      <input id="ef3" type="number" value="${f.amount}"   placeholder="Amount (€)"/>
      <select id="ef4">${["Planned","Pending","Paid"].map(s=>`<option ${f.status===s?"selected":""}>${s}</option>`).join("")}</select>
      <input id="ef5" type="text"   value="${f.date}"     placeholder="Date (YYYY-MM)"/>
      <div class="modal-actions">
        <button class="add-btn-lg" onclick="saveEditFinance('${id}')">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    </div>`);
}

function saveEditFinance(id) {
  const f = store.finance.find(x => x.id === id);
  if (!f) return;
  f.name     = document.getElementById("ef0").value;
  f.type     = document.getElementById("ef1").value;
  f.category = document.getElementById("ef2").value;
  f.amount   = parseFloat(document.getElementById("ef3").value) || 0;
  f.status   = document.getElementById("ef4").value;
  f.date     = document.getElementById("ef5").value;
  save("finance"); closeModal(); renderFinance();
}

function deleteFinance(id) {
  if (!confirm("Delete this entry?")) return;
  store.finance = store.finance.filter(x => x.id !== id);
  save("finance"); renderFinance();
}

// =============================================
//  GOALS
// =============================================
function renderGoals() {
  const html = store.goals.map(g => {
    const pct = g.target > 0 ? Math.min(100, Math.round((g.current / g.target) * 100)) : 0;
    return `<div class="goal-item">
      <div class="goal-header">
        <span class="goal-title">${g.goal}</span>
        <span class="goal-meta">${g.type} · ${g.quarter}</span>
        <div style="display:flex;gap:0.4rem;margin-left:auto">
          <button class="row-btn edit-btn" onclick="editGoal('${g.id}')">✏️</button>
          <button class="row-btn del-btn"  onclick="deleteGoal('${g.id}')">🗑️</button>
        </div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="goal-percent">${pct}% — ${g.current} / ${g.target}</div>
    </div>`;
  }).join("");
  ["goals-preview","goals-full"].forEach(id => { const el = document.getElementById(id); if(el) el.innerHTML = html; });
}

function addGoal() {
  const f = getModalFields();
  if (!f[0]) return alert("Goal is required.");
  store.goals.push({ id: uid(), goal: f[0], type: f[1] || "Podcast", quarter: f[2] || "Q2 2026", target: parseInt(f[3]) || 1, current: parseInt(f[4]) || 0 });
  save("goals"); closeModal(); renderGoals();
}

function editGoal(id) {
  const g = store.goals.find(x => x.id === id);
  if (!g) return;
  openModalHTML("edit-goal", `
    <h2>✏️ Edit Goal</h2>
    <div class="modal-form">
      <input id="ef0" type="text"   value="${g.goal}"    placeholder="Goal description"/>
      <select id="ef1">${["Podcast","Marketing","Financial","Team","Content"].map(t=>`<option ${g.type===t?"selected":""}>${t}</option>`).join("")}</select>
      <input id="ef2" type="text"   value="${g.quarter}" placeholder="Quarter (e.g. Q2 2026)"/>
      <input id="ef3" type="number" value="${g.target}"  placeholder="Target"/>
      <input id="ef4" type="number" value="${g.current}" placeholder="Current Progress"/>
      <div class="modal-actions">
        <button class="add-btn-lg" onclick="saveEditGoal('${id}')">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    </div>`);
}

function saveEditGoal(id) {
  const g = store.goals.find(x => x.id === id);
  if (!g) return;
  g.goal    = document.getElementById("ef0").value;
  g.type    = document.getElementById("ef1").value;
  g.quarter = document.getElementById("ef2").value;
  g.target  = parseInt(document.getElementById("ef3").value) || 1;
  g.current = parseInt(document.getElementById("ef4").value) || 0;
  save("goals"); closeModal(); renderGoals();
}

function deleteGoal(id) {
  if (!confirm("Delete this goal?")) return;
  store.goals = store.goals.filter(x => x.id !== id);
  save("goals"); renderGoals();
}

// =============================================
//  DOCUMENTS
// =============================================
function renderDocuments() {
  const el = document.getElementById("doc-grid");
  if (!el) return;
  el.innerHTML = store.documents.map(d => `
    <div class="doc-card">
      <div class="doc-type">${d.type}</div>
      <h4>${d.title}</h4>
      <p>${d.dept}</p>
      <div style="display:flex;gap:0.4rem;margin-top:0.8rem;justify-content:center">
        <button class="row-btn edit-btn" onclick="openDocument('${d.id}')">📄 Open</button>
        <button class="row-btn del-btn"  onclick="deleteDocument('${d.id}')">🗑️</button>
      </div>
    </div>`).join("");
}

function addDocument() {
  const f = getModalFields();
  if (!f[0]) return alert("Title is required.");
  store.documents.push({ id: uid(), title: f[0], type: f[1] || "SOP", dept: f[2] || "", content: "" });
  save("documents"); closeModal(); renderDocuments();
}

function openDocument(id) {
  const d = store.documents.find(x => x.id === id);
  if (!d) return;
  openModalHTML("open-doc", `
    <h2>📄 ${d.title}</h2>
    <div class="modal-form">
      <input id="ef0" type="text" value="${d.title}" placeholder="Document Title"/>
      <select id="ef1">${["SOP","Guide","Policy","Template","Other"].map(t=>`<option ${d.type===t?"selected":""}>${t}</option>`).join("")}</select>
      <input id="ef2" type="text" value="${d.dept}" placeholder="Department"/>
      <textarea id="ef3" rows="10" placeholder="Document content — type here...">${d.content || ""}</textarea>
      <div class="modal-actions">
        <button class="add-btn-lg" onclick="saveDocument('${id}')">💾 Save</button>
        <button class="btn-cancel" onclick="closeModal()">Close</button>
      </div>
    </div>`);
}

function saveDocument(id) {
  const d = store.documents.find(x => x.id === id);
  if (!d) return;
  d.title   = document.getElementById("ef0").value;
  d.type    = document.getElementById("ef1").value;
  d.dept    = document.getElementById("ef2").value;
  d.content = document.getElementById("ef3").value;
  save("documents"); closeModal(); renderDocuments();
}

function deleteDocument(id) {
  if (!confirm("Delete this document?")) return;
  store.documents = store.documents.filter(x => x.id !== id);
  save("documents"); renderDocuments();
}

// =============================================
//  CONTACTS
// =============================================
function renderContacts() {
  const el = document.getElementById("contacts-table");
  if (!el) return;
  el.innerHTML = store.contacts.length
    ? store.contacts.map(c => `
        <tr>
          <td><strong>${c.name}</strong></td>
          <td>${statusBadge(c.type)}</td>
          <td>${c.company || "—"}</td>
          <td>${c.email || "—"}</td>
          <td>${statusBadge(c.status)}</td>
          <td>
            <button class="row-btn edit-btn" onclick="editContact('${c.id}')">✏️</button>
            <button class="row-btn del-btn"  onclick="deleteContact('${c.id}')">🗑️</button>
          </td>
        </tr>`).join("")
    : '<tr><td colspan="6" style="text-align:center;color:#9CA3AF;padding:2rem">No contacts yet. Add your first contact!</td></tr>';
}

function addContact() {
  const f = getModalFields();
  if (!f[0]) return alert("Name is required.");
  store.contacts.push({ id: uid(), name: f[0], type: f[1] || "Guest", company: f[2] || "", email: f[3] || "", status: f[4] || "New Lead" });
  save("contacts"); closeModal(); renderContacts();
}

function editContact(id) {
  const c = store.contacts.find(x => x.id === id);
  if (!c) return;
  openModalHTML("edit-contact", `
    <h2>✏️ Edit Contact</h2>
    <div class="modal-form">
      <input id="ef0" type="text"  value="${c.name}"    placeholder="Full Name"/>
      <select id="ef1">${["Guest","Sponsor","Partner","Listener","Press"].map(t=>`<option ${c.type===t?"selected":""}>${t}</option>`).join("")}</select>
      <input id="ef2" type="text"  value="${c.company}" placeholder="Company"/>
      <input id="ef3" type="email" value="${c.email}"   placeholder="Email"/>
      <select id="ef4">${["New Lead","Contacted","In Conversation","Confirmed","Closed"].map(s=>`<option ${c.status===s?"selected":""}>${s}</option>`).join("")}</select>
      <div class="modal-actions">
        <button class="add-btn-lg" onclick="saveEditContact('${id}')">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    </div>`);
}

function saveEditContact(id) {
  const c = store.contacts.find(x => x.id === id);
  if (!c) return;
  c.name    = document.getElementById("ef0").value;
  c.type    = document.getElementById("ef1").value;
  c.company = document.getElementById("ef2").value;
  c.email   = document.getElementById("ef3").value;
  c.status  = document.getElementById("ef4").value;
  save("contacts"); closeModal(); renderContacts();
}

function deleteContact(id) {
  if (!confirm("Delete this contact?")) return;
  store.contacts = store.contacts.filter(x => x.id !== id);
  save("contacts"); renderContacts();
}

// =============================================
//  CONTENT CALENDAR
// =============================================
function renderContent() {
  const el = document.getElementById("content-table");
  if (!el) return;
  el.innerHTML = store.content.length
    ? store.content.map(c => `
        <tr>
          <td><strong>${c.title}</strong></td>
          <td>${c.platform}</td>
          <td>${statusBadge(c.status)}</td>
          <td>${c.creator || "—"}</td>
          <td>${c.date || "—"}</td>
          <td>
            <button class="row-btn edit-btn" onclick="editContent('${c.id}')">✏️</button>
            <button class="row-btn del-btn"  onclick="deleteContent('${c.id}')">🗑️</button>
          </td>
        </tr>`).join("")
    : '<tr><td colspan="6" style="text-align:center;color:#9CA3AF;padding:2rem">No content yet. Plan your first post!</td></tr>';
}

function addContent() {
  const f = getModalFields();
  if (!f[0]) return alert("Title is required.");
  store.content.push({ id: uid(), title: f[0], platform: f[1] || "Instagram Post", status: f[2] || "Idea", creator: f[3] || "", date: f[4] || "" });
  save("content"); closeModal(); renderContent();
}

function editContent(id) {
  const c = store.content.find(x => x.id === id);
  if (!c) return;
  openModalHTML("edit-content", `
    <h2>✏️ Edit Content</h2>
    <div class="modal-form">
      <input id="ef0" type="text" value="${c.title}"   placeholder="Content Title"/>
      <select id="ef1">${["Instagram Post","Instagram Reel","TikTok","YouTube Short","Newsletter","Twitter/X"].map(p=>`<option ${c.platform===p?"selected":""}>${p}</option>`).join("")}</select>
      <select id="ef2">${["Idea","Drafting","Scheduled","Published"].map(s=>`<option ${c.status===s?"selected":""}>${s}</option>`).join("")}</select>
      <input id="ef3" type="text" value="${c.creator}" placeholder="Creator"/>
      <input id="ef4" type="date" value="${c.date}"/>
      <div class="modal-actions">
        <button class="add-btn-lg" onclick="saveEditContent('${id}')">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    </div>`);
}

function saveEditContent(id) {
  const c = store.content.find(x => x.id === id);
  if (!c) return;
  c.title    = document.getElementById("ef0").value;
  c.platform = document.getElementById("ef1").value;
  c.status   = document.getElementById("ef2").value;
  c.creator  = document.getElementById("ef3").value;
  c.date     = document.getElementById("ef4").value;
  save("content"); closeModal(); renderContent();
}

function deleteContent(id) {
  if (!confirm("Delete this content?")) return;
  store.content = store.content.filter(x => x.id !== id);
  save("content"); renderContent();
}

// =============================================
//  EQUIPMENT
// =============================================
function renderEquipment() {
  const el = document.getElementById("equipment-table");
  if (!el) return;
  el.innerHTML = store.equipment.length
    ? store.equipment.map(e => `
        <tr>
          <td><strong>${e.name}</strong></td>
          <td>${e.category}</td>
          <td>${e.brand || "—"}</td>
          <td>${e.model || "—"}</td>
          <td>${statusBadge(e.condition)}</td>
          <td>${e.price ? "€" + e.price : "—"}</td>
          <td>
            <button class="row-btn edit-btn" onclick="editEquipment('${e.id}')">✏️</button>
            <button class="row-btn del-btn"  onclick="deleteEquipment('${e.id}')">🗑️</button>
          </td>
        </tr>`).join("")
    : '<tr><td colspan="7" style="text-align:center;color:#9CA3AF;padding:2rem">No equipment logged yet.</td></tr>';
}

function addEquipment() {
  const f = getModalFields();
  if (!f[0]) return alert("Equipment name is required.");
  store.equipment.push({ id: uid(), name: f[0], category: f[1] || "Other", brand: f[2] || "", model: f[3] || "", condition: f[4] || "New", price: parseFloat(f[5]) || 0 });
  save("equipment"); closeModal(); renderEquipment();
}

function editEquipment(id) {
  const e = store.equipment.find(x => x.id === id);
  if (!e) return;
  openModalHTML("edit-equipment", `
    <h2>✏️ Edit Equipment</h2>
    <div class="modal-form">
      <input id="ef0" type="text"   value="${e.name}"      placeholder="Equipment Name"/>
      <select id="ef1">${["Microphone","Headphone","Interface","Computer","Camera","Lighting","Other"].map(c=>`<option ${e.category===c?"selected":""}>${c}</option>`).join("")}</select>
      <input id="ef2" type="text"   value="${e.brand}"     placeholder="Brand"/>
      <input id="ef3" type="text"   value="${e.model}"     placeholder="Model"/>
      <select id="ef4">${["New","Excellent","Good","Fair","Needs Repair"].map(c=>`<option ${e.condition===c?"selected":""}>${c}</option>`).join("")}</select>
      <input id="ef5" type="number" value="${e.price}"     placeholder="Purchase Price (€)"/>
      <div class="modal-actions">
        <button class="add-btn-lg" onclick="saveEditEquipment('${id}')">Save</button>
        <button class="btn-cancel" onclick="closeModal()">Cancel</button>
      </div>
    </div>`);
}

function saveEditEquipment(id) {
  const e = store.equipment.find(x => x.id === id);
  if (!e) return;
  e.name      = document.getElementById("ef0").value;
  e.category  = document.getElementById("ef1").value;
  e.brand     = document.getElementById("ef2").value;
  e.model     = document.getElementById("ef3").value;
  e.condition = document.getElementById("ef4").value;
  e.price     = parseFloat(document.getElementById("ef5").value) || 0;
  save("equipment"); closeModal(); renderEquipment();
}

function deleteEquipment(id) {
  if (!confirm("Delete this equipment?")) return;
  store.equipment = store.equipment.filter(x => x.id !== id);
  save("equipment"); renderEquipment();
}

// =============================================
//  WIKI
// =============================================
function renderWiki() {
  const el = document.getElementById("wiki-tree");
  if (!el) return;
  el.innerHTML = `
    <div class="wiki-section"><h3>🏢 About Filina Studios</h3><div class="wiki-links"><span class="wiki-link">Our Story</span><span class="wiki-link">Mission & Vision</span><span class="wiki-link">Team Bios</span><span class="wiki-link">Brand Guidelines</span></div></div>
    <div class="wiki-section"><h3>🎙️ Podcast Production</h3><div class="wiki-links"><span class="wiki-link">Recording Checklist</span><span class="wiki-link">Editing Workflow</span><span class="wiki-link">Publishing Checklist</span><span class="wiki-link">Episode Planning</span><span class="wiki-link">Guest Management</span><span class="wiki-link">Equipment Handbook</span></div></div>
    <div class="wiki-section"><h3>📣 Marketing & Growth</h3><div class="wiki-links"><span class="wiki-link">Social Media SOP</span><span class="wiki-link">Content Approval</span><span class="wiki-link">Hashtag Library</span><span class="wiki-link">Audience Personas</span></div></div>
    <div class="wiki-section"><h3>💰 Finance & Admin</h3><div class="wiki-links"><span class="wiki-link">Expense Reporting</span><span class="wiki-link">Invoicing Process</span><span class="wiki-link">Budget Overview</span><span class="wiki-link">Tax & Legal Notes</span></div></div>
    <div class="wiki-section"><h3>👥 HR & Team</h3><div class="wiki-links"><span class="wiki-link">Onboarding Checklist</span><span class="wiki-link">Team Policies</span><span class="wiki-link">Communication Guidelines</span><span class="wiki-link">Meeting Cadence</span></div></div>
    <div class="wiki-section"><h3>🔧 IT & Tools</h3><div class="wiki-links"><span class="wiki-link">Tools We Use</span><span class="wiki-link">Password Policy</span><span class="wiki-link">Data Backup Policy</span><span class="wiki-link">Access & Permissions</span></div></div>`;
}

// =============================================
//  DASHBOARD
// =============================================
function renderDashboard() {
  const totalProjects  = store.projects.length;
  const doneProjects   = store.projects.filter(p => p.status === "Completed").length;
  const totalEpisodes  = store.episodes.length;
  const pubEpisodes    = store.episodes.filter(e => e.status === "Published").length;
  const totalExpenses  = store.finance.filter(f => f.type === "Expense").reduce((s,f) => s + Number(f.amount), 0);
  const pendingTasks   = store.tasks.filter(t => t.status !== "Done").length;

  const stats = [
    { label: "Active Projects",  value: store.projects.filter(p=>p.status==="In Progress").length, icon: "📋" },
    { label: "Episodes",         value: totalEpisodes,   icon: "🎙️" },
    { label: "Published",        value: pubEpisodes,     icon: "🟢" },
    { label: "Open Tasks",       value: pendingTasks,    icon: "✅" },
    { label: "Total Expenses",   value: "€" + totalExpenses, icon: "💰" },
    { label: "Team Members",     value: store.team.length, icon: "👥" },
  ];

  const el = document.getElementById("dashboard-stats");
  if (el) el.innerHTML = stats.map(s => `
    <div class="dash-stat-card">
      <div class="dash-stat-icon">${s.icon}</div>
      <div class="dash-stat-value">${s.value}</div>
      <div class="dash-stat-label">${s.label}</div>
    </div>`).join("");
}

// =============================================
//  MODAL HELPERS
// =============================================
function openModal(type) {
  const templates = {
    project:   `<h2>📋 New Project</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Project Name"/><select id="mf1"><option>Not Started</option><option>In Progress</option><option>Completed</option></select><select id="mf2"><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select><input id="mf3" type="text" placeholder="Owner"/><input id="mf4" type="date"/><input id="mf5" type="text" placeholder="Tags"/><div class="modal-actions"><button class="add-btn-lg" onclick="addProject()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
    task:      `<h2>✅ New Task</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Task Name"/><select id="mf1"><option>To Do</option><option>In Progress</option><option>Done</option></select><select id="mf2"><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select><input id="mf3" type="text" placeholder="Owner"/><input id="mf4" type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="addTask()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
    episode:   `<h2>🎙️ New Episode</h2><div class="modal-form"><input id="mf0" type="number" placeholder="Episode Number"/><input id="mf1" type="text" placeholder="Episode Title"/><select id="mf2"><option>Idea</option><option>Planned</option><option>Recording Scheduled</option><option>Editing</option><option>Ready to Publish</option></select><input id="mf3" type="text" placeholder="Guest (optional)"/><label style="font-size:0.82rem;color:#6B7280">Recording Date</label><input id="mf4" type="date"/><label style="font-size:0.82rem;color:#6B7280">Publish Date</label><input id="mf5" type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="addEpisode()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
    finance:   `<h2>💰 New Finance Entry</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Name"/><select id="mf1"><option>Expense</option><option>Income</option></select><select id="mf2"><option>Equipment</option><option>Software</option><option>Hosting</option><option>Marketing</option><option>Salary</option><option>Sponsorship</option></select><input id="mf3" type="number" placeholder="Amount (€)"/><select id="mf4"><option>Planned</option><option>Pending</option><option>Paid</option></select><input id="mf5" type="text" placeholder="Date (YYYY-MM)"/><div class="modal-actions"><button class="add-btn-lg" onclick="addFinance()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
    goal:      `<h2>🎯 New Goal</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Goal description"/><select id="mf1"><option>Podcast</option><option>Marketing</option><option>Financial</option><option>Team</option><option>Content</option></select><input id="mf2" type="text" placeholder="Quarter (e.g. Q2 2026)" value="Q2 2026"/><input id="mf3" type="number" placeholder="Target"/><input id="mf4" type="number" placeholder="Current Progress" value="0"/><div class="modal-actions"><button class="add-btn-lg" onclick="addGoal()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
    contact:   `<h2>🤝 New Contact</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Full Name"/><select id="mf1"><option>Guest</option><option>Sponsor</option><option>Partner</option><option>Listener</option><option>Press</option></select><input id="mf2" type="text" placeholder="Company"/><input id="mf3" type="email" placeholder="Email"/><select id="mf4"><option>New Lead</option><option>Contacted</option><option>In Conversation</option><option>Confirmed</option><option>Closed</option></select><div class="modal-actions"><button class="add-btn-lg" onclick="addContact()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
    content:   `<h2>📣 New Content</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Content Title"/><select id="mf1"><option>Instagram Post</option><option>Instagram Reel</option><option>TikTok</option><option>YouTube Short</option><option>Newsletter</option><option>Twitter/X</option></select><select id="mf2"><option>Idea</option><option>Drafting</option><option>Scheduled</option><option>Published</option></select><input id="mf3" type="text" placeholder="Creator"/><input id="mf4" type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="addContent()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
    equipment: `<h2>🛠️ New Equipment</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Equipment Name"/><select id="mf1"><option>Microphone</option><option>Headphone</option><option>Interface</option><option>Computer</option><option>Camera</option><option>Lighting</option><option>Other</option></select><input id="mf2" type="text" placeholder="Brand"/><input id="mf3" type="text" placeholder="Model"/><select id="mf4"><option>New</option><option>Excellent</option><option>Good</option><option>Fair</option></select><input id="mf5" type="number" placeholder="Purchase Price (€)"/><div class="modal-actions"><button class="add-btn-lg" onclick="addEquipment()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
    document:  `<h2>📄 New Document</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Document Title"/><select id="mf1"><option>SOP</option><option>Guide</option><option>Policy</option><option>Template</option><option>Other</option></select><input id="mf2" type="text" placeholder="Department"/><div class="modal-actions"><button class="add-btn-lg" onclick="addDocument()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
    team:      `<h2>👥 New Team Member</h2><div class="modal-form"><input id="mf0" type="text" placeholder="Full Name"/><input id="mf1" type="text" placeholder="Role"/><input id="mf2" type="text" placeholder="Emoji (e.g. 👩)" value="👤"/><select id="mf3"><option>Active</option><option>Inactive</option></select><div class="modal-actions"><button class="add-btn-lg" onclick="addTeamMember()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
  };
  document.getElementById("modal-content").innerHTML = templates[type] || "";
  document.getElementById("modal").classList.remove("hidden");
}

function openModalHTML(type, html) {
  document.getElementById("modal-content").innerHTML = html;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() { document.getElementById("modal").classList.add("hidden"); }
function closeModalOutside(e) { if (e.target.id === "modal") closeModal(); }

function getModalFields() {
  const fields = [];
  let i = 0;
  while (true) {
    const el = document.getElementById("mf" + i);
    if (!el) break;
    fields.push(el.value.trim());
    i++;
  }
  return fields;
}

// =============================================
//  NOTES & IDEAS
// =============================================
function saveNotes() { localStorage.setItem("fs_notes", document.getElementById("personal-notes").value); }
function loadNotes() {
  const el = document.getElementById("personal-notes");
  if (el) el.value = localStorage.getItem("fs_notes") || "";
}

function addIdea() {
  const input = document.getElementById("idea-input");
  if (!input || !input.value.trim()) return;
  store.ideas.push({ id: uid(), text: input.value.trim(), date: new Date().toLocaleDateString() });
  localStorage.setItem("fs_ideas", JSON.stringify(store.ideas));
  input.value = "";
  renderIdeas();
}

function removeIdea(id) {
  store.ideas = store.ideas.filter(x => x.id !== id);
  localStorage.setItem("fs_ideas", JSON.stringify(store.ideas));
  renderIdeas();
}

function renderIdeas() {
  const el = document.getElementById("ideas-list");
  if (!el) return;
  el.innerHTML = store.ideas.map(idea =>
    `<li><span>${typeof idea === "string" ? idea : idea.text}</span><span style="font-size:0.75rem;color:#9CA3AF;margin:0 0.5rem">${idea.date || ""}</span><button class="del-idea" onclick="removeIdea('${idea.id || idea}')">✕</button></li>`
  ).join("");
}

function loadIdeas() { renderIdeas(); }
