<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <NavBar />
    <!-- Notice how this app does not use the v-container.... -->
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "light" : "dark";
    },
  },
};
</script>
