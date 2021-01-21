import { UserState } from "@/store/user/states";
import { User } from "@/models/User";

const mutations = {
  setToken(state: UserState, payload: string) {
    state.token = payload;
  },
  clearToken(state: UserState) {
    state.token = null;
  },
  setUser(state: UserState, payload: User) {
    state.user = payload;
  },
  clearUser(state: UserState) {
    state.user = null;
  }
};

export default mutations;
