// ============================================================
//  profile.js  —  страница профиля
//  Данные берутся исключительно из db (database.js)
// ============================================================

/* ---------- Вспомогательные функции ---------- */

function _getInitials(name) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join('');
}

function _fmtDate(str) {
    if (!str) return '—';
    return new Date(str).toLocaleDateString('ru-RU', {
        day: '2-digit', month: 'long', year: 'numeric'
    });
}

function _deliveryName(d) {
    const map = { cdek: 'СДЭК', 'russian-post': 'Почта России', boxberry: 'Boxberry' };
    return map[d] || d || '';
}

// Подбираем CSS-класс для бейджа статуса
function _statusBadgeClass(status) {
    if (!status) return 'badge-default';
    const s = status.toLowerCase();
    if (s.includes('отправ'))   return 'badge-shipped';
    if (s.includes('доставл'))  return 'badge-done';
    return 'badge-default';
}

/* ---------- Класс страницы ---------- */

class ProfilePage {
    constructor() {
        this.container = document.getElementById('profile-content');
        this._init();
    }

    _init() {
        const user = db.getCurrentUser();
        if (!user) {
            this._renderLoginPrompt();
        } else {
            const orders = db.getOrders(user.email);
            const cart   = db.getCart(user.email);
            this._renderProfile(user, orders, cart);
        }
    }

    /* -------- Экран «не авторизован» -------- */
    _renderLoginPrompt() {
        this.container.innerHTML = `
            <a href="index.html" class="back-button">← На главную</a>
            <div class="login-prompt">
                <h1>🔒 Доступ ограничен</h1>
                <p>Для просмотра профиля необходимо войти в систему</p>
                <button class="lp-btn" onclick="auth.showLoginModal()">Войти в аккаунт</button>
                <p style="margin-top:16px;font-size:0.9rem;">
                    Нет аккаунта?
                    <a href="javascript:void(0)" onclick="auth.showRegisterModal()"
                       style="color:#F2C94C;text-decoration:none;">Зарегистрируйтесь</a>
                </p>
            </div>`;
    }

    /* -------- Основной профиль -------- */
    _renderProfile(user, orders, cart) {

        /* Считаем сводные данные */
        const cartCount  = cart.reduce((s, i) => s + (i.quantity || 0), 0);
        const totalSpent = orders.reduce((s, o) => s + (o.total || 0), 0);
        const initials   = _getInitials(user.name || user.email);
        const avatarSrc  = db.getAvatar(user.email);
        const avatarHtml = avatarSrc
            ? `<img src="${avatarSrc}" alt="Аватар" class="avatar-img">`
            : `<span class="avatar-initials">${initials}</span>`;

        /* ----- Баннер ----- */
        const banner = `
        <div class="profile-banner">
            <div class="banner-inner">
                <div class="avatar avatar-clickable" onclick="profile.triggerAvatarUpload()" title="Изменить фото">
                    ${avatarHtml}
                    <div class="avatar-overlay">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                        </svg>
                    </div>
                </div>
                <input type="file" id="avatar-input" accept="image/*" style="display:none"
                       onchange="profile.handleAvatarChange(event)">
                <div class="banner-text">
                    <p class="banner-greeting">Добро пожаловать</p>
                    <h1 class="banner-name">${user.name || user.email}</h1>
                    <p class="banner-email">${user.email}</p>
                </div>
            </div>
        </div>`;

        /* ----- Статистика ----- */
        const stats = `
        <div class="stats-row">
            <div class="stat-card">
                <span class="stat-icon">📦</span>
                <div class="stat-value">${orders.length}</div>
                <div class="stat-label">Заказов</div>
            </div>
            <div class="stat-card">
                <span class="stat-icon">🛒</span>
                <div class="stat-value">${cartCount}</div>
                <div class="stat-label">В корзине</div>
            </div>
            <div class="stat-card">
                <span class="stat-icon">💰</span>
                <div class="stat-value">${totalSpent.toLocaleString('ru-RU')}<span style="font-size:1.1rem"> ₽</span></div>
                <div class="stat-label">Потрачено</div>
            </div>
        </div>`;

        /* ----- Карточка «Заказы» ----- */
        let ordersBody;
        if (orders.length === 0) {
            ordersBody = `
                <div class="no-data-msg">
                    <span>📭</span>Заказов пока нет
                </div>`;
        } else {
            ordersBody = orders.slice(0, 3).map(o => {
                const deliveryStr = (o.delivery && o.delivery.delivery)
                    ? ' · ' + _deliveryName(o.delivery.delivery)
                    : '';
                return `
                <div class="order-row">
                    <div class="order-row-left">
                        <span class="order-id">Заказ #${o.id}</span>
                        <span class="order-date">${_fmtDate(o.date)}${deliveryStr}</span>
                    </div>
                    <div class="order-row-right">
                        <span class="order-total">${(o.total || 0).toLocaleString('ru-RU')} ₽</span>
                        <span class="order-status-badge ${_statusBadgeClass(o.status)}">${o.status || 'Оформлен'}</span>
                    </div>
                </div>`;
            }).join('');
        }

        const moreLink = orders.length > 3
            ? `<a href="javascript:void(0)" class="view-more-link"
                  onclick="profile.viewAllOrders()">+ ещё ${orders.length - 3} заказа(ов)</a>`
            : '';

        const ordersCard = `
        <div class="p-card">
            <div class="card-header">
                <div class="card-icon">📋</div>
                <span class="card-title">История заказов</span>
            </div>
            <div class="orders-list">${ordersBody}</div>
            ${moreLink}
        </div>`;

        /* ----- Карточка «Корзина» ----- */
        // Правило без дублей:
        //   cartCount > 0  → показываем счётчик + кнопку «Перейти в корзину»
        //   cartCount == 0 → показываем счётчик + подсказку, НЕТ никаких кнопок
        const cartBtn = cartCount > 0
            ? `<a href="cart.html" class="action-btn go-cart">
                   <span class="btn-icon">🛒</span>
                   <span class="btn-label">Перейти в корзину</span>
                   <span class="btn-arrow">→</span>
               </a>`
            : '';

        const cartCard = `
        <div class="p-card">
            <div class="card-header">
                <div class="card-icon">🛍️</div>
                <span class="card-title">Корзина</span>
            </div>
            <div class="cart-preview">
                <div class="cart-counter">
                    <div class="cart-num">${cartCount}</div>
                    <div class="cart-meta">
                        <strong>${cartCount === 0
                            ? 'Корзина пуста'
                            : cartCount === 1
                                ? '1 товар'
                                : cartCount + ' товара'}</strong>
                        <p>${cartCount > 0
                            ? 'Перейдите в корзину,<br>чтобы оформить заказ'
                            : 'Загляните в магазин<br>и добавьте что-нибудь'}</p>
                    </div>
                </div>
                ${cartBtn}
            </div>
        </div>`;

        /* ----- Карточка «Аккаунт» ----- */
        const infoCard = `
        <div class="p-card">
            <div class="card-header">
                <div class="card-icon">👤</div>
                <span class="card-title">Информация об аккаунте</span>
            </div>
            <div class="info-list">
                <div class="info-row">
                    <div class="info-icon-wrap">✏️</div>
                    <div class="info-content">
                        <div class="info-label">Имя</div>
                        <div class="info-value">${user.name || '—'}</div>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-icon-wrap">📧</div>
                    <div class="info-content">
                        <div class="info-label">Email</div>
                        <div class="info-value">${user.email}</div>
                    </div>
                </div>
            </div>
        </div>`;

        /* ----- Карточка «Действия» ----- */
        // Кнопку «Все заказы» показываем только если заказы есть
        const allOrdersBtn = orders.length > 0
            ? `<button onclick="profile.viewAllOrders()" class="action-btn go-cart">
                   <span class="btn-icon">📦</span>
                   <span class="btn-label">Все заказы</span>
                   <span class="btn-arrow">→</span>
               </button>`
            : '';

        const actionsCard = `
        <div class="p-card">
            <div class="card-header">
                <div class="card-icon">⚡</div>
                <span class="card-title">Быстрые действия</span>
            </div>
            <div class="actions-list">
                <a href="merch.html" class="action-btn shop">
                    <span class="btn-icon">🏪</span>
                    <span class="btn-label">Перейти в магазин</span>
                    <span class="btn-arrow">→</span>
                </a>
                ${allOrdersBtn}
                <button onclick="profile.logout()" class="action-btn logout">
                    <span class="btn-icon">🚪</span>
                    <span class="btn-label">Выйти из аккаунта</span>
                    <span class="btn-arrow">→</span>
                </button>
            </div>
        </div>`;

        /* ----- Сборка ----- */
        this.container.innerHTML = `
            <a href="index.html" class="back-button">← На главную</a>
            ${banner}
            ${stats}
            <div class="profile-grid">
                ${ordersCard}
                ${cartCard}
                ${infoCard}
                ${actionsCard}
            </div>`;
    }

    /* -------- Аватар -------- */

    triggerAvatarUpload() {
        const input = document.getElementById('avatar-input');
        if (input) input.click();
    }

    handleAvatarChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            this._showAvatarToast('Файл слишком большой. Максимум 2 МБ.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            const user = db.getCurrentUser();
            if (!user) return;

            db.updateAvatar(user.email, base64);

            // Обновляем иконку в шапке сразу
            if (typeof auth !== 'undefined') auth.updateUI();

            const avatarEl = document.querySelector('.avatar.avatar-clickable');
            if (avatarEl) {
                const overlay = avatarEl.querySelector('.avatar-overlay');
                avatarEl.innerHTML = '';
                const img = document.createElement('img');
                img.src = base64;
                img.alt = 'Аватар';
                img.className = 'avatar-img';
                avatarEl.appendChild(img);
                if (overlay) avatarEl.appendChild(overlay);
            }

            this._showAvatarToast('Фото профиля обновлено!', 'success');
        };
        reader.readAsDataURL(file);
    }

    _showAvatarToast(message, type) {
        const existing = document.getElementById('avatar-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'avatar-toast';
        toast.className = 'avatar-toast avatar-toast-' + type;
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('avatar-toast-visible'));
        setTimeout(() => {
            toast.classList.remove('avatar-toast-visible');
            setTimeout(() => toast.remove(), 350);
        }, 2800);
    }

    /* -------- Публичные методы -------- */

    logout() {
        auth.logout();
    }

    viewAllOrders() {
        const user = db.getCurrentUser();
        if (!user) return;
        const orders = db.getOrders(user.email);
        if (orders.length === 0) {
            alert('У вас пока нет заказов');
            return;
        }
        const lines = orders.map(o => {
            const delivery = (o.delivery && o.delivery.delivery)
                ? ' | ' + _deliveryName(o.delivery.delivery)
                : '';
            return `#${o.id}  ${_fmtDate(o.date)}  ${o.status || 'Оформлен'}${delivery}  ${(o.total || 0).toLocaleString('ru-RU')} ₽`;
        }).join('\n');
        alert('Все ваши заказы:\n\n' + lines);
    }
}

const profile = new ProfilePage();
