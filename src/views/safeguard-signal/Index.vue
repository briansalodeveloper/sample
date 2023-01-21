<template>

<header class="bg-dark">
    <div class="container-xl px-5">
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="text-white py-3 mb-0 display-6"> <i class="material-icons">health_and_safety</i> Safeguard Signal </h1>
        </div>
    </div>
</header>
<div class="container-xl my-3 py-4">

    <div class="card navbar-color">
        <div class="card-body safeguard-signal">
            <div class="row g-2 align-items-center mb-2">
                <div class="col-auto">
                    <label class="text-white">Date:</label>
                </div>
                <div class="col-auto">
                    <input type="date" id="safeguardDate" v-model="selectedDate" @change="getByDate" style="" placeholder="Date" class="form-control">
                </div>
            </div>

            <!-- TASI COMPANY -->
            <div class="safeguard-tasi-wrapper" v-if="this.results.length && tasiCompany.length">
                <div class="row">
                    <div class="col-md-4 col-xs-12 d-flex">
                        <div><h4 class="text-white">TASI</h4></div>
                        <div class="safeguard-tasi-line"></div>
                        <div v-if="tasiCompany[0].negative_positive=='positive'" class="safeguard-circle-green-big ms-5"></div>
                        <div v-else class="safeguard-circle-red-big ms-4"></div>
                        <div><h4 class="text-white ms-5">{{tasiCompany[0].negative_positive.toUpperCase()}}</h4></div>
                    </div>
                    <div v-if="tasiCompany[0].negative_positive=='positive'" class="col-md-8 col-12 d-flex justify-content-around">
                        <div class="mt-1 col-4">
                            <h6 class="text-white"><b>To negative:</b> {{new Intl.NumberFormat().format(tasiCompany[0].to_negative)}}</h6>
                        </div>
                        <div class="mt-1">
                            <h6 class="text-white"><b>To negative(%):</b> {{tasiCompany[0].to_negative_perc}}</h6>
                        </div>
                        <div class="mt-1">
                            <h6 class="text-white font-weight-bold"><b>Duration(w):</b> {{tasiCompany[0].duration}}</h6>
                        </div>
                    </div>
                    <div v-else="tasiCompany[0].negative_positive=='positive'" class="col-md-8 col-12 d-flex justify-content-around">
                        <div class="mt-1 col-4">
                            <h6 class="text-white font-weight-bold">To positive: {{new Intl.NumberFormat().format(tasiCompany[0].to_positive)}}</h6>
                        </div>
                        <div class="mt-1">
                            <h6 class="text-white font-weight-bold">To positive(%): {{tasiCompany[0].to_positive_perc}}</h6>
                        </div>
                        <div class="mt-1">
                            <h6 class="text-white font-weight-bold">Duration(w): {{tasiCompany[0].duration}}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table text-white safeguard" id="myTable">
                <thead class="safeguard-thead">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Sector</th>
                        <th scope="col">Company</th>
                        <th scope="col">Code</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">Negative/Positive</th>
                        <th scope="col">Duration (w)</th>
                        <th scope="col">Profit (%)</th>
                        <th scope="col">Capital Protection (%)</th>
                    </tr>
                </thead>
                <tbody class="tbody-test">
                    <tr v-for="(result, index) in results">
                        <td scope="row">{{index+1}}</td>
                        <td class="text-center">{{result.index_en}}</td>
                        <td>{{ result.company_en }}</td>
                        <td class="text-center">{{result.code}}</td>
                        <td class="text-center">{{ result.market_cap }}</td>
                        <td class="text-center">
                            <div class="d-flex justify-content-center">
                                <div v-if="result.negative_positive=='positive'" class="safeguard-circle-green">
                                    <span style="opacity:0">1</span> 
                                </div>
                                <div v-else class="safeguard-circle-red">
                                    <span style="opacity:0">2</span> 
                                </div>
                            </div>
                        </td>
                        <td class="text-center">{{ result.duration }}</td>
                        <td v-if="result.profit=='NaN'"></td>
                        <td class="text-center" v-else>{{ result.profit }}</td>
                        <td v-if="result.capital_protection=='NaN'"></td>
                        <td class="text-center" v-else>{{ result.capital_protection }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>

</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            results: [],
            selectedDate:''
        }
    },
    async mounted() {
            this.formatDate();

            flatpickr('#safeguardDate', {
                disable: [
                    function(date) {
                    // return true to disable
                    return (date.getDay() === 5 || date.getDay() === 6);
                    }
                ]
            });

            await axios.get('https://forcast-api.azurewebsites.net/forcasts', {
                }).then((response) => {
                    this.results = response.data;
                }).catch((error) => {
                    this.results = []
                });

                $('#myTable').DataTable({
                    paging:false
                })
    },
    computed: {
          tasiCompany(){
                return this.results.filter(result => result.company_en === 'TASI')
          },
          rowsToAdd() {
              const result = this.results.map((result, index) => {
                  var negative_positive = '';
                  var profit = result.profit;
                  var capitalProtection = result.capital_protection

                  if (result.negative_positive == 'negative') {
                    var negative_positive = '<div class="d-flex justify-content-center">'
                        negative_positive += "<div class='safeguard-circle-red'> <span style='opacity:0'>2</span></div>"
                        negative_positive += '</div>'
                  } else {
                    var negative_positive = '<div class="d-flex justify-content-center">'
                        negative_positive += "<div class='safeguard-circle-green'> <span style='opacity:0'>1</span></div>"
                        negative_positive += '</div>'
                  }

                  if (result.profit == 'NaN') {
                      profit = '';
                  }

                  if (result.capital_protection == 'NaN') {
                      capitalProtection = '';
                  }
    
                  return [
                          index+1,
                          result.index_en,
                          result.company_en,
                          result.code,
                          result.market_cap,
                          negative_positive,
                          result.duration,
                          profit,
                          capitalProtection
                        ]
              });

              return result;
          }
    },
    methods: {
         formatDate() {
            const date = new Date()
            var mm = (date.getMonth() + 1).toString().padStart(2, "0");
            var dd = date.getDate();
            var yyyy = date.getFullYear();

            this.selectedDate = yyyy + '-'+ mm+'-' + dd
         },
          async getByDate() {
              await axios.get('https://forcast-api.azurewebsites.net/historical/'+this.selectedDate+'', {
                }).then((response) => {
                    this.results = response.data;
                  }).catch((error) => {
                    this.results = []
                });

                var table = $('#myTable').DataTable();
                table.clear()
                table.rows.add(this.rowsToAdd).draw();
          },
    }
}
</script>