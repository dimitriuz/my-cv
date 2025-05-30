import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import en from './locales/en.json'
import fr from './locales/fr.json'

// Get user's browser language
const userLanguage = navigator.language.split('-')[0]
const savedLanguage = localStorage.getItem('user-language')

// Check if we support the user's language
const supportedLanguages = ['en', 'fr']
const defaultLanguage = 'en'

const initialLanguage = savedLanguage || 
  (supportedLanguages.includes(userLanguage) ? userLanguage : defaultLanguage)

const i18n = createI18n({
  legacy: false,
  locale: initialLanguage,
  fallbackLocale: defaultLanguage,
  messages: {
    en,
    fr
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
