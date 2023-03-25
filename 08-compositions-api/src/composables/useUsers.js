import axios from "axios";
import { ref } from "vue";

export const useUsers = () => {

  const users = ref([]);
  const isLoading = ref(true);
  const currentPage = ref(1);
  const errorMsg = ref("");

  const getUsers = async (page = 1) => {
    if (page <= 0) page = 1;
    isLoading.value = true;

    const { data } = await axios.get(`https://reqres.in/api/users`, {
      params: { page: page },
    });

    if (data.data.length > 0) {
      // viene de la api en data { data: []}
      users.value = data.data;
      currentPage.value = page;
      errorMsg.value = "";
    } else if (currentPage.value > 0) {
      users.value = [];
      currentPage.value = page;
      errorMsg.value = "No hay más usuarios";
    }
    isLoading.value = false;
  };
  
  getUsers();

  return {
    users,
    isLoading,
    currentPage,
    errorMsg,
    nextPage: () => getUsers(currentPage.value + 1),
    prevPage: () => getUsers(currentPage.value - 1),
  };
};
