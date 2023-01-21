import axios from '@/config/axios.js'

export default {
    link(token) {
        return axios('referral.link').post('referral/link', token)
    },
    levels(token) {
        return axios('referral.levels').post('referral/levels', token)
    },
    list(token) {
        return axios('referral.list').post('referral/list', token)
    },
}
