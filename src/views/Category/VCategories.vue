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
import { mapActions, mapGetters } from "vuex";
import EntityList from "../../components/Entity/EntityList";

export default {
  components: { EntityList },
  data: () => ({
    page: 1,
    pageLimit: 7,
    pageCount: 0,
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
    ...mapActions("Category", [
      "requestCategories",
      "createCategory",
      "updateCategory",
      "deleteCategory",
    ]),
    async getCategories() {
      const response = await this.requestCategories({
        page: this.page - 1,
        limit: this.pageLimit,
      });
      this.pageCount = response.count;
    },
    handlePageChange(value) {
      this.page = value;
      this.getCategories();
    },
    create(category) {
      console.log("crt", category); //TODO
      this.createCategory({ category });
    },
    update(category) {
      console.log("upd", category.id, category); //TODO
      this.updateCategory({ id: category.id, category });
    },
    remove(category) {
      console.log("dlt", category.id, category); //TODO
      this.deleteCategory(category);
    },
  },
  computed: {
    ...mapGetters("Category", ["isRequesting", "categories"]),
    paginationLength() {
      const length = Math.ceil(this.pageCount / this.pageLimit);
      return length > 1 ? length : 1;
    },
  },
};
</script>
