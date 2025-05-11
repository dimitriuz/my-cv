<template>
  <section class="section">
    <h2>{{ t('experience.title') }}</h2>
    <div class="section" v-for="(job, index) in tm('experience.jobs')" :key="index">
      <div class="job-header">
        <div class="job-info">
          <span class="job-company">{{ $rt(job.company) }}</span>
          <span class="separator">•</span>
          <span class="job-title">{{ $rt(job.title) }}</span>
        </div>
        <span class="job-details">{{ $rt(job.period) }} | {{ $rt(job.location) }}</span>
      </div>
      <p v-if="job.description">{{ $rt(job.description) }}</p>
      <div v-if="job.responsibilities" class="list-item-container">
        <ul>
          <li v-for="(resp, rIndex) in job.responsibilities" :key="rIndex">
            <div class="responsibility">
              <div class="responsibility-title">{{ $rt(resp.title) }}</div>
              <ul v-if="resp.details && resp.details.length > 0">
                <li v-for="(detail, dIndex) in resp.details" :key="dIndex">
                  {{ $rt(detail) }}
                </li>
              </ul>
            </div>
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
  margin-bottom: 3px;
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

.responsibility {
  margin-bottom: 8px;
}

.responsibility-title {
  color: #9CDCFE;
  font-weight: 500;
  margin-bottom: 4px;
}

.responsibility ul {
  margin-top: 4px;
  margin-bottom: 8px;
}

.responsibility ul li {
  color: #D4D4D4;
  font-size: 0.95em;
  margin-left: 20px;
}
</style>