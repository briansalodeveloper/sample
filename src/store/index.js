import { createStore } from 'vuex'
import navBar from './modules/navBar.js'
import Auth from './modules/auth.js'

// Create a new store instance.
export default createStore({
    modules: {
        navbar: navBar,
        auth: Auth,
    }
})