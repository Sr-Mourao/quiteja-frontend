<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :mobile-breakpoint="null"
          :headers="headers"
          :items="this.allUsers"
          :loading="loading"
          :search="search"
          class="elevation-1"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Usuários</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                class="mr-3"
                append-icon="mdi-magnify"
                label="Pesquise"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template #item.avatar="{ item }">
            <v-avatar size="40">
              <img :src="item.picture" :alt="item.firstName" />
            </v-avatar>
          </template>
          <template #item.actions="{ item }">
            <v-btn icon @click="openEditUser(item)"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn icon @click="openDeleteDialog(item)"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card :loading="loadingCard">
        <v-card-title>{{
          isEditing ? "Editar Usuário" : "Adicionar Usuário"
        }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-6">
          <v-form ref="form">
            <UserForm v-model="user" />
          </v-form>
        </v-card-text>
        <v-divider class="my-2"></v-divider>
        <v-card-actions class="pa-6 pt-0">
          <v-btn
            text
            color="grey"
            class="flex-grow-1 mr-3"
            @click="closeDialog"
          >
            <v-icon left>mdi-close</v-icon>
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            class="flex-grow-1"
            depressed
            :loading="loadingBtnSubmit"
            @click="saveOrUpdateUser"
          >
            <v-icon>{{ isEditing ? "mdi-update" : "mdi-check" }}</v-icon>

            {{ isEditing ? "Atualizar" : "Salvar" }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <UserCardDelete
      v-model="deleteDialog"
      :user="userToDelete"
      @cancel="closeDeleteDialog"
    />

    <FloatingAddButton v-if="!dialog" @click="addNewUser" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserForm from "../components/User/Form.vue";
import UserCardDelete from "../components/User/CardDelete.vue";
import FloatingAddButton from "../components/User/FloatingAddButton.vue";

export default {
  name: "UsersView",
  components: {
    UserForm,
    UserCardDelete,
    FloatingAddButton,
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
      search: "",
      dialog: false,
      loadingBtnSubmit: false,
      deleteDialog: false,
      isEditing: false,
      loadingCard: false,
      user: {},
      userToDelete: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters("users", ["allUsers"]),
  },

  methods: {
    ...mapActions("users", [
      "fetchUsers",
      "editUser",
      "createUser",
      "fetchUserById",
    ]),

    async saveOrUpdateUser() {
      const validate = this.$refs.form.validate();
      if (!validate) {
        return false;
      }
      this.loadingBtnSubmit = true;
      try {
        if (this.isEditing) {
          await this.editUser(this.user);
          return;
        } else {
          await this.createUser(this.user);
        }

        this.closeDialog();
        this.$toast.success("Usuário salvo com sucesso!");
        this.user = this.defaultUser();
        this.$refs.form.resetValidation();
      } catch (error) {
        console.error(error);
        this.$toast.error("Erro ao salvar usuário. Tente novamente.");
      } finally {
        this.loadingBtnSubmit = false;
        this.$refs.form.resetValidation();
      }
    },

    addNewUser() {
      this.user = this.defaultUser();
      this.isEditing = false;
      this.dialog = true;
    },

    async openEditUser(user) {
      this.isEditing = true;
      this.dialog = true;
      this.loadingCard = true;
      try {
        this.user = await this.fetchUserById(user.id);
      } catch (error) {
        console.error(error);
        this.$toast.error(
          "Erro ao carregar dados do usuário. Tente novamente."
        );
        this.dialog = false;
        return;
      } finally {
        this.loadingCard = false;
      }
    },

    closeDialog() {
      this.dialog = false;
      this.user = this.defaultUser();
      this.isEditing = false;
      this.$refs.form.resetValidation();
    },

    openDeleteDialog(user) {
      this.userToDelete = user;
      this.deleteDialog = true;
    },

    closeDeleteDialog() {
      this.deleteDialog = false;
      this.userToDelete = null;
    },

    defaultUser() {
      return {
        title: "",
        firstName: "",
        lastName: "",
        picture: "",
      };
    },
  },
  async created() {
    this.loading = true;
    try {
      await this.fetchUsers();
    } catch (error) {
      console.error(error);
      this.$toast.error("Erro ao carregar usuários. Tente novamente.");
    } finally {
      this.loading = false;
    }
  },
};
</script>
