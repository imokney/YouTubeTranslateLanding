// tailwind.config.cjs или .js
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // едем ровно на половину ширины трека
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite", // можешь ускорить/замедлить
      },
    },
  },
  plugins: [],
};
