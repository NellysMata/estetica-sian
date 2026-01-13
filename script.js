window.addEventListener('scroll', function() {
    var scrollBtn = document.getElementById('scrollTopBtn');
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});