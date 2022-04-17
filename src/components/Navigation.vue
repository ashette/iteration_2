<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      :permanent="!$vuetify.breakpoint.xs"
      :mini-variant="$vuetify.breakpoint.smAndDown"
      class="admin elevation-5"
      width="285"
    >
      <div class="logo pa-3 px-md-9 py-md-5">
        <v-img contain :src="appLogo" width="120"></v-img>
      </div>
      <v-list dense nav>
        <v-tooltip
          v-for="item in menu"
          :key="item.link"
          :disabled="$vuetify.breakpoint.mdAndUp"
          right
        >
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on" link :to="item.link">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </v-list>
    </v-navigation-drawer>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.xs"
      fixed
      grow
      class="admin-bottom-nav align-center elevation-10"
    >
      <v-btn v-for="item in menu" :key="item.link" :to="item.link" icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data: () => ({
    logo: require("@/assets/logo.svg"),
    mobileLogo: require("@/assets/mobileLogo.svg"),
    drawer: false,
    menu: [
      { title: "Карточка автомобиля", link: "/admin/car", icon: "edit" },
      { title: "Список авто", link: "/admin/cars", icon: "vertical_split" },
      { title: "Заказы", link: "/admin/orders", icon: "note_add" },
      { title: "Категории", link: "/admin/categories", icon: "grid_view" },
      { title: "Пункты выдачи", link: "/admin/points", icon: "place" },
      { title: "Тарифы", link: "/admin/rates", icon: "local_offer" },
    ],
  }),
  computed: {
    appLogo() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return this.mobileLogo;
      } else {
        return this.logo;
      }
    },
  },
};
</script>
