import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import * as VueGtag from 'vue-gtag'

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
  // 環境変数からGA4の測定IDを取得します
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  // 測定IDが存在する場合のみ、Google Analyticsを初期化します
  if (gaMeasurementId) {
    // TypeScriptの型不一致エラーを回避するため any 型にキャストします
    app.use(
      VueGtag as any,
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
  // 初期化中に予期せぬエラーが発生した場合は、エラーログを出力します
  console.error('An unexpected error occurred during Google Analytics initialization:', error)
}

app.mount('#app')
