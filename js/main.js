document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderProjects("Tutti");
  renderSkills();
  initScrollReveal();
});

function renderProjects(filterTag) {
  const grid = document.getElementById("projects-grid");

  const filtered =
    filterTag === "Tutti"
      ? projectsData
      : projectsData.filter((project) => project.tags.includes(filterTag));

  grid.innerHTML = filtered
    .map(
      (project) => `
        <div class="project-card">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">
            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
    </div>
    `,
    )
    .join("");
}

function renderFilters() {
  const allTags = [
    "Tutti",
    ...new Set(projectsData.flatMap((project) => project.tags)),
  ];
  const filtersContainer = document.getElementById("filters");

  filtersContainer.innerHTML = allTags
    .map(
      (tag) => `
    <button class="filter-btn" data-tag="${tag}">${tag}</button>
    `,
    )
    .join("");

  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      renderProjects(button.dataset.tag);
    });
  });

  buttons[0].classList.add("active");
}

function renderSkills() {
  const container = document.getElementById("skills-groups");

  container.innerHTML = skillsData
    .map(
      (group) => `
    <div class="skills-group">
      <h3>${group.category}</h3>
      <div class="tags">
        ${group.items.map((item) => `<span class="tag">${item}</span>`).join("")}
      </div>
    </div>
  `,
    )
    .join("");
}

function initScrollReveal() {
  const revealElements=document.querySelectorAll(".reveal");

  const observer =  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach((el) => observer.observe(el));
}
