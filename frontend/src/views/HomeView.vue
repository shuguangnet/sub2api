<template>
  <div v-if="homeContent" class="min-h-screen">
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <div v-else v-html="homeContent"></div>
  </div>

  <div
    v-else
    ref="homeRoot"
    class="min-h-screen bg-[#f9f9f9] text-neutral-900 selection:bg-sky-200 selection:text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
  >
    <header class="home-nav sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div class="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-4">
        <div class="flex items-center gap-10">
          <router-link to="/" class="flex items-center gap-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            <img v-if="siteLogo" :src="siteLogo" alt="logo" class="h-7 w-7 rounded object-contain" />
            {{ siteName }}
          </router-link>
          <nav class="hidden items-center gap-6 md:flex">
            <a
              v-for="item in navItems"
              :key="item.label"
              :href="item.href"
              class="text-sm transition-colors"
              :class="item.active
                ? 'border-b-2 border-sky-400 pb-1 font-semibold text-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>

        <div class="flex items-center gap-2">
          <LocaleSwitcher />
          <router-link
            v-if="isAuthenticated"
            :to="dashboardPath"
            class="hidden rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {{ t('home.dashboard') }}
          </router-link>
          <template v-else>
            <router-link
              to="/login"
              class="hidden px-3 py-2 font-mono text-xs uppercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white sm:inline-flex"
            >
              {{ t('home.login') }}
            </router-link>
            <router-link to="/register" class="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
              {{ t('home.getStarted') }}
            </router-link>
          </template>
        </div>
      </div>
    </header>

    <main>
      <section class="home-hero relative overflow-hidden pb-24 pt-16 md:pt-24">
        <div
          class="pointer-events-none absolute inset-0"
          style="background: radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.15) 0%, transparent 60%)"
        ></div>
        <div class="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center px-6 text-center">
          <div class="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 dark:border-neutral-800 dark:bg-neutral-900">
            <span class="relative flex h-2 w-2">
              <span class="absolute inset-0 animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span class="relative h-2 w-2 rounded-full bg-sky-400"></span>
            </span>
            <span class="font-mono text-xs text-neutral-600 dark:text-neutral-400">{{ t('home.enterprise.status') }}</span>
          </div>

          <h1 class="hero-heading mb-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tighter text-neutral-900 dark:text-white sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.05]">
            {{ t('home.enterprise.heroPrefix') }} <span class="font-serif font-normal italic">{{ t('home.enterprise.heroEmphasis') }}</span> {{ t('home.enterprise.heroSuffix') }}<br />
            <span class="text-sky-500">{{ t('home.enterprise.heroHighlight') }}</span> {{ t('home.enterprise.heroInfrastructure') }}
          </h1>
          <p class="hero-description mb-10 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            {{ t('home.enterprise.heroDescription', { siteName }) }}
          </p>
          <div class="hero-actions mb-20 flex flex-col gap-3 sm:flex-row">
            <router-link
              :to="isAuthenticated ? dashboardPath : '/register'"
              class="rounded-md bg-neutral-900 px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              {{ isAuthenticated ? t('home.goToDashboard') : t('home.enterprise.deploy') }}
            </router-link>
            <a
              :href="docUrl || '#features'"
              :target="docUrl ? '_blank' : '_self'"
              rel="noopener noreferrer"
              class="rounded-md border border-neutral-200 bg-white px-6 py-3 text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
            >
              {{ t('home.enterprise.apiDocs') }}
            </a>
          </div>

          <div class="provider-grid w-full">
            <p class="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">{{ t('home.enterprise.providersLabel') }}</p>
            <div class="grid grid-cols-2 gap-4 opacity-70 transition-opacity hover:opacity-100 md:grid-cols-3 lg:grid-cols-6">
              <div
                v-for="provider in providers"
                :key="provider"
                class="flex aspect-video items-center justify-center rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
              >
                <span class="text-base font-semibold text-neutral-700 dark:text-neutral-300">{{ provider }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="features-section bg-white py-24 dark:bg-neutral-900">
        <div class="mx-auto max-w-[1280px] px-6">
          <div class="mb-16 text-center">
            <h2 class="mb-3 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">{{ t('home.enterprise.features.title') }}</h2>
            <p class="mx-auto max-w-xl text-base text-neutral-600 dark:text-neutral-400">
              {{ t('home.enterprise.features.description') }}
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-12">
            <article class="feature-card overflow-hidden rounded-xl border border-neutral-200 bg-[#f9f9f9] p-8 dark:border-neutral-800 dark:bg-neutral-950 md:col-span-8">
              <div class="flex h-full flex-col justify-between">
                <div>
                  <div class="mb-4 text-sky-500"><Icon name="bolt" size="xl" /></div>
                  <h3 class="mb-2 text-2xl font-medium text-neutral-900 dark:text-white">{{ t('home.enterprise.features.uptimeTitle') }}</h3>
                  <p class="max-w-md text-base text-neutral-600 dark:text-neutral-400">
                    {{ t('home.enterprise.features.uptimeDescription') }}
                  </p>
                </div>
                <div class="mt-8">
                  <div class="overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 p-4 shadow-inner">
                    <div class="mb-2 flex gap-1.5">
                      <div class="h-2 w-2 rounded-full bg-red-500"></div>
                      <div class="h-2 w-2 rounded-full bg-amber-400"></div>
                      <div class="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <code class="block font-mono text-sm leading-relaxed text-neutral-100">
                      <span class="text-sky-300">{{ t('home.enterprise.features.codeMethod') }}</span> {{ apiHost }}/v1/chat/completions<br />
                      <span class="text-pink-300">{{ t('home.enterprise.features.codeRouteHeader') }}</span> {{ t('home.enterprise.features.codeRouteValue') }}<br />
                      <span class="text-pink-300">{{ t('home.enterprise.features.codeFallbackHeader') }}</span> {{ t('home.enterprise.features.codeFallbackValue') }}
                    </code>
                  </div>
                </div>
              </div>
            </article>

            <article class="feature-card flex flex-col rounded-xl border border-neutral-200 bg-[#f9f9f9] p-8 dark:border-neutral-800 dark:bg-neutral-950 md:col-span-4">
              <div class="mb-4 text-sky-500"><Icon name="shield" size="xl" /></div>
              <h3 class="mb-2 text-2xl font-medium text-neutral-900 dark:text-white">{{ t('home.enterprise.features.piiTitle') }}</h3>
              <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
                {{ t('home.enterprise.features.piiDescription') }}
              </p>
              <ul class="mt-auto space-y-2">
                <li
                  v-for="item in piiItems"
                  :key="item"
                  class="flex items-center justify-between rounded border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <span class="font-mono text-xs text-neutral-700 dark:text-neutral-300">{{ item }}</span>
                  <Icon name="checkCircle" size="sm" class="text-sky-500" />
                </li>
              </ul>
            </article>

            <article class="feature-card rounded-xl border border-neutral-200 bg-[#f9f9f9] p-8 dark:border-neutral-800 dark:bg-neutral-950 md:col-span-4">
              <div class="mb-4 text-sky-500"><Icon name="document" size="xl" /></div>
              <h3 class="mb-2 text-2xl font-medium text-neutral-900 dark:text-white">{{ t('home.enterprise.features.invoicingTitle') }}</h3>
              <p class="text-base text-neutral-600 dark:text-neutral-400">
                {{ t('home.enterprise.features.invoicingDescription') }}
              </p>
            </article>

            <article class="feature-card flex flex-col gap-8 rounded-xl border border-neutral-200 bg-[#f9f9f9] p-8 dark:border-neutral-800 dark:bg-neutral-950 md:col-span-8 md:flex-row">
              <div class="flex-1">
                <div class="mb-4 text-sky-500"><Icon name="chart" size="xl" /></div>
                <h3 class="mb-2 text-2xl font-medium text-neutral-900 dark:text-white">{{ t('home.enterprise.features.observabilityTitle') }}</h3>
                <p class="text-base text-neutral-600 dark:text-neutral-400">
                  {{ t('home.enterprise.features.observabilityDescription') }}
                </p>
              </div>
              <div class="flex flex-1 flex-col justify-end rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <div class="flex h-24 items-end gap-1">
                  <div v-for="(height, index) in chartBars" :key="index" class="w-full rounded-t bg-sky-400" :style="{ height: height + '%' }"></div>
                </div>
                <div class="mt-2 flex justify-between border-t border-neutral-200 pt-2 dark:border-neutral-800">
                  <span class="font-mono text-[10px] text-neutral-500">00:00</span>
                  <span class="font-mono text-[10px] text-neutral-500">{{ t('home.enterprise.features.latency') }}</span>
                  <span class="font-mono text-[10px] text-neutral-500">24:00</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="architecture-section overflow-hidden py-24">
        <div class="mx-auto grid max-w-[1280px] items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
          <div>
            <span class="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-sky-600">{{ t('home.enterprise.architecture.eyebrow') }}</span>
            <h2 class="mb-6 text-4xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-5xl">
              {{ t('home.enterprise.architecture.title') }}
            </h2>
            <p class="mb-10 text-lg text-neutral-600 dark:text-neutral-400">
              {{ t('home.enterprise.architecture.description', { siteName }) }}
            </p>
            <ul class="space-y-6">
              <li class="flex gap-4">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
                  <Icon name="globe" size="sm" />
                </div>
                <div>
                  <h4 class="mb-1 text-base font-semibold text-neutral-900 dark:text-white">{{ t('home.enterprise.architecture.edgeTitle') }}</h4>
                  <p class="text-base text-neutral-600 dark:text-neutral-400">{{ t('home.enterprise.architecture.edgeDescription') }}</p>
                </div>
              </li>
              <li class="flex gap-4">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
                  <Icon name="sync" size="sm" />
                </div>
                <div>
                  <h4 class="mb-1 text-base font-semibold text-neutral-900 dark:text-white">{{ t('home.enterprise.architecture.cacheTitle') }}</h4>
                  <p class="text-base text-neutral-600 dark:text-neutral-400">{{ t('home.enterprise.architecture.cacheDescription') }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="architecture-visual relative">
            <div class="architecture-diagram">
              <div class="diagram-head">
                <span>{{ t('home.enterprise.architecture.networkLabel') }}</span>
                <small><i></i>{{ t('home.enterprise.architecture.live') }}</small>
              </div>
              <div class="diagram-body">
                <div class="region-count">
                  <strong class="font-serif">12</strong>
                  <span>{{ t('home.enterprise.architecture.regions') }}</span>
                </div>
                <div class="region-list">
                  <div v-for="(node, index) in architectureNodes" :key="node">
                    <span>{{ String(index + 1).padStart(2, '0') }}</span>
                    <strong>{{ node }}</strong>
                    <i></i>
                  </div>
                </div>
              </div>
              <div class="diagram-metrics">
                <div><span>{{ t('home.enterprise.architecture.availability') }}</span><strong>99.99%</strong></div>
                <div><span>{{ t('home.enterprise.architecture.routing') }}</span><strong>&lt;1ms</strong></div>
                <div><span>{{ t('home.enterprise.architecture.core') }}</span><strong>{{ siteName }}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="home-cta bg-neutral-950 py-24 text-white">
        <div class="mx-auto flex max-w-[1280px] flex-col items-center px-6 text-center">
          <h2 class="mb-6 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">{{ t('home.enterprise.cta.title') }}</h2>
          <p class="mb-10 max-w-xl text-lg text-neutral-300">{{ t('home.enterprise.cta.description', { siteName }) }}</p>
          <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <router-link :to="isAuthenticated ? dashboardPath : '/register'" class="rounded-md bg-sky-400 px-8 py-3 text-base font-bold text-neutral-900 transition-transform hover:scale-[1.02]">
              {{ isAuthenticated ? t('home.goToDashboard') : t('home.enterprise.cta.createAccount') }}
            </router-link>
            <a :href="salesMailto" class="rounded-md border border-neutral-700 bg-transparent px-8 py-3 text-base font-bold text-white transition-colors hover:bg-neutral-800">{{ t('home.enterprise.cta.sales') }}</a>
          </div>
          <p class="mt-6 font-mono text-xs italic text-neutral-500">{{ t('home.enterprise.cta.note') }}</p>
        </div>
      </section>
    </main>

    <footer class="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div class="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <div class="flex flex-col items-center gap-1 md:items-start">
          <span class="text-base font-bold text-neutral-900 dark:text-white">{{ siteName }}</span>
          <p class="font-mono text-xs text-neutral-500 dark:text-neutral-400">{{ t('home.enterprise.copyright', { year: currentYear, siteName }) }}</p>
        </div>
        <nav class="flex flex-wrap justify-center gap-6">
          <a v-for="link in footerLinks" :key="link.label" :href="link.href" :target="link.external ? '_blank' : '_self'" rel="noopener noreferrer" class="font-mono text-xs text-neutral-500 transition-colors hover:text-sky-600 dark:text-neutral-400">{{ link.label }}</a>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'
import { sanitizeUrl } from '@/utils/url'

const authStore = useAuthStore()
const appStore = useAppStore()
const { t, tm } = useI18n()
const homeRoot = ref<HTMLElement | null>(null)
let gsapContext: gsap.Context | null = null

gsap.registerPlugin(ScrollTrigger)

const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'Sub2API')
const siteLogo = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const docUrl = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.doc_url || appStore.docUrl || ''))
const apiBaseUrl = computed(() => appStore.cachedPublicSettings?.api_base_url || 'https://api.example.com')
const apiHost = computed(() => {
  try {
    return new URL(apiBaseUrl.value).host
  } catch {
    return apiBaseUrl.value.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
})
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')
const isHomeContentUrl = computed(() => /^https?:\/\//.test(homeContent.value.trim()))
const isAuthenticated = computed(() => authStore.isAuthenticated)
const dashboardPath = computed(() => authStore.isAdmin ? '/admin/dashboard' : '/dashboard')
const currentYear = computed(() => new Date().getFullYear())
const salesMailto = computed(() => `mailto:sales@${apiHost.value.replace(/^api\./, '')}`)

const providers = computed(() => tm('home.enterprise.providers') as string[])
const piiItems = computed(() => tm('home.enterprise.features.piiItems') as string[])
const chartBars = [40, 60, 55, 80, 95, 70, 45]
const architectureNodes = computed(() => tm('home.enterprise.architecture.nodes') as string[])
const navItems = computed(() => {
  const labels = tm('home.enterprise.nav') as string[]
  return labels.map((label, index) => ({
    label,
    href: index === 4 ? docUrl.value || '#features' : '#features',
    active: index === 0
  }))
})
const footerLinks = computed(() => {
  const labels = tm('home.enterprise.footerLinks') as string[]
  return [
    ...labels.map((label) => ({ label, href: '#', external: false })),
    ...(docUrl.value ? [{ label: t('home.docs'), href: docUrl.value, external: true }] : [])
  ]
})

onMounted(() => {
  authStore.checkAuth()
  if (!appStore.publicSettingsLoaded) appStore.fetchPublicSettings()

  if (!homeRoot.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsapContext = gsap.context(() => {
    const hero = gsap.timeline({ defaults: { duration: 0.72, ease: 'power3.out' } })
    hero
      .from('.home-nav', { y: -18, autoAlpha: 0, duration: 0.55 })
      .from('.hero-badge', { y: 16, autoAlpha: 0 }, '-=0.2')
      .from('.hero-heading', { y: 34, autoAlpha: 0, duration: 0.9 }, '-=0.42')
      .from('.hero-description', { y: 20, autoAlpha: 0 }, '-=0.55')
      .from('.hero-actions', { y: 18, autoAlpha: 0 }, '-=0.5')
      .from('.provider-grid', { y: 24, autoAlpha: 0 }, '-=0.38')

    gsap.from('.features-section h2, .features-section h2 + p', {
      y: 28,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.features-section', start: 'top 78%', once: true }
    })
    gsap.from('.feature-card', {
      y: 34,
      autoAlpha: 0,
      scale: 0.985,
      stagger: 0.1,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.feature-card', start: 'top 82%', once: true }
    })
    gsap.from('.architecture-section > div > div:first-child > *', {
      y: 28,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.architecture-section', start: 'top 76%', once: true }
    })
    gsap.from('.architecture-visual', {
      y: 42,
      autoAlpha: 0,
      duration: 0.95,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.architecture-visual', start: 'top 82%', once: true }
    })
    gsap.from('.region-list > div', {
      x: 24,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.architecture-diagram', start: 'top 78%', once: true }
    })
    gsap.from('.home-cta > div > *', {
      y: 26,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.72,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.home-cta', start: 'top 80%', once: true }
    })
  }, homeRoot.value)

  requestAnimationFrame(() => ScrollTrigger.refresh())
})

onUnmounted(() => {
  gsapContext?.revert()
})
</script>

<style scoped>
* { font-feature-settings: "cv11", "ss01"; }

.architecture-visual { min-width: 0; padding: 14px 0 34px; }
.edge-panel { position: relative; overflow: hidden; border: 1px solid #273142; border-radius: 10px; background: #0a0f16; box-shadow: 0 32px 80px -42px rgba(2, 8, 23, .9); }
.edge-panel-head { display: flex; min-height: 48px; align-items: center; padding: 0 18px; border-bottom: 1px solid #202a38; color: #dbe4ef; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; }
.edge-panel-head > i { width: 6px; height: 6px; margin-left: auto; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 4px rgba(52, 211, 153, .1); animation: node-pulse 2s ease-in-out infinite; }
.edge-panel-head small { margin-left: 9px; color: #7f8da1; font-size: 9px; text-transform: uppercase; }
.edge-map { position: relative; height: 420px; overflow: hidden; background: radial-gradient(circle at 50% 50%, rgba(14, 165, 233, .16), transparent 42%); }
.map-grid { position: absolute; inset: 0; opacity: .32; background-image: linear-gradient(rgba(148, 163, 184, .1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, .1) 1px, transparent 1px); background-size: 32px 32px; -webkit-mask-image: radial-gradient(circle at center, black 18%, transparent 72%); mask-image: radial-gradient(circle at center, black 18%, transparent 72%); }
.orbit { position: absolute; left: 50%; top: 50%; border: 1px solid rgba(56, 189, 248, .16); border-radius: 50%; transform: translate(-50%, -50%); }
.orbit-a { width: 160px; height: 160px; }
.orbit-b { width: 270px; height: 270px; border-style: dashed; animation: orbit-spin 35s linear infinite; }
.orbit-c { width: 390px; height: 390px; border-color: rgba(148, 163, 184, .1); }
.edge-core { position: absolute; left: 50%; top: 50%; z-index: 3; display: flex; width: 112px; height: 112px; align-items: center; justify-content: center; flex-direction: column; border: 1px solid rgba(56, 189, 248, .5); border-radius: 50%; background: rgba(7, 16, 27, .92); box-shadow: 0 0 0 12px rgba(56, 189, 248, .04), 0 0 56px rgba(14, 165, 233, .18); transform: translate(-50%, -50%); }
.edge-core::before { content: ''; position: absolute; inset: 8px; border: 1px dashed rgba(56, 189, 248, .24); border-radius: 50%; animation: orbit-spin 18s linear infinite reverse; }
.edge-core span { position: relative; color: #f0f7ff; font-size: 14px; font-weight: 650; }
.edge-core small { position: relative; margin-top: 5px; color: #718298; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 8px; text-transform: uppercase; }
.edge-node { position: absolute; z-index: 4; width: 10px; height: 10px; border: 2px solid #07101b; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 0 5px rgba(56, 189, 248, .1), 0 0 18px rgba(56, 189, 248, .42); }
.edge-node::after { content: ''; position: absolute; inset: -7px; border: 1px solid rgba(56, 189, 248, .2); border-radius: 50%; animation: node-ping 2.6s ease-out infinite; }
.edge-node span { position: absolute; top: 16px; left: 50%; color: #8494a9; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 8px; font-style: normal; white-space: nowrap; transform: translateX(-50%); }
.node-tokyo { left: 72%; top: 24%; }
.node-singapore { left: 76%; top: 70%; }
.node-frankfurt { left: 22%; top: 28%; }
.node-virginia { left: 17%; top: 68%; }
.data-beam { position: absolute; left: 50%; top: 50%; z-index: 2; width: 30%; height: 1px; overflow: hidden; background: linear-gradient(90deg, rgba(56, 189, 248, .6), rgba(56, 189, 248, .04)); transform-origin: left center; }
.data-beam::after { content: ''; display: block; width: 36%; height: 100%; background: #7dd3fc; box-shadow: 0 0 8px #38bdf8; animation: data-flow 2.4s ease-in-out infinite; }
.beam-a { transform: rotate(-40deg); }
.beam-b { transform: rotate(38deg); }
.beam-c { transform: rotate(154deg); }
.edge-metrics { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #202a38; background: #0d131c; }
.edge-metrics > div { padding: 17px 18px; border-right: 1px solid #202a38; }
.edge-metrics > div:last-child { border-right: 0; }
.edge-metrics span { display: block; color: #6f7e92; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 8px; text-transform: uppercase; }
.edge-metrics strong { display: block; margin-top: 7px; color: #e8f1fa; font-size: 18px; font-weight: 600; }
.node-status { position: absolute; left: -18px; bottom: 0; max-width: 290px; padding: 15px 17px; border: 1px solid var(--line, #e5e7eb); border-radius: 8px; background: color-mix(in srgb, var(--surface-1, #fff) 92%, transparent); box-shadow: 0 16px 40px -24px rgba(15, 23, 42, .5); backdrop-filter: blur(16px); }
.node-status > div { display: flex; align-items: center; gap: 8px; }
.node-status > div span { width: 8px; height: 8px; border-radius: 50%; background: #34d399; }
.node-status strong { color: var(--ink-strong, #171717); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; }
.node-status p { margin-top: 6px; color: var(--ink-muted, #737373); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 9px; line-height: 1.5; }

@keyframes orbit-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
@keyframes node-pulse { 50% { opacity: .45; } }
@keyframes node-ping { 0% { opacity: .8; transform: scale(.5); } 80%, 100% { opacity: 0; transform: scale(1.5); } }
@keyframes data-flow { from { transform: translateX(-110%); } to { transform: translateX(330%); } }

@media (max-width: 640px) {
  .architecture-visual { padding-bottom: 0; }
  .edge-map { height: 340px; }
  .orbit-a { width: 130px; height: 130px; }
  .orbit-b { width: 220px; height: 220px; }
  .orbit-c { width: 310px; height: 310px; }
  .edge-core { width: 94px; height: 94px; }
  .edge-core span { max-width: 74px; overflow: hidden; font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
  .edge-node span { display: none; }
  .edge-metrics > div { padding: 14px 10px; }
  .edge-metrics span { min-height: 20px; }
  .edge-metrics strong { font-size: 15px; }
  .node-status { position: relative; left: auto; bottom: auto; max-width: none; margin-top: 10px; }
}

@media (prefers-reduced-motion: reduce) {
  .orbit-b, .edge-core::before, .edge-node::after, .data-beam::after, .edge-panel-head > i { animation: none !important; }
}

.architecture-photo { position: relative; overflow: hidden; min-height: 520px; border: 1px solid #273142; border-radius: 10px; background: #05080d; box-shadow: 0 32px 80px -42px rgba(2, 8, 23, .9); }
.architecture-photo::after { content: ''; position: absolute; inset: 0; pointer-events: none; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .04); }
.architecture-photo img { width: 100%; height: 520px; object-fit: cover; object-position: center; transform: scale(1.01); }
.photo-status { position: absolute; left: 18px; top: 18px; display: flex; align-items: center; gap: 9px; padding: 9px 12px; border: 1px solid rgba(255, 255, 255, .14); border-radius: 6px; background: rgba(5, 10, 17, .72); color: #e5edf6; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; backdrop-filter: blur(12px); }
.photo-status i { width: 7px; height: 7px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 4px rgba(52, 211, 153, .12); animation: node-pulse 2s ease-in-out infinite; }
.photo-status small { padding-left: 8px; border-left: 1px solid rgba(255, 255, 255, .15); color: #91a0b2; font-size: 8px; text-transform: uppercase; }
.photo-metrics { position: absolute; right: 18px; bottom: 18px; left: 18px; display: grid; grid-template-columns: repeat(3, 1fr); overflow: hidden; border: 1px solid rgba(255, 255, 255, .13); border-radius: 7px; background: rgba(5, 10, 17, .78); backdrop-filter: blur(14px); }
.photo-metrics > div { padding: 15px 16px; border-right: 1px solid rgba(255, 255, 255, .1); }
.photo-metrics > div:last-child { border-right: 0; }
.photo-metrics span { display: block; color: #8291a5; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 8px; text-transform: uppercase; }
.photo-metrics strong { display: block; margin-top: 6px; color: #f1f5f9; font-size: 17px; font-weight: 600; }

@media (max-width: 640px) {
  .architecture-photo { min-height: 430px; }
  .architecture-photo img { height: 430px; }
  .photo-status { right: 14px; left: 14px; top: 14px; }
  .photo-metrics { right: 14px; bottom: 14px; left: 14px; }
  .photo-metrics > div { padding: 12px 9px; }
  .photo-metrics span { min-height: 20px; }
  .photo-metrics strong { font-size: 14px; }
}

.architecture-diagram { position: relative; overflow: hidden; border: 1px solid var(--line, #e5e7eb); border-radius: 10px; background: color-mix(in srgb, var(--surface-1, #fff) 86%, transparent); box-shadow: 0 28px 70px -50px rgba(15, 23, 42, .55); }
.architecture-diagram::before, .architecture-diagram::after { content: ''; position: absolute; width: 360px; height: 360px; border: 1px solid color-mix(in srgb, var(--color-primary, #0ea5e9) 12%, transparent); border-radius: 50%; pointer-events: none; }
.architecture-diagram::before { right: -210px; top: -210px; }
.architecture-diagram::after { right: -150px; top: -150px; }
.diagram-head { position: relative; z-index: 1; display: flex; min-height: 50px; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid var(--line, #e5e7eb); color: var(--ink-muted, #525252); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; text-transform: uppercase; }
.diagram-head small { display: inline-flex; align-items: center; gap: 8px; font-size: 9px; }
.diagram-head i, .region-list i { width: 7px; height: 7px; border-radius: 50%; background: #10b981; box-shadow: 0 0 0 4px rgba(16, 185, 129, .1); }
.diagram-body { position: relative; z-index: 1; display: grid; min-height: 390px; grid-template-columns: .9fr 1.1fr; align-items: stretch; }
.region-count { display: flex; align-items: flex-start; justify-content: center; flex-direction: column; padding: 38px; border-right: 1px solid var(--line, #e5e7eb); }
.region-count strong { color: var(--ink-strong, #171717); font-size: 148px; font-style: italic; font-weight: 400; line-height: .8; }
.region-count span { max-width: 110px; margin-top: 24px; color: var(--color-primary-strong, #0284c7); font-size: 11px; font-weight: 700; line-height: 1.4; text-transform: uppercase; }
.region-list { display: flex; justify-content: center; flex-direction: column; padding: 24px 30px; }
.region-list > div { display: grid; grid-template-columns: 30px 1fr auto; align-items: center; min-height: 66px; border-bottom: 1px solid var(--line, #e5e7eb); }
.region-list > div:last-child { border-bottom: 0; }
.region-list span { color: var(--ink-subtle, #a3a3a3); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 9px; }
.region-list strong { color: var(--ink-strong, #171717); font-size: 14px; font-weight: 600; }
.diagram-metrics { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line, #e5e7eb); }
.diagram-metrics > div { min-width: 0; padding: 18px 20px; border-right: 1px solid var(--line, #e5e7eb); }
.diagram-metrics > div:last-child { border-right: 0; }
.diagram-metrics span { display: block; color: var(--ink-subtle, #737373); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 8px; text-transform: uppercase; }
.diagram-metrics strong { display: block; overflow: hidden; margin-top: 7px; color: var(--ink-strong, #171717); font-size: 17px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }

@media (max-width: 640px) {
  .diagram-body { min-height: auto; grid-template-columns: 1fr; }
  .region-count { min-height: 230px; padding: 30px; border-right: 0; border-bottom: 1px solid var(--line, #e5e7eb); }
  .region-count strong { font-size: 112px; }
  .region-count span { margin-top: 18px; }
  .region-list { padding: 12px 20px; }
  .region-list > div { min-height: 54px; }
  .diagram-metrics > div { padding: 14px 10px; }
  .diagram-metrics span { min-height: 20px; }
  .diagram-metrics strong { font-size: 14px; }
}
</style>
