/**
 * Bouncyhoops Universal Script
 * Handles Navbar Injection, Page Highlighting, and Scroll Animations
 */

document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("navbar-sticky");

    if (headerContainer) {
        // 1. FETCH NAVBAR
        // Starting with '/' tells the browser to look at the root domain (reneteh.github.io)
        fetch("/navbar.html")
            .then(response => {
                if (!response.ok) throw new Error("Navbar file not found");
                return response.text();
            })
            .then(data => {
                // 2. INJECT NAVBAR HTML
                headerContainer.innerHTML = data;

                // 3. IDENTIFY CURRENT PAGE
                // This logic extracts just the filename (e.g., 'about.html')
                const path = window.location.pathname;
                const page = path.split("/").pop() || "index.html";
                
                const logo = document.querySelector(".logo");
                const navLinks = document.querySelectorAll(".nav-link");

                // 4. LOGO COLOR LOGIC
                // The logo is black only on the index page, gray everywhere else
                if (page === "index.html") {
                    logo.classList.add("active-nav");
                    logo.classList.remove("inactive-logo");
                } else {
                    logo.classList.add("inactive-logo");
                    logo.classList.remove("active-nav");
                }

                // 5. NAV LINKS COLOR LOGIC
                navLinks.forEach(link => {
                    // Extract filename from href (e.g., '/work.html' -> 'work.html')
                    const linkHref = link.getAttribute("href").split("/").pop();
                    
                    if (linkHref === page) {
                        link.classList.add("active-nav");
                    } else {
                        link.classList.remove("active-nav");
                    }
                });

                // 6. TRIGGER REVEAL ANIMATIONS
                // Small timeout to ensure the injected HTML has rendered
                setTimeout(() => {
                    document.querySelectorAll('.reveal').forEach(el => {
                        el.classList.add('active');
                    });
                }, 100);
            })
            .catch(error => {
                console.error("Error loading navigation:", error);
            });
    }
});

/**
 * SCROLL OBSERVER
 * Handles fade-in animations for scrollable pages (Work, Projects)
 */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Initialize observer on all elements with 'reveal' class
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));