// ========== АНИМАЦИИ ГЛАВНОГО ЭКРАНА ==========

// --- Частицы-искры на hero ---
function initHeroParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const GOLD  = [242, 201, 76];
    const WHITE = [217, 210, 233];

    class Particle {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x    = Math.random() * canvas.width;
            this.y    = init ? Math.random() * canvas.height : canvas.height + 10;
            this.r    = Math.random() * 1.8 + 0.4;
            this.vx   = (Math.random() - 0.5) * 0.4;
            this.vy   = -(Math.random() * 0.6 + 0.25);
            this.life = 0;
            this.maxLife = Math.random() * 180 + 120;
            this.color = Math.random() < 0.6 ? GOLD : WHITE;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy + Math.sin(this.life * 0.04) * 0.2;
            this.life++;
            if (this.life > this.maxLife || this.y < -10) this.reset();
        }
        draw() {
            const progress = this.life / this.maxLife;
            const alpha = progress < 0.15
                ? progress / 0.15
                : progress > 0.75
                    ? 1 - (progress - 0.75) / 0.25
                    : 1;
            const [r, g, b] = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.75})`;
            ctx.fill();

            // мягкое свечение
            const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
            grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.18})`);
            grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
        }
    }

    const particles = Array.from({ length: 55 }, () => new Particle());

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }
    loop();
}

// --- Параллакс hero при скролле ---
function initHeroParallax() {
    const heroImg = document.querySelector('.hero-img');
    if (!heroImg) return;
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroH    = document.querySelector('.hero-image')?.offsetHeight || 500;
        if (scrolled < heroH) {
            heroImg.style.transform = `translateY(${scrolled * 0.18}px)`;
        }
    }, { passive: true });
}

// --- Появление карточек книг и анимация «Хиты» при скролле ---
function initScrollReveal() {
    const titleWrap = document.getElementById('hits-title');
    const cards = document.querySelectorAll('.book-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    // Анимация заголовка «Хиты» — посимвольно
    if (titleWrap) {
        const titleObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const letters = titleWrap.querySelectorAll('.letter');
                    letters.forEach((l, i) => {
                        setTimeout(() => l.classList.add('visible'), i * 120);
                    });
                    setTimeout(() => titleWrap.classList.add('line-visible'), letters.length * 120 + 100);
                    titleObs.unobserve(titleWrap);
                }
            });
        }, { threshold: 0.5 });
        titleObs.observe(titleWrap);
    }

    cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.07}s`;
        observer.observe(card);
    });
}

// ========== МАССИВ ЦИТАТ ==========
const quotes = [
    { text: "Если персонаж нравится читателям — его надо убить. Если очень нравится — убить эффектно.", author: "Джоан Роулинг" },
    { text: "Не забывайте, что жизнь — это не только вопрос магии, но и вопрос пространственных координат. Однажды я пытался переместиться на ореховый пирог, но оказался в Китае. Теперь у меня есть друг, который делает отличные шаолиньские оладьи.", author: "Дамблдор" },
    { text: "Я не ищу неприятности — они просто знают, где я учусь.", author: "Гарри Поттер" },
    { text: "Я убью тебя… но сначала драматическая пауза.", author: "Воландеморт" },
    { text: "Правила существуют, чтобы мы знали, что именно нарушать.", author: "Фред Уизли" },
    { text: "Волшебная палочка выбирает волшебника, а проблемы — Гарри.", author: "Олливандер" },
    { text: "ЛевиОса, а не левиосА… хотя уже поздно.", author: "Гермиона Грейнджер" },
    { text: "Если бы ты знал, сколько я знаю, ты бы тоже молчал.", author: "Альбус Дамблдор" },
    { text: "Я никогда не хотел быть героем. Я хотел спать.", author: "Гарри Поттер" },
    { text: "Хогвартс — самое безопасное место… почти всегда.", author: "Кто угодно, кроме учеников" },
    { text: "Я не герой. Я просто постоянно выживаю.", author: "Гарри Поттер"},
    { text: "Иногда храбрость — это сказать “я не понял”.", author: "Невилл Долгопупс"},
    { text: "Ты волшебник, Гарри… но бухгалтером всё равно станешь.", author: "Рубеус Хагрид"},
    { text: "Я не тёмный лорд. Я просто плохо высыпаюсь.", author: "Воландеморт"},
    { text: "Хогвартс — это дом… где лестницы тебя ненавидят.", author: "Гарри Поттер"},
    { text: "Если что-то шепчет тебе из шкафа — не открывай.", author: "Кто угодно, переживший Хогвартс"}
];

// Функция для генерации случайной цитаты
function generateRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteElement = document.getElementById('random-quote');
    if (quoteElement) {
        quoteElement.innerHTML = `"${randomQuote.text}"<br><strong>- ${randomQuote.author}</strong>`;
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.style.opacity = '1';
            quoteElement.style.transition = 'opacity 0.5s ease';
        }, 100);
    }
}

// Функции для выпадающих меню
function showDropdown(id) {
    const dropdown = document.getElementById(id + '-dropdown');
    if (dropdown) dropdown.classList.add('active');
}

function hideDropdown(id) {
    const dropdown = document.getElementById(id + '-dropdown');
    if (dropdown) dropdown.classList.remove('active');
}

// Закрытие меню при клике вне его
document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Функция для плавного перехода между страницами
function smoothPageTransition(url) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Функция для мобильного меню
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Функция для кнопок "Подробнее" на главной
function initBookDetailsButtons() {
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((card, index) => {
        const detailsBtn = document.createElement('button');
        detailsBtn.textContent = 'Подробнее';
        detailsBtn.className = 'details-btn';
        detailsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const link = card.querySelector('a');
            if (link) {
                smoothPageTransition(link.getAttribute('href'));
            }
        });
        card.style.position = 'relative';
        card.appendChild(detailsBtn);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    generateRandomQuote();
    initHeroParticles();
    initHeroParallax();
    initScrollReveal();
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Плавные переходы для внутренних ссылок
    document.querySelectorAll('a[href]').forEach(link => {
        if (!link.getAttribute('href').startsWith('http') && 
            !link.getAttribute('href').startsWith('#') &&
            !link.getAttribute('href').startsWith('mailto:') &&
            !link.getAttribute('href').startsWith('tel:')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                smoothPageTransition(this.getAttribute('href'));
            });
        }
    });
    
    // Анимация появления страницы
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    }, 100);
    

    
    // Обработчик профиля
    const profileIcon = document.getElementById('profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof db !== 'undefined' && typeof auth !== 'undefined') {
                const currentUser = db.getCurrentUser();
                if (currentUser) {
                    window.location.href = 'profile.html';
                } else {
                    auth.showLoginModal();
                }
            }
        });
    }
    
    // Мобильное меню для фильтров
    const filterToggle = document.getElementById('filter-toggle');
    const filtersContainer = document.getElementById('filters-container');
    if (filterToggle && filtersContainer) {
        filterToggle.addEventListener('click', function() {
            filtersContainer.classList.toggle('active');
        });
    }
});

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const filtersContainer = document.getElementById('filters-container');
        if (filtersContainer) {
            filtersContainer.style.display = '';
        }
    }
});

// Функция показа уведомления
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}
// =============================================
// МОБИЛЬНЫЕ ДРОПДАУНЫ — touch-поддержка
// =============================================

// На touch-устройствах hover не работает — переключаем дропдауны кликом
(function initMobileDropdowns() {
    function isTouchDevice() {
        return window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
    }

    function setupTouchDropdowns() {
        if (!isTouchDevice()) return;

        document.querySelectorAll('.nav-item').forEach(item => {
            const dropdown = item.querySelector('.nav-dropdown');
            if (!dropdown) return;

            // Убираем onmouseover/onmouseout на мобиле
            item.removeAttribute('onmouseover');
            item.removeAttribute('onmouseout');

            item.addEventListener('click', function(e) {
                // Если кликнули на ссылку внутри — пропускаем
                if (e.target.closest('a')) return;

                e.stopPropagation();
                const isOpen = item.classList.contains('open');

                // Закрываем все другие
                document.querySelectorAll('.nav-item.open').forEach(el => {
                    if (el !== item) {
                        el.classList.remove('open');
                        const dd = el.querySelector('.nav-dropdown');
                        if (dd) dd.classList.remove('active');
                    }
                });

                // Переключаем текущий
                item.classList.toggle('open', !isOpen);
                dropdown.classList.toggle('active', !isOpen);
            });
        });

        // Закрываем при клике вне меню
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-item')) {
                document.querySelectorAll('.nav-item.open').forEach(item => {
                    item.classList.remove('open');
                    const dd = item.querySelector('.nav-dropdown');
                    if (dd) dd.classList.remove('active');
                });
            }
        });
    }

    // Запускаем после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupTouchDropdowns);
    } else {
        setupTouchDropdowns();
    }
})();

// =============================================
// ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ при переходе
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    // Закрываем мобильное меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
});

