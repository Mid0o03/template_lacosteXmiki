# 🎨 Customization Guide / Guide de Personnalisation

The template is designed to be "White-Label", meaning you can change the branding without diving into the React code.

## 1. Branding (Logo, Colors, Contact)

Open `src/config/branding.ts`.
You can modify:
-   `siteName`: The name displayed in the browser tab and footer.
-   `contact`: Email, phone, address, and social links.
-   `meta`: Author and theme color.

To change the **Logo**:
-   Replace the file at `public/images/LOGO x MIKI CLASSIQUE blanc.png`.
-   Or update the path in `src/components/Navbar.tsx` (line 6).

## 2. Text Content

Open `src/config/content.ts`.
This file contains all the text for the Landing Page:
-   **Hero**: Title, subtitle, CTA button text.
-   **Components**: About section text, Features, etc.
-   **Footer**: Copyright text and links.

## 3. Styles (CSS)

Styles are located in `src/style.css`.
-   **Variables**: check `:root` for global colors and fonts.
-   **Tailwind**: If you prefer Tailwind, you can install it, but the current setup uses vanilla CSS/SCSS for maximum compatibility and performance with GSAP.

---

# Version Française

## 1. Identité Visuelle

Modifiez `src/config/branding.ts` pour changer :
-   Le nom du site.
-   Les infos de contact (email, réseaux sociaux).

Pour le **Logo**, remplacez l'image dans `public/images/`.

## 2. Contenu Texte

Modifiez `src/config/content.ts` pour changer les textes :
-   Titres du Hero.
-   Paragraphes "À Propos".
-   Liens du pied de page.

## 3. Styles

Les styles globaux sont dans `src/style.css`. Modifiez les variables CSS dans `:root` pour changer les couleurs principales.
