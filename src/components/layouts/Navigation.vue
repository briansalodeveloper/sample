<script setup>
import Store from '@/store/index.js'
</script>

<template>
    <nav class="top-app-bar navbar navbar-expand navbar-dark bg-dark">
        <div class="container-fluid px-4">
            <!-- Drawer toggle button-->
            <button class="btn btn-lg btn-icon order-1 order-lg-0"  @click="Store.commit('navbar/toggle','navbar')" href="javascript:void(0);"><i class="material-icons">menu</i></button>
            <!-- Navbar brand-->
            <RouterLink class="navbar-brand me-auto" to="/">
                <img src="https://test.sindbad.tech/assets-landing/images-sindbad/logo.png" width="150" height="40">
            </RouterLink>

            <!-- Navbar items-->
            <div class="d-flex align-items-center mx-3 me-lg-0">
                <!-- Navbar buttons-->
                <div class="d-flex">
                    <!-- Notifications and alerts dropdown-->
                    <!-- <div class="dropdown dropdown-notifications d-none d-sm-block">
                        <button class="btn btn-lg btn-icon dropdown-toggle me-3" id="dropdownMenuNotifications" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">notifications</i></button>
                        <ul class="dropdown-menu dropdown-menu-end me-3 mt-3 py-0 overflow-hidden" aria-labelledby="dropdownMenuNotifications">
                            <li><h6 class="dropdown-header bg-primary text-white fw-500 py-3">Alerts</h6></li>
                            <li><hr class="dropdown-divider my-0" /></li>
                            <li>
                                <a class="dropdown-item unread" href="#!">
                                    <i class="material-icons leading-icon">assessment</i>
                                    <div class="dropdown-item-content me-2">
                                        <div class="dropdown-item-content-text">Your March performance report is ready to view.</div>
                                        <div class="dropdown-item-content-subtext">Mar 12, 2021 &middot; Performance</div>
                                    </div>
                                </a>
                            </li>
                            <li><hr class="dropdown-divider my-0" /></li>
                            <li>
                                <a class="dropdown-item" href="#!">
                                    <i class="material-icons leading-icon">check_circle</i>
                                    <div class="dropdown-item-content me-2">
                                        <div class="dropdown-item-content-text">Tracking codes successfully updated.</div>
                                        <div class="dropdown-item-content-subtext">Mar 12, 2021 &middot; Coverage</div>
                                    </div>
                                </a>
                            </li>
                            <li><hr class="dropdown-divider my-0" /></li>
                            <li>
                                <a class="dropdown-item" href="#!">
                                    <i class="material-icons leading-icon">warning</i>
                                    <div class="dropdown-item-content me-2">
                                        <div class="dropdown-item-content-text">Tracking codes have changed and require manual action.</div>
                                        <div class="dropdown-item-content-subtext">Mar 8, 2021 &middot; Coverage</div>
                                    </div>
                                </a>
                            </li>
                            <li><hr class="dropdown-divider my-0" /></li>
                            <li>
                                <a class="dropdown-item py-3" href="#!">
                                    <div class="d-flex align-items-center w-100 justify-content-end text-primary">
                                        <div class="fst-button small">View all</div>
                                        <i class="material-icons icon-sm ms-1">chevron_right</i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div> -->
                    <!-- User profile dropdown-->
                    <div class="dropdown">
                        <button class="btn btn-lg btn-icon dropdown-toggle" id="dropdownMenuProfile" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i v-if="image"><img :src="image" class="navbar-profile"></i>
                            <i v-else class="material-icons">person</i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end mt-3" aria-labelledby="dropdownMenuProfile">
                            <!-- <li>
                                <a class="dropdown-item" href="#!">
                                    <i class="material-icons leading-icon">person</i>
                                    <div class="me-3">Profile</div>
                                </a>
                            </li>
                            <li><hr class="dropdown-divider" /></li> -->
                            <li>
                                <a class="dropdown-item" @click="logout" style="cursor: pointer;">
                                    <i class="material-icons leading-icon">logout</i>
                                    <div class="me-3">Logout</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import GeneralApi from '@/api/general.js'
import env from '@/config/env.js'
import ProfileApi from '@/api/profile.js'

export default {
    data() {
        return {
            sindbadLink: env.url,
            image:''
        }
    },
    mounted() {
        ProfileApi.show({token:Store.state.auth.token})
           .then((response) => {
                if (response.data.image_path !== null) {
                    this.image = ''+env.url+'storage/'+response.data.image_path+''
                }
            })
   },
    methods: {
        async logout() {
            
            GeneralApi.logout({token:Store.state.auth.token})
            .then((response) => {
                sessionStorage.removeItem("tokenId");
                window.location.replace(env.url+'logout/fortify');
            });
        }
    }
}
</script>