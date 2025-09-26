// Global JS for All Pages
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const header = document.getElementById("header");

    // =========================
    // Mobile Menu Toggle
    // =========================
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            hamburger.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
        });

        // Close menu on link click
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                hamburger.textContent = "☰";
            });
        });
    }

    // =========================
    // Header Scroll Effect
    // =========================
    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // =========================
    // Smooth Scrolling for Anchors
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    hamburger.textContent = "☰";
                }

                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });

    // =========================
    // Testimonial Slider
    // =========================
    const track = document.querySelector(".testimonials-track");
    const dots = document.querySelectorAll(".slider-dot");
    let currentSlide = 0;

    function goToSlide(slideIndex) {
        if (!track || dots.length === 0) return;

        if (slideIndex < 0) slideIndex = dots.length - 1;
        if (slideIndex >= dots.length) slideIndex = 0;

        track.style.transform = `translateX(-${slideIndex * 100}%)`;

        dots.forEach((dot) => dot.classList.remove("active"));
        dots[slideIndex].classList.add("active");

        currentSlide = slideIndex;
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => goToSlide(index));
        });
    }

    // =========================
    // FAQ Toggle
    // =========================
    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length > 0) {
        faqItems.forEach((item) => {
            const question = item.querySelector(".faq-question");
            if (question) {
                question.addEventListener("click", () => {
                    faqItems.forEach((other) => {
                        if (other !== item) other.classList.remove("active");
                    });
                    item.classList.toggle("active");
                });
            }
        });
    }

    // =========================
    // Contact Form (Contact Page)
    // =========================
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const firstName = document.getElementById("firstName")?.value || "";
            const email = document.getElementById("email")?.value || "";
            const message = document.getElementById("message")?.value || "";

            if (!firstName || !email || !message) {
                alert("Please fill in all required fields.");
                return;
            }

            alert(`Thank you, ${firstName}! Your message has been received. We will contact you at ${email} soon.`);
            contactForm.reset();
        });
    }

    // =========================
    // Contact Form (Home Page)
    // =========================
    const homeContactForm = document.getElementById("contactFormHome");
    if (homeContactForm) {
        homeContactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name")?.value || "";
            const email = document.getElementById("email")?.value || "";
            const message = document.getElementById("message")?.value || "";

            if (!name || !email || !message) {
                alert("Please fill in all required fields.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert(`Thank you, ${name}! Your message has been received. We will contact you at ${email} soon.`);
            homeContactForm.reset();
        });
    }

    // =========================
    // Overlay (Home Page Admission Form)
    // =========================
    const enrollBtn = document.querySelector(".enroll-btn");
    const admissionOverlay = document.getElementById("admissionOverlay");
    const closeOverlay = document.getElementById("closeOverlay");

    if (enrollBtn && admissionOverlay) {
        enrollBtn.addEventListener("click", () => {
            admissionOverlay.style.display = "flex";
        });
    }

    if (closeOverlay && admissionOverlay) {
        closeOverlay.addEventListener("click", () => {
            admissionOverlay.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === admissionOverlay) {
                admissionOverlay.style.display = "none";
            }
        });
    }
});

// =========================
// Handle Resize
// =========================
window.addEventListener("resize", function () {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.getElementById("hamburger");

    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        if (hamburger) hamburger.textContent = "☰";
    }
});
