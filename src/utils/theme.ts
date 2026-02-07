import { branding } from '../config/branding';

export function applyTheme(): void {
    const root = document.documentElement;
    const colors = branding.colors;

    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-dark', colors.primaryDark);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--text-main', colors.textMain);
    root.style.setProperty('--text-muted', colors.textMuted);
    root.style.setProperty('--nav-bg', colors.navBg);
    root.style.setProperty('--bg-gradient', `linear-gradient(135deg, ${colors.bgGradientStart} 0%, ${colors.bgGradientEnd} 100%)`);
    root.style.setProperty('--surface', colors.surface);
    root.style.setProperty('--surface-strong', colors.surfaceStrong);
    root.style.setProperty('--border', colors.border);

    // Update title if needed
    if (branding.siteName) {
        document.title = branding.siteName;
    }
}
