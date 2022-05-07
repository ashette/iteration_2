<template>
  <div class="admin-content">
    <h1>Список автомобилей</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5 flex-grow-1"
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
        <v-row
          v-if="isCarRequesting"
          no-gutters
          class="justify-center align-center fill-height"
        >
          <v-progress-circular
            indeterminate
            size="54"
            color="primary"
          ></v-progress-circular>
        </v-row>
        <v-data-table
          v-else
          :headers="headers"
          :items="cars"
          loading-text=""
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
                >
                  add
                </v-icon>
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
                    >
                      Отменить
                    </v-btn>
                    <v-btn
                      elevation="0"
                      color="secondary"
                      @click="deleteItemConfirm"
                    >
                      Удалить
                    </v-btn>
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
            ></v-img>
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
          :length="paginationLength"
          circle
          prev-icon="keyboard_double_arrow_left"
          next-icon="keyboard_double_arrow_right"
          @input="handlePageChange"
        ></v-pagination>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Filters from "@/components/Filters";
import ControlButtons from "@/components/ControlButtons";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { Filters, ControlButtons },
  data: () => ({
    page: 1,
    pageLimit: 7,
    pageCount: 0,
    dialog: false,
    dialogDelete: false,
    filters: [],
    cars: [],
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
  }),
  methods: {
    ...mapActions("Car", ["requestCars"]),
    async getCars() {
      const response = await this.requestCars({
        page: this.page - 1,
        limit: this.pageLimit,
      });

      this.cars = response.data;
      this.pageCount = response.count;
    },
    handlePageChange(value) {
      this.page = value;
      this.getCars();
    },
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
  created() {
    this.getCars();
  },
  computed: {
    ...mapGetters("Car", ["isCarRequesting"]),
    paginationLength() {
      const length = Math.round(this.pageCount / this.pageLimit);
      return length > 1 ? length : 1;
    },
  },
};
</script>
