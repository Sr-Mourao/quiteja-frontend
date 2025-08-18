<template>
  <v-app>
    <v-app-bar
      app
      :color="$vuetify.theme.dark ? 'surface' : 'background'"
      :dark="$vuetify.theme.dark"
      :light="!$vuetify.theme.dark"
      elevation="2"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo Principal"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="48"
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
