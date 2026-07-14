/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 品牌主色 — Lavender / 淡紫
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
          DEFAULT: 'var(--color-primary)'
        },
        // 辅色 — Warm Gold
        accent: {
          50: '#fdf8ed',
          100: '#f9edcb',
          200: '#f2d98c',
          300: '#ebc257',
          400: '#e3a92f',
          500: '#d4a017',
          600: '#b3820f',
          700: '#8e6410',
          800: '#745010',
          900: '#604210',
          950: '#372205',
          DEFAULT: 'var(--color-accent)'
        },
        // 语义表面色（令牌驱动）
        surface: {
          bg: 'var(--surface-bg)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          elevated: 'var(--surface-elevated)'
        },
        ink: {
          DEFAULT: 'var(--ink)',
          strong: 'var(--ink-strong)',
          muted: 'var(--ink-muted)',
          subtle: 'var(--ink-subtle)'
        },
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
          subtle: 'var(--line-subtle)'
        },
        // 兼容旧 dark.* 引用 — 映射到紫调暗表面
        dark: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#1f1a2b',
          900: '#16121f',
          950: '#100c18'
        },
        // 语义状态色
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)'
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'sans-serif'
        ],
        display: [
          'Fraunces',
          'Georgia',
          '"Times New Roman"',
          '"PingFang SC"',
          '"Songti SC"',
          'serif'
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        glass: 'var(--shadow-card)',
        glow: 'var(--shadow-glow)',
        'glow-accent': 'var(--shadow-glow-accent)',
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        popover: 'var(--shadow-popover)',
        'inner-glow': 'var(--shadow-inner)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-brand': 'var(--gradient-brand)',
        'gradient-aurora': 'var(--gradient-aurora)',
        'gradient-mesh': 'var(--gradient-mesh)',
        'gradient-glass':
          'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s var(--ease-out)',
        'slide-up': 'slideUp 0.3s var(--ease-out)',
        'slide-down': 'slideDown 0.3s var(--ease-out)',
        'slide-in-right': 'slideInRight 0.3s var(--ease-out)',
        'scale-in': 'scaleIn 0.2s var(--ease-out)',
        'pulse-slow': 'pulse 3s var(--ease-in-out) infinite',
        shimmer: 'shimmer 2s linear infinite',
        glow: 'glowPulse 2.5s ease-in-out infinite alternate',
        'aurora-pan': 'auroraPan 16s var(--ease-in-out) infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 0 rgba(99, 102, 241, 0)' },
          '100%': { boxShadow: 'var(--shadow-glow)' }
        },
        auroraPan: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '100%': { transform: 'translate3d(2%, -2%, 0) scale(1.06)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        '4xl': '2rem',
        pill: 'var(--radius-pill)'
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        spring: 'var(--ease-spring)'
      }
    }
  },
  plugins: []
}