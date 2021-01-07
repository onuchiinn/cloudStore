export default {
  CURRENT_USER(state) {
    return state.currentUser;
  },
  AUTH_STATUS(state) {
    return state.isAuth
  },
  INFORM_MESSAGE(state) {
    return state.message
  }
}
