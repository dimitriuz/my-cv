<template>
  <section class="section">
    <h2>{{ t('experience.title') }}</h2>

    <div v-for="(job, index) in tm('experience.jobs')" :key="index">
      <h3>{{ job.company }}</h3>
      <p class="job-title">{{ job.title }}</p>
      <p class="job-details">{{ job.period }} | {{ job.location }}</p>
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