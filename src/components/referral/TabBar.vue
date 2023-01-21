<template>
    <div class="row text-white" style="width:100%; margin-bottom:5%;">
        <div class="col tab-bar-bottom-border">
            <div style="background-color:; width:50%" @click="referralTab">
                <div class="tab-bar-referral">
                    Referral
                </div>
                <!-- for active underline -->
                <div :class="{'referral-tab':referralTabActive}"></div>
            </div>
        </div>
        <div class="col tab-bar-bottom-border">
            <div @click="incomeTab">
                <span class="tab-bar-income">Income</span>
                <!-- for active underline -->
                <div :class="{'income-tab':incomeTabActive}"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            referralTabActive: true,
            incomeTabActive: false
        }
    },
    methods: {
        referralTab() {
            this.referralTabActive = true;
            this.incomeTabActive = false;
            this.tabToggle()
        },
        incomeTab() {
            this.referralTabActive = false;
            this.incomeTabActive = true
            this.tabToggle()
        },
        tabToggle(){
            this.$emit('tab-toggle',this.referralTabActive)
        }
    }
}
</script>
