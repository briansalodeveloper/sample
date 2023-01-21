<template>
    <h5 class="text-white">Referral List</h5>
    <div class="card text-white navbar-color">
        <div class="card-body">
            <div style="float:right; margin-bottom:10px;">
                <a href="/path/to/myfile.pdf" class="btn btn-primary btn-sm referral-download-btn" download>(PDF)</a>
                <a href="/path/to/myfile.csv" class="btn btn-primary btn-sm ms-2 referral-download-btn" download>(CSV)</a>
            </div>
            <table class="table text-white" id="referralListTable">
                <thead>
                    <tr>
                        <th scope="col">Names</th>
                        <th scope="col">Date of Registration</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile No</th>
                        <th scope="col" class="text-center">No. of Referrals<br>(Active/Inactive)</th>
                        <th scope="col" class="text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in referralList">
                        <th scope="row">{{list.firstname}}</th>
                        <td>{{list.date_of_registration}}</td>
                        <td>{{list.email}}</td>
                        <td>{{list.phone_no}}</td>
                        <td class="text-center">{{list.referral_count}}</td>
                        <td class="text-center">{{list.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ReferralApi from '@/api/referral.js'
import Store from '@/store/index.js'

export default {
    data() {
        return {
            referralList:[],
        }
    },
    async mounted () {
        await ReferralApi.list({token:Store.state.auth.token})
                .then((response) => {
                    this.referralList = response.data.first_level_list;
                });

        $('#referralListTable').DataTable()
    }
}
</script>