document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("navbar-sticky");

    if (headerContainer) {
        // 1. Detect if we are inside the projects subfolder
        const isProjectPage = window.location.pathname.includes('/projects/');

        // 2. Set the correct path to navbar.html
        const navPath = isProjectPage ? '../navbar.html' : 'navbar.html';

        fetch(navPath)
            .then(response => {
                if (!response.ok) throw new Error("Navbar not found at " + navPath);
                return response.text();
            })
            .then(data => {
                headerContainer.innerHTML = data;

                // 3. Logic for Page Highlighting
                const path = window.location.pathname;
                const page = path.split("/").pop() || "index.html";

                const logo = document.querySelector(".logo");
                const navLinks = document.querySelectorAll(".nav-link");

                if (page === "index.html") {
                    logo.classList.add("active-nav");
                } else {
                    logo.classList.add("inactive-logo");
                }

                navLinks.forEach(link => {
                    const linkHref = link.getAttribute("href").split("/").pop();
                    if (linkHref === page) {
                        link.classList.add("active-nav");
                    }
                });

                // 4. Trigger Animations
                setTimeout(() => {
                    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
                }, 100);
            })
            .catch(error => console.error("Header Fetch Error:", error));
    }
});

// Scroll Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));