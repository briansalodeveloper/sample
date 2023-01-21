<script setup>
import TabBar from '@/components/referral/TabBar.vue'
import Referral from './Referral.vue'
import Income from './Income.vue'
</script>

<template>
    
    <header class="bg-dark">
        <div class="container-xl px-5">
            <div class="d-flex justify-content-between align-items-center">
                <h1 class="text-white py-3 mb-0 display-6"> <i class="material-icons">campaign</i> Referral </h1>
            </div>
        </div>
    </header>
    <div class="container-xl my-3 py-4">
        <!-- <TabBar @tab-toggle="activeTab"></TabBar> -->
        <!-- <h5 class="text-white">Referral Page</h5> -->
        <Referral v-if="referralTab"></Referral>
        <Income v-else></Income>
    </div>
    
</template>
<script>
    export default {
        data() {
            return {
                referralTab: true,
            }
        },
        methods: {
            activeTab(data){
                this.referralTab = data
            }
        }
    }
</script>