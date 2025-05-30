<template>
  <div class="language-switcher">
    <button 
      v-for="lang in availableLocales" 
      :key="lang"
      :class="{ active: currentLocale === lang }"
      @click="switchLanguage(lang)"
    >
      {{ lang.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()
const currentLocale = computed(() => locale.value)

const switchLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('user-language', lang)
}
</script>

<style scoped>
.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
}

button {
  padding: 4px 8px;
  border: 1px solid #569CD6;
  background: transparent;
  color: #569CD6;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9em;
}

button.active {
  background: #569CD6;
  color: #1E1E1E;
}

button:hover {
  background: #569CD6;
  color: #1E1E1E;
}
</style>