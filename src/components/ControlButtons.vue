<template>
  <v-btn-toggle
    v-model="buttonToggleState"
    class="control-buttons"
    multiple
  >
    <v-btn
      v-if="accept"
      class="accept-btn"
      @click="$emit('onAccept')"
    >
      <v-icon color="admin-success">done</v-icon>
      Готово
    </v-btn>

    <v-btn
      v-if="update"
      class="edit-btn"
      @click="$emit('onUpdate')"
    >
      <v-icon>more_vert</v-icon>
      Изменить
    </v-btn>

    <v-btn
      v-if="remove"
      class="decline-btn"
      @click="$emit('onRemove')"
    >
      <v-icon color="admin-error">close</v-icon>
      Удалить
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
    remove: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    buttonToggleState: [],
  }),
  watch: {
    buttonToggleState(n, o) {
      if (JSON.stringify(n) == JSON.stringify(o)) return;
      this.buttonToggleState = [];
    },
  },
};
</script>

