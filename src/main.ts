import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// @ts-ignore
import VueGtag from 'vue-gtag'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
    },
  },
})

try {
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  if (gaMeasurementId) {
    app.use(
      VueGtag,
      {
        config: {
          id: gaMeasurementId,
        },
      },
      router,
    )
    console.log('Google Analytics has been initialized successfully.')
  } else {
    console.warn('VITE_GA_MEASUREMENT_ID is not defined. Google Analytics initialization skipped.')
  }
} catch (error) {
  console.error('An unexpected error occurred during Google Analytics initialization:', error)
}

app.mount('#app')
