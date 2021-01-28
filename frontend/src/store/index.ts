import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import userModule from "@/store/user";
import { RootState } from "@/store/states";

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  modules: {
    user: userModule
  }
};

const store = new Vuex.Store<RootState>(storeOptions);

export default store;
