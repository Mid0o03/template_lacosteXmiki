
import * as React from 'react';
import { Product } from '../config/products';
import { useCart } from '../contexts/CartContext';
import { useI18n } from '../contexts/I18nContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const { t } = useI18n();

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
                <div>
                    <h3>{product.name}</h3>
                    <p className="product-price">€{product.price}</p>
                </div>
                <button
                    className="cta-button"
                    style={{ fontSize: '0.8rem', padding: '10px 20px', width: '100%', marginTop: 'auto' }}
                    onClick={() => addToCart(product)}
                >
                    {t('product.addToCart')}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
