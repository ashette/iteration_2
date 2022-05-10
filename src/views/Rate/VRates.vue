<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <entity-list
        :items="rates"
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
                        v-model="editedItem.rateTypeId"
                        :items="units"
                        :menu-props="menuProps"
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
                <ValidationProvider
                  name="Цена"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-layout
                    column
                    class="control-group flex-grow-0"
                  >
                    <v-label>
                      <v-subheader>Цена</v-subheader>
                      <v-text-field
                        v-model="editedItem.price"
                        :error-messages="errors"
                        outlined
                        solo
                        append-icon="currency_ruble"
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
        text: "Длительность",
        align: "start",
        sortable: false,
        value: "unit",
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
  created() {
    this.getRates();
    this.getUnits();
  },
  methods: {
    ...mapActions("Rate", [
      "requestRates",
      "createRate",
      "updateRate",
      "deleteRate",
      "setCurrentPage",
      "resetRates",
    ]),
    ...mapActions("Unit", ["requestUnits"]),
    async getRates() {
      const response = await this.requestRates();
    },
    async getUnits() {
      const response = await this.requestUnits({ limit: null });
    },
    handlePageChange(value) {
      this.setCurrentPage(value);
    },
    create(rate) {
      this.createRate({ rate });
    },
    update(rate) {
      this.updateRate({ id: rate.id, rate });
    },
    remove(rate) {
      this.deleteRate({ id: rate.id });
    },
    getRateText(item) {
      return `${item.name} (${item.unit})`;
    },
  },
  computed: {
    ...mapGetters("Rate", ["isRequesting", "rates", "pagination"]),
    ...mapGetters("Unit", ["isRequesting", "units"]),
  },
  beforeDestroy() {
    this.resetRates();
  },
};
</script>
