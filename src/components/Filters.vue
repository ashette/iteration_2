<template>
  <div v-if="$vuetify.breakpoint.xs" class="admin admin-filters">
    <v-btn
      color="tertiary"
      class="admin-filters__mobile-btn"
      depressed
      @click="filterDialog = true"
    >
      <span>Выбрать фильтры</span>
    </v-btn>
    <v-navigation-drawer
      v-model="filterDialog"
      app
      fixed
      class="admin admin-filters"
      transition="dialog-bottom-transition"
      temporary
    >
      <h2>Фильтры</h2>
      <v-select
        v-for="filter in filters"
        :key="filter.name"
        :items="filter.values"
        :placeholder="filter.name"
        :label="filter.name"
        :menu-props="menuProps"
        append-icon="unfold_more"
        item-text="name"
        item-color="admin-primary"        
        single-line
        persistent-placeholder
        outlined
      ></v-select>
      <div class="admin-filters__controls ml-auto">
        <v-btn color="primary" elevation="0">Применить</v-btn>
        <v-btn
          color="secondary"
          elevation="0"
          @click="filterDialog = !filterDialog"
          >Сбросить</v-btn
        >
      </div>
    </v-navigation-drawer>
  </div>
  <div v-else class="admin-filters d-flex flex-wrap">
    <v-select
      v-for="filter in filters"
      :key="filter.name"
      :items="filter.values"
      :placeholder="filter.name"
      :label="filter.name"
      :menu-props="menuProps"
      append-icon="unfold_more"
      item-text="name"
      item-color="admin-primary"      
      single-line
      persistent-placeholder
      outlined
    ></v-select>
    <div class="admin-filters__controls ml-auto">
      <v-btn
        color="secondary"
        elevation="0"
        @click="filterDialog = !filterDialog"
        >Сбросить</v-btn
      >
      <v-btn color="primary" elevation="0">Применить</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: Array,
  },
  data: () => ({
    filterDialog: false,
    menuProps: {
      bottom: true,
      offsetY: true,
      tile: true,
      "content-class": "admin-menu elevation-5",
    },
  }),
};
</script>
