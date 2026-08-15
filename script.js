document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       ELEMENT REFERENCES
    ========================== */

    const body = document.body;
    const themeBtn = document.getElementById("theme-toggle");
    const menuBtn = document.querySelector(".mobile-nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    const typingElement = document.querySelector(".hero h2");
    const navbar = document.querySelector(".navbar");
    const footer = document.querySelector("footer p");


    /* ==========================
       THEME TOGGLE
    ========================== */

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        body.classList.add("light-mode");

        if (themeBtn) {
            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

            themeBtn.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }

    } else {

        body.classList.remove("light-mode");

        if (themeBtn) {
            themeBtn.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

            themeBtn.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }

    }


    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            body.classList.toggle("light-mode");

            const isLightMode =
                body.classList.contains("light-mode");


            if (isLightMode) {

                localStorage.setItem(
                    "theme",
                    "light"
                );

                themeBtn.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';

                themeBtn.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

            } else {

                localStorage.setItem(
                    "theme",
                    "dark"
                );

                themeBtn.innerHTML =
                    '<i class="fa-solid fa-moon"></i>';

                themeBtn.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

            }

        });

    }


    /* ==========================
       MOBILE MENU
    ========================== */

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("show");


            if (isOpen) {

                menuBtn.innerHTML =
                    '<i class="fa-solid fa-xmark"></i>';

                menuBtn.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "true"
                );

            } else {

                menuBtn.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        /* Close menu after clicking a link */

        const mobileLinks =
            navLinks.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("show");

                menuBtn.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* ==========================
       TYPEWRITER EFFECT
    ========================== */

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

        if (!typingElement) {
            return;
        }


        const currentRole =
            roles[roleIndex];


        if (!deleting) {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    charIndex
                );

            charIndex++;


            if (charIndex > currentRole.length) {

                deleting = true;

                setTimeout(
                    typeWriter,
                    1400
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
                    (roleIndex + 1) %
                    roles.length;

            }

        }


        setTimeout(
            typeWriter,
            deleting ? 55 : 90
        );

    }


    if (typingElement) {
        typeWriter();
    }


    /* ==========================
       NAVBAR SCROLL EFFECT
    ========================== */

    function updateNavbar() {

        if (!navbar) {
            return;
        }


        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar
    );


    updateNavbar();


    /* ==========================
       SCROLL REVEAL
    ========================== */

    const revealElements =
        document.querySelectorAll(
            ".glass-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.15
                }

            );


        revealElements.forEach(card => {

            card.classList.add(
                "reveal"
            );

            observer.observe(card);

        });

    } else {

        revealElements.forEach(card => {

            card.classList.add(
                "visible"
            );

        });

    }


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


    function updateActiveNavigation() {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
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
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* ==========================
       FOOTER YEAR
    ========================== */

    if (footer) {

        footer.innerHTML =
            `© ${new Date().getFullYear()} Shraddha Ashoka. All Rights Reserved.`;

    }

});
