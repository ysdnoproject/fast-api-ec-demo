import { ActionContext } from "vuex";
import { UserState } from "@/store/user/states";
import { RootState } from "@/store/states";
import { LoginResponse } from "@/types/LoginInterface";
import api from "@/api";

type UserContext = ActionContext<UserState, RootState>;

const actions = {
  async fetchUserByToken(context: UserContext) {
    const token = context.state.token || localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.getMe(token);
        localStorage.setItem("token", token);
        context.commit("setToken", token);
        context.commit("setUser", response.data);
      } catch (e) {
        //  do nothing
      }
    } else {
      context.commit("clearUser");
    }
  },
  loggedIn(context: UserContext, payload: LoginResponse) {
    localStorage.setItem("token", payload.access_token);
    context.commit("setToken", payload.access_token);
    context.commit("setUser", payload.user);
  },
  logout(context: UserContext) {
    context.commit("clearUser");
    context.commit("clearToken");
    localStorage.removeItem("token");
  }
};

export default actions;
