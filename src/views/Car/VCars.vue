<template>
  <div class="admin-content">
    <h1>Список автомобилей</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <v-row
        class="flex-grow-0"
        no-gutters
      >
        <filters :filters="filters" />
      </v-row>
      <v-container
        class="table-container px-0 flex-grow-1"
        fluid
      >
        <v-data-table
          :headers="headers"
          :items="cars"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn
                color="primary"
                class="mb-2"
                to="add-car"
              >
                Создать
                <v-icon
                  class="ml-2"
                  small
                >add</v-icon>
              </v-btn>
              <v-dialog
                v-model="dialogDelete"
                max-width="320px"
                content-class="admin"
              >
                <v-card>
                  <v-card-title class="justify-center py-5">Удалить элемент?</v-card-title>
                  <v-card-actions class="pb-5">
                    <v-spacer></v-spacer>
                    <v-btn
                      elevation="0"
                      color="tertiary"
                      @click="closeDelete"
                    >Отменить</v-btn>
                    <v-btn
                      elevation="0"
                      color="secondary"
                      @click="deleteItemConfirm"
                    >Удалить</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <control-buttons
              update
              remove
              @onUpdate="editItem(item)"
              @onRemove="deleteItem(item)"
            />
          </template>

          <template v-slot:item.thumbnail="{ item }">
            <v-img
              v-bind:src="`${item.thumbnail.path}`"
              contain
              max-width="140"
            >
            </v-img>
          </template>
        </v-data-table>
      </v-container>
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
import Filters from "@/components/Filters";
import ControlButtons from "@/components/ControlButtons";

export default {
  components: { Filters, ControlButtons },
  methods: {
    deleteItem(item) {
      //TODO
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //TODO
      this.closeDelete();
    },
    closeDelete() {
      //TODO
      this.dialogDelete = false;
    },
    editItem(item) {
      this.$router.push({
        name: "EditCar",
        params: {
          id: item.id,
          carName: item.name,
        },
      });
    },
  },
  data: () => ({
    page: 1,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Изображение",
        align: "start",
        sortable: false,
        value: "thumbnail",
      },
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
      {
        text: "Мин. Цена",
        align: "start",
        sortable: false,
        value: "priceMin",
      },
      {
        text: "Макс. Цена",
        align: "start",
        sortable: false,
        value: "priceMax",
      },
      {
        text: "Номер",
        align: "start",
        sortable: false,
        value: "number",
      },
      {
        text: "Доступные цвета",
        align: "start",
        sortable: false,
        value: "colors",
      },
      { text: "", value: "actions", align: "end", sortable: false },
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
    cars: [
      {
        description: "Это описание автомобиля",
        priceMin: 11000,
        priceMax: 12000,
        name: "Ferrari",
        number: "m123ss",
        categoryId: {
          name: "Спорт",
          description: "Спорт быстро",
          id: "5fd91add935d4e0be16a3c4b",
        },
        thumbnail: {
          path: require("@/assets/car.jpg"),
        },
        tank: 99,
        colors: ["оранжевый", "синий"],
        id: "600fff0bad015e0bb6997d79",
      },
    ],
  }),
};
</script>
