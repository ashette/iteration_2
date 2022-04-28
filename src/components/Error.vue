 
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
      to="/"
    >
      Назад
    </v-btn>
  </v-layout>
</template>

<script>
const TYPES_ERRORS = {
  400: {
    title: "Bad request",
    message: "Попробуйте перезагрузить страницу позже",
  },
  403: {
    title: "Доступ ограничен",
    message: "Доступ к этой странице ограничен",
  },
  404: {
    title: "Страница не найдена",
    message: "Похоже, что такой страницы не существует",
  },
  500: {
    title: "Что то пошло не так",
    message: "Попробуйте перезагрузить страницу",
  },
};
export default {
  props: {
    errorCode: Number,
  },
  data: () => ({
    error: {
      code: null,
      title: null,
      message: null,
    },
  }),
  mounted() {
    this.error.code = this.errorCode;
    this.error = {
      code: this.errorCode,
      ...TYPES_ERRORS[this.errorCode],
    };
  },
};
</script>
