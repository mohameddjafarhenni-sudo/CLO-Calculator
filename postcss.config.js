import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export const postcssPlugins = [tailwindcss(), autoprefixer()];

export default {
  plugins: postcssPlugins,
};
