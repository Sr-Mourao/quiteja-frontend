<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="this.allUsers"
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
            <v-btn icon @click="openDeleteDialog(item)"
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
          <v-form ref="form">
            <UserForm v-model="user" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="saveUser">Salvar</v-btn>
          <v-btn text @click="closeDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <UserCardDelete
      v-model="deleteDialog"
      :user="userToDelete"
      @cancel="closeDeleteDialog"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserForm from "../components/User/Form.vue";
import UserCardDelete from "../components/User/CardDelete.vue";

export default {
  name: "UsersView",
  components: {
    UserForm,
    UserCardDelete,
  },
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
      deleteDialog: false,
      user: {},
      userToDelete: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters("users", ["allUsers"]),
  },
  methods: {
    ...mapActions("users", ["fetchUsers", "editUser"]),
    editUser(user) {
      this.user = { ...user };
      this.dialog = true;
    },
    saveUser() {
      this.editUser(this.user);
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
      this.user = {};
    },
    openDeleteDialog(user) {
      this.userToDelete = user;
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.userToDelete = null;
    },
  
  },
  async created() {
    this.loading = true;
    try {
      await this.fetchUsers();
    } catch (error){
      console.error(error);
      this.$toast.error("Erro ao carregar usuários. Tente novamente.");
    } finally {
      this.loading = false;
    }
  },
};
</script>
