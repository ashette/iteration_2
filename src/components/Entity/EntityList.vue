<template>
  <v-container
    class="table-container px-0 flex-grow-1"
    fluid
  >
    <v-row
      v-if="loading"
      no-gutters
      class="justify-center align-center fill-height"
    >
      <v-progress-circular
        indeterminate
        size="54"
        color="primary"
      ></v-progress-circular>
    </v-row>
    <v-data-table
      v-else
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
            persistent
            no-click-animation
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
                >
                  add
                </v-icon>
              </v-btn>
            </template>
            <ValidationObserver v-slot="{ handleSubmit }">
              <v-form @submit.prevent="handleSubmit(onSubmit)">
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
                      :loading="loading"
                      :disabled="loading"
                      type="submit"
                    >
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </ValidationObserver>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="320px"
            content-class="admin"
            persistent
            no-click-animation
          >
            <v-card>
              <v-card-title class="justify-center py-5">Удалить элемент?</v-card-title>
              <v-card-actions class="pb-5">
                <v-spacer></v-spacer>
                <v-btn
                  elevation="0"
                  color="tertiary"
                  @click="closeDelete"
                >
                  Отменить
                </v-btn>
                <v-btn
                  elevation="0"
                  color="secondary"
                  @click="deleteItemConfirm"
                >
                  Удалить
                </v-btn>
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
import { mapGetters } from "vuex";

export default {
  props: {
    items: Array,
    headers: Array,
    loading: Boolean,
  },
  components: { ControlButtons },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    editedItem: {},
    defaultItem: {},
  }),
  methods: {
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$emit("onRemove", this.editedItem);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    onSubmit() {
      if (this.isEdit) {
        this.$emit("onUpdate", this.editedItem);
      } else {
        this.$emit("onCreate", this.editedItem);
      }
      this.close();
    },
  },
  computed: {
    ...mapGetters(["isDataRequesting"]),
    isEdit() {
      return Boolean(this.editedItem.id);
    },
    formTitle() {
      return !this.isEdit ? "Создать" : "Редактировать";
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