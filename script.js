document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       THEME TOGGLE
    ========================== */

    const body = document.body;
    const themeBtn = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        body.classList.add("light-mode");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';
    }

    themeBtn.addEventListener("click", () => {

        body.classList.toggle("light-mode");

        if (body.classList.contains("light-mode")) {

            localStorage.setItem("theme", "light");

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem("theme", "dark");

            themeBtn.innerHTML =
                '<i class="fa-solid fa-moon"></i>';
        }

    });


    /* ==========================
       MOBILE MENU
    ========================== */

    const menuBtn =
        document.querySelector(".mobile-nav-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        if (navLinks.classList.contains("show")) {

            menuBtn.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

        } else {

            menuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }

    });


    /* ==========================
       TYPEWRITER EFFECT
    ========================== */

    const typingElement =
        document.querySelector(".hero h2");

    const roles = [
        "Frontend Developer",
        "Full Stack Developer",
        "AI Application Developer",
        "Software Engineer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeWriter() {

        if (!typingElement) return;

        const currentRole =
            roles[roleIndex];

        if (!deleting) {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    charIndex++
                );

            if (charIndex > currentRole.length) {

                deleting = true;

                setTimeout(
                    typeWriter,
                    1000
                );

                return;
            }

        } else {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    charIndex--
                );

            if (charIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) %
                    roles.length;
            }
        }

        setTimeout(
            typeWriter,
            deleting ? 50 : 100
        );
    }

    typeWriter();


    /* ==========================
       GITHUB PROJECTS
    ========================== */

    const projectsContainer =
        document.getElementById(
            "projects-container"
        );

    const projectCount =
        document.getElementById(
            "project-count"
        );

    const githubUsername =
        "shraddhaA2";


    async function loadGitHubProjects() {

        if (!projectsContainer) return;

        try {

            const response = await fetch(
                `https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc&per_page=100`
            );

            if (!response.ok) {
                throw new Error(
                    "Unable to fetch GitHub repositories."
                );
            }

            const repositories =
                await response.json();


            /* Remove forks */

            const projects =
                repositories.filter(
                    repo => !repo.fork
                );


            /* Update project count */

            if (projectCount) {

                projectCount.textContent =
                    projects.length + "+";

            }


            /* No projects */

            if (projects.length === 0) {

                projectsContainer.innerHTML = `
                    <div class="glass-card">
                        <h3>No projects found</h3>
                        <p>
                            GitHub repositories could not be found.
                        </p>
                    </div>
                `;

                return;
            }


            /* Generate project cards */

            projectsContainer.innerHTML =
                projects.map(repo => {

                    const description =
                        repo.description ||
                        "A software development project created by Shraddha Ashoka.";


                    const language =
                        repo.language ||
                        "Software Development";


                    const updatedDate =
                        new Date(
                            repo.updated_at
                        ).toLocaleDateString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                            }
                        );


                    return `

                        <div class="glass-card project-card">

                            <i
                                class="fa-solid fa-code project-icon"
                            ></i>


                            <h3>
                                ${repo.name
                                    .replaceAll("-", " ")
                                    .replaceAll("_", " ")
                                    .replace(/\b\w/g,
                                        letter =>
                                            letter.toUpperCase()
                                    )
                                }
                            </h3>


                            <p>
                                ${description}
                            </p>


                            <div class="project-tags">

                                <span>
                                    ${language}
                                </span>

                                <span>
                                    ⭐ ${repo.stargazers_count}
                                </span>

                                <span>
                                    Updated ${updatedDate}
                                </span>

                            </div>


                            <div class="project-links">

                                <a
                                    href="${repo.html_url}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="project-link"
                                >

                                    GitHub

                                    <i
                                        class="fa-brands fa-github"
                                    ></i>

                                </a>


                                ${
                                    repo.homepage
                                    ?
                                    `
                                    <a
                                        href="${repo.homepage}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="project-link"
                                    >

                                        Live Demo

                                        <i
                                            class="fa-solid fa-arrow-up-right-from-square"
                                        ></i>

                                    </a>
                                    `
                                    :
                                    ""
                                }

                            </div>

                        </div>

                    `;

                }).join("");


        } catch (error) {

            console.error(
                "GitHub API Error:",
                error
            );


            projectsContainer.innerHTML = `

                <div class="glass-card">

                    <i
                        class="fa-solid fa-triangle-exclamation project-icon"
                    ></i>

                    <h3>
                        Projects unavailable
                    </h3>

                    <p>
                        GitHub projects could not be loaded
                        at the moment.
                    </p>

                    <a
                        href="https://github.com/shraddhaA2"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-link"
                    >

                        View GitHub

                        <i
                            class="fa-brands fa-github"
                        ></i>

                    </a>

                </div>

            `;

        }

    }


    loadGitHubProjects();


    /* ==========================
       NAVBAR SCROLL EFFECT
    ========================== */

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            navbar.style.background =
                "rgba(0,0,0,0.75)";

        } else {

            navbar.style.background =
                "var(--card)";
        }

    });


    /* ==========================
       SCROLL REVEAL
    ========================== */

    const revealElements =
        document.querySelectorAll(
            ".glass-card"
        );

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(40px)";

        card.style.transition =
            "all .6s ease";

        observer.observe(card);

    });


    /* ==========================
       ACTIVE NAVIGATION
    ========================== */

    const sections =
        document.querySelectorAll(
            "section"
        );

    const links =
        document.querySelectorAll(
            ".nav-links a"
        );


    window.addEventListener(
        "scroll",
        () => {

            let current = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 150;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );
                }

            });


            links.forEach(link => {

                link.classList.remove(
                    "active"
                );

                if (
                    link.getAttribute(
                        "href"
                    ) === "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );
                }

            });

        }
    );


    /* ==========================
       FOOTER YEAR
    ========================== */

    const footer =
        document.querySelector(
            "footer p"
        );

    if (footer) {

        footer.innerHTML =
            `© ${new Date().getFullYear()} Shraddha Ashoka. All Rights Reserved.`;
    }

});
