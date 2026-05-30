// Обработка страницы товара
class ProductPage {
    constructor() {
        this.selectedSize = null;
        this.currentTab = 'description';
        this.init();
    }

    init() {
        // Получаем параметры из URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const category = urlParams.get('category');
        
        if (productId && category) {
            this.loadProduct(productId, category);
        } else {
            this.showError('Товар не найден');
        }
    }

    loadProduct(productId, category) {
        // Ищем товар в данных мерча
        let product = null;
        
        if (merchandise[category]) {
            product = merchandise[category].find(item => item.id === productId);
        }
        
        if (product) {
            this.displayProduct(product, category);
        } else {
            this.showError('Товар не найден');
        }
    }

    displayProduct(product, category) {
        // Определяем, есть ли у товара размеры
        const hasSizes = ['свитшоты', 'футболки', 'шляпы', 'мантии'].includes(category);
        const sizes = hasSizes ? ['XS', 'S', 'M', 'L', 'XL', 'XXL'] : [];
        
        const productContent = document.getElementById('product-content');
        productContent.innerHTML = `
            <div class="product-detail">
                <div class="product-gallery">
                    <div class="product-main-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                </div>
                
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <div class="product-price">${product.price} ₽</div>
                    
                    ${hasSizes ? `
                        <div class="size-selector">
                            <h3>Выберите размер:</h3>
                            <div class="size-options" id="size-options">
                                ${sizes.map(size => `
                                    <div class="size-option" data-size="${size}">${size}</div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div style="margin: 30px 0;">
                        <button onclick="productPage.addToCart()" class="btn btn-primary" style="padding: 15px 40px; font-size: 1.2rem; width: 100%;">
                            Добавить в корзину
                        </button>
                    </div>
                    
                    <div class="tabs">
                        <div class="tab-headers">
                            <button class="tab-header ${this.currentTab === 'description' ? 'active' : ''}" onclick="productPage.switchTab('description')">
                                Описание
                            </button>
                            <button class="tab-header ${this.currentTab === 'details' ? 'active' : ''}" onclick="productPage.switchTab('details')">
                                Подробнее
                            </button>
                        </div>
                        
                        <div class="tab-content" id="tab-content">
                            ${this.getTabContent(product, category)}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Инициализируем выбор размера
        if (hasSizes) {
            this.initSizeSelector();
        }
    }

    initSizeSelector() {
        const sizeOptions = document.querySelectorAll('.size-option');
        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                sizeOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                this.selectedSize = option.getAttribute('data-size');
            });
        });
        
        // Выбираем первый размер по умолчанию
        if (sizeOptions.length > 0) {
            sizeOptions[0].click();
        }
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        const tabContent = document.getElementById('tab-content');
        
        // Обновляем активные заголовки
        document.querySelectorAll('.tab-header').forEach(header => {
            header.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Обновляем контент
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const category = urlParams.get('category');
        
        if (merchandise[category]) {
            const product = merchandise[category].find(item => item.id === productId);
            if (product) {
                tabContent.innerHTML = this.getTabContent(product, category);
            }
        }
    }

    getTabContent(product, category) {
        if (this.currentTab === 'description') {
            return `
                <p>Официальный мерч из вселенной Гарри Поттера. Этот товар изготовлен из качественных материалов и станет отличным дополнением к вашей коллекции.</p>
                <p>Каждый элемент мерча проходит тщательную проверку качества перед отправкой покупателю.</p>
                <p>Идеально подходит для фанатов магического мира и коллекционеров.</p>
            `;
        } else {
            // Подробные характеристики в зависимости от категории
            let details = '';
            
            switch(category) {
                case 'свитшоты':
                case 'футболки':
                    details = `
                        <p><strong>Материал:</strong> 100% хлопок</p>
                        <p><strong>Стирка:</strong> Машинная стирка при 30°C</p>
                        <p><strong>Страна производства:</strong> Россия</p>
                        <p><strong>Уход:</strong> Гладить с изнанки</p>
                    `;
                    break;
                case 'шляпы':
                    details = `
                        <p><strong>Материал:</strong> Шерсть 80%, Полиэстер 20%</p>
                        <p><strong>Размеры:</strong> Универсальный (регулируемый)</p>
                        <p><strong>Сезон:</strong> Всесезонный</p>
                        <p><strong>Уход:</strong> Сухая чистка</p>
                    `;
                    break;
                case 'мантии':
                    details = `
                        <p><strong>Материал:</strong> Полиэстер 100%</p>
                        <p><strong>Длина:</strong> 120 см</p>
                        <p><strong>Застежка:</strong> Магнитная</p>
                        <p><strong>Уход:</strong> Химчистка</p>
                    `;
                    break;
                case 'кружки':
                    details = `
                        <p><strong>Материал:</strong> Керамика</p>
                        <p><strong>Объем:</strong> 350 мл</p>
                        <p><strong>Мытье:</strong> Посудомоечная машина</p>
                        <p><strong>Микроволновка:</strong> Да</p>
                    `;
                    break;
                case 'брелки':
                    details = `
                        <p><strong>Материал:</strong> Металлический сплав</p>
                        <p><strong>Размер:</strong> 5x3 см</p>
                        <p><strong>Покрытие:</strong> Антикоррозийное</p>
                        <p><strong>Вес:</strong> 25 грамм</p>
                    `;
                    break;
                default:
                    details = `<p>Подробная информация уточняется</p>`;
            }
            
            return details;
        }
    }

    addToCart() {
        const user = db.getCurrentUser();
        
        if (!user) {
            auth.showLoginModal();
            return;
        }
        
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const category = urlParams.get('category');
        
        if (merchandise[category]) {
            const product = merchandise[category].find(item => item.id === productId);
            
            if (product) {
                // Проверяем, нужно ли выбирать размер
                const hasSizes = ['свитшоты', 'футболки', 'шляпы', 'мантии'].includes(category);
                
                if (hasSizes && !this.selectedSize) {
                    alert('Пожалуйста, выберите размер');
                    return;
                }
                
                db.addToCart(
                    user.email,
                    product.id,
                    product.name,
                    product.price,
                    product.image,
                    this.selectedSize
                );
                
                alert('Товар добавлен в корзину!');
            }
        }
    }

    showError(message) {
        const productContent = document.getElementById('product-content');
        productContent.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <h2 style="color: #ffffff;">${message}</h2>
                <a href="merch.html" class="btn btn-primary" style="margin-top: 20px;">
                    Вернуться в магазин
                </a>
            </div>
        `;
    }
}

// Создаем глобальный экземпляр страницы товара
const productPage = new ProductPage();