import { jsPDF } from 'jspdf';

// ─── SAFE COLOR RESOLVER ──────────────────────────────────────────────────────
// Tailwind v4 uses oklch() and oklab() in computed styles.
// We resolve them to safe rgb() using the browser's own color engine.

const _colorCache = new Map<string, string>();
let _colorProbe: HTMLElement | null = null;

/**
 * Ask the browser to resolve any CSS color string (including oklch, oklab,
 * color(), etc.) to a plain rgb() / rgba() string.
 * Works by setting the color on a hidden element and reading it back.
 */
const resolveToRgb = (colorStr: string): string => {
    if (!colorStr) return 'transparent';
    const s = colorStr.trim();
    if (!s || s === 'transparent' || s === 'inherit' || s === 'initial' || s === 'unset') return s;
    if (s.startsWith('rgb') && !s.includes('oklch') && !s.includes('oklab')) return s;

    if (_colorCache.has(s)) return _colorCache.get(s)!;

    try {
        if (!_colorProbe) {
            _colorProbe = document.createElement('div');
            _colorProbe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;pointer-events:none;';
            document.body.appendChild(_colorProbe);
        }
        _colorProbe.style.color = '';
        _colorProbe.style.color = s;
        const resolved = window.getComputedStyle(_colorProbe).color;
        const result = (resolved && resolved !== '' && !resolved.includes('oklch') && !resolved.includes('oklab'))
            ? resolved
            : 'rgb(136,136,136)';
        _colorCache.set(s, result);
        return result;
    } catch {
        _colorCache.set(s, 'rgb(136,136,136)');
        return 'rgb(136,136,136)';
    }
};

/** CSS properties that can hold color values */
const COLOR_STYLE_PROPS = [
    'color', 'backgroundColor',
    'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
    'outlineColor', 'textDecorationColor', 'caretColor', 'fill', 'stroke',
] as const;

/**
 * For every element in the live DOM, read its computed color properties
 * (which the browser has already resolved from oklch → rgb), then write
 * those safe rgb() values as inline styles on the corresponding clone element.
 *
 * This is the ONLY reliable way to handle Tailwind v4's oklch/oklab colors
 * with html2canvas, because html2canvas parses CSS text — not computed values.
 */
const stampComputedColorsOntoClone = (liveRoot: Element, cloneRoot: Element) => {
    const liveEls = [liveRoot, ...Array.from(liveRoot.querySelectorAll('*'))];
    const cloneEls = [cloneRoot, ...Array.from(cloneRoot.querySelectorAll('*'))];
    const len = Math.min(liveEls.length, cloneEls.length);

    for (let i = 0; i < len; i++) {
        const live = liveEls[i] as HTMLElement;
        const clone = cloneEls[i] as HTMLElement;
        if (!live || !clone || typeof clone.style === 'undefined') continue;

        try {
            const cs = window.getComputedStyle(live);

            for (const prop of COLOR_STYLE_PROPS) {
                const val = cs[prop as keyof CSSStyleDeclaration] as string;
                if (val && (val.includes('oklch') || val.includes('oklab') || val.includes('color('))) {
                    (clone.style as any)[prop] = resolveToRgb(val);
                }
            }

            // box-shadow can embed colors — just strip it to avoid parse errors
            const shadow = cs.boxShadow;
            if (shadow && (shadow.includes('oklch') || shadow.includes('oklab'))) {
                clone.style.boxShadow = 'none';
            }

            // background shorthand
            const bg = cs.background;
            if (bg && (bg.includes('oklch') || bg.includes('oklab'))) {
                clone.style.background = resolveToRgb(cs.backgroundColor);
            }

        } catch {
            // skip inaccessible elements (cross-origin iframes, etc.)
        }
    }
};

// ─── IMAGE LOADER ─────────────────────────────────────────────────────────────

const loadImageAsBase64 = (url: string): Promise<string> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const c = document.createElement('canvas');
            c.width = img.width;
            c.height = img.height;
            const ctx = c.getContext('2d');
            if (!ctx) return reject(new Error('No canvas context'));
            ctx.drawImage(img, 0, 0);
            resolve(c.toDataURL('image/png'));
        };
        img.onerror = () => reject(new Error('Image load failed'));
        img.src = url;
    });

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

/**
 * Capture an HTML element as a PDF, handling Tailwind v4's oklch/oklab colors.
 *
 * Strategy:
 *  1. Use html2canvas with `onclone` callback.
 *  2. In `onclone`, walk the live DOM in parallel with the cloned DOM.
 *  3. For each element, read computed color values from the LIVE element
 *     (browser has already resolved oklch → rgb) and write them as inline
 *     styles on the CLONE element (which html2canvas will render).
 *  4. This means html2canvas never has to parse oklch/oklab — it only sees rgb().
 */
export const generatePDF = async (elementId: string, filename: string): Promise<boolean> => {
    // Dynamically import html2canvas to keep initial bundle small
    const { default: html2canvas } = await import('html2canvas');

    let canvas: HTMLCanvasElement | null = null;

    try {
        const element = document.getElementById(elementId);
        if (!element) throw new Error(`Element #${elementId} not found`);

        canvas = await html2canvas(element, {
            scale: 1.5,
            useCORS: true,
            allowTaint: false,
            logging: false,
            backgroundColor: '#ffffff',
            onclone: (_clonedDoc, clonedElement) => {
                // Stamp computed (browser-resolved) colors from live → clone
                stampComputedColorsOntoClone(element, clonedElement);

                // Safety-net: override any remaining oklch CSS custom properties
                const style = _clonedDoc.createElement('style');
                style.textContent = `
                    *, *::before, *::after { color-scheme: light only !important; }
                    :root, html, body {
                        --color-slate-50:#f8fafc!important;--color-slate-100:#f1f5f9!important;
                        --color-slate-200:#e2e8f0!important;--color-slate-300:#cbd5e1!important;
                        --color-slate-400:#94a3b8!important;--color-slate-500:#64748b!important;
                        --color-slate-600:#475569!important;--color-slate-700:#334155!important;
                        --color-slate-800:#1e293b!important;--color-slate-900:#0f172a!important;
                        --color-gray-50:#f9fafb!important;--color-gray-100:#f3f4f6!important;
                        --color-gray-200:#e5e7eb!important;--color-gray-300:#d1d5db!important;
                        --color-gray-400:#9ca3af!important;--color-gray-500:#6b7280!important;
                        --color-gray-600:#4b5563!important;--color-gray-700:#374151!important;
                        --color-gray-800:#1f2937!important;--color-gray-900:#111827!important;
                        --color-blue-50:#eff6ff!important;--color-blue-100:#dbeafe!important;
                        --color-blue-500:#3b82f6!important;--color-blue-600:#2563eb!important;
                        --color-blue-700:#1d4ed8!important;--color-blue-800:#1e40af!important;
                        --color-blue-900:#1e3a8a!important;
                        --color-teal-50:#f0fdfa!important;--color-teal-100:#ccfbf1!important;
                        --color-teal-400:#2dd4bf!important;--color-teal-500:#14b8a6!important;
                        --color-teal-600:#0d9488!important;--color-teal-700:#0f766e!important;
                        --color-green-50:#f0fdf4!important;--color-green-100:#dcfce7!important;
                        --color-green-500:#22c55e!important;--color-green-600:#16a34a!important;
                        --color-amber-50:#fffbeb!important;--color-amber-100:#fef3c7!important;
                        --color-amber-400:#fbbf24!important;--color-amber-500:#f59e0b!important;
                        --color-amber-600:#d97706!important;
                        --color-orange-50:#fff7ed!important;--color-orange-500:#f97316!important;
                        --color-red-50:#fef2f2!important;--color-red-500:#ef4444!important;
                        --color-red-600:#dc2626!important;
                        --color-purple-50:#faf5ff!important;--color-purple-100:#f3e8ff!important;
                        --color-purple-500:#a855f7!important;--color-purple-600:#9333ea!important;
                        --color-pink-50:#fdf2f8!important;--color-pink-500:#ec4899!important;
                        --color-rose-50:#fff1f2!important;--color-rose-500:#f43f5e!important;
                        --color-white:#ffffff!important;--color-black:#000000!important;
                        --color-emerald-50:#ecfdf5!important;--color-emerald-500:#10b981!important;
                        --color-emerald-600:#059669!important;
                        --color-indigo-500:#6366f1!important;--color-violet-500:#8b5cf6!important;
                    }
                `;
                _clonedDoc.head.appendChild(style);
            },
        });

        // Load logo (optional — fails silently)
        let logoBase64: string | null = null;
        try { logoBase64 = await loadImageAsBase64('/logo.png'); } catch { /* no logo */ }

        // ── PDF LAYOUT ────────────────────────────────────────────────────
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const PW = 210, PH = 297;
        const HDR = 26, FTR = 18, MX = 6;
        const CW = PW - MX * 2;
        const CONTENT_H = PH - HDR - FTR - 4;

        const imgH_pdf = (canvas.height * CW) / canvas.width;
        const totalPages = Math.ceil(imgH_pdf / CONTENT_H);
        const imgData = canvas.toDataURL('image/jpeg', 0.9);

        const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

        for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage();

            // White page background
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, 0, PW, PH, 'F');

            // Content image
            const yOff = HDR + 2 - i * CONTENT_H;
            pdf.addImage(imgData, 'JPEG', MX, yOff, CW, imgH_pdf, undefined, 'FAST');

            // ── HEADER ────────────────────────────────────────────────────
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, 0, PW, HDR, 'F');
            pdf.setFillColor(30, 58, 138); pdf.rect(0, 0, PW, 3, 'F');
            pdf.setFillColor(13, 148, 136); pdf.rect(0, 3, PW, 1, 'F');
            pdf.setDrawColor(220, 228, 240); pdf.setLineWidth(0.4);
            pdf.line(MX, HDR - 0.5, PW - MX, HDR - 0.5);

            if (logoBase64) pdf.addImage(logoBase64, 'PNG', MX, (HDR - 16) / 2 + 1, 16, 16);
            const TX = logoBase64 ? MX + 19 : MX;

            pdf.setFont('helvetica', 'bold'); pdf.setFontSize(13); pdf.setTextColor(30, 58, 138);
            pdf.text('VRK WEALTH', TX, 12);
            pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(100, 116, 139);
            pdf.text('Strategic Financial Solutions  |  Save Today for Better Future', TX, 17);
            pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7); pdf.setTextColor(30, 58, 138);
            pdf.text(`Date: ${today}`, PW - MX, 11, { align: 'right' });
            pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.5); pdf.setTextColor(100, 116, 139);
            pdf.text(`Page ${i + 1} of ${totalPages}`, PW - MX, 17, { align: 'right' });

            // ── FOOTER ────────────────────────────────────────────────────
            const FY = PH - FTR;
            pdf.setFillColor(245, 247, 250); pdf.rect(0, FY, PW, FTR, 'F');
            pdf.setDrawColor(30, 58, 138); pdf.setLineWidth(0.5); pdf.line(0, FY, PW, FY);
            pdf.setFillColor(13, 148, 136); pdf.rect(0, FY, 3, FTR, 'F');

            pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7); pdf.setTextColor(30, 58, 138);
            pdf.text('VRK Wealth Management', MX + 3, FY + 6);
            pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6); pdf.setTextColor(80, 95, 120);
            pdf.text('www.vrkwealth.in  |  connect@vrkwealth.in', MX + 3, FY + 11);

            pdf.setFont('helvetica', 'italic'); pdf.setFontSize(5.2); pdf.setTextColor(120, 130, 150);
            pdf.text(
                'Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.',
                PW / 2, FY + 13, { align: 'center', maxWidth: 110 }
            );

            pdf.setFont('helvetica', 'bold'); pdf.setFontSize(6.5); pdf.setTextColor(30, 58, 138);
            pdf.text('AMFI Registered', PW - MX, FY + 6, { align: 'right' });
            pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6); pdf.setTextColor(80, 95, 120);
            pdf.text('Mutual Fund Distributor', PW - MX, FY + 11, { align: 'right' });
        }

        pdf.setProperties({
            title: filename.replace(/-/g, ' '),
            subject: 'Financial Investment Report by VRK Wealth',
            author: 'VRK Wealth Management',
            keywords: 'Investment, Finance, SIP, Mutual Fund, VRK Wealth',
            creator: 'VRK Wealth PDF Generator',
        });

        pdf.save(`${filename}.pdf`);
        return true;

    } catch (err: any) {
        console.error('PDF Generation Error:', err);
        throw new Error(err.message || 'Unknown PDF generation error');
    } finally {
        canvas = null;
    }
};
