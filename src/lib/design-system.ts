// ============================================
// BEST GELO - PREMIUM DESIGN SYSTEM
// Baseado na identidade visual: Azul (gelo/confiança), Vermelho (ação/urgência), Branco (pureza)
// Elemento de branding: Urso Polar (resistência, controle de temperatura, qualidade extrema)
// ============================================

export const designTokens = {
  // ============================================
  // CORES - Paleta Premium Industrial + Alimentar
  // ============================================
  colors: {
    // Primary - Azul Gelo (Confiança, Tecnologia, Frieza, Segurança)
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // Main brand blue
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
      DEFAULT: '#0ea5e9',
      foreground: '#ffffff',
    },

    // Secondary - Vermelho Ação (Urgência, Pedido, Energia)
    secondary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',  // Main CTA red
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
      DEFAULT: '#ef4444',
      foreground: '#ffffff',
    },

    // Accent - Dourado/Âmbar Premium (Qualidade, Prêmios, Destaque)
    accent: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      DEFAULT: '#f59e0b',
    },

    // Neutral - Brancos e Cinzas (Pureza, Higiene, Limpeza)
    neutral: {
      0: '#ffffff',
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },

    // Semantic colors
    success: {
      light: '#86efac',
      DEFAULT: '#22c55e',
      dark: '#166534',
    },
    warning: {
      light: '#fde047',
      DEFAULT: '#eab308',
      dark: '#854d0e',
    },
    error: {
      light: '#fca5a5',
      DEFAULT: '#ef4444',
      dark: '#991b1b',
    },

    // Glass/Frost effects
    glass: {
      light: 'rgba(255, 255, 255, 0.7)',
      medium: 'rgba(255, 255, 255, 0.5)',
      heavy: 'rgba(255, 255, 255, 0.3)',
      border: 'rgba(14, 165, 233, 0.2)',
      borderStrong: 'rgba(14, 165, 233, 0.4)',
    },

    // Gradientes de marca
    gradients: {
      primary: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      primaryHover: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      secondary: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      secondaryHover: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      hero: 'linear-gradient(180deg, rgba(14, 165, 233, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
      heroDark: 'linear-gradient(180deg, rgba(14, 165, 233, 0.12) 0%, rgba(255, 255, 255, 0) 100%)',
      polar: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #e0f2fe 100%)',
      ice: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)',
      cta: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
    },
  },

  // ============================================
  // TIPOGRAFIA - Industrial Strength + Clean Readability
  // ============================================
  typography: {
    // Display: Bebas Neue / Anton - Forte, Industrial, Impactante
    fontFamilies: {
      display: ['Bebas Neue', 'Anton', 'Oswald', 'sans-serif'],
      heading: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    },

    fontSizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
      '9xl': '8rem',      // 128px
    },

    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    lineHeights: {
      tight: 1.1,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },

    // Escala tipográfica responsiva (clamp)
    fluidType: {
      displayXl: 'clamp(3rem, 8vw, 8rem)',       // 48px - 128px
      displayLg: 'clamp(2.5rem, 6vw, 6rem)',     // 40px - 96px
      displayMd: 'clamp(2rem, 5vw, 4.5rem)',     // 32px - 72px
      displaySm: 'clamp(1.75rem, 4vw, 3rem)',    // 28px - 48px
      headingXl: 'clamp(1.5rem, 3vw, 2.5rem)',   // 24px - 40px
      headingLg: 'clamp(1.25rem, 2.5vw, 2rem)',  // 20px - 32px
      headingMd: 'clamp(1.125rem, 2vw, 1.5rem)', // 18px - 24px
      headingSm: 'clamp(1rem, 1.5vw, 1.25rem)',  // 16px - 20px
      bodyLg: 'clamp(1rem, 1.2vw, 1.125rem)',    // 16px - 18px
      bodyMd: 'clamp(0.875rem, 1vw, 1rem)',      // 14px - 16px
      bodySm: 'clamp(0.75rem, 0.8vw, 0.875rem)', // 12px - 14px
    },
  },

  // ============================================
  // ESPAÇAMENTO - Sistema 8px base
  // ============================================
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    7: '1.75rem',   // 28px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    14: '3.5rem',   // 56px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    28: '7rem',     // 112px
    32: '8rem',     // 128px
    36: '9rem',     // 144px
    40: '10rem',    // 160px
    44: '11rem',    // 176px
    48: '12rem',    // 192px
    52: '13rem',    // 208px
    56: '14rem',    // 224px
    60: '15rem',    // 240px
    64: '16rem',    // 256px
    72: '18rem',    // 288px
    80: '20rem',    // 320px
    96: '24rem',    // 384px
  },

  // ============================================
  // BORDAS E RAIOS
  // ============================================
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    full: '9999px',
  },

  // ============================================
  // SOMBRAS - Profundidade Industrial
  // ============================================
  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
    '2xl': '0 35px 60px -15px rgb(0 0 0 / 0.2)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

    // Brand shadows
    ice: '0 10px 40px -10px rgb(14 165 233 / 0.3), 0 4px 20px -4px rgb(14 165 233 / 0.15)',
    iceHover: '0 20px 60px -15px rgb(14 165 233 / 0.4), 0 8px 30px -8px rgb(14 165 233 / 0.2)',
    fire: '0 10px 40px -10px rgb(239 68 68 / 0.4), 0 4px 20px -4px rgb(239 68 68 / 0.2)',
    fireHover: '0 20px 60px -15px rgb(239 68 68 / 0.5), 0 8px 30px -8px rgb(239 68 68 / 0.3)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    glassHover: '0 16px 48px 0 rgba(31, 38, 135, 0.25)',
    polar: '0 0 0 1px rgba(14, 165, 233, 0.1), 0 4px 24px rgba(14, 165, 233, 0.08)',
  },

  // ============================================
  // ANIMAÇÕES - Suaves, Purposeful
  // ============================================
  animation: {
    durations: {
      instant: '0ms',
      fast: '150ms',
      normal: '250ms',
      slow: '350ms',
      slower: '500ms',
      slowest: '700ms',
    },
    easings: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Custom brand easings
      polar: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',  // Smooth, confident
      ice: 'cubic-bezier(0.16, 1, 0.3, 1)',           // Crisp, clean
      fire: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Energetic, bouncy
    },

    // Keyframe animations
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
      slideUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      slideDown: {
        '0%': { opacity: '0', transform: 'translateY(-20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      slideLeft: {
        '0%': { opacity: '0', transform: 'translateX(20px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      slideRight: {
        '0%': { opacity: '0', transform: 'translateX(-20px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      scaleIn: {
        '0%': { opacity: '0', transform: 'scale(0.95)' },
        '100%': { opacity: '1', transform: 'scale(1)' },
      },
      scaleOut: {
        '0%': { opacity: '1', transform: 'scale(1)' },
        '100%': { opacity: '0', transform: 'scale(0.95)' },
      },
      // Brand animations
      iceShimmer: {
        '0%': { backgroundPosition: '-200% 0' },
        '100%': { backgroundPosition: '200% 0' },
      },
      polarPulse: {
        '0%, 100%': { transform: 'scale(1)', opacity: '1' },
        '50%': { transform: 'scale(1.02)', opacity: '0.8' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' },
      },
      floatSlow: {
        '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
        '50%': { transform: 'translateY(-15px) rotate(2deg)' },
      },
      particleFall: {
        '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
        '10%': { opacity: '1' },
        '90%': { opacity: '1' },
        '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
      },
      progressFill: {
        '0%': { width: '0%' },
        '100%': { width: '100%' },
      },
      countUp: {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
  },

  // ============================================
  // BREAKPOINTS - Mobile First
  // ============================================
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
  },

  // ============================================
  // Z-INDEX
  // ============================================
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    popover: 600,
    tooltip: 700,
    toast: 800,
    max: 9999,
  },

  // ============================================
  // CONTAINER WIDTHS
  // ============================================
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
    '3xl': '1600px',
    full: '100%',
  },
} as const;

// ============================================
// COMPONENT VARIANTS - Class Names para Tailwind
// ============================================
export const componentVariants = {
  // Buttons
  button: {
    base: 'inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-xl transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    sizes: {
      xs: 'px-3 py-1.5 text-xs gap-1.5',
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2.5',
      lg: 'px-8 py-4 text-lg gap-3',
      xl: 'px-10 py-5 text-xl gap-3',
    },
    variants: {
      // Primary - Azul Gelo (Confiança, Ação Principal)
      primary: `
        bg-gradient-to-r from-primary-500 to-primary-600
        text-white
        shadow-ice
        hover:shadow-iceHover hover:from-primary-600 hover:to-primary-700
        active:from-primary-700 active:to-primary-800 active:scale-[0.98]
        focus-visible:ring-primary-500
      `,
      // Secondary - Vermelho Ação (Urgência, Pedido, WhatsApp)
      secondary: `
        bg-gradient-to-r from-secondary-500 to-secondary-600
        text-white
        shadow-fire
        hover:shadow-fireHover hover:from-secondary-600 hover:to-secondary-700
        active:from-secondary-700 active:to-secondary-800 active:scale-[0.98]
        focus-visible:ring-secondary-500
      `,
      // Outline - Secundário sutil
      outline: `
        border-2 border-primary-500 text-primary-700 bg-transparent
        hover:bg-primary-50 hover:text-primary-800
        active:bg-primary-100
        focus-visible:ring-primary-500
      `,
      // Ghost - Mínimo
      ghost: `
        text-primary-700 bg-transparent
        hover:bg-primary-50
        active:bg-primary-100
        focus-visible:ring-primary-500
      `,
      // Glass - Premium
      glass: `
        bg-white/70 backdrop-blur-xl border border-primary-200/50 text-primary-900
        hover:bg-white/90 hover:border-primary-300
        hover:shadow-glassHover
        active:bg-primary-50
        focus-visible:ring-primary-500
      `,
    },
  },

  // Cards
  card: {
    base: 'rounded-2xl transition-all duration-300',
    variants: {
      default: 'bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300',
      premium: 'bg-white border border-primary-100 shadow-polar hover:shadow-xl hover:border-primary-200 hover:-translate-y-1',
      glass: 'bg-white/70 backdrop-blur-xl border border-primary-200/50 shadow-glass hover:shadow-glassHover hover:border-primary-300/50',
      ice: 'bg-gradient-to-br from-white to-primary-50 border border-primary-100 shadow-ice hover:shadow-iceHover hover:-translate-y-1',
      dark: 'bg-neutral-900 border border-neutral-800 text-white hover:border-neutral-700',
    },
    paddings: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    },
  },

  // Badges
  badge: {
    base: 'inline-flex items-center gap-1.5 font-medium rounded-full px-3 py-1 transition-colors',
    variants: {
      default: 'bg-neutral-100 text-neutral-700',
      primary: 'bg-primary-100 text-primary-800',
      secondary: 'bg-secondary-100 text-secondary-800',
      accent: 'bg-accent-100 text-accent-800',
      success: 'bg-success-light/20 text-success-dark',
      warning: 'bg-warning-light/20 text-warning-dark',
      error: 'bg-error-light/20 text-error-dark',
      premium: 'bg-gradient-to-r from-accent-400 to-accent-500 text-white shadow-[0_4px_14px_-4px_rgb(245_158_11_/0.4)]',
    },
    sizes: {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-3 py-1',
      lg: 'text-base px-4 py-1.5',
    },
  },

  // Inputs
  input: {
    base: 'w-full rounded-xl border bg-white text-neutral-900 placeholder:text-neutral-400 transition-all duration-200',
    sizes: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    },
    states: {
      default: 'border-neutral-300 hover:border-neutral-400',
      focus: 'border-primary-500 ring-2 ring-primary-500/20 focus-visible:outline-none',
      error: 'border-error ring-2 ring-error/20 focus-visible:border-error focus-visible:ring-error/20',
      success: 'border-success ring-2 ring-success/20 focus-visible:border-success focus-visible:ring-success/20',
      disabled: 'bg-neutral-100 border-neutral-200 cursor-not-allowed',
    },
  },

  // Sections
  section: {
    base: 'relative w-full',
    paddings: {
      sm: 'py-12 md:py-16 lg:py-20',
      md: 'py-16 md:py-20 lg:py-24',
      lg: 'py-20 md:py-24 lg:py-32',
      xl: 'py-24 md:py-32 lg:py-40',
    },
    containers: {
      sm: 'max-w-3xl mx-auto px-4 sm:px-6',
      md: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
      lg: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      full: 'max-w-[90vw] mx-auto px-4 sm:px-6',
    },
  },
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================
export function clsx(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateFluidType(min: string, max: string, viewport: string = 'vw'): string {
  const minPx = parseFloat(min);
  const maxPx = parseFloat(max);
  const minRem = minPx / 16;
  const maxRem = maxPx / 16;
  const slope = (maxRem - minRem) * 100;
  const intercept = minRem - slope / 100 * parseFloat(viewport.replace('vw', '')) / 100;
  return `clamp(${minRem}rem, ${intercept.toFixed(4)}rem + ${slope.toFixed(2)}vw, ${maxRem}rem)`;
}

// Export types
export type DesignTokens = typeof designTokens;
export type ComponentVariants = typeof componentVariants;