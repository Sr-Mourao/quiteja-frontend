<template>
  <v-row>
    <v-col cols="12" sm="6" md="3">
      <v-select
        dense
        outlined
        :value="value.title"
        @input="updateField('title', $event)"
        :items="titles"
        label="Título"
        :rules="rules"
      ></v-select>
    </v-col>
    <v-col cols="4" sm="6" md="9">
      <v-text-field
        dense
        outlined
        :value="value.firstName"
        @input="updateField('firstName', $event)"
        label="Nome"
        :rules="rules"
      />
    </v-col>
    <v-col cols="4" sm="6" md="6">
      <v-text-field
        dense
        outlined
        :value="value.lastName"
        @input="updateField('lastName', $event)"
        label="Sobrenome"
        :rules="rules"
      />
    </v-col>
    <v-col cols="4" sm="6" md="6">
      <v-text-field
        dense
        outlined
        :value="value.email"
        @input="updateField('email', $event)"
        label="Email"
        :rules="emailRules"
      />
    </v-col>
    <v-col cols="4" sm="6" md="12">
      <v-text-field
        dense
        outlined
        :value="value.picture"
        @input="updateField('picture', $event)"
        label="Url Imagem"
        :rules="rules"
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
          title: "",
          firstName: "",
          lastName: "",
          picture: "",
        };
      },
    },
  },
  data() {
    return {
      rules: [(v) => !!v || "Campo obrigatório"],
      emailRules: [
        (v) => !!v || "Campo obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
      ],
      titles: ["mr", "dr"],
    };
  },
  methods: {
    updateField(fieldName, fieldValue) {
      const updatedUser = {
        ...this.value,
        [fieldName]: fieldValue,
      };

      this.$emit("input", updatedUser);
    },
  },
};
</script>
