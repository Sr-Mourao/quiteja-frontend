import api from "@/services/api";

const state = {
  users: [],
};

const getters = {
  allUsers: (state) => state.users,
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  UPDATE_USER(state, updatedUser) {
    state.users = state.users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
  },
  REMOVE_USER(state, userId) {
    state.users = state.users.filter((u) => u.id !== userId);
  },
};

const actions = {
  async createUser({ commit, state }, user) {
    const { data: userCreated } = await api.post("/user", user);
    commit("SET_USERS", [...state.users, userCreated]);
    return userCreated;
  },

  async fetchUsers({ commit }) {
    const { data: users } = await api.get("/user");
    commit("SET_USERS", users.data);
  },

  async editUser({ commit }, user) {
    const { data: userEdited } = await api.put(`/user/${user.id}`, user);
    commit("UPDATE_USER", userEdited);
  },
  async deleteUser({ commit }, userId) {
    await api.delete(`/user/${userId}`);
    commit("REMOVE_USER", userId);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
