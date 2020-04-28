const actions = {
    setFilePath: ({ commit }, filePath) => {
        return commit('SET_FILEPATH', filePath)
    },
    setMenuVisible: ({ commit }, MenuVisible) => {
        return commit('SET_MENUVISIBLE', MenuVisible)
    }
}

export default actions
