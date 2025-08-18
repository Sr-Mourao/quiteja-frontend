import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import pt from "vuetify/lib/locale/pt";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: "pt",
  },
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: "#00e38b",
        secondary: "#005f6a",
        accent: "#00e38b",
        background: "#333333",
        surface: "#333333",
        info: "#cafce9",
        success: "#00e38b",
        error: "#ff5252",
        warning: "#ffa726",
        text: "#ffffff",
        border: "#cccccc",
      },
      light: {
        primary: "#00e38b",
        secondary: "#005f6a",
        accent: "#00e38b",
        background: "#cafce9",
        surface: "#ffffff",
        info: "#cafce9",
        success: "#00e38b",
        error: "#ff5252",
        warning: "#ffa726",
        text: "#333333",
        border: "#cccccc",
      },
    },
  },
});
