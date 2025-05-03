import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
