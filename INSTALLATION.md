# 📥 Installation Guide

This guide will help you set up the **LACOSTE X MIKI** template on your local machine.

## Prerequisites

-   **Node.js** (v16 or higher)
-   **npm** (comes with Node.js) or **yarn** / **pnpm**
-   A **Supabase** account (for Authentication)
-   A **Stripe** account (for Payments)

## Steps

### 1. Unzip the Project
Extract the downloaded zip file to your desired location.

Open your terminal and navigate to the project folder:
```bash
cd template-lacostexmiki
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Duplicate the example environment file:
```bash
cp .env.example .env
```

Open `.env` and fill in your keys:
-   **VITE_SUPABASE_URL**: Your Supabase Project URL.
-   **VITE_SUPABASE_ANON_KEY**: Your Supabase Anon Public Key.
-   **VITE_STRIPE_PUBLIC_KEY**: Your Stripe Publishable Key.

### 4. Run Development Server
```bash
npm run dev
```
The site will run at `http://localhost:5173`.

---

# Version Française

## Prérequis

-   **Node.js** (v16+)
-   **npm**
-   Comptes **Supabase** et **Stripe**.

## Étapes

1.  **Télécharger** le template et ouvrez le dossier dans votre terminal.
2.  **Installer** les dépendances : `npm install`
3.  **Configurer** les variables d'environnement :
    -   `cp .env.example .env`
    -   Remplissez les clés Supabase et Stripe dans `.env`.
4.  **Lancer** le serveur : `npm run dev`
