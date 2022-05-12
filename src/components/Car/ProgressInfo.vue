<template>
  <div class="image-loader-progress-bar">
    <v-progress-linear
      background-color="disabled"
      color="primary"
      height="5"
      :buffer-value="bufferValue"
      :value="progress"
      rounded
    >
      <template v-slot:default="{ value }">
        <div> Заполнено <span>{{ Math.ceil(value) }}%</span></div>
      </template>
    </v-progress-linear>
  </div>
</template>

<script>
export default {
  props: {
    progress: Number,
  },
  data: () => ({
    bufferValue: 100,
  }),
};
</script>
