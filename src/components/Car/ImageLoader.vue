<template>
  <div class="image-loader">
    <div class="image-loader-file-input">
      <ValidationProvider
        name="Изображение"
        rules="required"
        v-slot="{ errors }"
      >
        <v-file-input
          v-model="path"
          accept=".jpg,.png"
          prepend-icon=""
          :error-messages="errors"
          suffix="Обзор"
          placeholder="Выберите файл..."
          outlined
          @change="onLoadImage"
        ></v-file-input>
      </ValidationProvider>
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
  props: {
    imagePath: String,
  },
  data: () => ({
    imgLoading: false,
    bufferValue: 100,
    value: 0,
    acceptedImageTypes: ["image/jpeg", "image/png"],
    path: null
  }),
  created(){
    this.path = this.imagePath
  },
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
    onLoadImage(event) {
      if (event) {
        this.imgLoading = true;
      }

      this.$emit("onUpload", event, this.acceptedImageTypes, () =>
        this.iterate()
      );
    },
  },
};
</script>
