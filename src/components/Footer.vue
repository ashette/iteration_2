<template>
  <v-footer
    absolute
    color="white"
    class="admin-footer"
  >
    <v-col
      class="col-12 col-sm-auto admin-footer__menu"
      align-self="center"
    >
      <v-btn
        class="px-2"
        color="primary"
        text
        large
        to="/"
      >
        Главная страница
      </v-btn>
      <v-btn
        class="px-2"
        color="primary"
        text
        large
        to="/"
      >
        Помощь
      </v-btn>
    </v-col>
    <v-col
      class="admin-footer__copyright copyright"
      align-self="center"
    >
      <span class="admin-icon--text">Copyright © 2020 Simbirsoft</span>
    </v-col>
  </v-footer>
</template>