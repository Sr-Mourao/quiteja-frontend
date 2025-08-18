<template>
  <v-row>
    <v-col cols="4" sm="6" md="12">
      <v-text-field
        dense
        outlined
        v-model="value.firstName"
        label="Nome"
        :rules="rules"
      />
    </v-col>
    <v-col cols="4" sm="6" md="12">
      <v-text-field
        dense
        outlined
        v-model="value.lastName"
        label="Sobrenome"
        :rules="rules"
      />
    </v-col>
    <v-col cols="4" sm="6" md="12">
      <v-text-field
        dense
        outlined
        v-model="value.email"
        label="Email"
        :rules="emailRules"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          firstName: "",
          lastName: "",
          email: "",
        };
      },
    },
  },
  data() {
    return {
        rules: [(v) => !!v || 'Campo obrigatório'],
          emailRules: [
        (v) => !!v || 'O e-mail é obrigatório',
        (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
    };
  },
};
</script>
