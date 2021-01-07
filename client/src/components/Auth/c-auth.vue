<template lang="pug">
v-row(align="center", justify="center")
  v-col(cols="12", sm="8", md="4")
    v-card.elevation-12
      v-card-title Авторизация
      v-card-text
        v-form(@submit.prevent="formSubmit")
          v-text-field(
            label="Email",
            name="email",
            prepend-icon="mdi-account",
            type="text",
            v-model="email"
          )
          v-text-field(
            label="Пароль",
            name="password",
            prepend-icon="mdi-lock",
            type="password",
            v-model="password"
          )
          v-btn(type="submit") Войти
      .red--text.text-center {{INFORM_MESSAGE}}
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "c-auth",
  data: () => ({
    email: null,
    password: null,
  }),
  methods: {
    ...mapActions({
        LOGIN: "auth/LOGIN",
    }),
    formSubmit() {
      const body = {
        email: this.email,
        password: this.password,
      };
      this.LOGIN(body);
    },
  },
  computed: {
      ...mapGetters({
          INFORM_MESSAGE: "auth/INFORM_MESSAGE"
      })
  },
  created() {},
};
</script>
