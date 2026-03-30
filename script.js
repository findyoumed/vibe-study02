// [LOG: 20260330_0956] 경량화 버전 상호작용 로직

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initScrollTop();
});

function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stats-grid')) startCounters();
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll, .stats-grid').forEach(el => observer.observe(el));
}

function startCounters() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        if (stat.innerText === '0') animateValue(stat, 0, target, 2000);
    });
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        if (end === 981) {
            obj.innerHTML = ((progress * (end - start) + start) / 100).toFixed(2);
        } else {
            obj.innerHTML = Math.floor(progress * (end - start) + start);
        }
        if (progress < 1) window.requestAnimationFrame(step);
        else obj.innerHTML = (end === 981) ? (end / 100).toFixed(2) : end;
    };
    window.requestAnimationFrame(step);
}

function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });
    }
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) scrollTop.classList.add('show');
        else scrollTop.classList.remove('show');
    });
}
