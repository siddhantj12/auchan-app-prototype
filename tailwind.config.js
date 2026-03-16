/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                auchan: {
                    red: '#E3001B',
                    darkred: '#B30015',
                }
            },
            fontFamily: {
                sans: ['Helvetica', 'Arial', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
