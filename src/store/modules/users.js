import api from "@/services/api";

const state = {
  users: [],
  loading: false,
  error: null,
};

const getters = {
  allUsers: (state) => state.users,
  isLoading: (state) => state.loading,
  error: (state) => state.error,
};

const actions = {
  async fetchUsers({ commit }) {
    commit("setLoading", true);
    try {
      const res = await api.get("/user");
      commit("setUsers", res.data.data);
    } catch (err) {
      commit("setError", err);
    } finally {
      commit("setLoading", false);
    }
  },
  async editUser({ commit }, user) {
    try {
      const res = await api.put(`/user/${user.id}`, user);
      commit("updateUser", res.data);
    } catch (err) {
      commit("setError", err);
    }
  },
  async deleteUser({ commit }, userId) {
    try {
      await api.delete(`/user/${userId}`);
      commit("removeUser", userId);
    } catch (err) {
      commit("setError", err);
    }
  },
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setError(state, error) {
    state.error = error;
  },
  updateUser(state, updatedUser) {
    state.users = state.users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
  },
  removeUser(state, userId) {
    state.users = state.users.filter((u) => u.id !== userId);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
