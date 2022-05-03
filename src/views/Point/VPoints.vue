<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <v-container
        class="pa-0 flex-grow-0"
        fluid
      >
        <filters :filters="filters" />
      </v-container>

      <entity-list
        :items="filteredPoints"
        :headers="headers"
      >
        <template v-slot:entityUpdateForm="{ editedItem }">
          <v-card-text>
            <v-container>
              <v-row class="d-flex flex-grow-1 flex-column">
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Название</v-subheader>
                    <v-text-field
                      v-model="editedItem.name"
                      outlined
                      solo
                    ></v-text-field>
                  </v-label>
                </v-layout>
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Город</v-subheader>
                    <v-text-field
                      v-model="editedItem.cityName"
                      outlined
                      solo
                    ></v-text-field>
                  </v-label>
                </v-layout>
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Адрес</v-subheader>
                    <v-textarea
                      v-model="editedItem.address"
                      outlined
                      solo
                    ></v-textarea>
                  </v-label>
                </v-layout>
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
          v-model="page"
          class="admin-pagination d-flex flex-grow-1"
          :length="paginationLength"
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
import Filters from "../../components/Filters";
import EntityList from "../../components/Entity/EntityList";
import { mapActions } from "vuex";

export default {
  components: { Filters, EntityList },
  data: () => ({
    page: 1,
    pageLimit: 7,
    pageCount: 0,
    points: [],
    filters: [],
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
  async mounted() {
    this.getPoints();
  },
  methods: {
    ...mapActions("Point", ["requestPoints"]),
    async getPoints() {
      const response = await this.requestPoints({
        page: this.page - 1,
        limit: this.pageLimit,
      });
      this.points = response.data;
      this.pageCount = response.count;
    },
    handlePageChange(value) {
      this.page = value;
      this.getPoints();
    },
  },
  computed: {
    filteredPoints() {
      return this.points.map((point) => {
        if (point.cityId) {
          point.cityName = point.cityId.name;
        }
        return point;
      });
    },
    paginationLength: function () {
      const length = Math.round(this.pageCount / this.pageLimit);
      return length > 1 ? length : 1;
    },
  },
};
</script>
