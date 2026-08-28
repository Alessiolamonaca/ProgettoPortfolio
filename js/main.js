document .addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("projects-grid");

    const cardHtml = projectsData.map((project) => 
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tags">
                ${project.tags.map((tag) => '<span class="tag">${tag}</span>').join("")}
            </div>
        </div>
    ).join("");

    grid.innerHTML = cardsHtml;
});