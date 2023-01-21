<template>
    <router-view />
    {{ key }}
</template>
<script>
import CryptoJS from 'crypto-js';
import Store from '@/store/index.js'

export default {
  computed: {
    key() {
      if(this.$route.path.includes('/auth')) {
          const encrypted = this.$route.path.split("auth=")[1]
          const toDecrypt = CryptoJS.AES.decrypt(encrypted, 'sindbad.tech.secret');

          Store.commit('auth/setToken', toDecrypt.toString(CryptoJS.enc.Utf8))
          this.$router.push({ name: "layout"})
      }
    }
  }
}
</script>
