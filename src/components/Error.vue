 
<template>
  <v-layout class="admin-content admin-error-page flex-column justify-center align-center">
    <h1>
      {{ error.code }}
    </h1>
    <div class="admin-error-page__title">{{ error.title }}</div>
    <div class="admin-error-page__message">
      {{ error.message }}
    </div>
    <v-btn
      class="admin-error-page__button"
      color="primary"
      v-if="error.homepage"
      to="/"
    >
      Назад
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  props: {
    errorCode: Number,
  },
  data: () => ({
    error: {
      code: null,
      title: null,
      message: null,
      homepage: true,
    },
  }),
  mounted() {
    this.error.code = this.errorCode;
    switch (this.errorCode) {
      case 400:
        this.error.title = "Bad request";
        this.error.message = "Попробуйте перезагрузить страницу позже";
        break;
      case 403:
        this.error.title = "Доступ ограничен";
        this.error.message = "Доступ к этой странице ограничен";
        break;
      case 404:
        this.error.title = "Страница не найдена";
        this.error.message = "Похоже, что такой страницы не существует";
        break;
      case 500:
        this.error.title = "Что то пошло не так";
        this.error.message = "Попробуйте перезагрузить страницу";
        break;
      default:
        this.error.title = "Что то пошло не так";
        this.error.message = "Попробуйте перезагрузить страницу";
        break;
    }
  },
};
</script>
