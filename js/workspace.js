const store = {
  projects: [
    { name: "Podcast Launch — Aling Lina", status: "In Progress", priority: "Urgent", owner: "Person 1", due: "2026-06-30", tags: "Podcast" },
    { name: "Equipment Setup", status: "Not Started", priority: "High", owner: "Person 2", due: "2026-04-15", tags: "Podcast" },
    { name: "Podcast Branding & Identity", status: "Not Started", priority: "High", owner: "Person 3", due: "2026-04-30", tags: "Marketing" },
    { name: "Website & Landing Page", status: "Not Started", priority: "Medium", owner: "Person 3", due: "2026-05-15", tags: "Marketing" },
    { name: "Social Media Setup", status: "Not Started", priority: "Medium", owner: "Person 3", due: "2026-04-30", tags: "Marketing" },
    { name: "Launch Campaign", status: "Not Started", priority: "High", owner: "Person 1", due: "2026-06-01", tags: "Marketing" },
  ],
  tasks: [],
  episodes: [
    { number: 1, title: "Episode 1 — TBD", status: "Planned", recordDate: "", publishDate: "", guest: "" },
    { number: 2, title: "Episode 2 — TBD", status: "Idea", recordDate: "", publishDate: "", guest: "" },
    { number: 3, title: "Episode 3 — TBD", status: "Idea", recordDate: "", publishDate: "", guest: "" },
    { number: 4, title: "Episode 4 — TBD", status: "Idea", recordDate: "", publishDate: "", guest: "" },
    { number: 5, title: "Episode 5 — TBD", status: "Idea", recordDate: "", publishDate: "", guest: "" },
  ],
  team: [
    { name: "Person 1", role: "Host", emoji: "👩", status: "Active" },
    { name: "Person 2", role: "Host & Tech Lead", emoji: "🧑", status: "Active" },
    { name: "Person 3", role: "Host & Marketing Lead", emoji: "👩", status: "Active" },
  ],
  finance: [
    { name: "Microphones x3", type: "Expense", category: "Equipment", amount: 180, status: "Planned", date: "2026-04" },
    { name: "Headphones x3", type: "Expense", category: "Equipment", amount: 135, status: "Planned", date: "2026-04" },
    { name: "Pop Filters x3", type: "Expense", category: "Equipment", amount: 30, status: "Planned", date: "2026-04" },
    { name: "Mic Stands x3", type: "Expense", category: "Equipment", amount: 60, status: "Planned", date: "2026-04" },
    { name: "Acoustic Panels", type: "Expense", category: "Equipment", amount: 30, status: "Planned", date: "2026-04" },
    { name: "Podcast Hosting (monthly)", type: "Expense", category: "Hosting", amount: 12, status: "Planned", date: "2026-04" },
  ],
  goals: [
    { goal: "Launch Aling Lina Podcast", type: "Podcast", quarter: "Q2 2026", target: 1, current: 0 },
    { goal: "Publish 5 Episodes", type: "Podcast", quarter: "Q2 2026", target: 5, current: 0 },
    { goal: "Reach 500 Total Downloads", type: "Podcast", quarter: "Q2 2026", target: 500, current: 0 },
    { goal: "Grow to 200 Social Followers", type: "Marketing", quarter: "Q2 2026", target: 200, current: 0 },
    { goal: "Secure 1 Sponsor", type: "Financial", quarter: "Q2 2026", target: 1, current: 0 },
  ],
  documents: [
    { title: "SOP: Recording Day Checklist", type: "SOP", dept: "Podcast Production" },
    { title: "SOP: Editing Workflow", type: "SOP", dept: "Podcast Production" },
    { title: "SOP: Publishing Checklist", type: "SOP", dept: "Podcast Production" },
    { title: "SOP: Social Media Process", type: "SOP", dept: "Marketing" },
    { title: "SOP: Expense Reporting", type: "SOP", dept: "Finance" },
    { title: "Brand Guidelines", type: "Guide", dept: "Marketing" },
    { title: "Tools Master List", type: "Guide", dept: "IT" },
    { title: "Team Onboarding Checklist", type: "SOP", dept: "HR" },
  ],
  ideas: JSON.parse(localStorage.getItem("fs_ideas") || "[]"),
};

let currentUser = null;

if (window.netlifyIdentity) {
  netlifyIdentity.on("init", user => { currentUser = user; if (user) showWorkspace(user); });
  netlifyIdentity.on("login", user => { currentUser = user; netlifyIdentity.close(); showWorkspace(user); });
  netlifyIdentity.on("logout", () => {
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

function showSection(id) {
  document.querySelectorAll(".ws-section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  const sec = document.getElementById("section-" + id);
  if (sec) sec.classList.add("active");
}

function renderAll() {
  renderProjects();
  renderTasks();
  renderEpisodes();
  renderTeam();
  renderFinance();
  renderGoals();
  renderDocuments();
  renderWiki();
  renderPodcastKanban();
  renderProjectPreview();
}

function statusBadge(s) {
  const map = { "In Progress": "progress", "Not Started": "planned", "Completed": "done", "Planned": "planned", "Idea": "idea", "Published": "done", "Urgent": "urgent", "High": "high", "Medium": "medium", "Low": "medium" };
  return `<span class="badge badge-${map[s] || "planned"}">${s}</span>`;
}

function renderProjects() {
  document.getElementById("projects-table").innerHTML = store.projects.map(p =>
    `<tr><td><strong>${p.name}</strong></td><td>${statusBadge(p.status)}</td><td>${statusBadge(p.priority)}</td><td>${p.owner}</td><td>${p.due}</td><td><span class="badge badge-planned">${p.tags}</span></td></tr>`
  ).join("");
}

function renderTasks() {
  const tbody = document.getElementById("tasks-table");
  tbody.innerHTML = store.tasks.length
    ? store.tasks.map(t => `<tr><td>${t.name}</td><td>${statusBadge(t.status)}</td><td>${statusBadge(t.priority)}</td><td>${t.owner}</td><td>${t.due}</td></tr>`).join("")
    : `<tr><td colspan="5" style="text-align:center;color:#9CA3AF;padding:2rem">No tasks yet. Add your first task!</td></tr>`;
}

function renderEpisodes() {
  document.getElementById("episodes-table").innerHTML = store.episodes.map(e =>
    `<tr><td><strong>Ep. ${e.number}</strong></td><td>${e.title}</td><td>${statusBadge(e.status)}</td><td>${e.recordDate || "—"}</td><td>${e.publishDate || "—"}</td><td>${e.guest || "—"}</td></tr>`
  ).join("");
}

function renderTeam() {
  document.getElementById("team-gallery").innerHTML = store.team.map(m =>
    `<div class="team-member-card"><div class="member-avatar">${m.emoji}</div><h3>${m.name}</h3><div class="member-role">${m.role}</div><div class="member-status">● ${m.status}</div></div>`
  ).join("");
}

function renderFinance() {
  document.getElementById("finance-table").innerHTML = store.finance.map(f =>
    `<tr><td><strong>${f.name}</strong></td><td>${statusBadge(f.type)}</td><td>${f.category}</td><td>€${f.amount}</td><td>${statusBadge(f.status)}</td><td>${f.date}</td></tr>`
  ).join("");
}

function renderGoals() {
  const html = store.goals.map(g => {
    const pct = g.target > 0 ? Math.round((g.current / g.target) * 100) : 0;
    return `<div class="goal-item"><div class="goal-header"><span class="goal-title">${g.goal}</span><span class="goal-meta">${g.type} · ${g.quarter}</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div><div class="goal-percent">${pct}% — ${g.current} / ${g.target}</div></div>`;
  }).join("");
  if (document.getElementById("goals-preview")) document.getElementById("goals-preview").innerHTML = html;
  if (document.getElementById("goals-full")) document.getElementById("goals-full").innerHTML = html;
}

function renderDocuments() {
  document.getElementById("doc-grid").innerHTML = store.documents.map(d =>
    `<div class="doc-card"><div class="doc-type">${d.type}</div><h4>${d.title}</h4><p>${d.dept}</p></div>`
  ).join("");
}

function renderWiki() {
  document.getElementById("wiki-tree").innerHTML = `
    <div class="wiki-section"><h3>🏢 About Filina Studios</h3><div class="wiki-links"><span class="wiki-link">Our Story</span><span class="wiki-link">Mission & Vision</span><span class="wiki-link">Team Bios</span><span class="wiki-link">Brand Guidelines</span></div></div>
    <div class="wiki-section"><h3>🎙️ Podcast Production</h3><div class="wiki-links"><span class="wiki-link">Recording Checklist</span><span class="wiki-link">Editing Workflow</span><span class="wiki-link">Publishing Checklist</span><span class="wiki-link">Episode Planning</span><span class="wiki-link">Guest Management</span><span class="wiki-link">Equipment Handbook</span></div></div>
    <div class="wiki-section"><h3>📣 Marketing & Growth</h3><div class="wiki-links"><span class="wiki-link">Social Media SOP</span><span class="wiki-link">Content Approval</span><span class="wiki-link">Hashtag Library</span><span class="wiki-link">Audience Personas</span></div></div>
    <div class="wiki-section"><h3>💰 Finance & Admin</h3><div class="wiki-links"><span class="wiki-link">Expense Reporting</span><span class="wiki-link">Invoicing Process</span><span class="wiki-link">Budget Overview</span><span class="wiki-link">Tax & Legal Notes</span></div></div>
    <div class="wiki-section"><h3>👥 HR & Team</h3><div class="wiki-links"><span class="wiki-link">Onboarding Checklist</span><span class="wiki-link">Team Policies</span><span class="wiki-link">Communication Guidelines</span><span class="wiki-link">Meeting Cadence</span></div></div>
    <div class="wiki-section"><h3>🔧 IT & Tools</h3><div class="wiki-links"><span class="wiki-link">Tools We Use</span><span class="wiki-link">Password Policy</span><span class="wiki-link">Data Backup Policy</span><span class="wiki-link">Access & Permissions</span></div></div>`;
}

function renderPodcastKanban() {
  const statuses = ["Idea", "Planned", "Recording Scheduled", "Editing", "Ready to Publish", "Published"];
  const labels = ["💡 Idea", "📝 Planned", "🎙️ Recording", "✂️ Editing", "✅ Ready", "🟢 Published"];
  document.getElementById("podcast-kanban").innerHTML = statuses.map((s, i) => {
    const eps = store.episodes.filter(e => e.status === s);
    return `<div class="kanban-col"><div class="kanban-col-title">${labels[i]}</div>${eps.map(e => `<div class="kanban-card">Ep.${e.number}: ${e.title}</div>`).join("") || '<div style="color:#9CA3AF;font-size:0.8rem">Empty</div>'}</div>`;
  }).join("");
}

function renderProjectPreview() {
  const active = store.projects.filter(p => p.status === "In Progress").slice(0, 4);
  document.getElementById("project-preview").innerHTML = active.map(p =>
    `<div class="project-item"><span>${p.name}</span>${statusBadge(p.status)}</div>`
  ).join("") || '<div style="color:#9CA3AF;font-size:0.9rem">No active projects yet.</div>';
}

const modals = {
  project: `<h2>📋 New Project</h2><div class="modal-form"><input type="text" placeholder="Project Name"/><select><option>Not Started</option><option>In Progress</option><option>Completed</option></select><select><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select><input type="text" placeholder="Owner"/><input type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="closeModal()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
  task: `<h2>✅ New Task</h2><div class="modal-form"><input type="text" placeholder="Task Name"/><select><option>To Do</option><option>In Progress</option><option>Done</option></select><input type="text" placeholder="Owner"/><input type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="closeModal()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
  episode: `<h2>🎙️ New Episode</h2><div class="modal-form"><input type="number" placeholder="Episode Number"/><input type="text" placeholder="Episode Title"/><select><option>Idea</option><option>Planned</option><option>Recording Scheduled</option><option>Editing</option><option>Ready to Publish</option></select><input type="text" placeholder="Guest Name (optional)"/><label style="font-size:0.85rem;color:#6B7280">Recording Date</label><input type="date"/><label style="font-size:0.85rem;color:#6B7280">Publish Date</label><input type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="closeModal()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
  finance: `<h2>💰 New Finance Entry</h2><div class="modal-form"><input type="text" placeholder="Name"/><select><option>Expense</option><option>Income</option></select><select><option>Equipment</option><option>Software</option><option>Hosting</option><option>Marketing</option><option>Salary</option><option>Sponsorship</option></select><input type="number" placeholder="Amount (€)"/><select><option>Planned</option><option>Pending</option><option>Paid</option></select><input type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="closeModal()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
  contact: `<h2>🤝 New Contact</h2><div class="modal-form"><input type="text" placeholder="Full Name"/><select><option>Guest</option><option>Sponsor</option><option>Partner</option><option>Listener</option></select><input type="text" placeholder="Company"/><input type="email" placeholder="Email"/><select><option>New Lead</option><option>Contacted</option><option>In Conversation</option></select><div class="modal-actions"><button class="add-btn-lg" onclick="closeModal()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
  content: `<h2>📣 New Content</h2><div class="modal-form"><input type="text" placeholder="Content Title"/><select><option>Instagram Post</option><option>Instagram Reel</option><option>TikTok</option><option>YouTube Short</option><option>Newsletter</option></select><select><option>Idea</option><option>Drafting</option><option>Scheduled</option><option>Published</option></select><input type="text" placeholder="Creator"/><input type="date"/><div class="modal-actions"><button class="add-btn-lg" onclick="closeModal()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
  equipment: `<h2>🛠️ New Equipment</h2><div class="modal-form"><input type="text" placeholder="Equipment Name"/><select><option>Microphone</option><option>Headphone</option><option>Interface</option><option>Computer</option><option>Camera</option><option>Lighting</option><option>Other</option></select><input type="text" placeholder="Brand"/><input type="text" placeholder="Model"/><select><option>New</option><option>Excellent</option><option>Good</option><option>Fair</option></select><input type="number" placeholder="Purchase Price (€)"/><div class="modal-actions"><button class="add-btn-lg" onclick="closeModal()">Save</button><button class="btn-cancel" onclick="closeModal()">Cancel</button></div></div>`,
};

function openModal(type) {
  document.getElementById("modal-content").innerHTML = modals[type] || "";
  document.getElementById("modal").classList.remove("hidden");
}
function closeModal() { document.getElementById("modal").classList.add("hidden"); }
function closeModalOutside(e) { if (e.target.id === "modal") closeModal(); }

function saveNotes() { localStorage.setItem("fs_notes", document.getElementById("personal-notes").value); }
function loadNotes() { document.getElementById("personal-notes").value = localStorage.getItem("fs_notes") || ""; }

function addIdea() {
  const input = document.getElementById("idea-input");
  if (!input.value.trim()) return;
  store.ideas.push(input.value.trim());
  localStorage.setItem("fs_ideas", JSON.stringify(store.ideas));
  input.value = "";
  renderIdeas();
}
function removeIdea(i) {
  store.ideas.splice(i, 1);
  localStorage.setItem("fs_ideas", JSON.stringify(store.ideas));
  renderIdeas();
}
function renderIdeas() {
  document.getElementById("ideas-list").innerHTML = store.ideas.map((idea, i) =>
    `<li>${idea}<button class="del-idea" onclick="removeIdea(${i})">✕</button></li>`
  ).join("");
}
function loadIdeas() { renderIdeas(); }

function setGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? "Good morning ☀️" : h < 17 ? "Good afternoon 🌤️" : "Good evening 🌙";
  const el = document.getElementById("greeting-text");
  if (el) el.textContent = g + (currentUser ? ", " + (currentUser.user_metadata?.full_name || "") + "!" : "!");
}

