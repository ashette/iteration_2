<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <v-row no-gutters>
        <div class="admin-filters text-right">
          <v-btn color="primary" elevation="0" :to="this.$route.path + '/add'">
            Создать
          </v-btn>
        </div>
      </v-row>

      <CategoryList :categories="categories" />

      <v-row class="justify-center flex-grow-0" no-gutters>
        <v-pagination
          v-model="page"
          class="admin-pagination d-flex flex-grow-1"
          :length="10"
          :total-visible="7"
          circle
          prev-icon="keyboard_double_arrow_left"
          next-icon="keyboard_double_arrow_right"
        ></v-pagination>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CategoryList from "@/components/Category/CategoryList";

export default {
  components: { CategoryList },
  data: () => ({
    page: 1,
    categories: [
      {
        name: "Спорт",
        description: "Спорт быстро",
        id: "5fd91add935d4e0be16a3c4b",
      },
      {
        name: "Супер-эконом",
        description: "Доступные автомобили",
        id: "600598a3ad015e0bb699774c",
      },
      {
        name: "Люкс",
        description: "Автомобили премиум класса",
        id: "60b943492aed9a0b9b7ed335",
      },
      {
        name: "Name",
        description: "work",
        id: "60e3221e2aed9a0b9b84fc7a",
      },
      {
        name: "Эконом+",
        description: "Комфортные машины среднего класса",
        id: "61027a262aed9a0b9b8500c2",
      },
      {
        name: "Бизнес",
        description: "Бизнес",
        id: "611171dd2aed9a0b9b8506f9",
      },
    ],
  }),
};
</script>
