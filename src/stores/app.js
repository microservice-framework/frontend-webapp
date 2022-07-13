import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "AccessToken",
  state: () => ({
    AccessToken: "ssss",
    token: "",
    expireAt: -1,
  }),
  getters: {
    AccessToken: (state) => state.token,
  },
  actions: {
    tryToken(token) {
      this.token = token;
    },
  },
});
