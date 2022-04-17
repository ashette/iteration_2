<template>
  <v-toolbar class="admin-toolbar px-sm-3" prominent height="68">
    <v-text-field
      class="admin-search admin-toolbar__item pl-3"
      clearable
      prepend-icon="search"
      label="Поиск ..."
      solo
    ></v-text-field>
    <v-menu tile>
      <template v-slot:activator="{ on, attrs }">
        <v-list class="admin-notifications admin-toolbar__item">
          <v-list-item link>
            <v-badge
              v-bind="attrs"
              v-on="on"
              :content="2"
              :value="2"
              color="admin-error"
              overlap
              offset-x="8"
              bottom
            >
              <v-icon color="admin-icon">notifications</v-icon>
            </v-badge>
          </v-list-item>
        </v-list>
      </template>
    </v-menu>
    <v-menu
      :close-on-content-click="false"
      offset-y
      tile
      content-class="admin-menu elevation-5"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list class="admin-account admin-toolbar__item">
          <v-list-item v-bind="attrs" v-on="on" link class="px-2 px-sm-5">
            <v-list-item-avatar>
              <v-img :src="avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
            
            <v-list-item-action>
              <v-icon>arrow_drop_down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </template>
      <v-card class="d-flex flex-column justify-start" nav tile>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Мой профиль</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Мои заказы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div
          class="
            admin-account__menu-controls
            pa-4
            text-right
            mt-auto
            d-flex
            flex-column
          "
        >
          <v-btn color="secondary">Выйти</v-btn>
        </div>
      </v-card>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    avatar: require("@/assets/user-avatar.jpg"),
  }),
};
</script>