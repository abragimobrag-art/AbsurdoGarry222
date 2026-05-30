class Database {
    constructor() {
        this.storageKey = 'potter_shop_db';
        this.currentUserKey = 'currentUser';
    }

    getUsers() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    saveUsers(users) {
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    getCurrentUser() {
        const email = localStorage.getItem(this.currentUserKey);
        if (!email) return null;
        const users = this.getUsers();
        return users.find(u => u.email === email) || null;
    }

    setCurrentUser(email) {
        localStorage.setItem(this.currentUserKey, email);
    }

    clearCurrentUser() {
        localStorage.removeItem(this.currentUserKey);
    }

    register(email, password, name = '') {
        const users = this.getUsers();
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Пользователь с таким email уже существует' };
        }
        const newUser = {
            email,
            password,
            name: name || email.split('@')[0],
            cart: [],
            orders: []
        };
        users.push(newUser);
        this.saveUsers(users);
        this.setCurrentUser(email);
        return { success: true, user: newUser };
    }

    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            this.setCurrentUser(email);
            return { success: true, user };
        }
        return { success: false };
    }

    logout() {
        this.clearCurrentUser();
    }

    addToCart(email, productId, productName, price, image, quantity = 1, size = null) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        if (!user) return false;
        if (!user.cart) user.cart = [];

        const existing = user.cart.find(item => item.id === productId && item.size === size);
        if (existing) {
            existing.quantity += quantity;
        } else {
            user.cart.push({
                id: productId,
                name: productName,
                price: price,
                image: image,
                quantity: quantity,
                size: size
            });
        }
        this.saveUsers(users);
        return true;
    }

    getCart(email) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        return user ? (user.cart || []) : [];
    }

    clearCart(email) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        if (user) {
            user.cart = [];
            this.saveUsers(users);
        }
    }

    // Новый метод для обновления количества или удаления элемента корзины
    updateCartItem(email, productId, size, quantity) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        if (!user || !user.cart) return false;

        const item = user.cart.find(item => item.id === productId && item.size === size);
        if (!item) return false;

        if (quantity <= 0) {
            user.cart = user.cart.filter(item => !(item.id === productId && item.size === size));
        } else {
            item.quantity = quantity;
        }
        this.saveUsers(users);
        return true;
    }

    // Новый метод получения заказов пользователя
    getOrders(email) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        return user ? (user.orders || []) : [];
    }

    updateAvatar(email, base64) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        if (!user) return false;
        user.avatar = base64;
        this.saveUsers(users);
        return true;
    }

    getAvatar(email) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        return user ? (user.avatar || null) : null;
    }

    createOrder(email, items, total, deliveryData) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        if (!user) return false;
        if (!user.orders) user.orders = [];
        user.orders.push({
            id: Date.now(),
            items: items,
            total: total,
            delivery: deliveryData,
            date: new Date().toISOString(),
            status: 'Оформлен'
        });
        user.cart = [];
        this.saveUsers(users);
        return true;
    }
}

const db = new Database();