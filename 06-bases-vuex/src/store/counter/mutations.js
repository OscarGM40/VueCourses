export function increment(state) {
  state.count++;
  state.lastMutation = "increment";
}
export function incrementBy(state, value) {
  state.count += value;
  state.lastMutation = "incrementBy";
  state.lastRandomInt = value;
}
export function setLoading(state, value) {
  state.isLoading = value;
  state.lastMutation = "setLoading";
}
