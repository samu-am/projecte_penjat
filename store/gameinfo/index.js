export default {
    namespaced: true,
    state: {
      gameName: '',
      gamePassword: '',
      playerName: '',
    },
    getters: {
        gameName: state => state.gameName,
        gamePassword: state => state.gamePassword,
        playerName: state => state.playerName,
    },
    mutations: {
      SAVE_GAMENAME(state, gameName) {
        state.gameName = gameName
      },
      SAVE_GAMEPASSWORD(state, gamePassword) {
        state.gamePassword = gamePassword
      },
      SAVE_PLAYERNAME(state, playerName) {
        state.playerName = playerName
      },
    },
    actions: {
      fetchCreateGameData({ commit }, gameData) {
        try {
          console.log('SAVING GAME DATA ------')
          console.log(gameData)
          commit('SAVE_GAMENAME', gameData.nombreSala)
          commit('SAVE_GAMEPASSWORD', gameData.contrasenaSala)
          commit('SAVE_PLAYERNAME', gameData.playerName)
        } catch (e) {
          console.error(e);
          commit("setItems", []);
        } finally {
          commit("setLoading", false);
        }
      },

    },
  };
  