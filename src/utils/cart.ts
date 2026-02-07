
import { content } from '../config/content';
import { i18n } from './i18n';
import { getProductData } from '../config/products';

export interface CartItem {
    id: string; // Product ID + Size
    productId: string; // Base Product ID
    name: string;
    price: number;
    image: string;
    quantity: number;
    size?: string;
}

export class Cart {
    public items: CartItem[];

    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
        this.updateDisplay(); // For cart page
    }

    private loadCart(): CartItem[] {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    private saveCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    public addItem(product: Omit<CartItem, 'quantity'>): void {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartCount();
        this.updateDisplay();
        this.showAddedToCartMessage(product);
    }

    public removeItem(itemId: string): void {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
        this.updateDisplay();
    }

    public updateQuantity(itemId: string, newQuantity: number): void {
        if (newQuantity <= 0) {
            this.removeItem(itemId);
            return;
        }

        const item = this.items.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartCount();
            this.updateDisplay();
        }
    }

    public getTotalItems(): number {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    public getTotal(): number {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    public updateCartCount(): void {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems().toString();
        }
    }

    public updateDisplay(): void {
        // Only runs if on cart page (has element with id 'cart-content')
        const cartContent = document.getElementById('cart-content');
        if (!cartContent) return;

        const langCode = i18n.getCurrentLang();
        const lang = content[langCode]; // We assume content structure matches
        // Accessing keys dynamically might require type assertion or better structure in content.ts
        // For now, let's use 'as any' safely or check if keys exist

        // Helper to get translation
        const t = (key: string) => (lang as any)[key] || key;

        const cartCount = document.getElementById('cart-count');
        if (cartCount) cartCount.textContent = this.getTotalItems().toString();

        if (this.items.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <h3 class="empty-cart-message">${t('cart.empty')}</h3>
                    <p class="empty-cart-subtitle">${t('cart.emptySubtitle')}</p>
                    <a href="Collection.html" class="continue-shopping-btn">${t('cart.continueShopping')}</a>
                </div>
            `;
            return;
        }

        cartContent.innerHTML = `
            <div class="cart-content">
                <div class="cart-items">
                    ${this.items.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" class="item-image">
                            <div class="item-details">
                                <div class="item-name">${item.name}${item.size ? ` - ${t('label.size')}: ${item.size}` : ''}</div>
                                <div class="item-price">${item.price}€</div>
                                <div class="quantity-controls">
                                    <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                                </div>
                            </div>
                            <button class="remove-btn" onclick="cart.removeItem('${item.id}')">${t('actions.remove')}</button>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-summary">
                    <h3 class="summary-title">${t('cart.summary')}</h3>
                    <div class="summary-line">
                        <span>${t('cart.subtotal')}</span>
                        <span>${this.getTotal()}€</span>
                    </div>
                    <div class="summary-line">
                        <span>${t('cart.shipping')}</span>
                        <span>${t('cart.free')}</span>
                    </div>
                    <div class="summary-total">
                        <span>${t('cart.total')}</span>
                        <span>${this.getTotal()}€</span>
                    </div>
                    <button class="checkout-btn" onclick="checkout()">${t('actions.checkout')}</button>
                </div>
            </div>
        `;
    }

    private showAddedToCartMessage(product: Partial<CartItem>): void {
        const langCode = i18n.getCurrentLang();
        const lang = content[langCode] as any;
        const notification = document.createElement('div');
        notification.className = "cart-notification"; // Use class for styling ideally, but keeping inline provided style

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
            color: var(--text-main);
            padding: 15px 25px;
            border-radius: 15px;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(67, 36, 99, 0.25);
            font-weight: 600;
            animation: slideInRight 0.3s ease;
        `;
        const sizeText = product.size ? ` (${lang['label.size'] || 'Size'}: ${product.size})` : '';
        const addedMessage = lang['messages.addedToCart'] || 'added to cart';
        notification.textContent = `${product.name}${sizeText} ${addedMessage}`.trim();

        // Add animation style if not exists (checked by ID usually but using inline style block here)
        if (!document.getElementById('slideInRight-style')) {
            const animationStyle = document.createElement('style');
            animationStyle.id = 'slideInRight-style';
            animationStyle.textContent = `
                 @keyframes slideInRight {
                     from { transform: translateX(100%); opacity: 0; }
                     to { transform: translateX(0); opacity: 1; }
                 }
             `;
            document.head.appendChild(animationStyle);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

export const cart = new Cart();

// --- Global Functions Exposed to Window ---

export function addToCartWithSize(productId: string, productName: string, productPrice: string, productImage: string, addToCartButton: HTMLElement): void {
    const selectedSize = getSelectedSize(addToCartButton);
    const item: Omit<CartItem, 'quantity'> = {
        id: `${productId}-${selectedSize}`,
        productId: productId,
        name: productName,
        price: parseInt(productPrice),
        image: productImage,
        size: selectedSize
    };
    cart.addItem(item);
}

function getSelectedSize(addToCartButton: HTMLElement): string {
    const productCard = addToCartButton.closest('.product-card');
    if (!productCard) return 'M';
    const selectedSizeButton = productCard.querySelector('.size-option.selected');
    return selectedSizeButton ? selectedSizeButton.textContent || 'M' : 'M';
}

export function selectSize(button: HTMLElement): void {
    const parent = button.parentNode;
    if (!parent) return;
    const sizeOptions = parent.querySelectorAll('.size-option');
    sizeOptions.forEach((option: any) => option.classList.remove('selected'));
    button.classList.add('selected');
}

export function showMoreProducts(): void {
    const hiddenProducts = document.querySelectorAll('.product-card.hidden');
    const showMoreBtn = document.querySelector('.show-more-btn');

    hiddenProducts.forEach((product: any) => {
        product.classList.remove('hidden');
        product.style.animation = 'fadeInUp 0.6s ease forwards';
    });

    if (showMoreBtn) showMoreBtn.classList.add('hidden');
}

export function quickView(productId: string): void {
    const product = getProductData(productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(47, 28, 71, 0.45);
        backdrop-filter: blur(12px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    const langCode = i18n.getCurrentLang();
    const lang = content[langCode] as any;
    const addToCartText = lang['actions.addToCart'] || 'Add to Cart';

    // Using inline onclick for button inside modal is tricky if addToCartWithSize is not global
    // But we will expose it to window.
    // However, the onclick string is eval'd in global scope.
    // So window.addToCartWithSize needs to be available.

    modal.innerHTML = `
        <div style="
            background: var(--surface-strong);
            backdrop-filter: blur(18px);
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            color: var(--text-main);
            text-align: center;
            position: relative;
            box-shadow: 0 20px 48px rgba(67, 36, 99, 0.2);
        ">
            <button class="modal-close-btn" style="
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                color: var(--text-main);
                font-size: 24px;
                cursor: pointer;
            ">×</button>
            <img src="${product.image}" alt="${product.name}" style="
                width: 200px;
                height: 200px;
                object-fit: cover;
                border-radius: 15px;
                margin-bottom: 20px;
            ">
            <h3 style="margin-bottom: 10px; font-size: 1.5rem;">${product.name}</h3>
            <p style="margin-bottom: 15px; color: var(--text-muted); line-height: 1.5;">${product.description}</p>
            <div style="font-size: 1.3rem; font-weight: 600; margin-bottom: 20px; color: var(--primary-dark);">${product.price}€</div>
            <button class="modal-add-btn" style="
                background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
                border: none;
                color: var(--text-main);
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 1px;
            ">${addToCartText}</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close-btn')?.addEventListener('click', () => modal.remove());
    modal.querySelector('.modal-add-btn')?.addEventListener('click', function (this: HTMLElement) {
        modal.remove();
        // Mimic the button element for getSelectedSize (which expects closest product-card, but here we don't have it)
        // Actually, quickView adds with default size usually or we should add size selector in modal?
        // Original code: addToCartWithSize(..., this)
        // But 'this' here is the modal button, not inside product-card.
        // So getSelectedSize will fail or return default 'M'.
        // Let's assume default M for quick view addition as per original logic structure if it relied on DOM structure which it did.
        // Or we can pass a dummy element.
        addToCartWithSize(product.id, product.name, product.price.toString(), product.image, this);
    });

    // Close by clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}


export function toggleWishlist(button: HTMLElement, productId: string): void {
    let wishlist: string[] = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const langCode = i18n.getCurrentLang();
    const lang = content[langCode] as any;

    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        button.innerHTML = '♡';
        button.style.color = 'rgba(255, 255, 255, 0.6)';
        showNotification(lang['messages.wishlistRemoved'] || 'Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        button.innerHTML = '♥';
        button.style.color = '#ff6b6b';
        showNotification(lang['messages.wishlistAdded'] || 'Added to wishlist', 'success');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function showNotification(message: string, type: 'success' | 'warning' | 'info' | 'error' = 'info'): void {
    const notification = document.createElement('div');
    const colors = {
        success: '#c9ffd7',
        warning: '#ffe9a7',
        info: '#d0d8ff',
        error: '#ffb3c6'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
        color: var(--text-main);
        padding: 15px 25px;
        border-radius: 15px;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(67, 36, 99, 0.25);
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid ${colors[type]};
        max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}


export function checkout(): void {
    alert('Redirecting to checkout... (Feature to implement)');
}

// Expose functions to window for HTML onclick attributes
(window as any).addToCartWithSize = addToCartWithSize;
(window as any).selectSize = selectSize;
(window as any).showMoreProducts = showMoreProducts;
(window as any).quickView = quickView;
(window as any).toggleWishlist = toggleWishlist;
(window as any).checkout = checkout;
(window as any).cart = cart; // Expose cart instance if needed

