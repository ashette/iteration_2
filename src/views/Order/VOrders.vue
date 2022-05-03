<template>
  <div class="admin-content">
    <h1>Заказы</h1>
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
        class="table-container flex-grow-1"
        fluid
      >
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
              :src="order.carId.thumbnail.path"
              contain
              max-width="140"
            ></v-img>
          </v-col>
          <v-col
            class="table-col order-info"
            cols="4"
          >
            <div>
              <strong>{{ order.carId.name }}</strong> в
              <strong>{{ order.cityId.name }}</strong> ,
              {{ order.pointId.address }}
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
          :length="10"
          :total-visible="7"
          circle
          prev-icon="keyboard_double_arrow_left"
          next-icon="keyboard_double_arrow_right"
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
  },
  data: () => ({
    page: 1,
    dialog: false,
    dialogDelete: false,
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
    orders: [
      {
        updatedAt: 1649615356071,
        createdAt: 1649615356071,
        cityId: {
          name: "Санкт-Петербург",
          id: "6005b8f9ad015e0bb6997778",
        },
        pointId: {
          name: "Пункт",
          address: "56 Литейный проспект",
          id: "615ae47018f5c2264119b939",
        },
        carId: {
          description:
            "Пробег до 500 км на одном зараде. Отличный выбор для деловых поездок",
          priceMin: 10000,
          priceMax: 15000,
          name: "Tesla Model S",
          number: "А700АА",
          categoryId: {
            name: "Бизнес",
            description: "Бизнес",
            id: "611171dd2aed9a0b9b8506f9",
          },
          thumbnail: {
            path: require("@/assets/car.jpg"),
            mimetype: "image/jpeg",
            originalname: "karelia.jpg",
            size: 81898,
          },
          tank: 777,
          colors: ["Синий", "Алый", "Белый", "Синий"],
          id: "600ff1f6ad015e0bb6997d65",
        },
        color: "Синий",
        dateFrom: 1649620800000,
        dateTo: 1649707200000,
        rateId: {
          rateTypeId: {
            unit: "мин",
            name: "Поминутно",
            id: "5e26a07f099b810b946c5d82",
          },
          price: 7,
          id: "61af4296bb7a006c05c54c4b",
        },
        price: 10280,
        isNeedChildChair: true,
        orderStatusId: {
          name: "Новые",
          id: "5e26a191099b810b946c5d89",
        },
        id: "625321fc73b61100181024d6",
      },
      {
        cityId: {
          name: "Санкт-Петербург",
          id: "6005b8f9ad015e0bb6997778",
        },
        pointId: {
          name: "Пункт",
          address: "56 Литейный проспект",
          id: "615ae47018f5c2264119b939",
        },
        carId: {
          name: "Tesla Model S",
          categoryId: {
            name: "Бизнес",
            description: "Бизнес",
            id: "611171dd2aed9a0b9b8506f9",
          },
          thumbnail: {
            path: require("@/assets/car.jpg"),
          },
        },
        color: "Синий",
        dateFrom: 1649620800000,
        dateTo: 1649707200000,
        price: 10280,
        isNeedChildChair: true,
        id: "2",
      },
      {
        cityId: {
          name: "Санкт-Петербург",
          id: "6005b8f9ad015e0bb6997778",
        },
        pointId: {
          name: "Пункт",
          address: "56 Литейный проспект",
          id: "615ae47018f5c2264119b939",
        },
        carId: {
          name: "Tesla Model S",
          categoryId: {
            name: "Бизнес",
            description: "Бизнес",
            id: "611171dd2aed9a0b9b8506f9",
          },
          thumbnail: {
            path: require("@/assets/car.jpg"),
          },
        },
        color: "Синий",
        dateFrom: 1649620800000,
        dateTo: 1649707200000,
        price: 10280,
        isNeedChildChair: true,
        id: "3",
      },
      {
        cityId: {
          name: "Санкт-Петербург",
          id: "6005b8f9ad015e0bb6997778",
        },
        pointId: {
          name: "Пункт",
          address: "56 Литейный проспект",
          id: "615ae47018f5c2264119b939",
        },
        carId: {
          name: "Tesla Model S",
          categoryId: {
            name: "Бизнес",
            description: "Бизнес",
            id: "611171dd2aed9a0b9b8506f9",
          },
          thumbnail: {
            path: require("@/assets/car.jpg"),
          },
        },
        color: "Синий",
        dateFrom: 1649620800000,
        dateTo: 1649707200000,
        price: 10280,
        isNeedChildChair: true,
        id: "4",
      },
      {
        cityId: {
          name: "Санкт-Петербург",
          id: "6005b8f9ad015e0bb6997778",
        },
        pointId: {
          name: "Пункт",
          address: "56 Литейный проспект",
          id: "615ae47018f5c2264119b939",
        },
        carId: {
          name: "Tesla Model S",
          categoryId: {
            name: "Бизнес",
            description: "Бизнес",
            id: "611171dd2aed9a0b9b8506f9",
          },
          thumbnail: {
            path: require("@/assets/car.jpg"),
          },
        },
        color: "Синий",
        dateFrom: 1649620800000,
        dateTo: 1649707200000,
        price: 10280,
        isNeedChildChair: true,
        id: "5",
      },
      {
        cityId: {
          name: "Санкт-Петербург",
          id: "6005b8f9ad015e0bb6997778",
        },
        pointId: {
          name: "Пункт",
          address: "56 Литейный проспект",
          id: "615ae47018f5c2264119b939",
        },
        carId: {
          name: "Tesla Model S",
          categoryId: {
            name: "Бизнес",
            description: "Бизнес",
            id: "611171dd2aed9a0b9b8506f9",
          },
          thumbnail: {
            path: require("@/assets/car.jpg"),
          },
        },
        color: "Синий",
        dateFrom: 1649620800000,
        dateTo: 1649707200000,
        price: 10280,
        isNeedChildChair: true,
        id: "6",
      },
      {
        cityId: {
          name: "Санкт-Петербург",
          id: "6005b8f9ad015e0bb6997778",
        },
        pointId: {
          name: "Пункт",
          address: "56 Литейный проспект",
          id: "615ae47018f5c2264119b939",
        },
        carId: {
          name: "Tesla Model S",
          categoryId: {
            name: "Бизнес",
            description: "Бизнес",
            id: "611171dd2aed9a0b9b8506f9",
          },
          thumbnail: {
            path: require("@/assets/car.jpg"),
          },
        },
        color: "Синий",
        dateFrom: 1649620800000,
        dateTo: 1649707200000,
        price: 10280,
        isNeedChildChair: true,
        id: "7",
      },
    ],
  }),
};
</script>
