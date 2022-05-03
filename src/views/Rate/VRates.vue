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
          :length="10"
          :total-visible="7"
          circle
          prev-icon="keyboard_double_arrow_left"
          next-icon="keyboard_double_arrow_right"
        ></v-pagination>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Filters from "../../components/Filters";
import EntityList from "../../components/Entity/EntityList";

export default {
  components: { Filters, EntityList },
  data: () => ({
    page: 1,
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
    rates: [
      {
        price: 1000,
        rateTypeId: {
          unit: "30 дней",
          name: "Месячный",
          id: "6114e4182aed9a0b9b850843",
        },
        id: "6259003d73b61100181028d9",
      },
      {
        price: 10,
        rateTypeId: {
          unit: "мин",
          name: "Поминутно",
          id: "5e26a07f099b810b946c5d82",
        },
        id: "62593c9d73b61100181028ed",
      },
      {
        price: 2500,
        rateTypeId: {
          unit: "сутки",
          name: "Суточный",
          id: "5e26a082099b810b946c5d83",
        },
        id: "62593cac73b61100181028ee",
      },
      {
        price: 15000,
        rateTypeId: {
          unit: "7 дней",
          name: "Недельный",
          id: "5f622f029d3a610b850fd820",
        },
        id: "62593cca73b61100181028ef",
      },
      {
        price: 13500,
        rateTypeId: {
          name: "Недельный (Акция!)",
          unit: "7 дней",
          id: "60b9437e2aed9a0b9b7ed337",
        },
        id: "62593cd573b61100181028f0",
      },
      {
        price: 51000,
        rateTypeId: {
          name: "3 Месяца",
          unit: "90 дней",
          id: "61a4c62105c99b2812794fc3",
        },
        id: "62593cf073b61100181028f1",
      },
      {
        price: 200000,
        rateTypeId: {
          name: "Годовой",
          unit: "365 дней",
          id: "61a4c81c05c99b2812794fcb",
        },
        id: "62593d0273b61100181028f2",
      },
    ],
    filters: [
      {
        name: "Модель",
        values: [
          {
            id: 1,
            name: "Модель1",
          },
          {
            id: 2,
            name: "Модель2",
          },
        ],
      },
      {
        name: "Город",
        values: [
          {
            id: 1,
            name: "Город1",
          },
          {
            id: 2,
            name: "Город2",
          },
        ],
      },
      {
        name: "Статус",
        values: [
          {
            id: 1,
            name: "Статус1",
          },
          {
            id: 2,
            name: "Статус2",
          },
        ],
      },
    ],
  }),
  computed: {
    filteredRates: function () {
      return this.rates.map((rate) => {
        if (rate.rateTypeId) {
          rate.rateName = rate.rateTypeId.name;
          rate.rateUnit = rate.rateTypeId.unit;
        }
        return rate;
      });
    },
  },
};
</script>
