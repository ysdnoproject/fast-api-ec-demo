import { UserState } from "@/store/user/states";

export default {
  isLoggedIn: (state: UserState): boolean => {
    return !!state.token;
  }
};
