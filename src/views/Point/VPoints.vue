<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <entity-list
        :items="points"
        :headers="headers"
        :loading="isRequesting"
        @onCreate="create"
        @onUpdate="update"
        @onRemove="remove"
      >
        <template v-slot:entityUpdateForm="{ editedItem }">
          <v-card-text>
            <v-container>
              <v-row class="d-flex flex-grow-1 flex-column">
                <ValidationProvider
                  name="Название"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-layout
                    column
                    class="control-group flex-grow-0"
                  >
                    <v-label>
                      <v-subheader>Название</v-subheader>
                      <v-text-field
                        v-model="editedItem.name"
                        :error-messages="errors"
                        outlined
                        solo
                      ></v-text-field>
                    </v-label>
                  </v-layout>
                </ValidationProvider>
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
                        v-model="editedItem.cityId"
                        :items="cities"
                        :menu-props="menuProps"
                        :error-messages="errors"
                        append-icon="unfold_more"
                        item-value="id"
                        item-text="name"
                        item-color="admin-primary"
                        single-line
                        persistent-placeholder
                        outlined
                      ></v-select>
                    </v-label>
                  </v-layout>
                </ValidationProvider>
                <ValidationProvider
                  name="Адрес"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-layout
                    column
                    class="control-group flex-grow-0"
                  >
                    <v-label>
                      <v-subheader>Адрес</v-subheader>
                      <v-textarea
                        v-model="editedItem.address"
                        :error-messages="errors"
                        outlined
                        solo
                      ></v-textarea>
                    </v-label>
                  </v-layout>
                </ValidationProvider>
              </v-row>
            </v-container>
          </v-card-text>
        </template>
      </entity-list>

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
import EntityList from "../../components/Entity/EntityList";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { EntityList },
  data: () => ({
    menuProps: {
      bottom: true,
      offsetY: true,
      tile: true,
    },
    headers: [
      {
        text: "Название",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Город",
        align: "start",
        sortable: false,
        value: "cityId.name",
      },
      {
        text: "Адрес",
        align: "start",
        sortable: false,
        value: "address",
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
  created() {
    this.getPoints();
    this.getCities();
  },
  methods: {
    ...mapActions("Point", [
      "requestPoints",
      "createPoint",
      "updatePoint",
      "deletePoint",
      "setCurrentPage",
      "resetPoints",
    ]),
    ...mapActions("City", ["requestCities"]),
    async getPoints() {
      const response = await this.requestPoints();
    },
    async getCities() {
      const response = await this.requestCities({ limit: null });
    },
    handlePageChange(value) {
      this.setCurrentPage(value);
    },
    create(point) {
      this.createPoint({ point });
    },
    update(point) {
      this.updatePoint({ id: point.id, point });
    },
    remove(point) {
      this.deletePoint({ id: point.id });
    },
  },
  computed: {
    ...mapGetters("Point", ["isRequesting", "points", "pagination"]),
    ...mapGetters("City", ["isRequesting", "cities"]),
  },
  beforeDestroy() {
    this.resetPoints();
  },
};
</script>
