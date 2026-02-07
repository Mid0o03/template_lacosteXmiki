export type Language = 'en' | 'fr';

export const content: any = {
    en: {
        hero: {
            title: 'LACOSTE X MIKI',
            subtitle: 'Exclusive Collaboration 2024',
            cta: 'Discover Collection'
        },
        about: {
            title: 'About The Collab',
            description: 'A fusion of electronic pop culture and textile craftsmanship. Miki brings his unique vibrant universe to the classic elegance of Lacoste.',
            teaser: 'Limited Edition. Only 500 pieces worldwide.'
        },
        features: [
            {
                title: 'Premium Materials',
                description: 'Usage of high-grade organic cotton and recycled polymers.',
                icon: 'leaf'
            },
            {
                title: 'Exclusive Access',
                description: 'Unlock special digital content with every purchase.',
                icon: 'lock'
            },
            {
                title: 'Global Shipping',
                description: 'Free express shipping on all orders over 200€.',
                icon: 'globe'
            }
        ],
        footer: {
            copyright: '© 2024 Lacoste x Miki. All rights reserved.',
            links: [
                { text: 'Privacy Policy', url: '/privacy' },
                { text: 'Terms of Service', url: '/terms' }
            ]
        },
        contact: {
            title: 'Contact Us',
            subtitle: 'Have a question? We are here to help.',
            form: {
                name: 'Name',
                email: 'Email',
                message: 'Message',
                submit: 'Send Message'
            }
        },
        // Labels for cart and interactions
        'label.size': 'Size',
        'actions.addToCart': 'Add to Cart',
        'actions.remove': 'Remove',
        'actions.checkout': 'Checkout',
        'cart.empty': 'Your cart is empty',
        'cart.emptySubtitle': 'Looks like you have not added anything to your cart yet.',
        'cart.continueShopping': 'Continue Shopping',
        'cart.summary': 'Order Summary',
        'cart.subtotal': 'Subtotal',
        'cart.shipping': 'Shipping',
        'cart.free': 'Free',
        'cart.total': 'Total',
        'messages.addedToCart': 'added to cart',
        'messages.wishlistAdded': 'Added to wishlist',
        'messages.wishlistRemoved': 'Removed from wishlist'
    },
    fr: {
        hero: {
            title: 'LACOSTE X MIKI',
            subtitle: 'Collaboration Exclusive 2024',
            cta: 'Découvrir la Collection'
        },
        about: {
            title: 'À Propos',
            description: 'Une fusion entre la culture pop électronique et l\'artisanat textile. Miki apporte son univers vibrant à l\'élégance classique de Lacoste.',
            teaser: 'Édition Limitée. Seulement 500 pièces monde.'
        },
        features: [
            {
                title: 'Matériaux Premium',
                description: 'Coton bio de haute qualité et polymères recyclés.',
                icon: 'leaf'
            },
            {
                title: 'Accès Exclusif',
                description: 'Débloquez du contenu digital avec chaque achat.',
                icon: 'lock'
            },
            {
                title: 'Livraison Monde',
                description: 'Livraison express gratuite dès 200€.',
                icon: 'globe'
            }
        ],
        footer: {
            copyright: '© 2024 Lacoste x Miki. Tous droits réservés.',
            links: [
                { text: 'Confidentialité', url: '/privacy' },
                { text: 'Conditions', url: '/terms' }
            ]
        },
        contact: {
            title: 'Contactez-nous',
            subtitle: 'Une question ? Nous sommes là pour vous aider.',
            form: {
                name: 'Nom',
                email: 'Email',
                message: 'Message',
                submit: 'Envoyer'
            }
        },
        'label.size': 'Taille',
        'actions.addToCart': 'Ajouter au Panier',
        'actions.remove': 'Retirer',
        'actions.checkout': 'Commander',
        'cart.empty': 'Votre panier est vide',
        'cart.emptySubtitle': 'Il semblerait que vous n\'ayez rien ajouté pour le moment.',
        'cart.continueShopping': 'Continuer vos achats',
        'cart.summary': 'Résumé de la commande',
        'cart.subtotal': 'Sous-total',
        'cart.shipping': 'Livraison',
        'cart.free': 'Gratuite',
        'cart.total': 'Total',
        'messages.addedToCart': 'ajouté au panier',
        'messages.wishlistAdded': 'Ajouté à la liste de souhaits',
        'messages.wishlistRemoved': 'Retiré de la liste de souhaits'
    }
};
