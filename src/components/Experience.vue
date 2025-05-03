<template>
  <section class="section">
    <h2>{{ t('experience.title') }}</h2>

    <div class="section" v-for="(job, index) in tm('experience.jobs')" :key="index">
      <div class="job-header">
        <div class="job-info">
          <span class="job-company">{{ job.company }}</span>
          <span class="separator">•</span>
          <span class="job-title">{{ job.title }}</span>
        </div>
        <span class="job-details">{{ job.period }} | {{ job.location }}</span>
      </div>
      <p v-if="job.description">{{ job.description }}</p>
      <div class="list-item-container">
        <ul>
          <li v-for="(resp, rIndex) in job.responsibilities" :key="rIndex">
            <template v-if="typeof resp === 'string'">
              {{ resp }}
            </template>
            <template v-else>
              {{ resp.title }}
              <ul v-if="resp.details">
                <li v-for="(detail, dIndex) in resp.details" :key="dIndex">
                  {{ detail }}
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </div>
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

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.job-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.job-company {
  font-weight: bold;
  color: #569CD6;
  font-size: 1.2em;
}

.separator {
  color: #666;
}

.job-title {
  color: #4EC9B0;
}

.job-details {
  color: #9CDCFE;
  font-style: italic;
}
</style>