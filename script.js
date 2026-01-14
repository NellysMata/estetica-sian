window.addEventListener('scroll', function() {
    var scrollBtn = document.getElementById('scrollTopBtn');
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});
// Lógica del Banner de Cookies
document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    // Comprobamos si ya aceptó las cookies antes
    if (!localStorage.getItem('cookiesAccepted')) {
        // Si NO las aceptó, mostramos el banner tras un pequeño retraso
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    acceptBtn.addEventListener('click', function() {
        // Guardamos en el navegador que ya aceptó
        localStorage.setItem('cookiesAccepted', 'true');
        // Ocultamos el banner
        cookieBanner.classList.remove('show');
    });
});
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    // Cambia el icono de barras a una X
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// Cerrar el menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileMenu.querySelector('i').classList.add('fa-bars');
        mobileMenu.querySelector('i').classList.remove('fa-xmark');
    });
});