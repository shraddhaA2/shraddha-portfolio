document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. THEME TOGGLE (Dark / Light Mode)
    ========================================================= */
    const body = document.body;
    const themeBtn = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light-mode");
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            const isLight = body.classList.contains("light-mode");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            themeBtn.innerHTML = isLight
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
        });
    }

    /* =========================================================
       2. MOBILE MENU
    ========================================================= */
    const mobileBtn = document.querySelector(".mobile-nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("show");
            mobileBtn.setAttribute("aria-expanded", isOpen);
            mobileBtn.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Close on navigation link click
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                mobileBtn.setAttribute("aria-expanded", "false");
                mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    /* =========================================================
       3. TYPEWRITER EFFECT (Student-Friendly Roles)
    ========================================================= */
    const typingElement = document.querySelector(".hero-dynamic-role");
    const roles = [
        "Computer Science Student",
        "Full Stack Developer",
        "AI Application Builder",
        "Problem Solver"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeWriter() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (!deleting) {
            typingElement.textContent = currentRole.substring(0, charIndex++);
            if (charIndex > currentRole.length) {
                deleting = true;
                setTimeout(typeWriter, 1600);
                return;
            }
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex--);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(typeWriter, deleting ? 40 : 80);
    }

    typeWriter();

    /* =========================================================
       4. GITHUB API REPOSITORY FETCHING & CLIENT-SIDE FILTER
    ========================================================= */
    const projectsContainer = document.getElementById("projects-container");
    const projectCount = document.getElementById("project-count");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const githubUsername = "shraddhaA2";

    let fetchedProjects = [];

    // Helper: Map language to dot colors
    function getLanguageColor(lang) {
        const colors = {
            JavaScript: "#f7df1e",
            Python: "#3572A5",
            HTML: "#e34c26",
            CSS: "#563d7c",
            Java: "#b07219",
            C: "#555555"
        };
        return colors[lang] || "#6366f1";
    }

    function renderProjects(projectsToRender) {
        if (!projectsContainer) return;

        if (projectsToRender.length === 0) {
            projectsContainer.innerHTML = `
                <div class="dev-project-card" style="grid-column: 1 / -1; text-align: center;">
                    <p class="font-mono text-muted">No repositories found in this category.</p>
                </div>
            `;
            return;
        }

        projectsContainer.innerHTML = projectsToRender.map(repo => {
            const description = repo.description || "A software development project created by Shraddha Ashoka.";
            const language = repo.language || "Software";
            const langColor = getLanguageColor(language);

            const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric"
            });

            const formattedName = repo.name
                .replaceAll("-", " ")
                .replaceAll("_", " ")
                .replace(/\b\w/g, letter => letter.toUpperCase());

            return `
                <article class="dev-project-card" data-language="${(repo.language || 'other').toLowerCase()}">
                    <div>
                        <div class="card-top">
                            <i class="fa-regular fa-folder-closed folder-icon"></i>
                            <div class="card-links">
                                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="card-link" aria-label="GitHub Repository">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                                ${repo.homepage ? `
                                    <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="card-link" aria-label="Live Demo">
                                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                    </a>
                                ` : ''}
                            </div>
                        </div>

                        <h3 class="project-title">${formattedName}</h3>
                        <p class="project-desc">${description}</p>
                    </div>

                    <div class="card-footer font-mono">
                        <div class="footer-lang">
                            <span class="lang-circle" style="background-color: ${langColor}"></span>
                            <span>${language}</span>
                        </div>
                        <div class="footer-stats">
                            ${repo.stargazers_count > 0 ? `<span><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>` : ''}
                            <span>${updatedDate}</span>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    async function loadGitHubProjects() {
        if (!projectsContainer) return;

        try {
            const response = await fetch(
                `https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc&per_page=100`
            );

            if (!response.ok) throw new Error("Unable to fetch GitHub repositories.");

            const repositories = await response.json();

            // Filter out forks
            fetchedProjects = repositories.filter(repo => !repo.fork);

            // Update Repository counter
            if (projectCount) {
                projectCount.textContent = fetchedProjects.length + "+";
            }

            renderProjects(fetchedProjects);

        } catch (error) {
            console.error("GitHub API Error:", error);
            projectsContainer.innerHTML = `
                <div class="dev-project-card" style="grid-column: 1 / -1; text-align: center;">
                    <i class="fa-solid fa-triangle-exclamation folder-icon" style="color: #ef4444; margin-bottom: 8px;"></i>
                    <h3 class="project-title">Projects unavailable</h3>
                    <p class="project-desc">GitHub projects could not be loaded at the moment.</p>
                    <a href="https://github.com/${githubUsername}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary font-mono" style="margin-top: 12px; display: inline-flex;">
                        View GitHub Directly &rarr;
                    </a>
                </div>
            `;
        }
    }

    // Attach Frontend Filter Triggers
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            if (filter === "all") {
                renderProjects(fetchedProjects);
            } else {
                const filtered = fetchedProjects.filter(p => {
                    const lang = (p.language || "").toLowerCase();
                    if (filter === "other") return !["javascript", "python", "html", "css"].includes(lang);
                    return lang.includes(filter);
                });
                renderProjects(filtered);
            }
        });
    });

    loadGitHubProjects();

    /* =========================================================
       5. SCROLL PROGRESS & NAVBAR SHRINK EFFECT
    ========================================================= */
    const navbar = document.querySelector(".navbar");
    const scrollProgress = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {
        // Scroll progress computation
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + "%";

        // Navbar blur intensification
        if (navbar) {
            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });

    /* =========================================================
       6. ACTIVE SECTION INTERSECTION OBSERVER
    ========================================================= */
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-link");

    const observerOptions = {
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navItems.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    /* =========================================================
       7. FOOTER YEAR
    ========================================================= */
    const footerCopy = document.querySelector(".footer-copy");
    if (footerCopy) {
        footerCopy.innerHTML = `© ${new Date().getFullYear()} Shraddha Ashoka. All Rights Reserved.`;
    }
});
