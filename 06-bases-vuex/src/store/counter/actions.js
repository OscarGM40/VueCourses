import getRandomInt from "@/helpers/getRandomInt";

export async function incrementRandomInt({ commit }) {
  commit("setLoading", true);
  const randomInt = await getRandomInt();
  commit("incrementBy", randomInt);
  commit("setLoading", false);
}
