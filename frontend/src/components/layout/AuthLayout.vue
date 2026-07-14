<template>
  <div class="auth-shell relative flex min-h-screen overflow-hidden bg-surface-bg bg-noise">
    <!-- ============ 左侧品牌舞台（桌面） ============ -->
    <aside class="auth-stage">
      <div class="stage-orb" aria-hidden="true"></div>
      <div class="stage-orb stage-orb-2" aria-hidden="true"></div>
      <div class="stage-grid" aria-hidden="true"></div>
      <div class="stage-inner">
        <div class="stage-mark font-display">— {{ t('home.providers.description') }} —</div>
        <h2 class="stage-title font-display">{{ siteName }}</h2>
        <p class="stage-tagline"><em>{{ siteSubtitle }}</em></p>
        <div class="stage-foot">
          <span class="stage-dot"></span>
          SECURE · TLS 1.3 · {{ new Date().getFullYear() }}
        </div>
      </div>
    </aside>

    <!-- ============ 右侧表单区 ============ -->
    <main class="auth-side relative flex flex-1 items-center justify-center overflow-hidden p-4">
      <div class="form-orb" aria-hidden="true"></div>

      <div class="relative z-10 w-full max-w-md">
        <!-- 小 logo + 站名（移动端显示，桌面端由舞台承担） -->
        <div class="auth-brand mb-9 text-center lg:hidden">
          <template v-if="settingsLoaded">
            <div class="brand-mark-wrap mb-4 inline-flex">
              <div class="brand-mark relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-line bg-surface-1 shadow-card">
                <img :src="siteLogo || '/logo.png'" alt="Logo" class="h-full w-full object-contain" />
              </div>
              <span class="brand-ring" aria-hidden="true"></span>
            </div>
            <h1 class="auth-brand-name font-display">{{ siteName }}</h1>
            <p class="auth-tagline"><em>{{ siteSubtitle }}</em></p>
          </template>
        </div>

        <!-- 表单面板（轻量、无边框重卡） -->
        <div class="auth-panel">
          <div class="auth-panel-glow" aria-hidden="true"></div>
          <div class="relative">
            <slot />
          </div>
        </div>

        <!-- Footer Links -->
        <div class="mt-6 text-center text-sm">
          <slot name="footer" />
        </div>

        <!-- Copyright -->
        <div class="mt-8 text-center text-xs text-ink-subtle">
          &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'

const { t } = useI18n()
const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'Sub2API')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'Subscription to API Conversion Platform')
const settingsLoaded = computed(() => appStore.publicSettingsLoaded)

const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  appStore.fetchPublicSettings()
})
</script>

<style scoped>
.auth-shell { color: var(--ink); }

/* ============ 左侧舞台 ============ */
.auth-stage {
  position: relative; display: none; flex: 1.1; flex-direction: column;
  justify-content: center; padding: 64px; overflow: hidden;
  background: color-mix(in srgb, var(--color-primary) 8%, var(--surface-bg));
  border-right: 1px solid var(--line);
}
@media (min-width: 1024px) { .auth-stage { display: flex; } }

.stage-orb { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.stage-orb:not(.stage-orb-2) { width: 520px; height: 520px; top: -120px; left: -100px; background: radial-gradient(circle, rgba(139,92,246,.42), transparent 68%); animation: stage-orb-drift 20s ease-in-out infinite; }
.stage-orb-2 { width: 420px; height: 420px; bottom: -100px; right: -80px; background: radial-gradient(circle, rgba(212,160,23,.34), transparent 68%); animation: stage-orb-drift 26s ease-in-out infinite reverse; }
@keyframes stage-orb-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, -30px) scale(1.12); }
}

.stage-grid { position: absolute; inset: 0; opacity: .5; background-image: var(--gradient-mesh); background-size: 64px 64px; mask-image: radial-gradient(circle at 30% 50%, black, transparent 80%); }

.stage-inner { position: relative; z-index: 2; max-width: 460px; }
.stage-mark { font-size: 13px; font-style: italic; color: var(--color-primary); letter-spacing: .04em; margin-bottom: 28px; }
.stage-title { font-size: clamp(56px, 6vw, 96px); line-height: .9; font-weight: 900; letter-spacing: -0.04em; color: var(--ink-strong); }
.stage-tagline { margin-top: 22px; font-size: clamp(18px, 1.8vw, 26px); line-height: 1.3; font-weight: 400; color: var(--ink); }
.stage-tagline em { font-style: italic; background-image: var(--gradient-brand); -webkit-background-clip: text; background-clip: text; color: transparent; }
.stage-foot { margin-top: 48px; display: inline-flex; align-items: center; gap: 10px; font: 11px/1 ui-monospace, monospace; letter-spacing: .14em; color: var(--ink-subtle); }
.stage-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-success); box-shadow: 0 0 0 4px var(--color-success-soft); animation: live-pulse 1.8s infinite; }
@keyframes live-pulse { 50% { opacity: .5; } }

/* ============ 右侧表单区 ============ */
.auth-side { color: var(--ink); }
.form-orb { position: absolute; width: 420px; height: 420px; right: -120px; top: 30%; border-radius: 50%; background-image: var(--gradient-brand); filter: blur(70px); opacity: .25; pointer-events: none; animation: stage-orb-drift 22s ease-in-out infinite; }

.brand-mark-wrap { position: relative; }
.brand-mark { transition: transform 220ms var(--ease-out); }
.brand-mark-wrap:hover .brand-mark { transform: translateY(-2px) scale(1.04); }
.brand-ring { position: absolute; inset: -8px; border-radius: var(--radius-3xl); background-image: var(--gradient-brand); filter: blur(16px); opacity: .3; z-index: -1; }

.auth-brand-name { font-size: 30px; font-weight: 700; letter-spacing: -0.03em; color: var(--ink-strong); }
.auth-tagline { margin-top: 8px; font-size: 13px; color: var(--ink-muted); }
.auth-tagline em { font-style: italic; background-image: var(--gradient-brand); -webkit-background-clip: text; background-clip: text; color: transparent; }

.auth-panel { position: relative; background: color-mix(in srgb, var(--surface-1) 92%, transparent); backdrop-filter: blur(16px); padding: 32px; border-radius: 20px; border: 1px solid var(--line); box-shadow: var(--shadow-popover); animation: auth-enter .6s cubic-bezier(.2,.8,.2,1) both; }
.auth-panel-glow { position: absolute; inset: -1px; border-radius: inherit; background-image: var(--gradient-brand); opacity: .14; z-index: 0; pointer-events: none; mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; padding: 1px; }
@keyframes auth-enter { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1023px) {
  .auth-side { padding: 40px 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .stage-orb, .form-orb, .stage-dot { animation: none !important; }
}
</style>