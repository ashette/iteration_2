<template>
  <div class="admin-content">
    <h1>{{ this.$route.meta.title }}</h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >
      <entity-list
        :items="categories"
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
                <v-layout
                  column
                  class="control-group flex-grow-0"
                >
                  <v-label>
                    <v-subheader>Описание</v-subheader>
                    <v-textarea
                      v-model="editedItem.description"
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
import { mapActions, mapGetters, mapMutations } from "vuex";
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
        text: "Описание",
        align: "start",
        sortable: false,
        value: "description",
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ],
  }),
  created() {
    this.getCategories();
  },
  methods: {
    ...mapMutations("Category", ["resetCategories"]),
    ...mapActions("Category", [
      "requestCategories",
      "createCategory",
      "updateCategory",
      "deleteCategory",
      "setCurrentPage",
    ]),
    async getCategories() {
      const response = await this.requestCategories();
    },
    handlePageChange(value) {
      this.setCurrentPage(value);
    },
    create(category) {
      this.createCategory({ category });
    },
    update(category) {
      this.updateCategory({ id: category.id, category });
    },
    remove(category) {
      this.deleteCategory({ id: category.id });
    },
  },
  computed: {
    ...mapGetters("Category", ["isRequesting", "categories", "pagination"]),
  },
  beforeDestroy() {
    this.resetCategories();
  },
};
</script>
