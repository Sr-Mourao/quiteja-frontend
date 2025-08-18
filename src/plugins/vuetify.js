import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#00e38b",
        secondary: "#005f6a",
        accent: "#00e38b",
        background: "#333333",
        surface: "#333333",
        info: "#c9f7e0",
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
        background: "#c9f7e0",
        surface: "#ffffff",
        info: "#c9f7e0",
        success: "#00e38b",
        error: "#ff5252",
        warning: "#ffa726",
        text: "#333333",
        border: "#cccccc",
      },
    },
  },
});
