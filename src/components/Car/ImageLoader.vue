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
  </div>
</template>

<script>
export default {
  props: {
    imagePath: String,
  },
  data: () => ({
    acceptedImageTypes: ["image/jpeg", "image/png"],
    path: null
  }),
  created(){
    this.path = this.imagePath
  },
  methods: {
    onLoadImage(event) {
      this.$emit("onUpload", event, this.acceptedImageTypes);
    },
  },
};
</script>
