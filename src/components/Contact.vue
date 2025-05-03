<template>
  <section class="section">
    <h2>{{ t('contact.title') }}</h2>
    <div class="contact-grid">
      <div class="contact-column">
        <div v-for="(item, index) in firstHalf" :key="index" class="contact-item">
          <component :is="getIcon(item.type)" class="contact-icon" />
          <span class="contact-label">{{ item.label }}:</span>
          <a v-if="item.link" :href="item.link" target="_blank" class="contact-value">
            {{ item.value }}
          </a>
          <span v-else class="contact-value">{{ item.value }}</span>
        </div>
      </div>
      <div class="contact-column">
        <div v-for="(item, index) in secondHalf" :key="index" class="contact-item">
          <component :is="getIcon(item.type)" class="contact-icon" />
          <span class="contact-label">{{ item.label }}:</span>
          <a v-if="item.link" :href="item.link" target="_blank" class="contact-value">
            {{ item.value }}
          </a>
          <span v-else class="contact-value">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon, 
} from '@heroicons/vue/24/outline'

const { t, tm } = useI18n()

const items = computed(() => tm('contact.items'))
const middleIndex = Math.ceil(items.value.length / 2)
const firstHalf = computed(() => items.value.slice(0, middleIndex))
const secondHalf = computed(() => items.value.slice(middleIndex))

const getIcon = (type: string) => {
  const icons: Record<string, any> = {
    location: MapPinIcon,
    email: EnvelopeIcon,
    phone: PhoneIcon,
    website: GlobeAltIcon,
  }
  return icons[type] || GlobeAltIcon
}
</script>

<style scoped>
.section {
  text-align: left;
  margin-bottom: 3px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
}

.contact-icon {
  width: 18px;
  height: 18px;
  color: #569CD6;
}

.contact-label {
  color: #9CDCFE;
  font-weight: bold;
}

.contact-value {
  color: #D4D4D4;
  text-decoration: none;
  transition: color 0.2s ease;
}

a.contact-value:hover {
  color: #569CD6;
  text-decoration: underline;
}
</style>