<template>
    <div class="card navbar-color">
        <div class="card-body">
            <div class="row text-center" >
                <div class="col-2 referral-col-first">
                </div>
                <div class="col-6 referral-col-middle">
                    <div v-if="profileImage">
                        <img :src="profileImage" class="referral-avatar"><br>{{name }}
                    </div>
                    <div v-else>
                        <i class="material-icons bg-skyblue large">
                            person
                        </i><br>
                        {{name}}
                    </div>
                </div>
                <div class="col-3 align-self-end referral-col-last">
                        <div>Estimated Income/Monthly</div> 
                </div>
            </div>
            <div class="row text-center referral-border-bottom">
                <div class="col-2 referral-col-first">
                    <div class="referral-box" v-for="item in level">
                        {{item.label}}
                    </div>
                </div>
                <div class="col-6 referral-col-middle">
                    <!-- level 1 if have data -->
                    <div v-if="referralFirstLevel.length" class="d-flex align-item-center referral-box-carousel">
                        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="width:90%;">
                            <div class="carousel-inner">
                                <div v-for="(filtered, index) in filteredFirstLevel" :class="['referral-carousel carousel-item', index == 0?'active':'' ] ">   
                                    <div class="d-flex justify-content-center align-item-center">
                                        <div v-for="item in filteredFirstLevel[index]" class="referral-carousel-item">
                                            <i v-if="item.image_path === null" class="material-icons bg-black medium">
                                                person
                                                
                                            </i>
                                            <i v-else>
                                                <img :src="imagePath + item.image_path" class="referral-level1-avatar">
                                            </i>
                                            <p v-if="item.firstname">
                                                {{item.firstname}}
                                            </p>
                                            <p v-else>
                                                {{item.email}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div v-if="referralFirstGroupBy < referralFirstLevel.length" style="padding-top: 15px;">
                            +{{ (referralFirstLevel.length-referralFirstGroupBy) }}
                        </div>
                    </div>
                    <!-- level 1 if empty data -->
                    <div v-else class="referral-box">
                        <span>{{ referralFirstLevel.length }}</span>
                    </div>
                    <!-- level 2 -->
                    <div class="referral-box">
                        <span>{{ referralSecondLevel }}</span>
                    </div>
                    <!-- Level 3 -->
                    <div class="referral-box">
                        <span>{{ referralThirdLevel }}</span>
                    </div>
                    <!-- Level 4 -->
                    <div class="referral-box">
                        <span>{{ referralFourthLevel }}</span>
                    </div>
                </div>
                <div class="col referral-col-last referral-border-left">
                    <!-- level 1 monthly -->
                    <div class="referral-box">
                        SAR {{referralFirstMonthly}}
                    </div>
                    <!-- level 2 monthly -->
                    <div class="referral-box">
                         SAR {{referralSecondMonthly}}
                    </div>
                    <!-- level 3 monthly -->
                    <div class="referral-box">
                        SAR {{referralThirdMonthly}}
                    </div>
                    <!-- level 4 monthly -->
                    <div class="referral-box">
                        SAR {{referralFourthMonthly}}
                    </div>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-2 referral-col-first">
                    <div class="referral-total-text">
                        <p>Total</p>
                    </div>
                </div>
                <div class="col-6 referral-col-middle">
                    <div class="referral-box">
                        {{totalReferral}}
                    </div>
                </div>
                <div class="col referral-col-last referral-border-left">
                    <div class="referral-box">
                        SAR {{TotalEstimatedIncome}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReferralApi from '@/api/referral.js'
import ProfileApi from '@/api/profile.js'
import Store from '@/store/index.js'
import Env from '@/config/env.js'

export default {
    data() {
        return {
            level: [
                {label: 'Level 1'},
                {label: 'Level 2'},
                {label: 'Level 3'},
                {label: 'Level 4'}
            ],
            name:'',
            profileImage:'',
            imagePath: ''+Env.url+'storage/'+'',
            referralFirstLevel:[],
            referralFirstGroupBy: 0,
            referralFirstMonthly:0,
            referralSecondLevel: 0,
            referralSecondMonthly:0,
            referralThirdLevel: 0,
            referralThirdMonthly:0,
            referralFourthLevel: 0,
            referralFourthMonthly:0,
        }
    },
    mounted() {
        const token = {
            token: Store.state.auth.token,
        };

        ProfileApi.show(token)
            .then((response) => {

                if (response.data.image_path) {
                    this.profileImage = ''+Env.url+'storage/'+response.data.image_path+''
                }

                if (response.data.firstname) {
                    this.name = response.data.firstname
                } else{
                    this.name = response.data.email
                }
            });

        ReferralApi.levels(token)
            .then((response) => {
                this.referralFirstLevel = response.data.first_level_referrals;
                this.referralSecondLevel = response.data.second_level_count;
                this.referralThirdLevel = response.data.third_level_count;
                this.referralFourthLevel = response.data.fourth_level_count;
                this.referralFirstMonthly = response.data.first_level_monthly
                this.referralSecondMonthly = response.data.second_level_monthly
                this.referralThirdMonthly = response.data.third_level_monthly
                this.referralFourthMonthly = response.data.fourth_level_monthly
            })
    },
    computed: {
        filteredFirstLevel() {
            var chunkSize = '';
            if (window.innerWidth >= 1366) {
                chunkSize = 5;
                this.referralFirstGroupBy = 5;
            } else if (window.innerWidth < 1366) {
                chunkSize = 2;
                this.referralFirstGroupBy = 2;
            }
            const chunks = [];

            for (let i = 0; i < this.referralFirstLevel.length; i += chunkSize) {
                chunks.push(this.referralFirstLevel.slice(i, i + chunkSize))
            }

            return chunks                   
        },
        totalReferral() {
            return this.referralFirstLevel.length + this.referralSecondLevel + this.referralThirdLevel + this.referralFourthLevel
        },
        TotalEstimatedIncome() {
            return parseFloat(this.referralSecondMonthly) + parseFloat(this.referralFirstMonthly) + parseFloat(this.referralThirdMonthly) + parseFloat(this.referralFourthMonthly)
        }
    },
}
</script>