class CheckoutPage {
    constructor() {
        this.selectedDelivery = null;
        this.init();
    }

    init() {
        const currentUser = db.getCurrentUser();
        if (!currentUser) {
            this.showLoginPrompt();
            return;
        }
        const cart = db.getCart(currentUser.email);
        if (cart.length === 0) {
            this.showEmptyCart();
            return;
        }
        this.showCheckoutForm(currentUser, cart);
    }

    showLoginPrompt() {
        document.getElementById('checkout-content').innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <h2 style="color: #ffffff; margin-bottom: 20px; font-size: 1.5rem;">Оформление заказа доступно только авторизованным пользователям</h2>
                <button onclick="auth.showLoginModal()" class="btn btn-primary" style="padding: 12px 30px; font-size: 1rem;">Войти в аккаунт</button>
            </div>`;
    }

    showEmptyCart() {
        document.getElementById('checkout-content').innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <h2 style="color: #ffffff; margin-bottom: 20px; font-size: 1.5rem;">Ваша корзина пуста</h2>
                <a href="merch.html" class="btn btn-primary" style="padding: 12px 30px; font-size: 1rem;">Перейти в магазин</a>
            </div>`;
    }

    showCheckoutForm(user, cart) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('checkout-content').innerHTML = `
            <div class="checkout-container">
                <h1 class="checkout-title">Оформление заказа</h1>
                <div class="checkout-grid">
                    <div class="checkout-form-section">
                        <h2 class="section-title">Данные для доставки</h2>
                        <form id="checkout-form">
                            <div class="form-group">
                                <label for="full-name">ФИО *</label>
                                <input type="text" id="full-name" class="form-control" placeholder="Иванов Иван Иванович" required>
                                <span class="field-hint" id="hint-full-name"></span>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="phone">Телефон *</label>
                                    <input type="tel" id="phone" class="form-control" placeholder="+7 (999) 123-45-67" required>
                                    <span class="field-hint" id="hint-phone"></span>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email *</label>
                                    <input type="email" id="email" class="form-control" value="${user.email}" required>
                                    <span class="field-hint" id="hint-email"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address">Адрес доставки *</label>
                                <input type="text" id="address" class="form-control" placeholder="г. Москва, ул. Ленина, д. 5, кв. 12" required>
                                <span class="field-hint" id="hint-address"></span>
                            </div>
                            <div class="form-group">
                                <label for="comment">Комментарий</label>
                                <textarea id="comment" class="form-control" rows="3" placeholder="Дополнительные пожелания..."></textarea>
                            </div>
                            <h2 class="section-title">Способ доставки</h2>
                            <div class="delivery-options">
                                <div class="delivery-option" data-type="cdek" onclick="checkout.selectDelivery('cdek')">
                                    <div class="delivery-header">
                                        <input type="radio" name="delivery" id="delivery-cdek">
                                        <label for="delivery-cdek">СДЭК</label>
                                        <span class="delivery-price">от 350 ₽</span>
                                    </div>
                                    <p class="delivery-info">Доставка до пункта выдачи, 3-7 дней</p>
                                </div>
                                <div class="delivery-option" data-type="russian-post" onclick="checkout.selectDelivery('russian-post')">
                                    <div class="delivery-header">
                                        <input type="radio" name="delivery" id="delivery-russian-post">
                                        <label for="delivery-russian-post">Почта России</label>
                                        <span class="delivery-price">от 250 ₽</span>
                                    </div>
                                    <p class="delivery-info">Доставка до почтового отделения, 7-14 дней</p>
                                </div>
                                <div class="delivery-option" data-type="boxberry" onclick="checkout.selectDelivery('boxberry')">
                                    <div class="delivery-header">
                                        <input type="radio" name="delivery" id="delivery-boxberry">
                                        <label for="delivery-boxberry">Boxberry</label>
                                        <span class="delivery-price">от 300 ₽</span>
                                    </div>
                                    <p class="delivery-info">Доставка до пункта выдачи, 4-10 дней</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" id="agree-terms" required>
                                    Я согласен с <a href="rules.html" target="_blank">правилами</a> и <a href="privacy.html" target="_blank">политикой конфиденциальности</a>
                                </label>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary btn-block">Оформить заказ</button>
                            </div>
                        </form>
                    </div>
                    <div class="checkout-summary-section">
                        <h2 class="section-title">Ваш заказ</h2>
                        <div class="order-summary">
                            <div class="order-items">
                                ${cart.map(item => `
                                    <div class="order-item">
                                        <div class="order-item-name">${item.name} ${item.size ? '(' + item.size + ')' : ''} × ${item.quantity}</div>
                                        <div class="order-item-price">${item.price * item.quantity} ₽</div>
                                    </div>`).join('')}
                            </div>
                            <div class="order-totals">
                                <div class="total-row"><span>Товары: </span><span>${total} ₽</span></div>
                                <div class="total-row delivery-total"><span>Доставка: </span><span id="delivery-cost">—</span></div>
                                <div class="total-row grand-total"><span>Итого: </span><span id="grand-total">${total} ₽</span></div>
                            </div>
                        </div>
                        <div class="secure-info">
                            <p>✅ Безопасная оплата</p>
                            <p>✅ Гарантия возврата</p>
                            <p>✅ Конфиденциальность</p>
                        </div>
                    </div>
                </div>
            </div>`;
        this.initForm();
    }

    selectDelivery(type) {
        this.selectedDelivery = type;
        document.querySelectorAll('.delivery-option').forEach(opt => {
            opt.classList.remove('selected');
            const radio = opt.querySelector('input[type="radio"]');
            if (radio) radio.checked = (opt.dataset.type === type);
        });
        const selected = document.querySelector(`.delivery-option[data-type="${type}"]`);
        if (selected) selected.classList.add('selected');
        this.updateDeliveryCost();
    }

    updateDeliveryCost() {
        if (!this.selectedDelivery) return;
        const costs = { cdek: 350, 'russian-post': 250, boxberry: 300 };
        const cart = db.getCart(db.getCurrentUser().email);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const delivery = costs[this.selectedDelivery] || 0;
        const deliveryCostElement = document.getElementById('delivery-cost');
        const grandTotalElement = document.getElementById('grand-total');
        if (deliveryCostElement) deliveryCostElement.textContent = delivery + ' ₽';
        if (grandTotalElement) grandTotalElement.textContent = (total + delivery) + ' ₽';
    }

    initForm() {
        const form = document.getElementById('checkout-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitOrder();
            });
        }
        this.selectDelivery('cdek');

        // Живая валидация при вводе
        const phoneEl = document.getElementById('phone');
        if (phoneEl) {
            phoneEl.addEventListener('input', () => this._liveValidatePhone(phoneEl));
        }
        const nameEl = document.getElementById('full-name');
        if (nameEl) {
            nameEl.addEventListener('input', () => this._liveValidateName(nameEl));
        }
        const addrEl = document.getElementById('address');
        if (addrEl) {
            addrEl.addEventListener('input', () => this._liveValidateAddress(addrEl));
        }
    }

    /* ====================== ВАЛИДАЦИЯ ====================== */

    /**
     * ФИО: минимум два слова, каждое — только кириллица (или latin),
     * не менее 2 букв, никаких цифр или случайных символов.
     */
    _validateFullName(value) {
        const trimmed = value.trim();
        // Только буквы (кириллица, латиница), дефис, пробел — без цифр и спецсимволов
        if (!/^[А-ЯЁа-яёA-Za-z][А-ЯЁа-яёA-Za-z\-]*([ ]+[А-ЯЁа-яёA-Za-z][А-ЯЁа-яёA-Za-z\-]*){1,}$/.test(trimmed)) {
            return 'Введите настоящее ФИО: минимум имя и фамилия, только буквы';
        }
        // Каждое слово — не менее 2 букв
        const words = trimmed.split(/\s+/);
        for (const w of words) {
            if (w.replace(/-/g, '').length < 2) {
                return 'Каждое слово в ФИО должно содержать минимум 2 буквы';
            }
        }
        return null;
    }

    /**
     * Телефон: 11 цифр, начинается с +7 или 8.
     * Допускаются разделители: пробелы, дефисы, скобки — только как форматирование.
     */
    _validatePhone(value) {
        // Убираем все символы кроме цифр и ведущего +
        const cleaned = value.trim().replace(/[\s\-().]/g, '');
        // Должно быть либо +7XXXXXXXXXX (12 символов), либо 8XXXXXXXXXX (11 цифр)
        if (!/^(\+7|8)\d{10}$/.test(cleaned)) {
            return 'Телефон: 11 цифр, начинающихся с +7 или 8 (например: +7 999 123-45-67)';
        }
        return null;
    }

    /**
     * Адрес: обязательно содержит город (город/г./г), улицу (ул./улица/пр./пер. и т.д.) и дом (д./дом).
     */
    _validateAddress(value) {
        const v = value.trim().toLowerCase();
        if (v.length < 10) {
            return 'Введите полный адрес доставки';
        }
        // Проверка города — г. / г.Москва / г Москва / город
        const hasCity = v.includes('г.') || v.includes('г ') || v.startsWith('г,') || v.includes('город ');
        if (!hasCity) {
            return 'Укажите город (например: г. Москва или г Казань)';
        }
        // Проверка улицы — любое из стандартных сокращений
        const streetKeywords = ['ул.', 'улица ', 'пр.', 'просп.', 'пр-т', 'пр-кт', 'проспект ', 'пер.', 'переулок ', 'б-р', 'бульвар ', 'ш.', 'шоссе ', 'наб.', 'набережная ', 'пл.', 'площадь ', 'тупик ', 'аллея ', 'мкр.', 'микрорайон ', 'тракт '];
        const hasStreet = streetKeywords.some(kw => v.includes(kw));
        if (!hasStreet) {
            return 'Укажите улицу (ул., проспект, переулок и т.д.)';
        }
        // Проверка дома — дом / д. / д5 / №5 / цифра после запятой
        const hasHouse = v.includes('дом ') || /д\.\s*\d/.test(v) || /д\s+\d/.test(v) || /№\s*\d/.test(v) || /,\s*\d/.test(v);
        if (!hasHouse) {
            return 'Укажите номер дома (например: д. 5 или дом 12)';
        }
        return null;
    }

    _validateEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
            ? null : 'Введите корректный email';
    }

    /* Живая валидация (при вводе — только убираем ошибку когда поле исправлено) */
    _liveValidateName(el) {
        const err = this._validateFullName(el.value);
        this._setFieldState(el, 'hint-full-name', err ? null : ''); // убираем ошибку если ок
        if (!err) el.classList.remove('field-error');
    }
    _liveValidatePhone(el) {
        const err = this._validatePhone(el.value);
        if (!err) {
            el.classList.remove('field-error');
            this._setHint('hint-phone', '');
        }
    }
    _liveValidateAddress(el) {
        const err = this._validateAddress(el.value);
        if (!err) {
            el.classList.remove('field-error');
            this._setHint('hint-address', '');
        }
    }

    _setFieldState(el, hintId, errorMsg) {
        if (errorMsg) {
            el.classList.add('field-error');
            this._setHint(hintId, errorMsg);
        } else {
            el.classList.remove('field-error');
            this._setHint(hintId, '');
        }
    }

    _setHint(hintId, msg) {
        const hint = document.getElementById(hintId);
        if (hint) hint.textContent = msg;
    }

    /* ====================== САБМИТ ====================== */

    submitOrder() {
        const user = db.getCurrentUser();
        if (!user) return;

        if (!this.selectedDelivery) {
            alert('Выберите способ доставки');
            return;
        }
        if (!document.getElementById('agree-terms').checked) {
            alert('Необходимо согласие с правилами');
            return;
        }

        const nameEl    = document.getElementById('full-name');
        const phoneEl   = document.getElementById('phone');
        const emailEl   = document.getElementById('email');
        const addressEl = document.getElementById('address');

        const nameErr    = this._validateFullName(nameEl.value);
        const phoneErr   = this._validatePhone(phoneEl.value);
        const emailErr   = this._validateEmail(emailEl.value);
        const addressErr = this._validateAddress(addressEl.value);

        // Показываем все ошибки сразу
        this._setFieldState(nameEl,    'hint-full-name', nameErr);
        this._setFieldState(phoneEl,   'hint-phone',     phoneErr);
        this._setFieldState(emailEl,   'hint-email',     emailErr);
        this._setFieldState(addressEl, 'hint-address',   addressErr);

        if (nameErr || phoneErr || emailErr || addressErr) {
            // Прокручиваем к первому полю с ошибкой
            const firstErr = [nameEl, phoneEl, emailEl, addressEl].find(el => el.classList.contains('field-error'));
            if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const formData = {
            fullName: nameEl.value.trim(),
            phone:    phoneEl.value.trim(),
            email:    emailEl.value.trim(),
            address:  addressEl.value.trim(),
            comment:  document.getElementById('comment').value.trim(),
            delivery: this.selectedDelivery
        };

        const cart = db.getCart(user.email);
        const deliveryCost = { cdek: 350, 'russian-post': 250, boxberry: 300 }[this.selectedDelivery];
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + deliveryCost;

        db.createOrder(user.email, cart, total, formData);
        alert('Заказ оформлен! Сумма: ' + total + ' ₽');
        window.location.href = 'profile.html';
    }
}

const checkout = new CheckoutPage();
