<template>
  <div class="image-loader">
    <div class="image-loader-file-input">
      <v-file-input
        accept=".jpg,.png,.bmp,.webp"
        prepend-icon=""
        suffix="Обзор"
        placeholder="Выберите файл..."
        outlined
        @change="uploadImage"
      ></v-file-input>
    </div>
    <div
      v-if="imgLoading"
      class="image-loader-progress-bar"
    >
      <v-progress-linear
        background-color="disabled"
        color="primary"
        height="5"
        :buffer-value="bufferValue"
        :value="value"
        rounded
      >
        <template v-slot:default="{ value }">
          <div> Заполнено <span>{{ Math.ceil(value) }}%</span></div>
        </template>
      </v-progress-linear>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    imgLoading: false,
    bufferValue: 100,
    value: 0,
  }),
  methods: {
    iterate() {
      if (this.bufferValue !== this.value) {
        this.value++;
      } else {
        this.hideProgressBar();
      }
    },
    hideProgressBar() {
      this.imgLoading = false;
      this.value = 0;
    },
    async uploadImage(event) {
      if (event) {
        this.imgLoading = true;
        this.$emit("onUpload", event, () => this.iterate());
      }
    },
  },
};
</script>
