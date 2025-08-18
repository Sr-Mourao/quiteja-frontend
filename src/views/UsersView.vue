<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="users"
          :loading="loading"
          class="elevation-1"
        >
          <template #item.avatar="{ item }">
            <v-avatar size="40">
              <img :src="item.picture" :alt="item.firstName" />
            </v-avatar>
          </template>
          <template #item.actions="{ item }">
            <v-btn icon @click="editUser(item)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn icon @click="deleteUser(item.id)"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Editar Usuário</v-card-title>
        <v-card-text>
          <v-text-field v-model="editedUser.firstName" label="Nome" />
          <v-text-field v-model="editedUser.lastName" label="Sobrenome" />
          <v-text-field v-model="editedUser.email" label="Email" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="saveUser">Salvar</v-btn>
          <v-btn text @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UsersView",
  data() {
    return {
      headers: [
        { text: "Avatar", value: "avatar", sortable: false },
        { text: "Título", value: "title" },
        { text: "Nome", value: "firstName" },
        { text: "Sobrenome", value: "lastName" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      dialog: false,
      editedUser: {},
    };
  },
  computed: {
    ...mapGetters("users", ["allUsers", "isLoading"]),
    users() {
      return this.allUsers;
    },
    loading() {
      return this.isLoading;
    },
  },
  methods: {
    ...mapActions("users", ["fetchUsers", "editUser", "deleteUser"]),
    editUser(user) {
      this.editedUser = { ...user };
      this.dialog = true;
    },
    saveUser() {
      this.editUser(this.editedUser);
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
      this.editedUser = {};
    },
    deleteUser(userId) {
      this.deleteUser(userId);
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
