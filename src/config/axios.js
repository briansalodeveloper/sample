import axios from 'axios'
import env from '@/config/env.js'
import store from '@/store/index.js'

export default (errorTriggered) => {

const axiosInstance = axios.create({
    baseURL: env.Backend_Api,
    headers: {
                'Authorization': `Bearer ${store.state.auth.token}`
             }
})

axiosInstance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
  }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response.status === 401) {
            sessionStorage.removeItem('tokenId')
            alert('your session has expired. Please log in again')
            window.location.replace(env.url+'logout/fortify')
            console.log('session expired')
        }
        console.log(error +'\nThe error came from: ' + errorTriggered);
        return Promise.reject(error);
    
  });

return axiosInstance

}