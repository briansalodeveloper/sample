const module = {
    namespaced: true,

    state: {
        status: false
    },
    mutations: {
        toggle (state, payload) {

            if (window.innerWidth >= 1366 && payload == 'navbar'){
                state.status = !state.status
            } else if (window.innerWidth < 1366) {
                state.status = !state.status
            }
        },

    }
}

export default module