class CartPage {
    constructor() {
        // Инициализация будет вызвана после полной загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        const currentUser = db.getCurrentUser();
        if (!currentUser) {
            this.showLoginPrompt();
            return;
        }
        this.loadCart(currentUser);
    }

    showLoginPrompt() {
        const container = document.getElementById('cart-content');
        if (!container) return;
        container.innerHTML = `
            <section class="not-ready-section">
                <div class="not-ready-container">
                    <div class="not-ready-card">

                        <div class="empty-cart-icon-wrap">
                            <div class="empty-cart-circle">
                                <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
                                    <path d="M5 7h4.5l5 20h18l4.5-14.5H14" stroke="#F2C94C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    <circle cx="19.5" cy="33" r="2.2" stroke="#F2C94C" stroke-width="1.6"/>
                                    <circle cx="32.5" cy="33" r="2.2" stroke="#F2C94C" stroke-width="1.6"/>
                                    <path d="M16 18h14M23 13v10" stroke="#F2C94C" stroke-width="1.6" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <div class="empty-cart-orbit"><div class="empty-cart-orbit-dot"></div></div>
                        </div>

                        <h1 class="not-ready-title">Войдите в аккаунт</h1>

                        <div class="not-ready-divider"></div>

                        <p class="not-ready-text">
                            Корзина доступна только<br>
                            <strong>авторизованным пользователям</strong>
                        </p>

                        <div class="not-ready-sparks">
                            <div class="spark"></div>
                            <div class="spark"></div>
                            <div class="spark"></div>
                        </div>

                        <button onclick="auth.showLoginModal()" class="not-ready-back" style="border:none; cursor:pointer;">
                            Войти в аккаунт
                        </button>

                        <p style="margin-top: 18px; color: #6b6488; font-size: 0.88rem;">
                            Нет аккаунта?
                            <a href="javascript:void(0)" onclick="auth.showRegisterModal()"
                               style="color: #a09abf; text-decoration: underline; text-underline-offset: 3px;">
                                Зарегистрируйтесь
                            </a>
                        </p>

                    </div>
                </div>
            </section>
        `;
    }

    loadCart(user) {
        const container = document.getElementById('cart-content');
        if (!container) return;

        const cart = db.getCart(user.email);
        if (cart.length === 0) {
            this.showEmptyCart();
            return;
        }

        let total = 0;
        const cartItemsHtml = cart.map(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    return `
                        <div class="cart-item" data-id="${item.id}" data-size="${item.size || ''}">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-info">
                                <h3 class="cart-item-name">${item.name}</h3>
                                ${item.size ? `<p class="cart-item-size">Размер: ${item.size}</p>` : ''}
                                <p class="cart-item-price">${item.price} ₽ × ${item.quantity} = ${itemTotal} ₽</p>
                            </div>
                            <div class="cart-item-controls">
                                <div class="quantity-control" style="display:flex; align-items:center; gap:0; background:rgba(255,255,255,0.08); border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.15); width:fit-content;">
                                    <button class="quantity-btn" onclick="cartPage.decreaseQuantity(${item.id}, '${item.size || ''}')"
                                        style="width:38px; height:38px; background:transparent; border:none; color:#f0a9a9; font-size:1.3rem; font-weight:700; cursor:pointer; transition:background 0.2s, color 0.2s; display:flex; align-items:center; justify-content:center; line-height:1;"
                                        onmouseover="this.style.background='rgba(240,169,169,0.18)'; this.style.color='#fff';"
                                        onmouseout="this.style.background='transparent'; this.style.color='#f0a9a9';">−</button>
                                    <span class="quantity-display"
                                        style="min-width:36px; text-align:center; color:#ffffff; font-size:1rem; font-weight:600; padding:0 4px; border-left:1px solid rgba(255,255,255,0.12); border-right:1px solid rgba(255,255,255,0.12);">${item.quantity}</span>
                                    <button class="quantity-btn" onclick="cartPage.increaseQuantity(${item.id}, '${item.size || ''}')"
                                        style="width:38px; height:38px; background:transparent; border:none; color:#f0a9a9; font-size:1.3rem; font-weight:700; cursor:pointer; transition:background 0.2s, color 0.2s; display:flex; align-items:center; justify-content:center; line-height:1;"
                                        onmouseover="this.style.background='rgba(240,169,169,0.18)'; this.style.color='#fff';"
                                        onmouseout="this.style.background='transparent'; this.style.color='#f0a9a9';">+</button>
                                </div>
                                <button class="remove-btn" onclick="cartPage.removeItem(${item.id}, '${item.size || ''}')"
                                    style="margin-top:10px; padding:7px 18px; background:transparent; border:1px solid rgba(240,100,100,0.45); border-radius:10px; color:#f0a9a9; font-size:0.85rem; font-weight:500; cursor:pointer; transition:background 0.2s, border-color 0.2s, color 0.2s; letter-spacing:0.3px;"
                                    onmouseover="this.style.background='rgba(240,100,100,0.18)'; this.style.borderColor='rgba(240,100,100,0.8)'; this.style.color='#fff';"
                                    onmouseout="this.style.background='transparent'; this.style.borderColor='rgba(240,100,100,0.45)'; this.style.color='#f0a9a9';">✕ Удалить</button>
                            </div>
                        </div>
                    `;
                }).join('');

        container.innerHTML = `
            <h1 style="color: #ffffff; margin-bottom: 30px; text-align: center; font-size: 1.8rem;">Ваша корзина</h1>
            <div class="cart-items">
                ${cartItemsHtml}
            </div>
            <div class="cart-total">
                <h3 style="font-size: 1.2rem;">Итого:</h3>
                <div class="total-price" style="font-size: 1.8rem;">${total} ₽</div>
            </div>
            <div class="cart-actions">
                <button onclick="cartPage.clearCart()" class="btn btn-secondary">Очистить корзину</button>
                <button onclick="cartPage.checkout()" class="btn btn-primary">Оформить заказ</button>
            </div>
        `;
    }

    showEmptyCart() {
        const container = document.getElementById('cart-content');
        if (!container) return;
        container.innerHTML = `
            <section class="not-ready-section">
                <div class="not-ready-container">
                    <div class="not-ready-card">

                        <div class="empty-cart-icon-wrap">
                            <div class="empty-cart-circle">
                                <svg viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" width="46" height="46">
                                    <path d="M5 7h4.5l5 20h18l4.5-14.5H14" stroke="#F2C94C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    <circle cx="19.5" cy="33" r="2.2" stroke="#F2C94C" stroke-width="1.6"/>
                                    <circle cx="32.5" cy="33" r="2.2" stroke="#F2C94C" stroke-width="1.6"/>
                                    <path d="M23 15v7M20 18.5h6" stroke="#F2C94C" stroke-width="1.6" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <div class="empty-cart-orbit"><div class="empty-cart-orbit-dot"></div></div>
                        </div>

                        <h1 class="not-ready-title">Ваша корзина пуста</h1>

                        <div class="not-ready-divider"></div>

                        <p class="not-ready-text">
                            Загляните в магазин —<br>
                            <strong>там точно найдётся что-то для вас</strong>
                        </p>

                        <div class="not-ready-sparks">
                            <div class="spark"></div>
                            <div class="spark"></div>
                            <div class="spark"></div>
                        </div>

                        <a href="merch.html" class="not-ready-back">← Перейти в магазин</a>

                    </div>
                </div>
            </section>
        `;
    }

    increaseQuantity(productId, size) {
        const user = db.getCurrentUser();
        if (!user) return;
        const resolvedSize = size || null;
        const cart = db.getCart(user.email);
        const item = cart.find(item => item.id === productId && item.size === resolvedSize);
        if (item) {
            db.updateCartItem(user.email, productId, resolvedSize, item.quantity + 1);
            this.loadCart(user);
            this.updateCartCounter();
        }
    }

    decreaseQuantity(productId, size) {
        const user = db.getCurrentUser();
        if (!user) return;
        const resolvedSize = size || null;
        const cart = db.getCart(user.email);
        const item = cart.find(item => item.id === productId && item.size === resolvedSize);
        if (item && item.quantity > 1) {
            db.updateCartItem(user.email, productId, resolvedSize, item.quantity - 1);
            this.loadCart(user);
            this.updateCartCounter();
        } else {
            this.removeItem(productId, size);
        }
    }

    removeItem(productId, size) {
        const user = db.getCurrentUser();
        if (!user) return;
        const resolvedSize = size || null;
        db.updateCartItem(user.email, productId, resolvedSize, 0);
        this.loadCart(user);
        this.updateCartCounter();
    }

    clearCart() {
        const user = db.getCurrentUser();
        if (!user) return;
        db.clearCart(user.email);
        this.showEmptyCart();
        this.updateCartCounter();
    }

    checkout() {
        window.location.href = 'checkout.html';
    }

    updateCartCounter() {
        if (typeof auth !== 'undefined') {
            auth.updateCartCounter();
        }
    }
}

const cartPage = new CartPage();