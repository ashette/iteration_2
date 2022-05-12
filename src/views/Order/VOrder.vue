<template>
  <div class="admin-content">
    <h1>Заказ № <span>{{ this.$route.params.id }}</span></h1>
    <v-container
      class="d-flex flex-column "
      fluid
    >
      <v-row>
        <v-col class="car-settings admin-content__container elevation-5 col-12 col-md-8">
          <v-col
            v-if="isOrderRequesting"
            no-gutters
            class="d-flex justify-center align-center fill-height"
          >
            <v-progress-circular
              indeterminate
              size="54"
              color="primary"
            ></v-progress-circular>
          </v-col>
          <ValidationObserver
            v-slot="{ handleSubmit }"
            v-else
          >
            <v-form
              class="car-settings__form d-flex flex-column flex-grow-1"
              @submit.prevent="handleSubmit(update)"
            >
              <v-row class="flex-grow-0">
                <v-col class="col-12 col-sm-6">
                  <ValidationProvider
                    name="Модель автомобиля"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-layout
                      column
                      class="control-group flex-grow-0"
                    >
                      <v-label>
                        <v-subheader>Модель автомобиля</v-subheader>
                        <v-select
                          v-model="order.carId"
                          :items="cars"
                          :menu-props="menuProps"
                          :loading="isCarRequesting"
                          :disabled="isCarRequesting"
                          :error-messages="errors"
                          append-icon="unfold_more"
                          item-text="name"
                          item-value="id"
                          item-color="admin-primary"
                          single-line
                          persistent-placeholder
                          outlined
                        ></v-select>
                      </v-label>
                    </v-layout>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <ValidationProvider
                    name="Город"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-layout
                      column
                      class="control-group flex-grow-0"
                    >
                      <v-label>
                        <v-subheader>Город</v-subheader>
                        <v-select
                          v-model="order.cityId"
                          :items="cities"
                          :menu-props="menuProps"
                          :loading="isCityRequesting"
                          :disabled="isCityRequesting"
                          :error-messages="errors"
                          append-icon="unfold_more"
                          item-text="name"
                          item-value="id"
                          item-color="admin-primary"
                          single-line
                          persistent-placeholder
                          outlined
                          no-data-text="Городов не найдено"
                          @input="getPoints"
                        ></v-select>
                      </v-label>
                    </v-layout>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <ValidationProvider
                    name="Пункт выдачи"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-layout
                      column
                      class="control-group flex-grow-0"
                    >
                      <v-label>
                        <v-subheader>Пункт выдачи</v-subheader>
                        <v-select
                          v-model="order.pointId"
                          :items="points"
                          :menu-props="menuProps"
                          :loading="isPointRequesting"
                          :disabled="!hasCity || isPointRequesting"
                          :error-messages="errors"
                          append-icon="unfold_more"
                          item-text="address"
                          item-value="id"
                          item-color="admin-primary"
                          single-line
                          persistent-placeholder
                          outlined
                          no-data-text="Пунктов выдачи не найдено"
                        ></v-select>
                      </v-label>
                    </v-layout>
                  </ValidationProvider>
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
                        :items="getCarColors"
                        :menu-props="menuProps"
                        :loading="isCarRequesting"
                        :disabled="isCarRequesting"
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
                  <ValidationProvider
                    name="Начало аренды"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-layout
                      column
                      class="control-group flex-grow-0"
                    >
                      <v-label>
                        <v-subheader>Начало аренды</v-subheader>
                        <v-datetime-picker
                          v-model="order.dateFrom"
                          dateFormat="dd.MM.yyyy"
                          clearText="Очистить"
                          okText="Применить"
                          content-class="admin"
                          :textFieldProps="getTextProps(errors)"
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
                  </ValidationProvider>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <ValidationProvider
                    name="Конец аренды"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-layout
                      column
                      class="control-group flex-grow-0"
                    >
                      <v-label>
                        <v-subheader>Конец аренды</v-subheader>
                        <v-datetime-picker
                          v-model="order.dateTo"
                          dateFormat="dd.MM.yyyy"
                          clearText="Очистить"
                          okText="Применить"
                          :textFieldProps="getTextProps(errors)"
                          :datePickerProps="{ min: dateLimit }"
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
                  </ValidationProvider>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <ValidationProvider
                    name="Тариф"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-layout
                      column
                      class="control-group flex-grow-0"
                    >
                      <v-label>
                        <v-subheader>Тариф</v-subheader>
                        <v-select
                          v-model="order.rateId"
                          :items="rates"
                          :menu-props="menuProps"
                          :loading="isRateRequesting"
                          :disabled="isRateRequesting"
                          :error-messages="errors"
                          append-icon="unfold_more"
                          item-value="id"
                          item-color="admin-primary"
                          single-line
                          persistent-placeholder
                          outlined
                        >
                          <template v-slot:item="{ item }">
                            {{ getRateText(item) }}
                          </template>
                          <template v-slot:selection="{ item }">
                            {{ getRateText(item) }}
                          </template>
                        </v-select>
                      </v-label>
                    </v-layout>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <ValidationProvider
                    name="Цена"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
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
                          :error-messages="errors"
                          append-icon="currency_ruble"
                        ></v-text-field>
                      </v-label>
                    </v-layout>
                  </ValidationProvider>
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
                    type="submit"
                  >
                    Сохранить
                  </v-btn>
                  <v-btn
                    class="ml-sm-auto"
                    color="secondary"
                    elevation="0"
                    @click="remove"
                  >
                    Удалить
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data: () => ({
    menuProps: {
      bottom: true,
      offsetY: true,
      tile: true,
    },
  }),
  created() {
    this.getCities();
    this.getCars();
    this.getRates();
    this.getPoints();
    this.getOrder(this.$route.params.id);
  },
  computed: {
    ...mapGetters("Order", {
      isOrderRequesting: "isRequesting",
      order: "orderData",
    }),
    ...mapGetters("Rate", {
      isRateRequesting: "isRequesting",
      rates: "rates",
    }),
    ...mapGetters("Car", {
      isCarRequesting: "isRequesting",
      cars: "cars",
    }),
    ...mapGetters("Point", {
      isPointRequesting: "isRequesting",
      points: "points",
    }),
    ...mapGetters("City", {
      isCityRequesting: "isRequesting",
      cities: "cities",
    }),
    hasCity() {
      return Boolean(this.order.cityId);
    },
    dateLimit() {
      const dateFrom = this.order.dateFrom || new Date();
      return dateFrom.toISOString().slice(0, 10);
    },
    getCarColors() {
      const carId = this.order.carId;
      let colors = [];

      if (this.cars) {
        this.cars.map((car) => {
          if (car.id == carId && car.colors) {
            colors = car.colors;
          }
        });
      }

      return colors;
    },
  },
  methods: {
    ...mapMutations("Order", ["resetOrder"]),
    ...mapActions("Order", [
      "requestOrderData",
      "updateOrder",
      "deleteOrder",
    ]),
    ...mapActions("Point", ["requestPoints"]),
    ...mapActions("City", ["requestCities"]),
    ...mapActions("Car", ["requestCars"]),
    ...mapActions("Rate", ["requestRates"]),
    async getOrder(orderId) {
      const response = await this.requestOrderData(orderId);
    },
    async getPoints() {
      const params = {
        cityId: this.order.cityId,
      };

      if (this.order.cityId) {
        const { response } = await this.requestPoints(params);
        this.order.pointId = this.points[0].id;
      }
    },
    async getCities() {
      const response = await this.requestCities({ limit: null });
    },
    async getCars() {
      const response = await this.requestCars({ limit: null });
    },
    async getRates() {
      const response = await this.requestRates({ limit: null });
    },
    update() {
      const order = this.order;
      if (order) {
        this.updateOrder({ id: order.id, order });
      }
    },
    remove() {
      const order = this.order;
      if (order) {
        this.deleteOrder({ id: order.id });
      }
    },
    getTextProps(errors) {
      return {
        "error-messages": errors,
        outlined: true,
        solo: true,
      };
    },
    getRateText(item) {
      return `${item.name}(${item.unit}) - ${item.price}`;
    },
  },
  beforeDestroy() {
    this.resetOrder();
  },
};
</script>


