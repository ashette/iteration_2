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
        <filters :filters="filters" />
      </v-row>
      <v-container
        class="table-container flex-grow-1"
        fluid
      >
        <v-row
          v-if="isOrderRequesting"
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
          v-else
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
          v-model="page"
          class="admin-pagination d-flex flex-grow-1"
          :length="paginationLength"
          :total-visible="pageLimit"
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
    page: 1,
    pageLimit: 7,
    pageCount: 0,
    dialog: false,
    dialogDelete: false,
    filters: [],
    orders: [],
    emptyImg: require("@/assets/no_image.jpg"),
  }),
  methods: {
    ...mapActions("Order", ["requestOrders"]),
    async getOrders() {
      const response = await this.requestOrders({
        page: this.page - 1,
        limit: this.pageLimit,
      });

      this.orders = response.data;
      this.pageCount = response.count;
    },
    handlePageChange(value) {
      this.page = value;
      this.getOrders();
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
  created() {
    this.getOrders();
  },
  computed: {
    ...mapGetters("Order", ["isOrderRequesting"]),
    paginationLength() {
      const length = Math.ceil(this.pageCount / this.pageLimit);
      return length > 1 ? length : 1;
    },
  },
};
</script>
