(() => {
  const commonTranslations = {
    en: {
      "nav.home": "Home",
      "nav.collection": "Collection",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.cart": "Cart",
      "footer.about": "Exclusive Graou collection blending Lacoste heritage with Miki's contemporary creativity.",
      "footer.products.title": "Products",
      "footer.products.new": "New Collection",
      "footer.products.men": "Men",
      "footer.products.women": "Women",
      "footer.products.kids": "Kids",
      "footer.products.accessories": "Accessories",
      "footer.products.footwear": "Footwear",
      "footer.services.title": "Services",
      "footer.services.shipping": "Shipping",
      "footer.services.returns": "Returns & Exchanges",
      "footer.services.sizeGuide": "Size Guide",
      "footer.services.care": "Product Care",
      "footer.services.support": "Customer Service",
      "footer.services.stores": "Stores",
      "footer.company.title": "About",
      "footer.company.story": "Our Story",
      "footer.company.sustainability": "Sustainability",
      "footer.company.careers": "Careers",
      "footer.company.press": "Press",
      "footer.company.partnerships": "Partnerships",
      "footer.company.loyalty": "Loyalty Program",
      "footer.newsletter.title": "Newsletter",
      "footer.newsletter.copy": "Stay informed about our latest releases and exclusive offers.",
      "footer.newsletter.placeholder": "Your email address",
      "footer.newsletter.cta": "Subscribe",
      "footer.legal.terms": "Terms & Conditions",
      "footer.legal.privacy": "Privacy Policy",
      "footer.legal.cookies": "Cookies",
      "footer.legal.notice": "Legal Notice",
      "footer.copy": "© 2025 LACOSTE X MIKI. All rights reserved.",
      "label.size": "Size",
      "actions.addToCart": "Add to cart",
      "actions.quickView": "Quick view",
      "actions.showMore": "Show more products",
      "actions.showLess": "Show less products"
    },
    fr: {
      "nav.home": "Accueil",
      "nav.collection": "Collection",
      "nav.about": "À propos",
      "nav.contact": "Contact",
      "nav.cart": "Panier",
      "footer.about": "Collection Graou exclusive alliant l'héritage Lacoste et la créativité contemporaine de Miki.",
      "footer.products.title": "Produits",
      "footer.products.new": "Nouvelle Collection",
      "footer.products.men": "Homme",
      "footer.products.women": "Femme",
      "footer.products.kids": "Enfant",
      "footer.products.accessories": "Accessoires",
      "footer.products.footwear": "Chaussures",
      "footer.services.title": "Services",
      "footer.services.shipping": "Livraison",
      "footer.services.returns": "Retours & Échanges",
      "footer.services.sizeGuide": "Guide des tailles",
      "footer.services.care": "Entretien des produits",
      "footer.services.support": "Service client",
      "footer.services.stores": "Boutiques",
      "footer.company.title": "À propos",
      "footer.company.story": "Notre histoire",
      "footer.company.sustainability": "Développement durable",
      "footer.company.careers": "Carrières",
      "footer.company.press": "Presse",
      "footer.company.partnerships": "Partenariats",
      "footer.company.loyalty": "Programme de fidélité",
      "footer.newsletter.title": "Newsletter",
      "footer.newsletter.copy": "Restez informé de nos dernières nouveautés et offres exclusives.",
      "footer.newsletter.placeholder": "Votre adresse email",
      "footer.newsletter.cta": "S'abonner",
      "footer.legal.terms": "Conditions générales",
      "footer.legal.privacy": "Politique de confidentialité",
      "footer.legal.cookies": "Cookies",
      "footer.legal.notice": "Mentions légales",
      "footer.copy": "© 2025 LACOSTE X MIKI. Tous droits réservés.",
      "label.size": "Taille",
      "actions.addToCart": "Ajouter au panier",
      "actions.quickView": "Aperçu",
      "actions.showMore": "Voir plus de produits",
      "actions.showLess": "Voir moins de produits"
    }
  };

  function mergeTranslations(common, specific = {}) {
    return {
      en: { ...common.en, ...(specific.en || {}) },
      fr: { ...common.fr, ...(specific.fr || {}) }
    };
  }

  function applyTranslations(language, dictionaries) {
    const dictionary = dictionaries[language];
    if (!dictionary) {
      return;
    }

    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;
      const attr = element.dataset.i18nAttr;
      const langKey = language.charAt(0).toUpperCase() + language.slice(1);
      const fallbackKey = attr
        ? `i18n${langKey}${attr.charAt(0).toUpperCase()}${attr.slice(1)}`
        : `i18n${langKey}`;
      const datasetValue = element.dataset[fallbackKey];
      const value = dictionary[key] !== undefined ? dictionary[key] : datasetValue;
      if (value === undefined) {
        return;
      }

      if (attr) {
        element.setAttribute(attr, value);
      } else {
        element.textContent = value;
      }
    });

    if (dictionary["page.title"]) {
      document.title = dictionary["page.title"];
    }
  }

  window.initI18n = function (pageTranslations = {}, options = {}) {
    const dictionaries = mergeTranslations(commonTranslations, pageTranslations);
    let currentLanguage = localStorage.getItem("language") || options.defaultLanguage || "en";

    window.getTranslation = function (key) {
      const dictionary = dictionaries[currentLanguage];
      return dictionary && Object.prototype.hasOwnProperty.call(dictionary, key) ? dictionary[key] : key;
    };

    function setLanguage(lang) {
      const fallback = dictionaries[lang] ? lang : "en";
      currentLanguage = fallback;
      localStorage.setItem("language", currentLanguage);

      document.querySelectorAll(".language-btn").forEach(btn => btn.classList.remove("active"));
      const activeButton = document.querySelector(`[onclick="switchLanguage('${currentLanguage}')"]`);
      if (activeButton) {
        activeButton.classList.add("active");
      }

      applyTranslations(currentLanguage, dictionaries);
    }

    window.switchLanguage = function (lang) {
      setLanguage(lang);
    };

    document.addEventListener("DOMContentLoaded", () => {
      setLanguage(currentLanguage);
    });
  };
})();
