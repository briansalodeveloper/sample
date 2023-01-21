<script setup>
import SidebarFooter from './SidebarFooter.vue'
import Store from '@/store/index.js'
</script>

<template>
    <div id="layoutDrawer_nav">
        <!-- Drawer navigation-->
        <nav class="drawer accordion drawer-light bg-white" id="drawerAccordion">
            <div class="drawer-menu">
                <div class="nav">
                    <!-- Drawer section heading (Account)-->
                    <!-- <div class="drawer-menu-heading d-sm-none">Account</div> -->
                    <!-- Drawer link (Notifications)-->
                    <!-- <a class="nav-link d-sm-none" href="#!">
                        <div class="nav-link-icon"><i class="material-icons">notifications</i></div>
                        Notifications
                    </a> -->
                    <!-- Divider-->
                    <div class="drawer-menu-divider d-sm-none"></div>
                    <!-- Drawer section heading (Interface)-->
                    <div class="test" style="min-height: 30px;"></div>
                    <!-- Drawer link (Overview)-->
                    
                    <RouterLink class="nav-link" 
                        :style="{ 'background-color': $route.name === 'SafeguardSignal' ? '#2299b7' : '' }" 
                        to="/safeguard-signal/index" @click="Store.commit('navbar/toggle','sidebar')"
                    >
                        <div class="nav-link-icon"><i class="material-icons">health_and_safety</i></div>
                        <span class="nav-link-title">Safeguard Signal</span>
                    </RouterLink>
                    <RouterLink class="nav-link" 
                        :style="{ 'background-color': $route.name === 'Referral' ? '#2299b7' : '' }" 
                        to="/referral/index" @click="Store.commit('navbar/toggle','sidebar')"
                    >
                        <div class="nav-link-icon"><i class="material-icons">campaign</i></div>
                        <span class="nav-link-title">Referral</span>
                    </RouterLink>
                    <RouterLink class="nav-link" 
                        :style="{ 'background-color': $route.name === 'Profile' ? '#2299b7' : '' }" 
                        to="/profile/index" @click="Store.commit('navbar/toggle','sidebar')"
                    >
                        <div class="nav-link-icon"><i class="material-icons">person</i></div>
                        <span class="nav-link-title">Profile</span>
                    </RouterLink>
                </div>
            </div>

            <!-- sidebar footer        -->
            <SidebarFooter></SidebarFooter>
        </nav>
    </div>    
</template>
