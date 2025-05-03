<template>
  <section class="section">
    <h2>{{ t('education.title') }}</h2>
    <div v-for="(school, index) in tm('education.schools')" :key="index">
      <h3>{{ school.name }}</h3>
      <p>{{ school.degree }} · ({{ school.period }})</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t,tm } = useI18n()
</script>

<style scoped>
.section {
  text-align: left;
  margin-bottom: 3px;
}

.section h2 {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}
</style>