<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <entity-list
        :items="categories"
        :headers="headers"
      >
        <template v-slot:entityUpdateForm="{editedItem}">
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
                    <v-subheader>Описание</v-subheader>
                    <v-textarea
                      v-model="editedItem.description"
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
import EntityList from "../../components/Entity/EntityList";

export default {
  components: { EntityList },
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
        text: "Описание",
        align: "start",
        sortable: false,
        value: "description",
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
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
