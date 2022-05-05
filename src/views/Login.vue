<template>
  <div class="admin-login d-flex flex-column align-center">
    <div class="logo mb-4">
      <v-img
        contain
        src="img/logo.png"
      ></v-img>
    </div>
    <div class="login-form">
      <v-card
        class="login-form__card"
        elevation="5"
      >
        <v-card-title class="justify-center">Вход</v-card-title>
        <ValidationObserver v-slot="{ handleSubmit }">
          <v-form
            class="login-form__fields pa-4 pb-5"
            @submit.prevent="handleSubmit(onSubmit)"
          >
            <ValidationProvider
              name="Логин"
              rules="required"
              v-slot="{ errors }"
            >
              <v-layout
                column
                class="login-field-item"
              >
                <v-label>
                  <v-subheader>Логин</v-subheader>
                  <v-text-field
                    v-model="username"
                    outlined
                    solo
                    :error-messages="errors"
                  ></v-text-field>
                </v-label>
              </v-layout>
            </ValidationProvider>
            <ValidationProvider
              name="Пароль"
              rules="required"
              v-slot="{ errors }"
            >
              <v-layout
                column
                class="login-field-item"
              >
                <v-label>
                  <v-subheader>Пароль</v-subheader>
                  <v-text-field
                    v-model="password"
                    outlined
                    solo
                    type="password"
                    :error-messages="errors"
                  ></v-text-field>
                </v-label>
              </v-layout>
            </ValidationProvider>
            <v-layout
              class="login-form__controls justify-space-between"
              row
              no-gutters
            >
              <v-btn
                class="login-control-button"
                color="primary"
                text
              >
                Запросить доступ
              </v-btn>
              <v-btn
                class="login-control-button"
                color="primary"
                type="submit"
                :loading="isRequesting"
                :disabled="isRequesting"
              >
                Войти
              </v-btn>
            </v-layout>
          </v-form>
        </ValidationObserver>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "login",
  data: () => ({
    username: "",
    password: "",
  }),
  computed: {
    ...mapGetters("Auth", ["isRequesting"]),
  },
  methods: {
    async onSubmit() {
      const formData = {
        username: this.username,
        password: this.password,
      };

      try {
        await this.$store.dispatch("Auth/requestLogin", formData);
      } catch (e) {}
    },
  },
};
</script>