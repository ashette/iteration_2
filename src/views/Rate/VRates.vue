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
        :items="filteredRates"
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
                      v-model="editedItem.rateName"
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
                    <v-subheader>Цена</v-subheader>
                    <v-text-field
                      v-model="editedItem.price"
                      outlined
                      solo
                      append-icon="currency_ruble"
                    ></v-text-field>
                  </v-label>
                </v-layout>
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Длительность</v-subheader>
                    <v-textarea
                      v-model="editedItem.rateUnit"
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
    rates: [],
    filters: [],
    headers: [
      {
        text: "Название",
        align: "start",
        sortable: false,
        value: "rateTypeId.name",
      },
      {
        text: "Длительность",
        align: "start",
        sortable: false,
        value: "rateTypeId.unit",
      },
      {
        text: "Цена",
        align: "start",
        sortable: false,
        value: "price",
        width: "10%",
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
  async mounted() {
    this.getRates();
  },
  methods: {
    ...mapActions("Rate", ["requestRates"]),
    async getRates() {
      const response = await this.requestRates({
        page: this.page - 1,
        limit: this.pageLimit,
      });

      this.rates = response.data;
      this.pageCount = response.count;
    },
    handlePageChange(value) {
      this.page = value;
      this.getRates();
    },
  },
  computed: {
    filteredRates() {
      return this.rates.map((rate) => {
        if (rate.rateTypeId) {
          rate.rateName = rate.rateTypeId.name;
          rate.rateUnit = rate.rateTypeId.unit;
        }
        return rate;
      });
    },
    paginationLength() {
      const length = Math.round(this.pageCount / this.pageLimit);
      return length > 1 ? length : 1;
    },
  },
};
</script>
