<template>
    <main>

      <div v-if="$route.name === 'layout'" >
          <!-- Page header-->
          <header class="bg-dark">
              <div class="container-xl px-5">
                  <img class="mt-3 mb-3 d-inline" src="https://test.sindbad.tech/assets-landing/images-sindbad/logo-small.png" alt="..." style="height: 48px" />
                  <h3 class="text-white ms-2 display-6 d-inline"> Sindbad.Tech Dashboard </h3>
              </div>
          </header>
          <!-- Page content-->
          <div class="container-xl p-5">
              <div class="card card-raised">
                  <div class="card-body text-center p-5 bg-dark">

                      <div class="row align-items-center">
                          <div class="col-lg-4 col-sm-12">
                              <img class="mb-3 w-100" src="https://test.sindbad.tech/assets-dashboard/images-sindbad/dashboard-bot.gif" alt="..." />
                          </div>

                          <div class="col-lg-8 col-sm-12">
                              <div class="mb-4 text-sm-center fs-6">
                                  <h2 class="text-white"> Hi, name!</h2>
                                  <hr class="text-white"/>
                                  <h4 class="text-white">Welcome to Sindbad.Tech! <br/>Your dashboard is ready to go.</h4>
                                  <h5 class="text-white text-start mt-10">Greetings from,</h5>
                                  <img class="mt-3 mb-3 d-inline float-start" src="https://test.sindbad.tech/assets-landing/images-sindbad/logo.png" alt="..." style="height: 56px" />
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </div>

      <router-view :key="key" />
      
    </main>
</template>

<script>
export default {
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>