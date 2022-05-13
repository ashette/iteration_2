<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import AdminLayout from "@/layouts/AdminLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  beforeCreate() {
    this.$store.dispatch("appInit");
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "main") + "-layout";
    },
  },
  components: {
    AdminLayout,
    MainLayout,
  },
};
</script>

<style lang="scss">
@import "./scss/admin.scss";
</style>