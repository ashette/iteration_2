<template>
  <v-btn-toggle
    v-model="btnToggleState"
    class="control-buttons"
    multiple
  >
    <v-btn
      v-if="accept"
      class="accept-btn"
      @click="onAccept"
    >
      <v-icon color="admin-success">done</v-icon>
      <span> Готово </span>
    </v-btn>

    <v-btn
      v-if="update"
      class="edit-btn"
      @click="onUpdate"
    >
      <v-icon>more_vert</v-icon>
      <span> Изменить </span>
    </v-btn>

    <v-btn
      v-if="remove"
      class="decline-btn"
      @click="onRemove"
    >
      <v-icon color="admin-error">close</v-icon>
      <span> Удалить </span>
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
    btnToggleState: [],
  }),
  methods: {
    onAccept() {
      this.$emit("onAccept");
    },
    onUpdate() {
      this.$emit("onUpdate");
    },
    onRemove() {
      this.$emit("onRemove");
    },
  },
  watch: {
    btnToggleState(n, o) {
      if (JSON.stringify(n) == JSON.stringify(o)) return;
      this.btnToggleState = [];
    },
  },
};
</script>

