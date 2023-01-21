let mode = {
    production_mode: false,
}

const staging = 'https://test.sindbad.tech/';
const production = 'https://sindbad.tech/'

const Backend_Api = mode.production_mode ? '' : 'https://test.sindbad.tech/api'
const url = mode.production_mode ? production : staging

export default {
    Backend_Api,
    url,
}