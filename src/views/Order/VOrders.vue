<template>
  <div class="admin-content">
    <h1>Заказы</h1>
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
        class="table-container flex-grow-1"
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
        <v-row
          v-for="order in orders"
          :key="order.id"
          class="table-row align-center"
        >
          <v-col
            class="table-col order-image"
            cols="1"
          >
            <v-img
              :src="getOrderThumbnail(order)"
              contain
              max-width="140"
            ></v-img>
          </v-col>
          <v-col
            class="table-col order-info"
            cols="4"
          >
            <div>
              <strong>{{ getOrderCarName(order) }}</strong> в
              <strong>{{ getOrderCityName(order) }}</strong> ,
              {{ getOrderAddress(order) }}
            </div>
            <div>
              {{ getOrderTime(order.dateFrom, order.dateTo) }}
            </div>
            <div>
              Цвет: <strong>{{ order.color }}</strong>
            </div>
          </v-col>
          <v-col
            class="table-col order-options"
            cols="2"
          >
            <v-checkbox
              v-model="order.isFullTank"
              label="Полный бак"
              readonly
              on-icon="$vuetify.icon.checkboxAdminOn"
              off-icon="$vuetify.icon.checkboxAdminOff"
            ></v-checkbox>
            <v-checkbox
              v-model="order.isNeedChildChair"
              label="Детское кресло"
              readonly
              on-icon="$vuetify.icon.checkboxAdminOn"
              off-icon="$vuetify.icon.checkboxAdminOff"
            ></v-checkbox>
            <v-checkbox
              v-model="order.isRightWheel"
              label="Правый руль"
              readonly
              on-icon="$vuetify.icon.checkboxAdminOn"
              off-icon="$vuetify.icon.checkboxAdminOff"
            ></v-checkbox>
          </v-col>
          <v-col
            class="table-col order-price"
            cols="2"
          >
            <span>{{ order.price }} <span class="price-currency">₽</span></span>
          </v-col>
          <v-col class="table-col order-controls text-right">
            <control-buttons
              update
              remove
              @onUpdate="editItem(order)"
              @onRemove="deleteItem(order)"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-row
        class="justify-center flex-grow-0"
        no-gutters
      >
        <v-pagination
          v-model="pagination.page"
          class="admin-pagination d-flex flex-grow-1"
          :length="pagination.length"
          :total-visible="pagination.limit"
          circle
          prev-icon="keyboard_double_arrow_left"
          next-icon="keyboard_double_arrow_right"
          @input="handlePageChange"
        ></v-pagination>
      </v-row>
      <v-dialog
        v-model="dialogDelete"
        max-width="320px"
        content-class="admin"
      >
        <v-card>
          <v-card-title class="justify-center py-5">Удалить заказ?</v-card-title>
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
      { id: "carId", name: "Модель", values: [], selectedValue: null },
      { id: "cityId", name: "Город", values: [], selectedValue: null },
      { id: "rateId", name: "Тариф", values: [], selectedValue: null },
    ],
    filterParams: {},
    editedItem: {},
    defaultItem: {},
    emptyImg: require("@/assets/no_image.jpg"),
  }),
  created() {
    this.getOrders();
  },
  mounted() {
    this.setFilters();
  },
  computed: {
    ...mapGetters("Order", ["isRequesting", "orders", "pagination"]),
    ...mapGetters("Car", ["cars"]),
    ...mapGetters("City", ["cities"]),
    ...mapGetters("Rate", ["rates"]),
  },
  methods: {
    ...mapActions("Order", [
      "setCurrentPage",
      "requestOrders",
      "deleteOrderFromList",
      "resetOrders",
      "setFilter",
      "resetFilter",
    ]),
    ...mapActions("Car", ["requestCars"]),
    ...mapActions("City", ["requestCities"]),
    ...mapActions("Rate", ["requestRates"]),
    async getOrders(params = {}) {
      const response = await this.requestOrders(params);
    },
    async setFilterCars() {
      const response = await this.requestCars({ limit: null });
      this.filters = this.filters.map((item) => {
        if (item.id == "carId") {
          item.values = this.cars;
        }
        return item;
      });
    },
    async setFilterCities() {
      const response = await this.requestCities({ limit: null });
      this.filters = this.filters.map((item) => {
        if (item.id == "cityId") {
          item.values = this.cities;
        }
        return item;
      });
    },
    async setFilterRates() {
      const response = await this.requestRates({ limit: null });
      this.filters = this.filters.map((item) => {
        if (item.id == "rateId") {
          item.values = this.rates;
        }
        return item;
      });
    },
    setFilters() {
      this.setFilterCars();
      this.setFilterCities();
      this.setFilterRates();
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
      this.setCurrentPage(value);
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      const order = this.editedItem;
      if (order) {
        this.deleteOrderFromList({ id: order.id });
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
        name: "EditOrder",
        params: {
          id: item.id,
        },
      });
    },
    getOrderTime(dateFrom, dateTo) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      if (dateFrom && dateTo) {
        const formatedDateFrom = new Date(dateFrom).toLocaleDateString(
          "ru",
          options
        );
        const formatedDateTo = new Date(dateTo).toLocaleDateString(
          "ru",
          options
        );

        return `${formatedDateFrom} - ${formatedDateTo}`;
      }
    },
    getOrderCarName(order) {
      return order.carId ? order.carId.name : "";
    },
    getOrderCityName(order) {
      return order.cityId ? order.cityId.name : "";
    },
    getOrderAddress(order) {
      return order.pointId ? order.pointId.address : "";
    },
    getOrderThumbnail(order) {
      return order.carId ? order.carId.thumbnail.path : this.emptyImg;
    },
  },
  beforeDestroy() {
    this.resetOrders();
  },
};
</script>
