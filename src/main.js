import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vue-multiselect/dist/vue-multiselect.css'
import App from './App.vue'
import { Quasar, Dark, Notify, Dialog } from 'quasar'


import router from './router'

// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(Quasar, {
    plugins: {
        Notify,
        Dialog,
        Dark,
    } // import Quasar plugins and add here
})

app.use(pinia)

app.mount('#app')