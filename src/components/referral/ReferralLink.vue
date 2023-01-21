<template>
    <h5 class="text-white">Referral Link</h5>
    <div class="card navbar-color referral-link-height">
        <div class="card-body">
            <div class="row">
                <div class="col-md-9 col-12 text-white">
                    Referral Link:
                    <input class="referral-link-input" type="text" v-model="referralLinkEncrypted" @copy.prevent @cut.event readonly>
                </div>
                <div class="col-md-3 col-12 text-white  d-flex">
                    <div class="btn btn-primary btn-sm referral-link-btn" @click="copyLink">
                        {{copyText}}
                        <i v-if="copyText=== 'Copied'" class="material-icons">done</i>
                        <i v-else class="material-icons">content_copy</i>
                    </div>
                    <div class="share-button" style="width:120px;">
                        <div @mouseenter="shareHover" @mouseleave="shareNotHover" class="btn btn-primary btn-sm referral-link-btn">Share
                        <i class="material-icons">share</i>
                        </div>
                        <div @mouseenter="shareHover" @mouseleave="shareNotHover" :class="['share-list',{'show':shareToggle}]">
                            <ShareNetwork
                                network="linkedin"
                                :url="this.referralLinkEncrypted"
                                title="You are about to be directed to Sinbad.Tech Report program. Please click the link provided."
                            >
                                <img src="https://sindbad.tech/assets-landing/images-sindbad/sm-linkedin-modified-150x150.png" width="30" height="30">
                            </ShareNetwork>
                            <ShareNetwork
                                network="twitter"
                                :url="this.referralLinkEncrypted"
                                title="You are about to be directed to Sinbad.Tech Report program. Please click the link provided."
                            >
                                <img src="https://sindbad.tech/assets-landing/images-sindbad/sm-twitter-modified-150x150.png" width="30" height="30">
                            </ShareNetwork>
                            <ShareNetwork
                                network="telegram"
                                :url="this.referralLinkEncrypted"
                                title="You are about to be directed to Sinbad.Tech Report program. Please click the link provided."
                            >
                                <img src="https://sindbad.tech/assets-landing/images-sindbad/sm-telegram-modified-150x150.png" width="30" height="30">
                            </ShareNetwork>
                            <ShareNetwork
                                network="facebook"
                                :url="this.referralLinkEncrypted"
                                title="You are about to be directed to Sinbad.Tech Report program. Please click the link provided."
                            >
                                <img src="/src/assets/images/facebookLogo.png" width="30" height="30">
                            </ShareNetwork>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReferralApi from '@/api/referral.js'
import Store from '@/store/index.js'
import CryptoJS from 'crypto-js';

export default {
    data() {
        return {
            copyText:'COPY',
            shareToggle:false,
            referralLink:'',
            referralLinkEncrypted:'',
        }
    },
    mounted() {
        ReferralApi.link({token:Store.state.auth.token})
            .then((response) => {
                const toEncrypt = response.data.user_id
                const encrypted = CryptoJS.AES.encrypt(toEncrypt.toString(), 'sindbad.tech.secret');
                // this is the code to decrypt the encrypted variable
                // const toDecrypt = CryptoJS.AES.decrypt(encrypted, 'sindbad.tech.secret');
                // console.log(toDecrypt.toString(CryptoJS.enc.Utf8))
                this.referralLinkEncrypted = response.data.test_url+''+encodeURIComponent(encrypted.toString());
                this.referralLink = response.data.test_url+response.data.user_id;
            });
    },
    methods: {
        shareHover() {
            this.shareToggle = true;
        },
        shareNotHover() {
            this.shareToggle = false;
        },
        copyLink(){
            navigator.clipboard.writeText(this.referralLinkEncrypted);
            this.copyText = 'Copied'
            setTimeout(() => {
                this.copyText = 'Copy';
            }, 2000);
        }
    }
}
</script>