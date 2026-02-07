# 🚀 Deployment Guide

## 1. Vercel (Recommended)

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Go to [Vercel](https://vercel.com) and creating a new project.
3.  Import your repository.
4.  **Environment Variables**:
    -   Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_STRIPE_PUBLIC_KEY` in the Vercel Dashboard settings.
5.  Click **Deploy**. Vercel detects Vite automatically.

## 2. Netlify

1.  Push your code to Git.
2.  Go to [Netlify](https://netlify.com) and "New site from Git".
3.  **Build Settings**:
    -   Build command: `npm run build`
    -   Publish directory: `dist`
4.  **Environment Variables**:
    -   Go to Site Settings > Build & deploy > Environment.
    -   Add your keys.
5.  **Redirects**:
    -   Create a `_redirects` file in `public/` with `/* /index.html 200` to handle React Router client-side routing.

## 3. Standard Hosting (VPS/Apache/Nginx)

1.  Run the build locally:
    ```bash
    npm run build
    ```
2.  Upload the contents of the `dist/` folder to your server's public html directory.
3.  Configure your server to redirect all requests to `index.html` (for proper routing).

---

# Version Française

## 1. Vercel (Recommandé)

1.  Poussez votre code sur Git.
2.  Importez le projet sur Vercel.
3.  Ajoutez les variables d'environnement dans les réglages du projet.
4.  Déployez.

## 2. Netlify

1.  Nouveau site depuis Git.
2.  Commande de build : `npm run build`.
3.  Dossier de publication : `dist`.
4.  Ajoutez un fichier `_redirects` dans `public/` contenant `/* /index.html 200`.

## 3. Hébergement Classique

1.  `npm run build`.
2.  Envoyez le contenu de `dist/` sur votre serveur.
3.  Configurez les réécritures d'URL vers `index.html`.
