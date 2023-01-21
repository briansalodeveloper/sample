<script setup>
import Navbar from '@/components/layouts/Navigation.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'
import Footer from '@/components/layouts/Footer.vue'
import Body from '@/components/layouts/Body.vue'
import store from '@/store/index.js'
</script>

<template>
    <div :class="{'drawer-toggled': store.state.navbar.status}">
        <Navbar></Navbar>
        <div id="layoutDrawer">
            <Sidebar></Sidebar>
            <div id="layoutDrawer_content">
                <Body></Body>
                <Footer></Footer>
            </div>
        </div>
    </div>
</template>