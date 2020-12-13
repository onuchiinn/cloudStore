export default {
  PUT_FILES: (state, files) => {
    state.files = files
  },
  ADD_NEW_FILE: (state, newFile) => {
    state.files = [...state.files, newFile]
  },
  SET_CURRENT_DIR: (state, id) => {
    state.currentDir = id
  },
  PUSH_IN_STACK: (state, el) => {
    state.dirStack = [...state.dirStack, el]
  },
}
