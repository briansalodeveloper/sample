<template>
    
<header class="bg-dark">
    <div class="container-xl px-5">
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="text-white py-3 mb-0 display-6"> <i class="material-icons">person</i> Profile Information </h1>
        </div>
    </div>
</header>
<div class="container-xl my-3">
    <div class="card mt-2 navbar-color p-3">
        <div class="row">
            <!-- Profile image -->
            <div class="col-12 col-md-4 my-sm-3 d-block">                
                <div class="card-body text-white">
                    <div>
                        <span class="profile-header-text">Profile Image</span><br>
                        This image will be publicly visible to other users.
                    </div>
                    <div class="d-flex justify-content-center my-3">
                        <img :src="imagePreview" class="profile-avatar">
                    </div>
                    <div class="justify-content-center align-item-center text-center">
                        JPG or PNG no longer than 5mb
                        <div class="profile-upload d-flex justify-content-center mt-2">
                            <button class="btn profile-upload-btn">Upload image</button>
                            <input type="file" class="profile-upload-file" @change="preview" ref="fileInput">
                        </div>
                    </div>
                </div>
            </div>
            <!-- Account Details -->
            <div class="col-12 col-md-8 my-sm-3 d-block">                
                <div class="card-body text-white">
                    <span class="profile-header-text">Account Details</span><br>
                    Review and update your account information below.
                    <form @submit.prevent="submit">
                        <div class="row mt-5">
                            <div class="col-6">
                                <input type="text" placeholder="First Name" v-model="fields.firstname" :class="[fieldsError.firstname ? 'is-invalid' : '', 'form-control rounded-pill profile-input-text']" />
                                <div v-if="fieldsError.firstname" class="invalid-feedback">{{fieldsError.firstname[0]}}</div>
                            </div>
                            <div class="col-6">
                                <input type="text" v-model="fields.lastname" placeholder="Last Name" :class="[fieldsError.lastname ? 'is-invalid' : '', 'form-control rounded-pill']" />
                                <div v-if="fieldsError.lastname" class="invalid-feedback">{{fieldsError.lastname[0]}}</div>
                            </div>
                            <div class="col-12">
                                <input type="text" class="form-control rounded-pill mt-3" v-model="fields.email" placeholder="Email" readonly />
                            </div>
                            <div class="col-6">
                                <vue-tel-input
                                    :class="[telephoneValid ? 'is-invalid': '' , 'mt-3']"
                                    v-model="phone.number"
                                    :inputOptions="inputOptions"
                                    :key="fields.phone_no"
                                    :validCharactersOnly="true"
      
                                    @validate="validateNumber"
                                >
                                </vue-tel-input>
                                <div v-if="fieldsError.phone_no" class="invalid-feedback">Tel# is invalid</div>
                            </div>
                            {{ phone.number.length }}
                            <div class="col-6">
                                <input type="text" :class="[fieldsError.birthdate ? 'is-invalid' : '', 'form-control rounded-pill mt-3']" v-model="fields.birthdate" placeholder="Birthday" onfocus="(this.type='date')" />
                                <div v-if="fieldsError.birthdate" class="invalid-feedback">{{fieldsError.birthdate[0]}}</div>
                            </div>
                            <div class="col-12">
                                <input type="text" v-if="referre_name" class="form-control rounded-pill mt-3" v-model="referre_name" placeholder="Referee Name" readonly>
                                <!-- this is hidden input inorder to maintain the design if condition is false-->
                                <input type="text" v-else class="form-control mt-3" style="opacity:0">
                            </div>
                            <div class="col-12">
                                <button class="btn btn-md profile-btn mt-3 rounded-pill float-end" type="submit">Save Information</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>    
    <div class="row">
        <!-- Change password -->
        <div class="col-12 col-md-4 my-sm-3">
            <div class="card mt-2 navbar-color p-3">
                <div class="card-body text-white">

                    <span class="profile-header-text">Change Password</span><br>
                    Update your account password below.
                    <div class="mt-3">
                        <form @submit.prevent="updatePassword">
                            <!-- current password -->
                            <div class="password-container">
                                <input :type="passwordInputField[0].type" v-model="password.current" :class="[passwordError.current_password ? 'is-invalid' : '', 'form-control rounded-pill']" placeholder="Current Password">
                                <i class="material-icons password-toggle" @click="seePassword('current')">
                                    {{this.passwordInputField[0].style}}
                                </i>
                            </div>
                            <!-- current password validation i separate it to avoid bug in css -->
                            <div :class="[passwordError.current_password ? 'is-invalid' : '', 'form-control mt-3']" hidden></div>
                            <div v-if="passwordError.current_password" class="invalid-feedback">{{passwordError.current_password}}</div>
                            <div v-if="!Array.isArray(passwordError.current_password)" class="invalid-feedback">If you forgot your password, you can reset it by logging out and visiting link below {{ resetPasswordLink }}</div>
                            
                            <!-- new password -->
                            <div class="password-container">
                                <input :type="passwordInputField[1].type" v-model="password.new" :class="[submitValidation ? 'is-invalid' : '', 'form-control rounded-pill mt-3']" placeholder="New Password">
                                <i class="material-icons password-toggle" @click="seePassword('password')">
                                    {{this.passwordInputField[1].style}}
                                </i>
                            </div>
                            <!-- New password validation i separate it to avoid bug in css -->
                            <div :class="[submitValidation ? 'is-invalid' : 'is-valid', 'form-control mt-3']" hidden></div>
                            <div v-if="password.new" :class="[eightCharacters ? 'password-invalid': 'password-valid']">The password must be at least 8 characters.</div>
                            <div v-if="password.new" :class="[upperCase ? 'password-invalid': 'password-valid']">The password must contain at least one uppercase</div>
                            <div v-if="password.new" :class="[lowerCase ? 'password-invalid': 'password-valid']">The password must contain at least one lowercase</div>
                            <div v-if="password.new" :class="[symbols ? 'password-invalid': 'password-valid']">The password must contain at least one symbol</div>
                            <div v-if="password.new" :class="[numbers ? 'password-invalid': 'password-valid']">The password must contain at least one number</div>
                            
                            <!-- confirmation password -->
                            <div class="password-container">
                                <input :type="passwordInputField[2].type" v-model="password.confirmation" :class="[passwordError.password ? 'is-invalid' : '', 'form-control rounded-pill mt-3']" placeholder="Confirm Password">
                                <i class="material-icons password-toggle" @click="seePassword('confirm')">
                                    {{this.passwordInputField[2].style}}
                                </i>
                            </div>
                            <!-- confirmation password validation i separate it to avoid bug in css -->
                            <div :class="[passwordError.password ? 'is-invalid' : '', 'form-control mt-3']" hidden></div>
                            <div v-if="passwordError.password" class="invalid-feedback">{{passwordError.password[0]}}</div>
                            <button class="btn btn-md profile-btn rounded-pill float-end mt-3" type="submit" :disabled="submitValidation">Reset Password</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        <!-- Two factor Authentication -->
        <!-- <div class="col-12 col-md">
            <div class="card mt-2 navbar-color">
                <div class="card-body text-white">
                    <span class="profile-header-text">Two Factor Authentication</span><br>
                    Add another level of security to your account by enabling two-factor
                    authentication. We will send you a text message to verify your login
                    attempts on unrecognized devices and browsers
                    <div>
                    <div class="d-flex my-3 profile-two-fact-auth">
                        <div class="d-flex ms-3">
                            <input type="radio" v-model="twoFactorAuth" value="On" selected>
                            <p class="ms-1">On</p>
                        </div>
                        <div class="d-flex ms-3">
                            <input type="radio" v-model="twoFactorAuth" value="Off">
                            <p class="ms-1">Off</p>
                        </div>
                    </div>
                    <div>
                        <input type="tel" class="profile-two-fact-auth-tel" placeholder="SMS number">
                    </div>
                </div>
            </div>
        </div>
    </div>     -->
    </div>
</div>

</template>
<script>
import ProfileApi from '@/api/profile.js'
import Store from '@/store/index.js'
import Env from '@/config/env.js'
import profileEmpty from '@/assets/images/profile-empty.jpg'
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

export default {
    components: {
      VueTelInput,
    },
    data() {
        return {
            inputOptions: {
                showDialCode: true
            },
            phone:{
                areaCode:'',
                iso2:'',
                number:'',
            },
            dropdownOptions: {
                showDialCodeInList: true
            },
            telephoneValid:null,
            twoFactorAuth: '',
            imagePreview: '',
            password:[],
            passwordValidation:[],
            passwordError:[],
            passwordInputField:[
                {type:'password',style:'visibility_off'},
                {type:'password', style:'visibility_off'},
                {type:'password', style:'visibility_off'}
            ],
            fields:[],
            fieldsError:[],
            resetPasswordLink:Env.url+'forgot-password',
            referre_name:'',
        }
    },
    mounted() {
        ProfileApi.show({token:Store.state.auth.token})
            .then((response) => {
                this.fields = response.data
                //sample output on this would be +639153588103
                if (response.data.area_code && response.data.phone_no) {
                    this.phone.number = '+'+response.data.area_code+response.data.phone_no+''
                }

                if (response.data.image_path) {
                    this.imagePreview = ''+Env.url+'storage/'+response.data.image_path+''
                } else {
                    this.imagePreview = profileEmpty;
                }
            });
    },
    computed: {
        submitValidation() {
            if(!this.symbols && !this.lowerCase && !this.upperCase && !this.numbers && !this.eightCharacters) {
                return false;
            }
            return true;
        },
        lowerCase() {
            if(/[a-z]/.test(this.password.new)){
                return false;
            }
            return this.passwordNewUndefined
        },
        upperCase() {
            if(/[A-Z]/.test(this.password.new)){
                return false;
            }
            return this.passwordNewUndefined
        },
        symbols() {
            if(/[^a-zA-Z0-9]/.test(this.password.new)) {
                return false;
            }
            return this.passwordNewUndefined
        },
        numbers() {
            if(/[0-9]/.test(this.password.new)){
                return false;
            }
            return this.passwordNewUndefined
        },
        eightCharacters() {
            if (typeof this.password.new !== 'undefined') {
                if(this.password.new.length > 8){
                    return false
                }
            }
            return this.passwordNewUndefined
        },
        //this will check if the password.new is not empty
        passwordNewUndefined() {
            if(typeof this.password.new == 'undefined'){
                return false;
            }
            return true;
        },
        formattedNumber(){
            return this.phone.number.replace('+'+this.phone.areaCode+'', "").replace(/\s/g, "");
        }
    },  
    methods: {
        preview() {
            const checksize = this.$refs.fileInput.files[0];

            if(checksize.size > 5000000) {
                this.$toast.error("<div class='d-flex'><i class='material-icons d-flex'>cancel</i>Cannot upload image bigger than 5mb.</i></div>");
            } else {
                const formData = new FormData()
                // Add the file to the FormData object
                formData.append('image', this.$refs.fileInput.files[0]);
                formData.append('token', Store.state.auth.token);

                ProfileApi.userImage(formData)
                    .then((response) => {console.log('asd')
                        // Get the selected file
                        const file = this.$refs.fileInput.files[0]
                        // Create a FileReader instance
                        const reader = new FileReader()
                        // Set the reader's onload event to show the image preview
                        reader.onload = e => {
                            this.imagePreview = e.target.result
                        }
                        // Read the file as a DataURL
                        reader.readAsDataURL(file)

                        this.$toast.success("<div class='d-flex'><i class='material-icons d-flex'>check_circle</i>Profile image updated successfully.</i></div>");
                    
                    }).catch((error) => {
                        if (error.response.data.errors.image) {
                            this.$toast.error("<div class='d-flex'><i class='material-icons d-flex'>cancel</i>"+error.response.data.errors.image[1]+"</i></div>");
                        } else {
                            this.$toast.error("<div class='d-flex'><i class='material-icons d-flex'>cancel</i>Error Occured while updating the profile.</i></div>");
                        }
                    });
            }
        },
        submit(){
            this.fieldsError = ''
            this.fields.token = Store.state.auth.token
            this.fields.iso2 = this.phone.iso2
            this.fields.area_code = this.phone.areaCode
            this.fields.phone_no = this.formattedNumber

            ProfileApi.userUpdate(this.fields)
                .then((response) => {
                    this.$toast.success("<div class='d-flex'><i class='material-icons d-flex'>check_circle</i>User updated successfully.</i></div>");
                    this.fields = response.data.user
                    this.fieldsError = {}
                }).catch((error) => {
                    this.fieldsError = error.response.data.errors
                });
        },
        updatePassword() {
            const param = {
                current_password: this.password.current,
                password: this.password.new,
                password_confirmation: this.password.confirmation,
                token: Store.state.auth.token,
            }
            this.passwordError = {}
            ProfileApi.updatePassword(param)
                .then((response) => {
                    this.$toast.success("<div class='d-flex'><i class='material-icons d-flex'>check_circle</i>Password updated successfully.</i></div>");
                    this.password = [],
                    this.passwordError = {}
                }).catch((error) => {
                    this.passwordError = error.response.data.errors
                });
        },
        seePassword(payload) {
            switch (payload) {
                case 'current':
                    if(this.passwordInputField[0].type == 'text')
                    {
                        this.passwordInputField[0].type = 'password'
                        this.passwordInputField[0].style = 'visibility_off'
                    }else{
                        this.passwordInputField[0].type = 'text'
                        this.passwordInputField[0].style = 'visibility'
                    }
                    break;
                case 'password':
                    if(this.passwordInputField[1].type == 'text')
                    {
                        this.passwordInputField[1].type = 'password'
                        this.passwordInputField[1].style = 'visibility_off'
                    }else{
                        this.passwordInputField[1].type = 'text'
                        this.passwordInputField[1].style = 'visibility'
                    }
                    break;
                case 'confirm':
                    if(this.passwordInputField[2].type == 'text')
                    {
                        this.passwordInputField[2].type = 'password'
                        this.passwordInputField[2].style = 'visibility_off'
                    }else{
                        this.passwordInputField[2].type = 'text'
                        this.passwordInputField[2].style = 'visibility'
                    }
                    break;
            }
        },
        validateNumber(phoneObject) {
            if(phoneObject.valid) {
                this.telephoneValid = false
                this.phone.iso2 = phoneObject.country.iso2
                this.phone.areaCode = phoneObject.country.dialCode
            } else{
                this.telephoneValid = true
            }
        }
    }
}
</script>
