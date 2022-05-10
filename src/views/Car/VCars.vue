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
        <filters
          :filters="filters"
          @sumbit="handleRequestFilters"
          @reset="handleResetFilters"
        />
      </v-row>
      <v-container
        class="table-container px-0 flex-grow-1"
        fluid
      >
        <v-row
          v-if="isRequesting"
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
          v-model="pagination.page"
          class="admin-pagination d-flex flex-grow-1"
          :length="pagination.length"
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
    dialog: false,
    dialogDelete: false,
    filters: [
      { id: "categoryId", name: "Категория", values: [], selectedValue: null },
    ],
    filterParams: {},
    editedItem: {},
    defaultItem: {},
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
  created() {
    this.getCars();
  },
  mounted() {
    this.setFilters();
  },
  computed: {
    ...mapGetters("Car", ["isRequesting", "cars", "pagination"]),
    ...mapGetters("Category", ["categories"]),
  },
  methods: {
    ...mapActions("Car", [
      "setCurrentPage",
      "requestCars",
      "deleteCarFromList",
      "resetCars",
      "setFilter",
      "resetFilter",
    ]),
    ...mapActions("Category", ["requestCategories"]),
    async getCars(params = {}) {
      const response = await this.requestCars(params);
    },
    async setFilterCategories() {
      const response = await this.requestCategories({ limit: null });
      this.filters = this.filters.map((item) => {
        if (item.id == "categoryId") {
          item.values = this.categories;
        }
        return item;
      });
    },
    setFilters() {
      this.setFilterCategories();
    },
    handleRequestFilters() {
      this.filters.map((filter) => {
        this.filterParams[filter.id] = filter.selectedValue;
      });
      this.setFilter(this.filterParams);
    },
    handleResetFilters() {
      this.filters.map((filter) => {
        filter.selectedValue = null;
      });
      this.filterParams = {};
      this.resetFilter();
    },
    handlePageChange(value) {
      this.setCurrentPage(value, this.filterParams);
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      const car = this.editedItem;
      if (car) {
        this.deleteCarFromList({ id: car.id });
        this.closeDelete();
      }
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
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
  beforeDestroy() {
    this.resetCars();
  },
};
</script>
