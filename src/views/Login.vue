<template>
  <v-main class="admin">
    <div class="admin-login d-flex flex-column align-center">
      <div class="logo mb-4">
        <v-img
          contain
          src="/img/logo.png"
        ></v-img>
      </div>
      <div class="login-form">
        <v-card
          class="login-form__card"
          elevation="5"
        >
          <v-card-title class="justify-center">Вход</v-card-title>
          <v-form class="login-form__fields pa-4 pb-5">
            <v-layout
              column
              class="login-field-item"
            >
              <v-label>
                <v-subheader>Логин</v-subheader>
                <v-text-field
                  outlined
                  solo
                ></v-text-field>
              </v-label>
            </v-layout>
            <v-layout
              column
              class="login-field-item"
            >
              <v-label>
                <v-subheader>Пароль</v-subheader>
                <v-text-field
                  outlined
                  solo
                  type="password"
                ></v-text-field>
              </v-label>
            </v-layout>
            <v-layout
              class="login-form__controls justify-space-between"
              row
              no-gutters
            >
              <v-btn
                class="login-control-button"
                color="primary"
                text
              >Запросить доступ</v-btn>
              <v-btn
                class="login-control-button"
                color="primary"
              >Войти</v-btn>
            </v-layout>
          </v-form>
        </v-card>
      </div>
    </div>
  </v-main>
</template>
