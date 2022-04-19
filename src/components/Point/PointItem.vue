<template>
  <v-form class="d-flex flex-grow-1 flex-column">
    <v-layout column class="control-group flex-grow-0">
      <v-label>
        <v-subheader>Название</v-subheader>
        <v-text-field outlined solo></v-text-field>
      </v-label>
    </v-layout>
    <v-layout column class="control-group flex-grow-0">
      <v-label>
        <v-subheader>Описание</v-subheader>
        <v-text-field outlined solo></v-text-field>
      </v-label>
    </v-layout>
    <v-layout v-if="category" class="mt-auto flex-grow-0" row no-gutters>
      <v-btn color="primary" elevation="0">Сохранить</v-btn>
      <v-btn class="ml-auto" color="secondary" elevation="0">Удалить</v-btn>
    </v-layout>
    <v-layout v-else class="mt-auto flex-grow-0" row no-gutters>
      <v-btn color="primary" elevation="0">Создать</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  props: {
    category: Object,
  },
};
</script>
