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
        charcoal: '#22272b',
        lightblue: '#bfdbfe',
        skyblue: '#579dff'
      },
      maxWidth: {
        200: '50rem'
      }
    },
  },
  plugins: [
    // @ts-ignore:next-line
    function ({ addVariant }) {
      addVariant('first-child', '& > :first-child');
      addVariant('first-child-hover', '& > :first-child:hover');
  }
  ],
} satisfies Config;
