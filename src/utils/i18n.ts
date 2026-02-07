import { content } from '../config/content';

type Language = 'en' | 'fr';

export class I18n {
    private currentLang: Language = 'en';

    constructor() {
        this.init();
    }

    private init(): void {
        const savedLang = localStorage.getItem('language') as Language;
        this.currentLang = savedLang || 'en';
        this.updateContent();
        this.bindEvents();
    }

    // Bind Switch Language buttons
    private bindEvents(): void {
        // Check if window.switchLanguage is called from inline HTML
        (window as any).switchLanguage = (lang: Language) => {
            this.setLanguage(lang);
        };
    }

    public setLanguage(lang: Language): void {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.updateContent();
        this.updateActiveButton();
    }

    private updateActiveButton(): void {
        document.querySelectorAll(".language-btn").forEach(btn => btn.classList.remove("active"));
        // Try to find button with onclick="switchLanguage('LANG')"
        const activeBtn = document.querySelector(`button[onclick*="'${this.currentLang}'"]`);
        if (activeBtn) {
            activeBtn.classList.add("active");
        }
    }

    private updateContent(): void {
        const dictionary = content[this.currentLang];

        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = (element as HTMLElement).dataset.i18n;
            const attr = (element as HTMLElement).dataset.i18nAttr;

            if (!key || !dictionary[key as keyof typeof dictionary]) return;

            const value = dictionary[key as keyof typeof dictionary];

            if (attr) {
                element.setAttribute(attr, value);
            } else {
                element.textContent = value;
            }
        });

        // Update cart text specifically if it has nested span
        // Note: The original HTML implementation was a bit generic. 
        // We are keeping it compatible with existing data-i18n
    }

    public getCurrentLang(): Language {
        return this.currentLang;
    }
}

export const i18n = new I18n();
