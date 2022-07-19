export default {
  accessToken: {
    type: "string",
    default: "",
  },
  expireAt: {
    type: "number",
    default: 0,
  },
  service: {
    type: "object",
    default: {},
    persist: false,
  },
  isLogin: {
    type: "boolean",
    default: false,
    persist: false,
  },
}
