<template>
  <div class="admin-content">
    <h1>Добавить новый автомобиль</h1>
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-container
        class="d-flex flex-column flex-grow-1"
        fluid
      >
        <v-row class="car-details-page align-start">
          <v-col
            class="car-main-info admin-content__container elevation-5 col-12 col-md-3 col-lg-5">
            <v-img
              :src="imageSrc"
              contain
              max-width="230"
              class="car-main-info__img"
            ></v-img>
            <image-loader
              class="car-main-info__loader"
              @onUpload="onUpload"
            ></image-loader>
            <progress-info
              :progress="progressValue"
              class="car-main-info__progress"
            ></progress-info>
          </v-col>
          <v-col class="
            car-settings 
            admin-content__container 
            elevation-5 
            d-flex 
            flex-column 
          ">
            <h2>Настройки автомобиля</h2>
            <v-form
              class="car-settings__form d-flex flex-column flex-grow-1"
              @submit.prevent="handleSubmit(create)"
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
                        <v-text-field
                          v-model="car.name"
                          :error-messages="errors"
                          outlined
                          solo
                          @change="handleProgress"
                        ></v-text-field>
                      </v-label>
                    </v-layout>
                  </ValidationProvider>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <ValidationProvider
                    name="Тип автомобиля"
                    rules="required"
                    v-slot="{ errors }"
                  >
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
                          :error-messages="errors"
                          append-icon="unfold_more"
                          item-text="name"
                          item-value="id"
                          item-color="admin-primary"
                          single-line
                          persistent-placeholder
                          outlined
                          @change="handleProgress"
                        ></v-select>
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
                        <v-subheader>Мин. Цена</v-subheader>
                        <v-text-field
                          v-model="car.priceMin"
                          :error-messages="errors"
                          outlined
                          solo
                          append-icon="currency_ruble"
                          @change="handleProgress"
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
                          :error-messages="errors"
                          outlined
                          solo
                          append-icon="currency_ruble"
                          @change="handleProgress"
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
                      <v-subheader>Номер</v-subheader>
                      <v-text-field
                        v-model="car.number"
                        outlined
                        solo
                        @change="handleProgress"
                      ></v-text-field>
                    </v-label>
                  </v-layout>
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
                <v-col class="col-12">
                  <v-layout
                    column
                    class="control-group flex-grow-0"
                  >
                    <v-label>
                      <v-subheader>Описание</v-subheader>
                      <v-textarea
                        v-model="car.description"
                        outlined
                        solo
                        @change="handleProgress"
                      ></v-textarea>
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
                    type="submit"
                  >
                    Сохранить
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </ValidationObserver>
  </div>
</template>

<script>
import ImageLoader from "@/components/Car/ImageLoader";
import ProgressInfo from "@/components/Car/ProgressInfo";
import { mapActions, mapGetters } from "vuex";

const PROGRESS_BUFFER = 6;
export default {
  components: { ImageLoader, ProgressInfo },
  data: () => ({
    emptyImg: require("@/assets/no_image.jpg"),
    colors: [],
    selectedColors: [],
    newColor: "",
    menuProps: {
      bottom: true,
      offsetY: true,
      tile: true,
    },
    car: {
      priceMin: 0,
      priceMax: 0,
      name: "",
      description: "",
      number: "",
      categoryId: null,
      thumbnail: {},
      colors: [],
      id: "",
    },
    progressValue: 0,
  }),
  computed: {
    ...mapGetters("Category", {
      isCategoryRequesting: "isRequesting",
      categories: "categories",
    }),
    imageSrc() {
      return this.car.thumbnail.path || this.emptyImg;
    },
  },
  created() {
    this.getCategories();
  },
  methods: {
    ...mapActions("Car", ["createCar"]),
    ...mapActions("Category", ["requestCategories"]),
    async getCategories() {
      const { response } = await this.requestCategories({ limit: null });
    },
    addColor(color) {
      const similarColors = this.colors.filter(
        (item) => item.toLowerCase() === color.toLowerCase()
      );

      if (!similarColors.length && color) {
        this.colors.push(color);
      }
    },
    create() {
      const car = this.car;
      this.car.colors = this.selectedColors;

      if (car) {
        this.createCar({ car });
      }
    },
    onUpload(file, types) {
      if (file && types.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          this.car.thumbnail = {
            size: file.size,
            originalname: file.name,
            mimetype: file.type,
            path: reader.result,
          };
        };

        reader.readAsDataURL(file);
      } else {
        this.car.thumbnail = {};
      }
    },
    handleProgress() {
      const { id, colors, thumbnail, ...rest } = this.car;
      const filledFields = Object.values(rest).filter((item) => item).length;
      this.progressValue = Math.round((filledFields / PROGRESS_BUFFER) * 100);
    },
  },
};
</script>