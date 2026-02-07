
import * as React from 'react';
import { useI18n } from '../contexts/I18nContext';
import { products } from '../config/products';
import ProductCard from '../components/ProductCard';

const Collection: React.FC = () => {
    const { t } = useI18n();
    const productList = Object.values(products);

    return (
        <div className="page-container collection-page" style={{ paddingTop: '150px' }}>
            <div className="container">
                <div className="page-header" style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <h1 className="section-title">{t('collection.title')}</h1>
                    {/* Add filters here if needed */}
                </div>

                <div className="product-grid">
                    {productList.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
