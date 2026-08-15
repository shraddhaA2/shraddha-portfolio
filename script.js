document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const body =
        document.body;

    const themeBtn =
        document.getElementById("theme-toggle");


    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "light") {

        body.classList.add("light-mode");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }


    themeBtn.addEventListener("click", () => {

        body.classList.toggle("light-mode");


        if (
            body.classList.contains("light-mode")
        ) {

            localStorage.setItem(
                "theme",
                "light"
            );


            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem(
                "theme",
                "dark"
            );


            themeBtn.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    });


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuBtn =
        document.querySelector(
            ".mobile-nav-toggle"
        );


    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "show"
            );


            if (
                navLinks.classList.contains(
                    "show"
                )
            ) {

                menuBtn.innerHTML =
                    '<i class="fa-solid fa-xmark"></i>';

            } else {

                menuBtn.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            }

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
    ===================================================== */

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "show"
                    );


                    menuBtn.innerHTML =
                        '<i class="fa-solid fa-bars"></i>';

                }
            );

        });


    /* =====================================================
       TYPEWRITER EFFECT
    ===================================================== */

    const typingElement =
        document.querySelector(
            ".hero h2"
        );


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
                    charIndex
                );


            charIndex++;


            if (
                charIndex >
                currentRole.length
            ) {

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
                    charIndex
                );


            charIndex--;


            if (charIndex < 0) {

                charIndex = 0;

                deleting = false;


                roleIndex =
                    (
                        roleIndex + 1
                    ) %
                    roles.length;

            }

        }


        setTimeout(

            typeWriter,

            deleting
                ? 50
                : 100

        );

    }


    typeWriter();


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(
            ".navbar"
        );


    function updateNavbar() {

        if (
            window.scrollY > 40
        ) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar
    );


    updateNavbar();


    /* =====================================================
       GITHUB PROJECTS
    ===================================================== */

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


    /*
        Repositories you DON'T want
        displayed on your portfolio.
    */

    const excludedRepositories = [

        "shraddha-portfolio",

        "shraddhaA2"

    ];


    async function loadGitHubProjects() {

        if (!projectsContainer) return;


        try {


            const response =
                await fetch(

                    `https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc&per_page=100`

                );


            if (!response.ok) {

                throw new Error(
                    "GitHub API request failed"
                );

            }


            const repositories =
                await response.json();


            /*
                Only public repositories,
                no forks,
                excluding portfolio itself.
            */

            const projects =
                repositories

                    .filter(repo => {

                        return (

                            !repo.fork &&

                            !excludedRepositories.includes(
                                repo.name
                            )

                        );

                    });


            /*
                Update project count.
            */

            if (projectCount) {

                projectCount.textContent =
                    `${projects.length}+`;

            }


            /*
                No projects.
            */

            if (
                projects.length === 0
            ) {

                projectsContainer.innerHTML = `

                    <div class="projects-empty">

                        <i class="fa-solid fa-folder-open"></i>

                        <p>
                            No public projects found.
                        </p>

                    </div>

                `;

                return;

            }


            /*
                Generate project cards.
            */

            projectsContainer.innerHTML =
                projects
                    .map(repo => {


                        const language =
                            repo.language ||
                            "Multiple Technologies";


                        const description =
                            repo.description ||
                            "Software development project by Shraddha Ashoka.";


                        const updatedDate =
                            new Date(
                                repo.updated_at
                            ).toLocaleDateString(
                                "en-IN",
                                {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                }
                            );


                        const projectName =
                            repo.name
                                .replace(
                                    /[-_]/g,
                                    " "
                                )
                                .replace(
                                    /\b\w/g,
                                    letter =>
                                        letter.toUpperCase()
                                );


                        return `

                            <div
                                class="glass-card project-card reveal"
                            >


                                <div class="project-top">


                                    <i
                                        class="fa-solid fa-code project-icon"
                                    ></i>


                                    <a
                                        href="${repo.html_url}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="project-external"
                                        aria-label="Open GitHub repository"
                                    >

                                        <i
                                            class="fa-solid fa-arrow-up-right-from-square"
                                        ></i>

                                    </a>


                                </div>


                                <h3>
                                    ${projectName}
                                </h3>


                                <p>
                                    ${description}
                                </p>


                                <div class="project-tags">


                                    <span>
                                        ${language}
                                    </span>


                                    <span>
                                        GitHub
                                    </span>


                                </div>


                                <div class="project-meta">


                                    <span>

                                        <i
                                            class="fa-regular fa-star"
                                        ></i>

                                        ${repo.stargazers_count}

                                    </span>


                                    <span>

                                        Updated
                                        ${updatedDate}

                                    </span>


                                </div>


                                <a
                                    href="${repo.html_url}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="project-link"
                                >

                                    View GitHub

                                    <i
                                        class="fa-solid fa-arrow-right"
                                    ></i>

                                </a>


                            </div>

                        `;

                    })
                    .join("");


            /*
                Add reveal animation to
                dynamically generated cards.
            */

            initializeReveal();


        }
        catch (error) {


            console.error(
                "GitHub Projects Error:",
                error
            );


            projectsContainer.innerHTML = `

                <div class="projects-error">

                    <i
                        class="fa-solid fa-triangle-exclamation"
                    ></i>

                    <p>
                        Unable to load GitHub projects.
                    </p>

                    <a
                        href="https://github.com/shraddhaA2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View GitHub Profile
                    </a>

                </div>

            `;

        }

    }


    loadGitHubProjects();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    function initializeReveal() {


        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            !("IntersectionObserver" in window)
        ) {

            revealElements.forEach(
                element => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

            return;

        }


        const observer =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.15
                }

            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }


    initializeReveal();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section"
        );


    const links =
        document.querySelectorAll(
            ".nav-links a"
        );


    function updateActiveNavigation() {


        let current = "";


        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 180;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        links.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const footer =
        document.querySelector(
            "footer p"
        );


    if (footer) {

        footer.innerHTML =
            `© ${new Date().getFullYear()} Shraddha Ashoka. All Rights Reserved.`;

    }


});
