<template>
  <div class="admin-content">
    <h1>Заказ № <span>{{ this.$route.params.id }}</span></h1>
    <v-container
      class="d-flex flex-column "
      fluid
    >
      <v-row>
        <v-col class="car-settings admin-content__container elevation-5 col-12 col-md-8">
          <v-form class="car-settings__form d-flex flex-column flex-grow-1">
            <v-row class="flex-grow-0">
              <v-col class="col-12 col-sm-6">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Модель автомобиля</v-subheader>
                    <v-select
                      v-model="order.carId.name"
                      :items="cars"
                      :menu-props="menuProps"
                      append-icon="unfold_more"
                      item-text="name"
                      item-color="admin-primary"
                      single-line
                      persistent-placeholder
                      outlined
                    ></v-select>
                  </v-label>
                </v-layout>
              </v-col>
              <v-col class="col-12 col-sm-6">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Город</v-subheader>
                    <v-select
                      v-model="order.cityId.name"
                      :items="cities"
                      :menu-props="menuProps"
                      append-icon="unfold_more"
                      item-text="name"
                      item-color="admin-primary"
                      single-line
                      persistent-placeholder
                      outlined
                    ></v-select>
                  </v-label>
                </v-layout>
              </v-col>
              <v-col class="col-12 col-sm-6">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Пункт выдачи</v-subheader>
                    <v-select
                      v-model="order.pointId.address"
                      :items="addresses"
                      :menu-props="menuProps"
                      append-icon="unfold_more"
                      item-text="name"
                      item-color="admin-primary"
                      single-line
                      persistent-placeholder
                      outlined
                    ></v-select>
                  </v-label>
                </v-layout>
              </v-col>
              <v-col class="col-12 col-sm-6">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Цвет</v-subheader>
                    <v-select
                      v-model="order.color"
                      :items="order.carId.colors"
                      :menu-props="menuProps"
                      append-icon="unfold_more"
                      item-text="name"
                      item-color="admin-primary"
                      single-line
                      persistent-placeholder
                      outlined
                    ></v-select>
                  </v-label>
                </v-layout>
              </v-col>
              <v-col class="col-12 col-sm-6">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Начало аренды</v-subheader>
                    <v-datetime-picker
                      v-model="dateFrom"
                      dateFormat="dd.MM.yyyy"
                      clearText="Очистить"
                      okText="Применить"
                      content-class="admin"
                      :textFieldProps="textProps"
                      :datePickerProps="{ min: nowDate }"
                      :timePickerProps="{ format: '24hr' }"
                    >
                      <template slot="dateIcon"> Дата </template>
                      <template slot="timeIcon"> Время </template>
                      <template v-slot:actions="{ parent }">
                        <v-btn
                          class="datetime-picker-btn"
                          color="tertiary"
                          text
                          @click.native="parent.clearHandler()"
                        >
                          Отмена
                        </v-btn>
                        <v-btn
                          class="datetime-picker-btn"
                          color="primary"
                          text
                          @click="parent.okHandler()"
                        >
                          Применить
                        </v-btn>
                      </template>
                    </v-datetime-picker>
                  </v-label>
                </v-layout>
              </v-col>
              <v-col class="col-12 col-sm-6">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Конец аренды</v-subheader>
                    <v-datetime-picker
                      v-model="dateTo"
                      dateFormat="dd.MM.yyyy"
                      clearText="Очистить"
                      okText="Применить"
                      :textFieldProps="textProps"
                      :datePickerProps="{ min: nowDate }"
                      :timePickerProps="{ format: '24hr' }"
                    >
                      <template slot="dateIcon"> Дата </template>
                      <template slot="timeIcon"> Время </template>
                      <template v-slot:actions="{ parent }">
                        <v-btn
                          class="datetime-picker-btn"
                          color="tertiary"
                          text
                          @click.native="parent.clearHandler()"
                        >
                          Отмена
                        </v-btn>
                        <v-btn
                          class="datetime-picker-btn"
                          color="primary"
                          text
                          @click="parent.okHandler()"
                        >
                          Применить
                        </v-btn>
                      </template>
                    </v-datetime-picker>
                  </v-label>
                </v-layout>
              </v-col>
              <v-col class="col-12 col-sm-6">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Тариф</v-subheader>
                    <v-select
                      v-model="order.rateId.rateTypeId.name"
                      :items="rates"
                      :menu-props="menuProps"
                      append-icon="unfold_more"
                      item-text="name"
                      item-color="admin-primary"
                      single-line
                      persistent-placeholder
                      outlined
                    ></v-select>
                  </v-label>
                </v-layout>
              </v-col>
              <v-col class="col-12 col-sm-6">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Цена</v-subheader>
                    <v-text-field
                      v-model="order.price"
                      outlined
                      solo
                      readonly
                      disabled
                      append-icon="currency_ruble"
                    ></v-text-field>
                  </v-label>
                </v-layout>
              </v-col>
              <v-col class="col-12 col-sm-6">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Дополнительные опции</v-subheader>
                    <v-checkbox
                      v-model="order.isFullTank"
                      label="Полный бак"
                      on-icon="$vuetify.icon.checkboxAdminOn"
                      off-icon="$vuetify.icon.checkboxAdminOff"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="order.isNeedChildChair"
                      label="Детское кресло"
                      on-icon="$vuetify.icon.checkboxAdminOn"
                      off-icon="$vuetify.icon.checkboxAdminOff"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="order.isRightWheel"
                      label="Правый руль"
                      on-icon="$vuetify.icon.checkboxAdminOn"
                      off-icon="$vuetify.icon.checkboxAdminOff"
                    ></v-checkbox>
                  </v-label>
                </v-layout>
              </v-col>
            </v-row>
            <v-row class="flex-grow-0 mt-3">
              <v-col class="d-flex flex-wrap car-settings__controls">
                <v-btn
                  class="mr-sm-3"
                  color="primary"
                  elevation="0"
                >
                  Сохранить
                </v-btn>
                <v-btn
                  class="mr-sm-3"
                  color="tertiary"
                  elevation="0"
                >
                  Отменить
                </v-btn>
                <v-btn
                  class="ml-sm-auto"
                  color="secondary"
                  elevation="0"
                >
                  Удалить
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {
    this.dateFrom = new Date(this.order.dateFrom);
    this.dateTo = new Date(this.order.dateTo);
  },
  data: () => ({
    nowDate: new Date().toISOString().slice(0, 10),
    dateFrom: null,
    dateTo: null,
    textProps: {
      outlined: true,
      solo: true,
    },
    menuProps: {
      bottom: true,
      offsetY: true,
      tile: true,
    },
    cars: ["Tesla Model S", "Tesla Model V"],
    cities: ["Москва", "Санкт-Петербург"],
    addresses: ["56 Литейный проспект"],
    rates: ["Поминутно"],
    order: {
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
  }),
};
</script>


