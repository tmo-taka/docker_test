/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/assets/index.css',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            spacing: {
                sm: '8px',
                md: '12px',
                lg: '16px',
                xl: '24px',
            },
            colors: {
                main: '#0EA5E9',
                font: '#383838'
            },
        },
        borderColor: theme => ({
            ...theme('colors'),
            'primary': '#CBD5E0',
        })
    },
    plugins: [
    ],
}