<template>
  <v-btn-toggle class="control-buttons">
    <v-btn
      v-if="accept"
      class="accept-btn"
    >
      <v-icon color="admin-success">done</v-icon>
      <span> Готово </span>
    </v-btn>

    <v-btn
      v-if="decline"
      class="decline-btn"
    >
      <v-icon color="admin-error">close</v-icon>
      <span> Отмена </span>
    </v-btn>

    <v-btn
      v-if="update"
      class="edit-btn"
    >
      <v-icon>more_vert</v-icon>
      <span> Изменить </span>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  props: {
    accept: {
      type: Boolean,
      default: false,
    },
    decline: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

