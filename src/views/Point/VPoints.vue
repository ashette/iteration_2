<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <v-container
        class="px-0 flex-grow-0"
        fluid
      >
        <filters :filters="filters" />
      </v-container>

      <entity-list
        :items="filteredPoints"
        :headers="headers"
      >
        <template v-slot:entityUpdateForm="{ editedItem }">
          <v-card-text>
            <v-container>
              <v-row class="d-flex flex-grow-1 flex-column">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Название</v-subheader>
                    <v-text-field
                      v-model="editedItem.name"
                      outlined
                      solo
                    ></v-text-field>
                  </v-label>
                </v-layout>
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Город</v-subheader>
                    <v-text-field
                      v-model="editedItem.cityName"
                      outlined
                      solo
                    ></v-text-field>
                  </v-label>
                </v-layout>
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Адрес</v-subheader>
                    <v-textarea
                      v-model="editedItem.address"
                      outlined
                      solo
                    ></v-textarea>
                  </v-label>
                </v-layout>
              </v-row>
            </v-container>
          </v-card-text>
        </template>
      </entity-list>

      <v-row
        class="justify-center flex-grow-0"
        no-gutters
      >
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
import Filters from "../../components/Filters";
import EntityList from "../../components/Entity/EntityList";

export default {
  components: { Filters, EntityList },
  data: () => ({
    page: 1,
    headers: [
      {
        text: "Название",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Город",
        align: "start",
        sortable: false,
        value: "cityId.name",
      },
      {
        text: "Адрес",
        align: "start",
        sortable: false,
        value: "address",
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
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
  computed: {
    filteredPoints: function () {
      return this.points.map((point) => {
        if (point.cityId) {
          point.cityName = point.cityId.name;
        }
        return point;
      });
    },
  },
};
</script>
