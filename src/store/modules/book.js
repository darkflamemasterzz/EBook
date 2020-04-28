const book = {
    state: {
        filePATH: ''
    },
    mutations: {
        SET_FILEPATH: (state, filePath) => {
            state.filePath = filePath
        }
    },
    actions: {
        setFilePath: ({ commit, state }, filePath) => {
          return commit('SET_FILEPATH', filePath)
        }
    },
    modules: {
    }
}

export default book
