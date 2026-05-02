document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("navbar-sticky");

    if (headerContainer) {
        // 1. Fetch Navbar from root
        fetch("/navbar.html") 
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;

                // 2. Identify the current page
                // Handles root '/' as 'index.html'
                const path = window.location.pathname;
                const page = path.split("/").pop() || "index.html";
                
                const logo = document.querySelector(".logo");
                const navLinks = document.querySelectorAll(".nav-link");

                // 3. Logo Color Logic
                // Black only on index, gray on everything else
                if (page === "index.html") {
                    logo.classList.add("active-nav");
                    logo.classList.remove("inactive-logo");
                } else {
                    logo.classList.add("inactive-logo");
                    logo.classList.remove("active-nav");
                }

                // 4. Nav Links Color Logic
                navLinks.forEach(link => {
                    // Get the filename from the href (e.g., /work.html -> work.html)
                    const linkHref = link.getAttribute("href").split("/").pop();
                    
                    if (linkHref === page) {
                        link.classList.add("active-nav");
                    } else {
                        link.classList.remove("active-nav");
                    }
                });

                // 5. Trigger Reveal Animations
                setTimeout(() => {
                    document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
                }, 100);
            })
            .catch(error => console.error("Error loading navbar:", error));
    }
});

// Scroll Observer for scrollable pages
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));