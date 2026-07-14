<template>
  <div class="card">
    <div class="border-b border-line px-6 py-4">
      <h2 class="text-lg font-semibold font-display tracking-tight text-ink-strong">{{ t('dashboard.quickActions') }}</h2>
    </div>
    <div class="space-y-3 p-4">
      <button v-for="action in actions" :key="action.path" @click="router.push(action.path)" class="group flex w-full items-center gap-4 rounded-xl bg-surface-2/60 p-4 text-left transition-all duration-200 hover:bg-surface-2 hover:-translate-y-px">
        <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 transition-transform group-hover:scale-105 dark:bg-primary-500/15">
          <Icon :name="action.icon" size="lg" class="text-primary-600 dark:text-primary-400" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-ink-strong">{{ t(action.label) }}</p>
          <p class="text-xs text-ink-muted">{{ t(action.desc) }}</p>
        </div>
        <Icon name="chevronRight" size="md" class="text-ink-subtle transition-colors group-hover:text-primary-500" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import { useBatchImageAccess } from '@/composables/useBatchImageAccess'

type IconName = 'key' | 'chart' | 'sparkles' | 'gift'

const router = useRouter()
const { t } = useI18n()
const { canUseBatchImage, refreshBatchImageAccess } = useBatchImageAccess()

const actions = computed<{ path: string; icon: IconName; label: string; desc: string }[]>(() => {
  const list: { path: string; icon: IconName; label: string; desc: string }[] = [
    { path: '/keys', icon: 'key', label: 'dashboard.createApiKey', desc: 'dashboard.generateNewKey' },
    { path: '/usage', icon: 'chart', label: 'dashboard.viewUsage', desc: 'dashboard.checkDetailedLogs' },
    { path: '/redeem', icon: 'gift', label: 'dashboard.redeemCode', desc: 'dashboard.addBalanceWithCode' }
  ]
  if (canUseBatchImage.value) {
    list.splice(2, 0, { path: '/batch-image', icon: 'sparkles', label: 'dashboard.batchImageAgent', desc: 'dashboard.batchImageAgentDesc' })
  }
  return list
})

onMounted(() => {
  void refreshBatchImageAccess()
})
</script>