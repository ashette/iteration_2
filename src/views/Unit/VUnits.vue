<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <entity-list
        :items="units"
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
                <ValidationProvider
                  name="Длительность"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-layout
                    column
                    class="control-group flex-grow-0"
                  >
                    <v-label>
                      <v-subheader>Длительность</v-subheader>
                      <v-textarea
                        v-model="editedItem.unit"
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
      {
        text: "Длительность",
        align: "start",
        sortable: false,
        value: "unit",
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
  created() {
    this.getUnits();
  },
  methods: {
    ...mapActions("Unit", [
      "requestUnits",
      "createUnit",
      "updateUnit",
      "deleteUnit",
      "setCurrentPage",
      "resetUnits",
    ]),
    async getUnits() {
      const response = await this.requestUnits();
    },
    handlePageChange(value) {
      this.setCurrentPage(value);
    },
    create(unit) {
      this.createUnit({ unit });
    },
    update(unit) {
      this.updateUnit({ id: unit.id, unit });
    },
    remove(unit) {
      this.deleteUnit({ id: unit.id });
    },
  },
  computed: {
    ...mapGetters("Unit", ["isRequesting", "units", "pagination"]),
  },
  beforeDestroy() {
    this.resetUnits();
  },
};
</script>
