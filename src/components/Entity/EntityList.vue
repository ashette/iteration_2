<template>
  <v-container
    class="table-container px-0 flex-grow-1"
    fluid
  >
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog
            v-model="dialog"
            max-width="320px"
            content-class="admin"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Создать
                <v-icon
                  class="ml-2"
                  small
                >add</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="py-5">{{ formTitle }}</v-card-title>
              <slot
                name="entityUpdateForm"
                :editedItem="editedItem"
              ></slot>
              <v-card-actions class="pb-5">
                <v-spacer></v-spacer>
                <v-btn
                  color="tertiary"
                  elevation="0"
                  @click="close"
                >
                  Отменить
                </v-btn>
                <v-btn
                  color="primary"
                  elevation="0"
                  @click="save"
                >
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="320px"
            content-class="admin"
          >
            <v-card>
              <v-card-title class="justify-center py-5">Удалить элемент?</v-card-title>
              <v-card-actions class="pb-5">
                <v-spacer></v-spacer>
                <v-btn
                  elevation="0"
                  color="tertiary"
                  @click="closeDelete"
                >Отменить</v-btn>
                <v-btn
                  elevation="0"
                  color="secondary"
                  @click="deleteItemConfirm"
                >Удалить</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <control-buttons
          update
          remove
          @onUpdate="editItem(item)"
          @onRemove="deleteItem(item)"
        />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import ControlButtons from "@/components/ControlButtons";

export default {
  props: {
    items: Array,
    headers: Array,
    onUpdate: Function,
  },
  components: { ControlButtons },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = item;
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //TODO
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        // TODO
      }
      this.close();
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Создать" : "Редактировать";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>