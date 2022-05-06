<template>
  <v-main class="admin">
    <notification-list />
    <router-view />
  </v-main>
</template>

<script>
import NotificationList from "@/components/Notification/NotificationList";

export default {
  components: { NotificationList },
};
</script>
