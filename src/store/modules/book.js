const book = {
    state: {
        filePATH: '',
        menuVisible: false
    },
    mutations: {
        SET_FILEPATH: (state, filePath) => {
            state.filePath = filePath
        },
        SET_MENUVISIBLE: (state, menuVisible) => {
            state.menuVisible = menuVisible
        }
    },
    modules: {
    }
}

export default book
