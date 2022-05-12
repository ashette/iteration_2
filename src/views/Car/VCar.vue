<template>
  <div class="admin-content">
    <h1>Карточка автомобиля - {{ this.$route.params.carName || currentName }} </h1>
    <v-container
      class="d-flex flex-column flex-grow-1"
      fluid
    >
      <v-row class="car-details-page align-start">
        <v-col class="car-main-info admin-content__container elevation-5 col-12 col-md-3 col-lg-5">
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
          <template v-else>
            <v-img
              :src="imageSrc"
              contain
              max-width="230"
              class="car-main-info__img"
            ></v-img>
            <div class="car-main-info__title">{{ currentName }}</div>
            <div class="car-main-info__category">{{ car.categoryName }}</div>
            <image-loader
              class="car-main-info__loader"
              @onUpload="onUpload"
            ></image-loader>
            <progress-info
              :progress="progressValue"
              class="car-main-info__progress"
            ></progress-info>
            <div class="car-main-info__description">
              <span>Описание</span>
              {{ currentDescription }}
            </div>
          </template>
        </v-col>
        <v-col class="
            car-settings 
            admin-content__container 
            elevation-5 
            d-flex 
            flex-column  
          ">
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
          <template v-else>
            <h2>Настройки автомобиля</h2>
            <ValidationObserver v-slot="{ handleSubmit }">
              <v-form
                class="car-settings__form d-flex flex-column"
                @submit.prevent="handleSubmit(update)"
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
                          @change="handleProgress"
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
                          :disabled="isCategoryRequesting"
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
                            outlined
                            solo
                            :error-messages="errors"
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
                          v-model="car.description"
                          outlined
                          solo
                          @change="handleProgress"
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
                          @change="handleProgress"
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
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ImageLoader from "@/components/Car/ImageLoader";
import ProgressInfo from "@/components/Car/ProgressInfo";
import { mapActions, mapGetters, mapMutations } from "vuex";

const PROGRESS_BUFFER = 6;
export default {
  components: { ImageLoader, ProgressInfo },
  data: () => ({
    emptyImg: require("@/assets/no_image.jpg"),
    colors: [],
    selectedColors: [],
    newColor: "",
    currentDescription: "",
    currentName: "",
    menuProps: {
      bottom: true,
      offsetY: true,
      tile: true,
    },
    progressValue: 0,
  }),
  computed: {
    ...mapGetters("Car", {
      isCarRequesting: "isRequesting",
      car: "carData",
    }),
    ...mapGetters("Category", {
      isCategoryRequesting: "isRequesting",
      categories: "categories",
    }),
    imageSrc() {
      return this.car.thumbnailPath || this.emptyImg;
    },
  },
  created() {
    this.getCategories();
    this.getCar(this.$route.params.id);
  },
  methods: {
    ...mapMutations("Car", ["resetCar"]),
    ...mapActions("Car", ["requestCarData", "updateCar", "deleteCar"]),
    ...mapActions("Category", ["requestCategories"]),

    async getCar(carId) {
      const response = await this.requestCarData(carId);
      this.setDefaultValues();
      this.handleProgress();
    },
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
    setDefaultValues() {
      this.colors = this.car.colors;
      this.selectedColors = this.car.colors;
      this.currentName = this.car.name;
      this.currentDescription = this.car.description;
    },
    onUpload(file, types) {
      if (file && types.includes(file.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          this.car.thumbnailPath = reader.result;
          this.car.thumbnail = {
            size: file.size,
            originalname: file.name,
            mimetype: file.type,
            path: reader.result,
          };
        };
      } else {
        this.car.thumbnailPath = null;
        this.car.thumbnail = {};
      }
    },
    update() {
      const car = this.car;
      car.colors = this.selectedColors;

      if (car) {
        this.updateCar({ id: car.id, car });
        this.setDefaultValues();
      }
    },
    remove() {
      const car = this.car;
      if (car) {
        this.deleteCar({ id: car.id });
      }
    },
    handleProgress() {
      const { id, colors, thumbnailPath, tank, categoryName, ...rest } = this.car;
      const filledFields = Object.values(rest).filter((item) => item).length;
      this.progressValue = Math.round((filledFields / PROGRESS_BUFFER) * 100);
    },
  },
  beforeDestroy() {
    this.resetCar();
  },
};
</script>