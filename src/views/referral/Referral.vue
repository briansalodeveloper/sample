<script setup>
import ReferralLink from '@/components/referral/ReferralLink.vue'
import ReferralList from '@/components/referral/ReferralList.vue'
import ReferralStatus from '@/components/referral/ReferralStatus.vue'
</script>
<template>
    <ReferralStatus></ReferralStatus>
    <!-- divider -->
    <div class="referral-divider" ></div>
    <!-- referral link -->
    <ReferralLink></ReferralLink>
    <!-- divider -->
    <div class="referral-divider"></div>
    <!-- Referral List -->
    <ReferralList></ReferralList>
</template>