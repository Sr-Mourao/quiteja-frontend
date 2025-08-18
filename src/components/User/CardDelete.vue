<template>
  <v-dialog v-model="internalDialog" max-width="450px" persistent>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        Deletar Usuário
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-6">
        <div class="text-center mb-4">
          <v-avatar size="80" class="mb-3">
            <img
              v-if="user?.picture"
              :src="user.picture"
              :alt="user.firstName"
            />
            <v-icon v-else size="40" color="grey">mdi-account</v-icon>
          </v-avatar>
          <div class="text-h6 font-weight-medium">
            {{ user?.firstName }} {{ user?.lastName }}
          </div>
          <div class="text-body-2 grey--text">
            {{ user?.title }}
          </div>
        </div>

        <v-divider class="my-4"></v-divider>

        <div class="text-center">
          <v-icon color="warning" size="24" class="mb-2"
            >mdi-alert-triangle</v-icon
          >
          <div class="text-body-1 mb-2">
            Tem certeza que deseja excluir este usuário?
          </div>
          <div class="text-body-2 grey--text">
            Todos os dados relacionados a este usuário serão perdidos
            permanentemente.
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="pa-6 pt-0">
        <v-btn text color="grey" class="flex-grow-1 mr-3" @click="cancel">
          <v-icon left>mdi-close</v-icon>
          Cancelar
        </v-btn>
        <v-btn
          color="error"
          depressed
          dark
          class="flex-grow-1"
          :loading="confirmDeleteLoading"
          @click="confirmDelete"
        >
          <v-icon left>mdi-delete-forever</v-icon>
          Excluir Usuário
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UserCardDelete",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      confirmDeleteLoading: false,
    }
  },
  computed: {
    internalDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    ...mapActions("users", ["deleteUser"]),

    cancel() {
      this.internalDialog = false;
      this.$emit("input", false);
      this.$emit("cancel");
    },
    confirm() {
      this.$emit("confirm", this.user);
    },
    async confirmDelete() {
      this.confirmDeleteLoading = true;
      try {
        await this.deleteUser(this.user.id);
        this.internalDialog = false;
        this.$toast.success("Usuário excluído com sucesso.");
        this.$emit("input", false);
      } catch (error) {
        this.$toast.error("Erro ao excluir usuário. Tente novamente.");
        console.error("Erro ao excluir usuário:", error);
      } finally {
        this.confirmDeleteLoading = false;
      }
    },
  },
};
</script>
