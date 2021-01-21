import mutations from "@/store/user/mutations";
import actions from "@/store/user/actions";
import getters from "@/store/user/getters";
import state from "@/store/user/states";

const userModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default userModule;
