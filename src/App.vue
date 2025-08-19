<template>
  <v-app>
    <v-app-bar
      app
      color="surface"
      :dark="$vuetify.theme.dark"
      :light="!$vuetify.theme.dark"
      elevation="0"
      height="81"
      fixed
      :style="appBarPadding"
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Logo Principal"
            contain
            src="@/assets/logo-quiteja.png"
            transition="scale-transition"
            width="170"
            style="cursor: pointer"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <DarkMode />
    </v-app-bar>

    <v-main :class="$vuetify.theme.dark ? 'bg-dark' : 'bg-light'">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import DarkMode from "@/components/DarkMode.vue";

export default {
  name: "App",
  components: {
    DarkMode,
  },
  computed: {
    appBarPadding() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "padding: 0px 16px 0px 16px";
      } else if (this.$vuetify.breakpoint.md) {
        return "padding: 0px 80px 0px 80px";
      } else {
        return "padding: 0px 180px 0px 180px";
      }
    },
  },
};
</script>

<style>
.bg-light {
  background-color: #c9f7e0 !important;
}

.bg-dark {
  background-color: #333333 !important;
}
</style>
