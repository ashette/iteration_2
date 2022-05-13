<template>
  <v-layout>
    <navigation />
    <v-main class="admin">
      <tool-bar />
      <notification-list />
      <router-view />
      <footer-bar />
    </v-main>
  </v-layout>
</template>

<script>
import Navigation from "@/components/Navigation";
import ToolBar from "@/components/ToolBarComponent";
import FooterBar from "@/components/Footer";
import NotificationList from "@/components/Notification/NotificationList";

export default {
  components: { Navigation, ToolBar, FooterBar, NotificationList },
};
</script>
