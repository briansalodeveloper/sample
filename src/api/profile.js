import axios from '@/config/axios.js'

export default {
    updatePassword(body) {
        return axios('profile.updatePassword').put('users/password', body)
    },
    show(token) {
        return axios('profile.show').post('users/show', token)
    },
    userUpdate(body) {
        return axios('profile.userUpdate').put('users/update', body)
    },
    userImage(body) {
        return axios('profile.userImage').post('users/image', body)
    },
}
