document.addEventListener("DOMContentLoaded", () => {
    renderFilters();
    renderProjects("Tutti");
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
