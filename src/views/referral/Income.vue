<template>
<!-- Referral Balance -->
<div class="card navbar-color">
    <div class="card-body text-white">
        Referral Balance <br>
        <div class="d-flex justify-content-between">
            <div>
                <H5 class="text-white">SAR 1,000</H5>
                Available
            </div>
            <div class="align-self-end">
                <div class="btn btn-primary btn-sm rounded profile-btn">Withdraw Fund</div>
            </div>
        </div>
        <div>
            <table class="table text-white">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Levels</th>
                        <th scope="col">Transaction</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Juan Dela Cruz</th>
                        <td>November 12, 2022</td>
                        <td>Juandelacruz@gmail.com</td>
                        <td>09153588103</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="profile-divider"></div>
<!-- Recent Activity -->
<div class="card navbar-color">
    <div class="card-body text-white">
        Recent Activity
        <div v-for="item in recentActivity" class="row justify-content-between income-recent-activity-card">
            <div class="col-12 col-md-10">
                <div class="d-flex">
                    <div>
                        <img src="/src/assets/bg-white.jpg" alt="Rounded image" class="rounded-image income-profile">
                    </div>
                    <div class="ms-3">
                        Level 2 Referee
                        <div class="d-flex">
                            <div>July 21</div>
                            <div class="ms-2">Money Received</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md text-center mt-2">
                <div>
                    SAR 5000,000
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
export default {
    data() {
        return {
            recentActivity: 5
        }
    }
}
</script>
