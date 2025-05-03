<template>
  <section class="section">
    <h2>{{ t('summary.title') }}</h2>
    <p>{{ t('summary.intro') }}</p>
    <p><strong>{{ t('summary.skillsTitle') }}</strong></p>
    <ul>
      <li v-for="(skill, index) in skills" :key="index">
        {{ skill }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const skills = tm('summary.skills')
console.log(skills)
</script>

<style scoped>
.section {
  margin-bottom: 30px;
}

.section h2 {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}
</style>