// ===================================
// Dashboard JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // Sidebar toggle
    const sidebar = document.querySelector('.dashboard-sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    overlay.addEventListener('click', closeSidebar);

    // Close sidebar on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeSidebar();
        }
    });

    // ===================================
    // Dark Mode
    // ===================================

    const themeToggle = document.getElementById('theme-toggle');

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {

            document.body.classList.toggle('dark-mode');

            const isDark = document.body.classList.contains('dark-mode');

            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            updateThemeIcon(isDark);

        });
    }

    function updateThemeIcon(isDark) {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');

        if (!icon) return;

        icon.className = isDark
            ? 'fa-solid fa-sun'
            : 'fa-solid fa-moon';

    }

    // ===================================
    // RTL Mode
    // ===================================

    const rtlToggle = document.getElementById('rtl-toggle');

    const savedDirection = localStorage.getItem('direction');

    if (savedDirection === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {

            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

            if (isRTL) {
                document.documentElement.setAttribute('dir', 'ltr');
                localStorage.setItem('direction', 'ltr');
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
                localStorage.setItem('direction', 'rtl');
            }

        });
    }

    // ===================================
    // Active Navigation
    // ===================================

    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

});





/****logout********/

/* ===================================
   Logout Modal
=================================== */

const logoutBtn = document.getElementById("logoutBtn");
const logoutModal = document.getElementById("logoutModal");
const confirmLogout = document.getElementById("confirmLogout");
const cancelLogout = document.getElementById("cancelLogout");

if (logoutBtn && logoutModal) {

    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        logoutModal.classList.add("show");
    });

    cancelLogout.addEventListener("click", function () {
        logoutModal.classList.remove("show");
    });

    logoutModal.addEventListener("click", function (e) {
        if (e.target === logoutModal) {
            logoutModal.classList.remove("show");
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            logoutModal.classList.remove("show");
        }
    });

    confirmLogout.addEventListener("click", function () {
        window.location.href = "login.html";
    });

}