/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // We can add custom colors here later if needed, but standard palette is good for now.
            },
        },
    },
    plugins: [],
}
