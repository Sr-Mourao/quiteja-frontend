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
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo Principal"
          contain
          src="@/assets/logo-quiteja.png"
          transition="scale-transition"
          width="120"
        />
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
  data: () => ({
    //
  }),
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
