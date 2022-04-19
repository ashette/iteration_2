<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <v-row class="flex-grow-0 mb-3 justify-end" no-gutters>
        <div class="text-right">
          <v-btn color="tertiary" elevation="0" :to="this.$route.path + '/add'">
            Создать
          </v-btn>
        </div>
      </v-row>

      <v-row class="flex-grow-0" no-gutters>
        <Filters :filters="filters" />
      </v-row>

      <PointList :points="points" />

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
import PointList from "@/components/Point/PointList";
import Filters from "@/components/Filters";
export default {
  components: { PointList, Filters },
  data: () => ({
    page: 1,
    points: [
      {
        name: "Мариинская гимназия",
        cityId: {
          name: "Ульяновск",
          id: "61b30fe9bb7a006c05c54e2b",
        },
        address: "Льва Толстого 62",
        id: "61b310cfbb7a006c05c54e2c",
      },
    ],
    filters: [
      {
        name: "Модель",
        values: [
          {
            id: 1,
            name: "Модель1",
          },
          {
            id: 2,
            name: "Модель2",
          },
        ],
      },
      {
        name: "Город",
        values: [
          {
            id: 1,
            name: "Город1",
          },
          {
            id: 2,
            name: "Город2",
          },
        ],
      },
      {
        name: "Статус",
        values: [
          {
            id: 1,
            name: "Статус1",
          },
          {
            id: 2,
            name: "Статус2",
          },
        ],
      },
    ],
  }),
};
</script>
