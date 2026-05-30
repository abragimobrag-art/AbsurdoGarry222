// Система авторизации и профиля
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.currentUser = db.getCurrentUser();
        this.updateUI();
        this.bindEvents();
    }

    updateUI() {
        const authButtons = document.getElementById('auth-buttons');
        const profileIcon = document.getElementById('profile-icon');
        if (!profileIcon || !authButtons) return;

        if (this.currentUser) {
            authButtons.style.display = 'none';
            profileIcon.style.display = 'flex';
            const img = profileIcon.querySelector('img');
            if (img) {
                img.title = this.currentUser.name;
                img.alt = 'Профиль ' + this.currentUser.name;
                // Подставляем аватар пользователя если он загружен
                const avatar = db.getAvatar(this.currentUser.email);
                if (avatar) {
                    img.src = avatar;
                    img.style.objectFit = 'cover';
                }
            }
            if (!profileIcon.dataset.clickAttached) {
                profileIcon.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = 'profile.html';
                });
                profileIcon.dataset.clickAttached = 'true';
            }
        } else {
            authButtons.style.display = 'flex';
            profileIcon.style.display = 'none';
        }
        this.updateCartCounter();
    }
    
    // Обновление счетчика корзины
    updateCartCounter() {
        const currentUser = this.currentUser || db.getCurrentUser();
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

    showLoginModal() {
        this.createModal('login');
    }

    showRegisterModal() {
        this.createModal('register');
    }

    showProfile() {
        window.location.href = 'profile.html';
    }

    createModal(type) {
        const existingModal = document.getElementById('auth-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        modal.className = 'modal active';
        
        if (type === 'login') {
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Вход в аккаунт</h2>
                        <p>Введите ваши данные для входа</p>
                    </div>
                    <form id="login-form">
                        <div class="form-group">
                            <label for="login-email">Email</label>
                            <input type="email" id="login-email" class="form-control" placeholder="Ваш email" required>
                            <div class="error-message" id="login-email-error"></div>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Пароль</label>
                            <input type="password" id="login-password" class="form-control" placeholder="Ваш пароль" required>
                            <div class="error-message" id="login-password-error"></div>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="remember-me">
                            <label for="remember-me">Запомнить меня</label>
                        </div>
                        <div class="error-message" id="login-general-error"></div>
                        <div class="form-buttons">
                            <button type="submit" class="btn btn-primary">Войти</button>
                            <button type="button" class="btn btn-secondary" onclick="auth.switchToRegister()">Регистрация</button>
                        </div>
                    </form>
                </div>
            `;
        } else {
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Регистрация</h2>
                        <p>Создайте новый аккаунт</p>
                    </div>
                    <form id="register-form">
                        <div class="form-group">
                            <label for="register-email">Email</label>
                            <input type="email" id="register-email" class="form-control" placeholder="Ваш email" required>
                            <div class="error-message" id="register-email-error"></div>
                        </div>
                        <div class="form-group">
                            <label for="register-password">Пароль</label>
                            <input type="password" id="register-password" class="form-control" placeholder="Придумайте пароль" required>
                            <div class="error-message" id="register-password-error"></div>
                        </div>
                        <div class="form-group">
                            <label for="register-password-confirm">Подтвердите пароль</label>
                            <input type="password" id="register-password-confirm" class="form-control" placeholder="Повторите пароль" required>
                            <div class="error-message" id="register-password-confirm-error"></div>
                        </div>
                        <div class="form-group">
                            <label for="register-name">Имя для отображения</label>
                            <input type="text" id="register-name" class="form-control" placeholder="Как вас будут видеть другие" required>
                            <div class="error-message" id="register-name-error"></div>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="agree-terms" required>
                            <label for="agree-terms">
                                Нажимая на кнопку, я соглашаюсь с 
                                <a href="rules.html" target="_blank">правилами пользования торговой площадкой</a>. 
                                <a href="privacy.html" target="_blank">Политика конфиденциальности</a>
                            </label>
                        </div>
                        <div class="error-message" id="register-general-error"></div>
                        <div class="form-buttons">
                            <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
                            <button type="button" class="btn btn-secondary" onclick="auth.switchToLogin()">Уже есть аккаунт</button>
                        </div>
                    </form>
                </div>
            `;
        }

        document.body.appendChild(modal);
        this.bindFormEvents(type);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    switchToRegister() {
        this.closeModal();
        setTimeout(() => this.showRegisterModal(), 300);
    }

    switchToLogin() {
        this.closeModal();
        setTimeout(() => this.showLoginModal(), 300);
    }

    closeModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    }

    bindFormEvents(type) {
        const form = type === 'login' ? document.getElementById('login-form') : document.getElementById('register-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (type === 'login') {
                    this.login();
                } else {
                    this.register();
                }
            });
        }
    }

    login() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        
        this.resetErrors('login');
        
        if (!email) {
            this.showError('login-email-error', 'Введите email');
            this.highlightError('login-email');
            return;
        }
        
        if (!password) {
            this.showError('login-password-error', 'Введите пароль');
            this.highlightError('login-password');
            return;
        }
        
        const result = db.login(email, password);
        
        if (result.success) {
            localStorage.setItem('currentUser', email);
            this.currentUser = result.user;
            this.updateUI();
            this.closeModal();
            this.showNotification('Вы успешно вошли в систему!', 'success');
            // Обновляем корзину, если пользователь на странице cart.html
            if (typeof cartPage !== 'undefined') cartPage.loadCart(result.user);
        } else {
            this.showError('login-general-error', 'Такого пользователя не существует');
            this.highlightError('login-email');
            this.highlightError('login-password');
        }
    }

    // Регистрация пользователя с проверкой домена
    register() {
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value.trim();
        const passwordConfirm = document.getElementById('register-password-confirm').value.trim();
        const name = document.getElementById('register-name').value.trim();
        
        this.resetErrors('register');
        
        let hasErrors = false;
        
        if (!email) {
            this.showError('register-email-error', 'Введите email');
            this.highlightError('register-email');
            hasErrors = true;
        } else if (!this.validateEmail(email)) {
            this.showError('register-email-error', 'Введите корректный email');
            this.highlightError('register-email');
            hasErrors = true;
        } else if (!this.isAllowedDomain(email)) {
            this.showError('register-email-error', 'Регистрация разрешена только с популярных почтовых сервисов (gmail, yandex, mail и др.)');
            this.highlightError('register-email');
            hasErrors = true;
        }
        
        if (!password) {
            this.showError('register-password-error', 'Введите пароль');
            this.highlightError('register-password');
            hasErrors = true;
        } else if (password.length < 6) {
            this.showError('register-password-error', 'Пароль должен содержать минимум 6 символов');
            this.highlightError('register-password');
            hasErrors = true;
        }
        
        if (!passwordConfirm) {
            this.showError('register-password-confirm-error', 'Подтвердите пароль');
            this.highlightError('register-password-confirm');
            hasErrors = true;
        } else if (password !== passwordConfirm) {
            this.showError('register-password-confirm-error', 'Пароли не совпадают');
            this.highlightError('register-password-confirm');
            hasErrors = true;
        }
        
        if (!name) {
            this.showError('register-name-error', 'Введите имя');
            this.highlightError('register-name');
            hasErrors = true;
        }
        
        if (!document.getElementById('agree-terms').checked) {
            this.showError('register-general-error', 'Необходимо согласие с правилами');
            hasErrors = true;
        }
        
        if (hasErrors) return;
        
        const result = db.register(email, password, name);
        
        if (result.success) {
            localStorage.setItem('currentUser', email);
            this.currentUser = result.user;
            this.updateUI();
            this.closeModal();
            this.showNotification('Регистрация успешна! Добро пожаловать!', 'success');
            // Обновляем корзину, если пользователь на странице cart.html
            if (typeof cartPage !== 'undefined') cartPage.loadCart(result.user);
            setTimeout(() => this.showProfile(), 1000);
        } else {
            this.showError('register-email-error', result.message);
            this.highlightError('register-email');
        }
    }

    // Проверка домена: разрешены только популярные почтовые сервисы
    isAllowedDomain(email) {
        const allowedDomains = [
            'gmail.com',
            'mail.com',
            'yandex.com',
            'yandex.ru',
            'mail.ru',
            'inbox.ru',
            'list.ru',
            'bk.ru',
            'rambler.ru',
            'protonmail.com',
            'icloud.com',
            'hotmail.com',
            'outlook.com',
            'live.com'
        ];
        const domain = email.split('@')[1]?.toLowerCase();
        return domain && allowedDomains.includes(domain);
    }

    logout() {
        db.logout();
        this.currentUser = null;
        this.updateUI();
        this.showNotification('Вы вышли из системы', 'info');
        
        if (window.location.pathname.includes('profile.html') || 
            window.location.pathname.includes('cart.html')) {
            window.location.href = 'index.html';
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.classList.add('show');
        }
    }

    highlightError(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('error');
            setTimeout(() => element.classList.remove('error'), 1000);
        }
    }

    resetErrors(type) {
        const prefix = type === 'login' ? 'login' : 'register';
        document.querySelectorAll(`#${prefix}-form .error-message`).forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });
        document.querySelectorAll(`#${prefix}-form .form-control`).forEach(el => {
            el.classList.remove('error');
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            border-radius: 8px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const profileIcon = e.target.closest('#profile-icon');
            if (profileIcon && this.currentUser) {
                e.preventDefault();
                this.showProfile();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
}

const auth = new AuthSystem();