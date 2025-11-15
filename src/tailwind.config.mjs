/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    darkMode: 'class',
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '300' }],
                sm: ['0.875rem', { lineHeight: '1.25', letterSpacing: '0.025em', fontWeight: '300' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0em', fontWeight: '300' }],
                lg: ['1.125rem', { lineHeight: '1.75', letterSpacing: '-0.01em', fontWeight: '300' }],
                xl: ['1.25rem', { lineHeight: '1.75', letterSpacing: '-0.015em', fontWeight: '400' }],
                '2xl': ['1.5rem', { lineHeight: '2', letterSpacing: '-0.02em', fontWeight: '400' }],
                '3xl': ['1.875rem', { lineHeight: '2.25', letterSpacing: '-0.025em', fontWeight: '500' }],
                '4xl': ['2.25rem', { lineHeight: '2.5', letterSpacing: '-0.03em', fontWeight: '500' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '600' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '600' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.045em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.055em', fontWeight: '800' }],
            },
            fontFamily: {
                heading: "cormorantgaramond",
                paragraph: "lato-light"
            },
            colors: {
                'light-green': '#A5D6A7',
                'dark-green': '#33691E',
                beige: '#E0D8B4',
                'soft-gold': '#BDBDBD',
                destructive: '#D32F2F',
                'destructive-foreground': '#FFFFFF',
                background: '#F5F5DC',
                secondary: '#FDD835',
                foreground: '#212121',
                'secondary-foreground': '#212121',
                'primary-foreground': '#FFFFFF',
                primary: '#558B2F'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
