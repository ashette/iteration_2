<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <entity-list
        :items="cities"
        :headers="headers"
        :loading="isRequesting"
        @onCreate="create"
        @onUpdate="update"
        @onRemove="remove"
      >
        <template v-slot:entityUpdateForm="{editedItem}">
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
import { mapActions, mapGetters } from "vuex";
import EntityList from "../../components/Entity/EntityList";

export default {
  components: { EntityList },
  data: () => ({
    headers: [
      {
        text: "Название",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
  created() {
    this.getCities();
  },
  methods: {
    ...mapActions("City", [
      "requestCities",
      "createCity",
      "updateCity",
      "deleteCity",
      "setCurrentPage",
      "resetCities",
    ]),
    async getCities() {
      const response = await this.requestCities();
    },
    handlePageChange(value) {
      this.setCurrentPage(value);
    },
    create(city) {
      this.createCity({ city });
    },
    update(city) {
      this.updateCity({ id: city.id, city });
    },
    remove(city) {
      this.deleteCity({ id: city.id });
    },
  },
  computed: {
    ...mapGetters("City", ["isRequesting", "cities", "pagination"]),
  },
  beforeDestroy() {
    this.resetCities();
  },
};
</script>
