/**
 * Rene Teh Portfolio - Universal Script
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. NAVBAR INJECTION
    const headerContainer = document.getElementById("navbar-sticky");
    if (headerContainer) {
        fetch("/navbar.html")
            .then(response => {
                if (!response.ok) throw new Error("Navbar not found");
                return response.text();
            })
            .then(data => {
                headerContainer.innerHTML = data;
                highlightCurrentPage();
                initScrollReveal();
            })
            .catch(err => console.error("Navbar error:", err));
    } else {
        initScrollReveal();
    }

    // 2. SMOOTH SCROLLING (LENIS)
    initLenis();

    // 3. START THE AURA FOLLOW (This was missing!)
    initCursorAura();
});

// Function to highlight active nav links
function highlightCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    const logo = document.querySelector(".logo");
    const navLinks = document.querySelectorAll(".nav-link");

    if (logo) {
        if (page === "index.html") {
            logo.classList.add("active-nav");
        } else {
            logo.classList.add("inactive-logo");
        }
    }

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href").split("/").pop();
        if (linkHref === page) link.classList.add("active-nav");
    });
}

// Function for Scroll Reveal
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
}

// Function for Lenis
function initLenis() {
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// Function for Cursor Aura
function initCursorAura() {
    const aura = document.getElementById('cursor-aura');
    if (!aura) return;

// Inside initCursorAura function:

const randomHue = Math.floor(Math.random() * 360);

/* 
   ADJUST THESE THREE NUMBERS TO YOUR LIKING:
   70% = Saturation (Higher is more colorful/vivid)
   60% = Lightness (Lower is darker/richer, higher is paler/brighter)
   0.5 = Opacity (1.0 is solid, 0.1 is nearly invisible)
*/
const randomColor = `hsla(${randomHue}, 70%, 60%, 0.5)`;

aura.style.setProperty('--aura-color', randomColor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        auraX += (mouseX - auraX) * 0.08;
        auraY += (mouseY - auraY) * 0.08;
        aura.style.transform = `translate(${auraX}px, ${auraY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animate);
    }
    animate();
    
}