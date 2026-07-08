const RESUME_PATH = "assets/Resume/Paul_Chukwu_Resume.pdf";
const SPLINE_BACKGROUND_URL = "https://my.spline.design/nexbotrobotcharacterconcept-70JkBTMIfXxu0xHs0dNxYJyH/";

const FALLBACK_PROJECTS = [
  {
    "title": "EcoSorter / eSoTrash",
    "category": "Embedded product",
    "summary": "Smart waste sorting and recycling product concept combining sensing, classification, and servo-controlled routing.",
    "technologies": ["Embedded", "Computer Vision", "Servo Control", "Product Design"],
    "role": "Built and presented the product concept with hardware/software system thinking.",
    "highlights": ["Framed the recycling contamination problem as a working product concept.", "Connected AI-assisted classification to a physical sorting mechanism.", "Used pitch-competition style constraints to keep the prototype practical."],
    "github": "",
    "demo": "ecollector.html",
    "image": "assets/Eco/ProjectEco1.png",
    "featured": true,
    "date": "2023",
    "tags": ["embedded", "ai", "product"]
  },
  {
    "title": "Ultra Drone Detector",
    "category": "AI / computer vision",
    "summary": "CNN-based drone detection project with visual outputs and video demo assets.",
    "technologies": ["Python", "CNN", "Computer Vision", "Model Optimization"],
    "role": "Developed the detection workflow and documented model behavior through demo media.",
    "highlights": ["Built a computer vision pipeline for drone detection.", "Focused on real-time inference tradeoffs and deployment readiness.", "Kept project evidence visible through screenshots and demo video."],
    "github": "",
    "demo": "uddCNN.html",
    "image": "assets/CNN Projects/image.png",
    "featured": true,
    "date": "2025",
    "tags": ["ai"]
  },
  {
    "title": "QNX Airplane Control System",
    "category": "Embedded systems",
    "summary": "Airport control prototype on Raspberry Pi 5 with QNX 8.0, tilt sensing, lights, and C cross-compilation.",
    "technologies": ["QNX", "Raspberry Pi 5", "C", "Tilt Sensor", "Embedded Linux/RTOS"],
    "role": "Worked on control logic, QNX setup, and safe vulnerability research direction during uOttawaHack.",
    "highlights": ["Cross-compiled C code for Raspberry Pi 5 running QNX 8.0.", "Built landing-mode behavior around sensor input and runway light feedback.", "Explored flight-critical OS concepts with a white-hat research mindset."],
    "github": "",
    "demo": "qnxAirplane.html",
    "image": "assets/QNX/project1.png",
    "featured": true,
    "date": "2025",
    "tags": ["embedded", "product"]
  }
];

const EVENTS = [
  {
    date: "2025",
    title: "Ross Video FBGA Challenge",
    where: "Hackathon sponsor challenge",
    note: "Video/display challenge involving vector manipulation and rapid engineering collaboration."
  },
  {
    date: "2025",
    title: "uOttawaHack QNX / NAV CANADA project",
    where: "uOttawaHack",
    note: "Built an airplane-control prototype around QNX 8.0, Raspberry Pi 5, tilt sensing, and runway-light behavior."
  },
  {
    date: "2023",
    title: "Crunch Competition",
    where: "Product pitch competition",
    note: "Presented the EcoSorter / eSoTrash smart recycling concept with hardware and product-system framing."
  }
];

(function initSplineBackground() {
  if (document.querySelector(".spline-background")) return;

  const background = document.createElement("div");
  background.className = "spline-background";
  background.setAttribute("aria-hidden", "true");
  background.innerHTML = `
    <iframe
      src="${SPLINE_BACKGROUND_URL}"
      title="Futuristic robot background"
      frameborder="0"
      width="100%"
      height="100%"
      loading="eager"
      tabindex="-1"
      allow="autoplay; fullscreen; xr-spatial-tracking">
    </iframe>
  `;
  document.body.prepend(background);
})();

(function initCommonUi() {
  const map = {
    "index.html": "home",
    "projects.html": "projects",
    "skills.html": "skills",
    "resume.html": "resume",
    "events.html": "events",
    "videos.html": "videos"
  };
  const path = location.pathname.split("/").pop() || "index.html";
  const current = map[path] || "home";
  document.querySelectorAll(".nav a[data-tab]").forEach((link) => {
    if (link.dataset.tab === current) link.classList.add("active");
  });
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

(function initEvents() {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;
  timeline.innerHTML = EVENTS.map((event) => `
    <article class="event">
      <div class="when">${event.date} | ${event.where}</div>
      <h2>${event.title}</h2>
      <p class="muted">${event.note}</p>
    </article>
  `).join("");
})();

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Project data request failed");
    return await response.json();
  } catch (error) {
    return FALLBACK_PROJECTS;
  }
}

function projectCard(project) {
  const image = project.image
    ? `<img class="project-img" src="${project.image}" alt="${project.title} project visual" loading="lazy" decoding="async">`
    : `<div class="project-visual-fallback" aria-hidden="true">${project.category}</div>`;
  const tech = (project.technologies || []).slice(0, 5).map((item) => `<span class="tag">${item}</span>`).join("");
  const highlights = (project.highlights || []).slice(0, 3).map((item) => `<li>${item}</li>`).join("");
  const demo = project.demo ? `<a class="btn" href="${project.demo}">Details</a>` : "";
  const github = project.github ? `<a class="btn" href="${project.github}" target="_blank" rel="noopener">Code</a>` : "";

  return `
    <article class="card project">
      <div class="media">${image}</div>
      <div class="project-body">
        <div>
          <p class="eyebrow">${project.category || "Project"}${project.date ? ` | ${project.date}` : ""}</p>
          <h2>${project.title}</h2>
          <p class="muted">${project.summary}</p>
        </div>
        <div class="tag-row">${tech}</div>
        <div class="project-detail">
          <strong>Contribution</strong>
          <p>${project.role || "Project contributor."}</p>
        </div>
        <div class="project-detail">
          <strong>Highlights</strong>
          <ul>${highlights}</ul>
        </div>
        <div class="actions">${demo}${github}</div>
      </div>
    </article>
  `;
}

function renderProjectGrid(projects, selector, options = {}) {
  const grid = document.querySelector(selector);
  if (!grid) return;
  const list = options.featuredOnly ? projects.filter((project) => project.featured).slice(0, 8) : projects;
  grid.innerHTML = list.map(projectCard).join("");
}

function initProjectFilters(projects) {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  const buttons = document.querySelectorAll("[data-filter]");

  function render(filter = "all") {
    const filtered = filter === "all"
      ? projects
      : projects.filter((project) => (project.tags || []).includes(filter));
    grid.innerHTML = filtered.map(projectCard).join("");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active-filter"));
      button.classList.add("active-filter");
      render(button.dataset.filter);
    });
  });
  render("all");
}

(async function initProjects() {
  const projects = await loadProjects();
  renderProjectGrid(projects, "#featuredProjectGrid", { featuredOnly: true });
  initProjectFilters(projects);
})();

(function initYouTubeUpdater() {
  const input = document.getElementById("ytInput");
  const frame = document.getElementById("ytFrame");
  const button = document.getElementById("ytUpdate");
  if (!button || !frame) return;

  function parseYouTubeId(value) {
    try {
      if (!value) return null;
      const trimmed = value.trim();
      if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
      const url = new URL(trimmed);
      if (url.hostname.includes("youtu.be")) return url.pathname.slice(1);
      return url.searchParams.get("v");
    } catch (error) {
      return null;
    }
  }

  button.addEventListener("click", () => {
    const id = parseYouTubeId(input.value);
    if (id) frame.src = `https://www.youtube.com/embed/${id}`;
  });
})();
