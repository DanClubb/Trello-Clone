import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        lightgray: '#9fadbc29',
        darkgray: '#1d2125',
        lightblue: '#bfdbfe',
        skyblue: '#579dff'
      }
      
    },
  },
  plugins: [],
} satisfies Config;
