// Данные товаров
const merchandise = {
    брелки: [
        { id: 1, name: "Поттер и шляпа", price: 299, image: "брелок1.png" },
        { id: 2, name: "Блатной котёл", price: 299, image: "брелок2.png" },
        { id: 3, name: "Монстр Редиска", price: 299, image: "брелок3.png" },
        { id: 4, name: "Деревяшка - злодей", price: 349, image: "брелок4.png" },
        { id: 5, name: "Чудеса зельеварения", price: 299, image: "брелок5.png" },
        { id: 6, name: "Жаба на охоте", price: 349, image: "брелок6.png" },
        { id: 7, name: "Лучший в мире хот-дог", price: 299, image: "брелок7.png" },
        { id: 8, name: "Нелетучая мышь", price: 349, image: "брелок8.png" },
        { id: 9, name: "Микс лучшего ", price: 299, image: "брелок9.png" },
        { id: 10, name: "Летучая мышь что то заподозрила ", price: 299, image: "брелок10.png" },
        { id: 12, name: "Сладкая палочка", price: 299, image: "брелок12.png" }
    ],
    свитшоты: [
        { id: 13, name: "Хогвартс: Пицца и магия", price: 1999, image: "Morkov.png" },
        { id: 15, name: "Хогвартс Экспресс и Найт Басби", price: 1999, image: "ГПсМечемНаГрифоне.png" },
        { id: 16, name: "Зелёный Хагрид", price: 1999, image: "шрекВшляпеЗЕЛЕНЫЙ.png" },
        { id: 18, name: "Экспеллиармус против сосисок", price: 1899, image: "ЭнштейнИморковка.png" },
        { id: 19, name: "Панда-патронус и бабочка храбрости", price: 2199, image: "ЭнштеЙНиБатерфляй.png" },
        { id: 20, name: "Джидай - Гарри и Метла - Ворон", price: 1899, image: "ГПнаОрле.png" },
        { id: 21, name: "Усатый Гарри", price: 1799, image: "ГПфранцуз.png" },
        { id: 22, name: "Хогвартс абсурда", price: 1799, image: "StariKot.png" },
        { id: 23, name: "Большевик со скидкой", price: 1799, image: "ВолшебникСоСкидкой.png" },
        { id: 24, name: "Чудо на метле", price: 1799, image: "Metla.png" },
        { id: 25, name: "Поттер - Повелитесь шоколадных жаб", price: 1799, image: "ГПиШоколаднаяЖаба.png" },
        { id: 28, name: "Большевик 1993", price: 1799, image: "Большевик1993Года.png" }
    ],
    шляпы: [
        { id: 29, name: "Хэлоуинский Хогвартс", price: 2499, image: "shlapa1.png" },
        { id: 30, name: "Почувсвтуй себя под Хогвартсом", price: 1299, image: "shlapa2.png" },
        { id: 31, name: "Братвурст-мания", price: 1299, image: "shlapa3.png" },
        { id: 32, name: "Винггардиум ЛевиорИсса!", price: 1299, image: "shlapa4.png" },
        { id: 33, name: "Поле чудес", price: 2799, image: "shlapa5.png" },
        { id: 34, name: "Адом 2", price: 1599, image: "shlapa6.png" },
        { id: 35, name: "Мимолетный момент", price: 1199, image: "shlapa7.png" }
    ],
    мантии: [
        { id: 36, name: "Весёлая", price: 3499, image: "мантия1.png" },
        { id: 37, name: "Зелёный Философ", price: 3499, image: "мантия2.png" },
        { id: 38, name: "Коррозия", price: 3499, image: "мантия3.png" },
        { id: 39, name: "Балахолка", price: 3499, image: "мантия4.png"},
        { id: 40, name: "Дождливая", price: 4999, image: "мантия5.png" },
        { id: 41, name: "Пуффендуй в печали", price: 2999, image: "мантия6.png" }
    ],
    кружки: [
        { id: 42, name: "Перекус Преподавателя Хогвартса", price: 699, image: "кружка1.png" },
        { id: 43, name: "Истинная правда", price: 699, image: "кружка2.png" },
        { id: 44, name: "Злая Буква", price: 699, image: "кружка3.png" },
        { id: 45, name: "Добрый Грифон", price: 699, image: "кружка4.png" },
        { id: 46, name: "Загадочное предсказание", price: 599, image: "кружка5.png" },
        { id: 47, name: "с маслом", price: 799, image: "кружка6.png" }
    ],
    футболки: [
        { id: 48, name: "Патронус из пасты", price: 1299, image: "ekspektoPasta.jpg" },
        { id: 49, name: "Защита от простуды", price: 1299, image: "Pnevmonia.jpg" },
        { id: 50, name: "Expeliarmus: Проследить меня", price: 999, image: "Ekspeliarmys.jpg" },
        { id: 51, name: "Ультиматум от Поттера", price: 1299, image: "EkspeliarmysOrEat.jpg" },
        { id: 52, name: "Магический натюрморт", price: 1499, image: "LoshkaKortoshka.jpg" },
        { id: 53, name: "Надувная сосиска", price: 1199, image: "PykiSosiska.jpg" },
        { id: 54, name: "Фантазия о Гарри Поттере", price: 1399, image: "Face.jpg" }
    ],
    книги: [
        { id: 64, name: "Гарри Поттер и Всякая Фигня", price: 1499, image: "300px-Potter_i_fignja.jpg" },
        { id: 65, name: "Гарри Поттер меняет профессию", price: 1499, image: "меняетПрофПригодность.png" },
        { id: 66, name: "Тайна священного Гарри Поттера", price: 1499, image: "taina.png" },
        { id: 67, name: "Гарри Поттер, сливая воду", price: 1499, image: "slivaya.jpg" },
        { id: 68, name: "Гарри Поттер и бозон Хиггса", price: 1499, image: "БозонХиггса.jpg" },
        { id: 69, name: "В бой идёт один Гарри Поттер", price: 1499, image: "Вбой.png" },
        { id: 70, name: "Гарри Поттер и там-за-туманами", price: 1499, image: "туманы.jpg" },
        { id: 71, name: "Гарри Поттер и все-все-все", price: 1499, image: "гпивсевсе.jpg" },
        { id: 72, name: "Гарри Поттер Шмякнулся", price: 1499, image: "шмякнулся.png" },
        { id: 73, name: "Гарри Поттер и Шарообразный колобок", price: 1499, image: "300px-Potter_i_fignja.jpg" },
        { id: 74, name: "Гарри Поттер и Бузинная палочка", price: 1499, image: "меняетПрофПригодность.png" },
        { id: 75, name: "Гарри Поттер и Философская Комната", price: 1499, image: "тайна.png" },
        { id: 76, name: "Гарри Поттер и Тайный Азкабан", price: 1499, image: "сливаяВоду.jpg" }
    ]
};

// Карта товар -> страница
const productPages = {
    1: "product-detail1.html",
    2: "product-magical-kettle.html",
    3: "product-monster-radish.html",
    4: "product-evil-stick.html",
    5: "product-potions-wonders.html",
    6: "product-frog-hunting.html",
    7: "product-best-hotdog.html",
    8: "product-non-flying-bat.html",
    9: "product-best-mix.html",
    10: "product-suspicious-bat.html",
    12: "product-sweet-stick.html",
    13: "product-hogwarts-pizza.html",
    15: "product-hogwarts-express.html",
    16: "product-sweatshirt.html",
    18: "product-expelliarmus-sausages.html",
    19: "product-panda-patronus.html",
    20: "product-jedi-harry.html",
    21: "product-mustache-harry.html",
    22: "product-hogwarts-absurd.html",
    23: "product-bolshevik-discount.html",
    24: "product-miracle-broom.html",
    25: "product-chocolate-frogs.html",
    28: "product-bolshevik-1993.html",
    29: "product-halloween-hogwarts-hat.html",
    30: "product-under-hogwarts-hat.html",
    31: "product-bratwurst-hat.html",
    32: "product-wingardium-hat.html",
    33: "product-field-of-miracles-hat.html",
    34: "product-hell-2-hat.html",
    35: "product-fleeting-moment-hat.html",
    36: "product-funny-cloak.html",
    37: "product-green-philosopher-cloak.html",
    38: "product-corrosion-cloak.html",
    39: "product-balaholka-cloak.html",
    40: "product-rainy-cloak.html",
    41: "product-puffenduy-cloak.html",
    42: "product-teacher-snack-mug.html",
    43: "product-true-truth-mug.html",
    44: "product-angry-letter-mug.html",
    45: "product-kind-griffin-mug.html",
    46: "product-mysterious-prediction-mug.html",
    47: "product-with-butter-mug.html",
    48: "product-pasta-patronus-tshirt.html",
    49: "product-cold-protection-tshirt.html",
    50: "product-expelliarmus-trace-tshirt.html",
    51: "product-potter-ultimatum-tshirt.html",
    52: "product-magic-still-life-tshirt.html",
    53: "product-inflatable-sausage-tshirt.html",
    54: "product-harry-fantasy-tshirt.html",
    64: "product-potter-and-nonsense.html",
    65: "product-potter-career-change.html",
    66: "product-sacred-potter-mystery.html",
    67: "product-potter-draining-water.html",
    68: "product-potter-higgs-boson.html",
    69: "product-one-potter-battle.html",
    70: "product-potter-behind-fogs.html",
    71: "product-potter-all-all-all.html",
    72: "product-potter-smashed.html",
    73: "product-spherical-bun.html",
    74: "product-elder-wand.html",
    75: "product-philosophers-room.html",
    76: "product-secret-azkaban.html"
};

// Функция для получения ссылки на страницу товара
function getProductPageLink(item, category) {
    // Только "Поттер и шляпа" (id=1) имеет готовую страницу
    if (item.id === 1) {
        return productPages[1];
    }
    if (item.id === 16) {
        return productPages[16];
    }
    return "product-not-ready.html";
}

// Функция для отображения товаров на витрине
function displayMerchandise(category = 'all') {
    const grid = document.getElementById('merch-grid');
    grid.innerHTML = '';
    
    let items = [];
    
    if (category === 'all') {
        Object.values(merchandise).forEach(categoryItems => {
            items = items.concat(categoryItems);
        });
    } else {
        items = merchandise[category] || [];
    }
    
    items.forEach(item => {
        const merchCard = document.createElement('div');
        merchCard.className = 'merch-card';
        
        let itemCategory = 'all';
        Object.keys(merchandise).forEach(cat => {
            if (merchandise[cat].includes(item)) {
                itemCategory = cat;
            }
        });
        
        const productPageLink = getProductPageLink(item, itemCategory);
        
        merchCard.innerHTML = `
            <div class="merch-image">
                <img src="${item.image}" alt="${item.name}" class="merch-img">
            </div>
            <div class="merch-info">
                <h3 class="merch-name">${item.name}</h3>
                <p class="merch-price">Цена: ${item.price} ₽</p>
                <button class="buy-button" data-id="${item.id}" data-category="${itemCategory}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image}">
                    Добавить в корзину
                </button>
            <a href="${productPageLink}" class="btn btn-details">
                Подробнее
            </a>
            </div>
        `;
        grid.appendChild(merchCard);
    });

    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            const category = this.getAttribute('data-category');
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');
            
            const selectedItem = {
                id: itemId,
                name: name,
                price: price,
                image: image
            };
            
            addToCart(selectedItem, category);
        });
    });
}

// Модальное окно выбора размера (для витрины)
function showSizeSelector(product, category, callback) {
    const existing = document.getElementById('size-modal');
    if (existing) existing.remove();

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const sizeButtons = sizes.map(size => 
        `<button class="size-option" data-size="${size}">${size}</button>`
    ).join('');

    const modal = document.createElement('div');
    modal.id = 'size-modal';
    modal.innerHTML = `
        <div class="size-modal-overlay">
            <div class="size-modal-content">
                <h3>Выберите размер для «${product.name}»</h3>
                <div class="size-options">${sizeButtons}</div>
                <button class="size-cancel">Отмена</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedSize = this.dataset.size;
            modal.remove();
            if (callback) callback(selectedSize);
        });
    });

    modal.querySelector('.size-cancel').addEventListener('click', () => modal.remove());
    modal.querySelector('.size-modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) modal.remove();
    });
}

// Основная функция добавления в корзину (используется везде)
function addToCart(product, category, preselectedSize = null) {
    const currentUser = db.getCurrentUser();
    
    if (!currentUser) {
        if (typeof auth !== 'undefined') {
            auth.showLoginModal();
        } else {
            alert('Для добавления товара в корзину необходимо войти в систему');
        }
        return;
    }
    
    const needsSizeSelection = ['свитшоты', 'футболки', 'шляпы', 'мантии'].includes(category);
    
    const doAdd = (size = null) => {
        const result = db.addToCart(
            currentUser.email,
            product.id,
            product.name,
            product.price,
            product.image,
            1,
            size
        );
        if (result) {
            const sizeText = size ? ` (${size})` : '';
            showCartNotification(`Товар «${product.name}»${sizeText} добавлен в корзину!`);
            updateCartCounter();
        }
    };

    if (needsSizeSelection && preselectedSize) {
        doAdd(preselectedSize);
    } else if (needsSizeSelection) {
        showSizeSelector(product, category, (chosenSize) => {
            doAdd(chosenSize);
        });
    } else {
        doAdd();
    }
}

// Уведомление
function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Счётчик корзины в навигации
function updateCartCounter() {
    const currentUser = db.getCurrentUser();
    if (!currentUser) return;
    
    const cart = db.getCart(currentUser.email);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const profileIcon = document.querySelector('.profile-icon');
    if (profileIcon) {
        const oldBadge = profileIcon.querySelector('.cart-badge');
        if (oldBadge) oldBadge.remove();
        
        if (cartCount > 0) {
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.textContent = cartCount;
            profileIcon.style.position = 'relative';
            profileIcon.appendChild(badge);
        }
    }
}

// Фильтры
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-category');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            displayMerchandise(category);
            if (window.innerWidth <= 768) {
                document.getElementById('filters-container').classList.remove('active');
            }
        });
    });
}

function initMobileFilter() {
    const filterToggle = document.getElementById('filter-toggle');
    const filtersContainer = document.getElementById('filters-container');
    if (filterToggle && filtersContainer) {
        filterToggle.addEventListener('click', () => filtersContainer.classList.toggle('active'));
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.filters-container') && !e.target.closest('.mobile-filter-toggle')) {
                filtersContainer.classList.remove('active');
            }
        });
    }
}

function smoothPageTransition(url) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { window.location.href = url; }, 300);
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    displayMerchandise();
    initFilters();
    initMobileFilter();
    if (typeof db !== 'undefined') updateCartCounter();

    const profileIcon = document.querySelector('.profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', function(e) {
            e.preventDefault();
            const currentUser = db.getCurrentUser();
            if (currentUser) {
                window.location.href = 'profile.html';
            } else {
                if (typeof auth !== 'undefined') auth.showLoginModal();
                else window.location.href = 'profile.html';
            }
        });
    }

    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('http') || 
                this.getAttribute('href').startsWith('#') ||
                this.getAttribute('href').startsWith('mailto:') ||
                this.getAttribute('href').startsWith('tel:')) return;
            e.preventDefault();
            smoothPageTransition(this.getAttribute('href'));
        });
    });

    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
    }, 100);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('filters-container').classList.remove('active');
    }
});