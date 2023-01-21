const module = {
    namespaced: true,

    state: {
        token:  sessionStorage.getItem('tokenId') || null,
    },
    mutations: {
        setToken (state, tokenId) {
            state.token = tokenId;
            sessionStorage.setItem("tokenId", tokenId);
        },
        updateToken (state) {
            const getToken = sessionStorage.getItem('tokenId')
            state.token = getToken;
        }

    }
}

export default module