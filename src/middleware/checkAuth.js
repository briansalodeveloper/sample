import Store from '@/store/index.js';

export default function(){
    var rtn = false;
    Store.commit('auth/updateToken')

    if (Store.state.auth.token) {
        return true;
    }

    return rtn;
 }