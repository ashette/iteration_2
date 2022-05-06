<template>
  <div class="notification-list">
    <notification-item
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationItem from "./NotificationItem";
import { mapState } from "vuex";
export default {
  components: {
    NotificationItem,
  },
  computed: mapState("Notifications", ["notifications"]),
};
</script>