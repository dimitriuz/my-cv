<template>
  <section class="section">
    <h2>{{ t('summary.title') }}</h2>
    <p>{{ t('summary.intro') }}</p>
    <p><strong>{{ t('summary.skillsTitle') }}</strong></p>
    <div class="list-item-container">
    <ul>
      <li v-for="(skill, index) in tm('summary.skills')" :key="index">
        {{ $rt(skill) }}
      </li>
    </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<style scoped>
.section {
  text-align: justify;
  margin-bottom: 30px;
}

.section h2 {
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}
</style>