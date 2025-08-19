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
    state.users = state.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
  },

  REMOVE_USER(state, userId) {
    state.users = state.users.filter((user) => user.id !== userId);
  },
};

const actions = {
  async createUser({ commit, state }, user) {
    const { data: userCreated } = await api.post("/user/create", user);
    commit("SET_USERS", [...state.users, userCreated]);
    return userCreated;
  },

  async fetchUsers({ commit }) {
    const { data: users } = await api.get("/user");
    commit("SET_USERS", users.data);
  },

  async fetchUserById(_, userId) {
    const { data: user } = await api.get(`/user/${userId}`);
    return user;
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
