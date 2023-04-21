import Vuex from "vuex";
import gameinfo2 from "./gameinfo";

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
        gameinfo: gameinfo2
    },
  });
};

export default createStore;
