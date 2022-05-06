<template>
  <v-alert
    :value="alert"
    :type="notification.type"
    dismissible
    close-icon="close"
    tile
  >
    {{ notification.message }}
  </v-alert>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["notification"],
  data: () => ({
    timeout: null,
    alert: true,
  }),
  created() {
    this.timeout = setTimeout(() => {
      this.removeNotification(this.notification);
    }, 5000);
  },
  methods: mapActions("Notifications", ["removeNotification"]),
};
</script>