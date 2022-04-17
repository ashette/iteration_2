<template>
  <v-layout>
    <Navigation />
    <v-main class="admin">
      <ToolBar />
      <router-view />
      <Footer />
    </v-main>
  </v-layout>
</template>

<script>
import Navigation from "@/components/Navigation";
import ToolBar from "@/components/ToolBarComponent";
import Footer from "@/components/Footer";

export default {
  components: { Navigation, ToolBar, Footer },
};
</script>
