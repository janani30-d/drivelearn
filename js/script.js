const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Mobile dropdown toggle
document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        if (window.innerWidth <= 1024) {
            e.preventDefault(); // Prevent page navigation
            this.parentElement.classList.toggle('active');
        }
    });
});

// Close menu only when a normal link is clicked
document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
    link.addEventListener('click', function () {
        if (
            window.innerWidth <= 1024 &&
            !this.parentElement.classList.contains('dropdown')
        ) {
            navbar.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});



/****home1***/

// =====================================
// Hero Slider
// =====================================

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dots .dot');
const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');

let currentSlide = 0;
let autoSlide;

// Show a specific slide
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
}

// Next slide
function nextSlide() {
    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

// Auto slide
function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 5000);
}

// Reset auto slide timer
function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

// Next button
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
}

// Previous button
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetAutoSlide();
    });
});

// Initialize slider
if (slides.length > 0) {
    showSlide(0);
    startAutoSlide();
}

// Pause slider when tab is inactive
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoSlide);
    } else {
        resetAutoSlide();
    }
});


// =====================================
// Achievements Counter Animation
// =====================================

const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const speed = 200;
    const increment = target / speed;

    let count = 0;

    const updateCounter = () => {
        count += increment;

        if (count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    updateCounter();
};

// Run animation only when section is visible
const statsSection = document.querySelector('.achievements');

if (statsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.4
    });

    observer.observe(statsSection);
}


/****home2***/

// ==================== FAQ Accordion ====================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {

        faqItems.forEach(faq => {
            if(faq !== item){
                faq.classList.remove('active');
            }
        });

        item.classList.toggle('active');
    });
});


// ==================== Statistics Counter ====================

document.addEventListener('DOMContentLoaded', () => {

    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.success-stats');

    if (!statsSection || counters.length === 0) return;

    let started = false;

    function startCounters(){

        if(started) return;
        started = true;

        counters.forEach(counter => {

            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const stepTime = 20;
            const increment = target / (duration / stepTime);

            let current = 0;

            const timer = setInterval(() => {

                current += increment;

                if(current >= target){
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                }else{
                    counter.textContent = Math.floor(current).toLocaleString();
                }

            }, stepTime);

        });
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if(entry.isIntersecting){
                startCounters();
            }
        });

    }, {
        threshold:0.3
    });

    observer.observe(statsSection);

});


/***about****/
// ==================== About FAQ Accordion ====================

const aboutFaqItems = document.querySelectorAll('.about-faq-item');

aboutFaqItems.forEach(item => {
    const question = item.querySelector('.about-faq-question');

    question.addEventListener('click', () => {

        aboutFaqItems.forEach(faq => {
            if(faq !== item){
                faq.classList.remove('active');
            }
        });

        item.classList.toggle('active');
    });
});


/***lesson page***/
// ==================== Pass Rate Counter Animation ====================

document.addEventListener('DOMContentLoaded', () => {

    const passSection = document.querySelector('.pass-rate');
    const passCounters = passSection ? passSection.querySelectorAll('.counter') : [];

    if (!passSection || passCounters.length === 0) return;

    let started = false;

    function animateCounter(counter) {

        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const stepTime = 20;
        const increment = target / (duration / stepTime);

        let current = 0;

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }

        }, stepTime);
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !started) {

                started = true;

                passCounters.forEach(counter => {
                    animateCounter(counter);
                });

            }

        });

    }, {
        threshold: 0.3
    });

    observer.observe(passSection);

});

// ==================== Lessons FAQ Accordion ====================

const lessonsFaqItems = document.querySelectorAll('.lessons-faq-item');

lessonsFaqItems.forEach(item => {
    const question = item.querySelector('.lessons-faq-question');

    question.addEventListener('click', () => {

        lessonsFaqItems.forEach(faq => {
            if(faq !== item){
                faq.classList.remove('active');
            }
        });

        item.classList.toggle('active');
    });
});










/*****scrolll-top*********/

// Scroll to Top Button

const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

}








/****darkmode********/
/* ===================================
   Dark Mode + RTL (Works on All Pages)
=================================== */

document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    const themeButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const rtlButtons = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mobile');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcons(true);
    }

    // Load saved direction
    const savedDirection = localStorage.getItem('direction');
    if (savedDirection === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    // Dark mode toggle
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {

            body.classList.toggle('dark-mode');

            const isDark = body.classList.contains('dark-mode');

            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            updateThemeIcons(isDark);

        });
    });

    // RTL toggle
    rtlButtons.forEach(button => {
        button.addEventListener('click', () => {

            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

            if (isRTL) {
                document.documentElement.setAttribute('dir', 'ltr');
                localStorage.setItem('direction', 'ltr');
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
                localStorage.setItem('direction', 'rtl');
            }

        });
    });

    // Update moon/sun icons
    function updateThemeIcons(isDark) {

        themeButtons.forEach(button => {

            const icon = button.querySelector('i');

            if (!icon) return;

            icon.className = isDark
                ? 'fa-solid fa-sun'
                : 'fa-solid fa-moon';

        });

    }

});




