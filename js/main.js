const episodes = [
  { number: 1, title: "Episode 1 — Coming Soon!", status: "planned", desc: "Our very first episode is in the works. Stay tuned for the premiere of Aling Lina!" },
  { number: 2, title: "Episode 2 — Idea Stage", status: "idea", desc: "Big ideas brewing. This episode is being planned by the team." },
  { number: 3, title: "Episode 3 — Idea Stage", status: "idea", desc: "Something exciting is coming. Watch this space!" },
  { number: 4, title: "Episode 4 — Idea Stage", status: "idea", desc: "Kwento is being crafted. More details soon!" },
  { number: 5, title: "Episode 5 — Idea Stage", status: "idea", desc: "The team is brainstorming big topics for this one." },
];

function renderEpisodes() {
  const grid = document.getElementById("episodes-grid");
  const coming = document.getElementById("coming-soon");
  const published = episodes.filter(e => e.status === "published");
  if (published.length > 0) {
    coming.style.display = "none";
    episodes.forEach(ep => {
      const card = document.createElement("div");
      card.className = "episode-card";
      card.innerHTML = `
        <span class="ep-number">Ep. ${ep.number}</span>
        <span class="ep-status ${ep.status}">${ep.status === "published" ? "✅ Published" : ep.status === "planned" ? "📝 Planned" : "💡 Idea"}</span>
        <h3>${ep.title}</h3>
        <p>${ep.desc}</p>`;
      grid.appendChild(card);
    });
    document.getElementById("ep-count").textContent = published.length;
  } else {
    coming.style.display = "block";
    document.getElementById("ep-count").textContent = "0";
  }
}

function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
    else { el.textContent = Math.floor(start).toLocaleString(); }
  }, 16);
}

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("open");
}

function subscribeNewsletter(e) {
  e.preventDefault();
  document.getElementById("subscribe-msg").style.display = "block";
  e.target.reset();
}

function sendContact(e) {
  e.preventDefault();
  document.getElementById("contact-msg").style.display = "block";
  e.target.reset();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.1 });

const style = document.createElement("style");
style.textContent = ".visible { opacity: 1 !important; transform: translateY(0) !important; }";
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  renderEpisodes();
  animateCounter(document.getElementById("dl-count"), 0);
  document.querySelectorAll(".about-card, .host-card, .platform-card").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });
});
