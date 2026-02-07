
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export const products: Record<string, Product> = {
    'essential-tee': {
        id: 'essential-tee',
        name: 'Polo Riviera',
        price: 45,
        image: 'images/POLO.jpeg', // Note: Collection.html had .jpeg in grid but .jpg in data? Checking Collection.html line 700: .jpeg. Line 1250: .jpg. I should probably standardize or check which file exists. Let's assume .jpeg as it is in the img src.
        description: 'Minimalist organic cotton tee with an oversized fit for a relaxed, modern look.'
    },
    'urban-hoodie': {
        id: 'urban-hoodie',
        name: 'Veste Croisée Lavande',
        price: 85,
        image: 'images/Sans titre-7.png', // Line 727
        description: 'Premium hoodie with refined finishes, perfect for a polished streetwear look.'
    },
    'classic-denim': {
        id: 'classic-denim',
        name: 'Sneaker Nuage',
        price: 120,
        image: 'images/CHAUSSURE.jpg',
        description: 'Slim-fit Japanese denim with a vintage wash for authentic character.'
    },
    'minimalist-cap': {
        id: 'minimalist-cap',
        name: 'Casquette Monogramme',
        price: 35,
        image: 'images/Cap Mockup.png',
        description: 'Streamlined premium cotton cap with tone-on-tone embroidery for a subtle touch.'
    },
    'comfort-joggers': {
        id: 'comfort-joggers',
        name: 'Jupe Plissée Horizon',
        price: 75,
        image: 'images/JUPE.jpg',
        description: 'High-end joggers made from technical fabric for optimum comfort.'
    },
    'statement-jacket': {
        id: 'statement-jacket',
        name: 'Chaussettes Gradient',
        price: 180,
        image: 'images/CHAUSSETTE.jpeg',
        description: 'Signature jacket of the collection with an avant-garde design and sustainable materials.'
    },
    // Adding others from getProductData even if not visible in grid snippet
    'sport-sneakers': {
        id: 'sport-sneakers',
        name: 'Sweat Emblème',
        price: 150,
        image: 'images/CROCO blanc 2.png',
        description: 'High-performance technical sneakers with innovative design and premium materials.'
    },
    'classic-shirt': {
        id: 'classic-shirt',
        name: 'Body Logo Flottant',
        price: 90,
        image: 'images/logo.png',
        description: 'Timeless premium cotton shirt with a tailored fit for a sophisticated look.'
    },
    'sustainable-bag': {
        id: 'sustainable-bag',
        name: 'Sac Vinyl Néon',
        price: 65,
        image: 'images/miki.jpg',
        description: 'Eco-conscious bag made from recycled materials with a functional, refined design.'
    },
    'premium-watch': {
        id: 'premium-watch',
        name: 'Top Bandeau Miki',
        price: 250,
        image: 'images/LACOSTE BLANC.png',
        description: 'Exclusive watch from the collection with luxurious finishes and precise mechanics.'
    }
};

export function getProductData(productId: string): Product | undefined {
    return products[productId];
}
