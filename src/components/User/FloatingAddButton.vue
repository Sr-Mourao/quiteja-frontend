<template>
  <v-btn
    fab
    fixed
    bottom
    right
    color="primary"
    large
    elevation="6"
    class="floating-add-btn"
    @click="$emit('click')"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "FloatingAddButton",
  emits: ["click"],
};
</script>

<style scoped>
.floating-add-btn {
  margin-bottom: 16px;
  margin-right: 16px;
  z-index: 999;
}

.floating-add-btn:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}
</style>
