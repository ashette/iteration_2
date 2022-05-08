<template>
  <div class="admin-content">
    <h1>Карточка автомобиля - {{ this.$route.params.carName || car.name }} </h1>
    <v-container
      class="d-flex flex-column flex-grow-1"
      fluid
    >
      <v-row class="car-details-page align-start">
        <v-col class="car-main-info admin-content__container elevation-5 col-12 col-md-3 col-lg-5">
          <v-img
            :src="imageSrc"
            contain
            max-width="230"
            class="car-main-info__img"
          ></v-img>
          <div class="car-main-info__title">{{ car.name }}</div>
          <div class="car-main-info__category">{{ car.currentCategoryName }}</div>
          <image-loader
            class="car-main-info__loader"
            @onUpload="onUpload"
          ></image-loader>
          <div class="car-main-info__description">
            <span>Описание</span>
            {{ car.description }}
          </div>
        </v-col>
        <v-col class="
            car-settings 
            admin-content__container 
            elevation-5 
            d-flex 
            flex-column  
          ">
          <h2>Настройки автомобиля</h2>
          <ValidationObserver v-slot="{ handleSubmit }">
            <v-form
              class="car-settings__form d-flex flex-column"
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <v-row class="flex-grow-0">
                <v-col class="col-12 col-sm-6">
                  <v-layout
                    column
                    class="control-group flex-grow-0"
                  >
                    <v-label>
                      <v-subheader>Модель автомобиля</v-subheader>
                      <v-text-field
                        v-model="car.name"
                        outlined
                        solo
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
                      <v-subheader>Тип автомобиля</v-subheader>
                      <v-select
                        v-model="car.categoryId"
                        :items="categories"
                        :menu-props="menuProps"
                        :loading="isCategoryRequesting"
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
                        <v-subheader>Мин. Цена</v-subheader>
                        <v-text-field
                          v-model="car.priceMin"
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
                        <v-subheader>Макс. Цена</v-subheader>
                        <v-text-field
                          v-model="car.priceMax"
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
                    class="control-group control-group--with-btn flex-grow-0"
                  >
                    <v-label>
                      <v-subheader>Доступные цвета</v-subheader>
                      <v-text-field
                        v-model="newColor"
                        outlined
                        solo
                      ></v-text-field>
                      <v-btn
                        color="admin-border"
                        outlined
                        @click="addColor(newColor)"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                      <v-checkbox
                        v-model="selectedColors"
                        v-for="color in colors"
                        :key="color"
                        :value="color"
                        :label="color"
                        on-icon="$vuetify.icon.checkboxAdminOn"
                        off-icon="$vuetify.icon.checkboxAdminOff"
                      ></v-checkbox>
                    </v-label>
                  </v-layout>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <v-layout
                    column
                    class="control-group flex-grow-0"
                  >
                    <v-label>
                      <v-subheader>Описание</v-subheader>
                      <v-textarea
                        v-model="newDescription"
                        :value="car.description"
                        outlined
                        solo
                      ></v-textarea>
                    </v-label>
                  </v-layout>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <v-layout
                    column
                    class="control-group flex-grow-0"
                  >
                    <v-label>
                      <v-subheader>Регистрационный номер</v-subheader>
                      <v-text-field
                        v-model="car.number"
                        outlined
                        solo
                      ></v-text-field>
                    </v-label>
                  </v-layout>
                </v-col>
              </v-row>
              <v-row class="flex-grow-0 mt-auto">
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
          </ValidationObserver>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ImageLoader from "@/components/Car/ImageLoader";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { ImageLoader },
  data: () => ({
    emptyImg: require("@/assets/no_image.jpg"),
    colors: [],
    selectedColors: [],
    newColor: "",
    newDescription: "",
    menuProps: {
      bottom: true,
      offsetY: true,
      tile: true,
    },
    categories: [],
    car: {},
  }),
  computed: {
    ...mapGetters("Category", ["isCategoryRequesting"]),
    imageSrc() {
      return this.car.thumbnailPath || this.emptyImg;
    },
  },
  created() {
    this.getCar(this.$route.params.id);
    this.getCategories();
  },
  methods: {
    ...mapActions("Car", ["requestCarData"]),
    ...mapActions("Category", ["requestCategories"]),
    async getCar(carId) {
      const carData = await this.requestCarData(carId);
      this.car = carData;
      this.colors = carData.colors;
      this.selectedColors = carData.colors;
      this.newDescription = carData.description;
    },
    async getCategories() {
      const { data } = await this.requestCategories();
      this.categories = data;
    },
    addColor(color) {
      const similarColors = this.colors.filter(
        (item) => item.toLowerCase() === color.toLowerCase()
      );

      if (!similarColors.length && color) {
        this.colors.push(color);
      }
    },
    fakeLoading() {
      return new Promise((res) => {
        setTimeout(res, Math.random() * 5000);
      });
    },
    async onUpload(file, iterate) {
      const promises = new Array(100)
        .fill(0)
        .map(() => this.fakeLoading().then(() => iterate()));

      await Promise.all(promises).then(() => iterate());
    },
  },
};
</script>