<template>
  <v-btn
    icon
    @click="toggleDarkMode"
    :title="isDark ? 'Modo claro' : 'Modo escuro'"
  >
    <v-icon>{{ isDark ? "mdi-weather-sunny" : "mdi-weather-night" }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "DarkMode",

  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    },
  },

  mounted() {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      this.$vuetify.theme.dark = savedDarkMode === "true";
    }
  },

  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("darkMode", this.$vuetify.theme.dark);
    },
  },
};
</script>
