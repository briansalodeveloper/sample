import axios from '@/config/axios.js'

export default {
    logout(token) {
        return axios('navigation.logout').post('logout', token)
    },
}