export default {
  CHANGE_AUTH_STATUS: (state, item) => {
    state.isAuth = item
  },
  PUT_CURRENT_USER: (state, item) => {
    state.currentUser = item
  },
}
