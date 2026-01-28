if (process.env.VERCEL) {
  process.env.TAILWIND_DISABLE_LIGHTNINGCSS = "1"
}

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}

export default config
