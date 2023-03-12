export const currentState = (state) => {
  return state.status
};

export const getUsername = (state) => {
  return state?.user?.name || ""
};
