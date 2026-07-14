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

  <div v-else class="home-shell relative min-h-screen overflow-x-hidden">
    <!-- 开屏动画 -->
    <transition name="intro-fade">
      <div v-if="introVisible" class="intro-overlay" :class="{ 'intro-done': introDone }">
        <div class="intro-aurora" aria-hidden="true"></div>
        <div class="intro-inner">
          <div class="intro-mark" :class="{ 'pop': introMarkPop }">
            <img v-if="siteLogo" :src="siteLogo" alt="" />
            <span v-else class="intro-mark-fallback">{{ (siteName || 'S').charAt(0) }}</span>
          </div>
          <div class="intro-brand font-display">{{ siteName }}</div>
          <div class="intro-tagline">{{ t('home.intro.tagline') }}</div>
          <div class="intro-lines">
            <div v-for="(line, i) in introLines" :key="i" class="intro-line" :class="{ shown: introLineShown[i] }">
              <span class="intro-dot"></span>
              <span class="intro-text">{{ line }}</span>
            </div>
          </div>
          <div class="intro-progress"><div class="intro-progress-bar" :style="{ width: introProgress + '%' }"></div></div>
          <div class="intro-pct">{{ Math.round(introProgress) }}%</div>
        </div>
      </div>
    </transition>

    <!-- 液态背景 -->
    <div class="orb orb-1" aria-hidden="true"></div>
    <div class="orb orb-2" aria-hidden="true"></div>

    <!-- 导航 -->
    <header class="nav-bar">
      <router-link to="/home" class="brand" aria-label="Home">
        <span class="brand-mark">
          <img v-if="siteLogo" :src="siteLogo" alt="" />
          <span v-else class="font-display">{{ (siteName || 'S').charAt(0) }}</span>
        </span>
        <span class="brand-name font-display">{{ siteName }}</span>
      </router-link>
      <div class="nav-right">
        <a href="#story" class="nav-link hidden sm:inline-flex">{{ t('home.heroSubtitle') }}</a>
        <a href="#models" class="nav-link hidden md:inline-flex">{{ t('home.providers.title') }}</a>
        <LocaleSwitcher />
        <button class="icon-action" :title="isDark ? t('home.switchToLight') : t('home.switchToDark')" @click="toggleTheme">
          <Icon :name="isDark ? 'sun' : 'moon'" size="sm" />
        </button>
        <router-link :to="isAuthenticated ? dashboardPath : '/login'" class="nav-cta">
          <span>{{ isAuthenticated ? t('home.dashboard') : t('home.login') }}</span>
          <Icon name="arrowRight" size="sm" />
        </router-link>
      </div>
    </header>

    <main class="relative z-10">
      <!-- ============ Hero ============ -->
      <section class="hero">
        <div class="hero-orb" aria-hidden="true"></div>
        <div class="hero-copy">
          <p class="hero-eyebrow reveal reveal-1">{{ t('home.providers.description') }}</p>
          <h1 class="hero-title font-display reveal reveal-2">
            {{ siteName }}
          </h1>
          <p class="hero-sub font-display reveal reveal-3"><em>{{ t('home.heroSubtitle') }}</em></p>
          <div class="hero-actions reveal reveal-4">
            <router-link :to="isAuthenticated ? dashboardPath : '/login'" class="primary-action">
              {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
              <Icon name="arrowRight" size="sm" />
            </router-link>
            <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer" class="text-action">
              {{ t('home.viewDocs') }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <!-- 实时内联指标（无边框） -->
        <div class="live-row reveal reveal-4">
          <span class="live-dot"></span>
          <span><strong>{{ requestsToday.toLocaleString() }}</strong> {{ t('home.cases.title') === '客户案例' ? '今日请求' : 'requests today' }}</span>
          <span class="live-sep"></span>
          <span><strong>{{ latencyMs }}ms</strong> {{ t('home.cases.title') === '客户案例' ? '平均延迟' : 'avg latency' }}</span>
          <span class="live-sep"></span>
          <span class="live-model">{{ typedModel }}</span>
        </div>
      </section>

      <!-- ============ Manifesto ============ -->
      <section id="story" class="manifesto">
        <div class="waveform" aria-hidden="true">
          <span v-for="(h, i) in barHeights" :key="i" class="wave-bar" :style="{ height: h + '%' }"></span>
        </div>
        <p class="manifesto-text font-display reveal-on-scroll">
          {{ t('home.heroDescription') }}
        </p>
        <div class="manifesto-stats reveal-on-scroll">
          <div class="ms"><strong class="font-display">{{ animatedUptime }}%</strong><span>{{ t('home.cases.title') === '客户案例' ? '服务可用率' : 'uptime' }}</span></div>
          <div class="ms"><strong class="font-display">{{ animatedModels }}+</strong><span>{{ t('home.providers.title') }}</span></div>
          <div class="ms"><strong class="font-display">{{ animatedLatency }}ms</strong><span>{{ t('home.cases.title') === '客户案例' ? '平均延迟' : 'avg latency' }}</span></div>
        </div>
      </section>

      <!-- ============ 痛点（编辑式编号列表，无边框） ============ -->
      <section class="editorial">
        <p class="section-kicker reveal-on-scroll">01</p>
        <h2 class="section-title font-display reveal-on-scroll">{{ t('home.painPoints.title') }}</h2>
        <div class="pain-list">
          <div v-for="(item, key, idx) in painItems" :key="key" class="pain-item reveal-on-scroll" :style="{ '--delay': idx * 70 + 'ms' }">
            <span class="pain-num font-display">{{ String(idx + 1).padStart(2, '0') }}</span>
            <div class="pain-body">
              <h3 class="font-display">{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ 解决方案（横向流，无边框） ============ -->
      <section class="editorial">
        <p class="section-kicker reveal-on-scroll">02</p>
        <h2 class="section-title font-display reveal-on-scroll">{{ t('home.solutions.title') }}</h2>
        <p class="section-sub reveal-on-scroll">{{ t('home.solutions.subtitle') }}</p>
        <div class="flow">
          <div v-for="(f, i) in featureList" :key="f.key" class="flow-item reveal-on-scroll" :style="{ '--delay': i * 90 + 'ms' }">
            <div class="flow-icon"><Icon :name="f.icon" size="lg" /></div>
            <span class="flow-num font-display">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="font-display">{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ============ 工作原理（ 분산，左侧文案右侧终端） ============ -->
      <section class="editorial how-section">
        <p class="section-kicker reveal-on-scroll">03</p>
        <h2 class="section-title font-display reveal-on-scroll">{{ t('home.how.title') }}</h2>
        <p class="section-sub reveal-on-scroll">{{ t('home.how.subtitle') }}</p>
        <div class="how-grid">
          <div class="how-steps reveal-on-scroll">
            <div v-for="(s, i) in howSteps" :key="i" class="how-step" :style="{ '--delay': i * 80 + 'ms' }">
              <span class="how-num font-display">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <h3 class="font-display">{{ s.title }}</h3>
                <p>{{ s.desc }}</p>
              </div>
            </div>
          </div>
          <div class="how-code reveal-on-scroll">
            <div class="code-orb" aria-hidden="true"></div>
            <pre class="code-snippet"><span class="c-key">import</span> openai <span class="c-key">from</span> <span class="c-str">"openai"</span>;

<span class="c-key">const</span> client = <span class="c-key">new</span> openai({
  apiKey: <span class="c-str">"sk-•••your-key"</span>,
  baseURL: <span class="c-str">"{{ apiBaseUrl }}"</span>,
});

<span class="c-key">const</span> res = <span class="c-key">await</span> client.chat.completions.create({
  model: <span class="c-str">"{{ typedModel }}"</span>,
  stream: <span class="c-key">true</span>,
});</pre>
            <div class="code-foot"><span class="live-dot"></span> {{ latencyMs }}ms · 200 OK</div>
          </div>
        </div>
      </section>

      <!-- ============ 平台能力（标尺横排，无边框） ============ -->
      <section class="editorial">
        <p class="section-kicker reveal-on-scroll">04</p>
        <h2 class="section-title font-display reveal-on-scroll">{{ t('home.cap.title') }}</h2>
        <p class="section-sub reveal-on-scroll">{{ t('home.cap.subtitle') }}</p>
        <div class="cap-rail">
          <div v-for="(c, i) in capItems" :key="i" class="cap-item reveal-on-scroll" :style="{ '--delay': i * 80 + 'ms' }">
            <div class="cap-icon"><Icon :name="capIcon(c.icon)" size="md" /></div>
            <span class="cap-num font-display">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="font-display">{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ============ 对比（编辑式双栏散文，无边框） ============ -->
      <section id="pricing" class="editorial">
        <p class="section-kicker reveal-on-scroll">05</p>
        <h2 class="section-title font-display reveal-on-scroll">{{ t('home.comparison.title') }}</h2>
        <div class="compare reveal-on-scroll">
          <div class="compare-col compare-them">
            <p class="compare-head">{{ t('home.comparison.headers.official') }}</p>
            <p v-for="(row, key) in comparisonRows" :key="key" class="compare-line">{{ row.official }}</p>
          </div>
          <div class="compare-vs font-display"><em>vs</em></div>
          <div class="compare-col compare-us">
            <p class="compare-head">{{ t('home.comparison.headers.us') }}</p>
            <p v-for="(row, key) in comparisonRows" :key="key" class="compare-line">
              <Icon name="checkCircle" size="sm" class="compare-check" />
              {{ row.us }}
            </p>
          </div>
        </div>
      </section>

      <!-- ============ 模型（大字跑马灯 + chips） ============ -->
      <section id="models" class="editorial">
        <p class="section-kicker reveal-on-scroll">06</p>
        <h2 class="section-title font-display reveal-on-scroll">{{ t('home.providers.description') }}</h2>
        <div class="model-marquee reveal-on-scroll" aria-hidden="true">
          <div class="marquee-track">
            <span v-for="(p, i) in [...providerList, ...providerList]" :key="i" class="model-word font-display">{{ p.name }}</span>
          </div>
        </div>
        <div class="model-chips reveal-on-scroll">
          <span v-for="m in modelChips" :key="m.id" class="mchip" :class="[m.color, { active: typedModel === m.id }]">{{ m.name }}</span>
        </div>
      </section>

      <!-- ============ 客户案例（单一特色引语 + 跑马灯） ============ -->
      <section id="cases" class="editorial">
        <p class="section-kicker reveal-on-scroll">07</p>
        <h2 class="section-title font-display reveal-on-scroll">{{ t('home.cases.title') }}</h2>
        <p class="section-sub reveal-on-scroll">{{ t('home.cases.subtitle') }}</p>
        <div class="trust-marquee reveal-on-scroll" aria-hidden="true">
          <div class="marquee-track">
            <span v-for="(c, i) in marqueeClients" :key="'a' + i" class="marquee-item font-display">{{ c }}</span>
            <span v-for="(c, i) in marqueeClients" :key="'b' + i" class="marquee-item font-display">{{ c }}</span>
          </div>
        </div>
        <div class="featured-quote reveal-on-scroll">
          <p class="quote-mark font-display">“</p>
          <p class="quote-text font-display" v-if="featuredCase">{{ featuredCase.quote }}</p>
          <div class="quote-foot" v-if="featuredCase">
            <span class="quote-name font-display">{{ featuredCase.name }}</span>
            <span class="quote-role">{{ featuredCase.role }}</span>
            <span class="quote-metric font-display">{{ featuredCase.metric }} · {{ featuredCase.metricLabel }}</span>
          </div>
        </div>
      </section>

      <!-- ============ FAQ（手风琴） ============ -->
      <section id="faq" class="editorial">
        <p class="section-kicker reveal-on-scroll">08</p>
        <h2 class="section-title font-display reveal-on-scroll">{{ t('home.faq.title') }}</h2>
        <div class="faq-list reveal-on-scroll">
          <div v-for="(f, i) in faqItems" :key="i" class="faq-item" :class="{ open: faqOpen === i }">
            <button class="faq-q" @click="toggleFaq(i)" :aria-expanded="faqOpen === i">
              <span class="font-display">{{ f.q }}</span>
              <span class="faq-icon" aria-hidden="true"></span>
            </button>
            <div class="faq-a">
              <p>{{ f.a }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ CTA ============ -->
      <section class="cta-section">
        <div class="cta-orb" aria-hidden="true"></div>
        <h2 class="cta-title font-display reveal-on-scroll">{{ t('home.cta.title') }}</h2>
        <p class="cta-desc reveal-on-scroll">{{ t('home.cta.description') }}</p>
        <router-link :to="isAuthenticated ? dashboardPath : '/register'" class="cta-button reveal-on-scroll">
          {{ t('home.cta.button') }}
          <Icon name="arrowRight" size="md" />
        </router-link>
      </section>
    </main>

    <footer class="home-footer">
      <p>&copy; {{ currentYear }} {{ siteName }}. {{ t('home.footer.allRightsReserved') }}</p>
      <div>
        <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer">{{ t('home.docs') }}</a>
        <a :href="githubUrl" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'
import { sanitizeUrl } from '@/utils/url'

const { t, tm } = useI18n()
const authStore = useAuthStore()
const appStore = useAppStore()

const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'Sub2API')
const siteLogo = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const docUrl = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.doc_url || appStore.docUrl || ''))
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')
const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

const isDark = ref(document.documentElement.classList.contains('dark'))
const githubUrl = 'https://github.com/Wei-Shaw/sub2api'
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')
const currentYear = computed(() => new Date().getFullYear())

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// ===== 痛点 / 解决方案 / 对比（来自 i18n） =====
const painItems = computed(() => {
  const raw = tm('home.painPoints.items') as Record<string, { title: string; desc: string }>
  return raw
})
const featureList = computed(() => [
  { key: 'unifiedGateway', icon: 'server' as const, title: t('home.features.unifiedGateway'), desc: t('home.features.unifiedGatewayDesc') },
  { key: 'multiAccount', icon: 'swap' as const, title: t('home.features.multiAccount'), desc: t('home.features.multiAccountDesc') },
  { key: 'balanceQuota', icon: 'chart' as const, title: t('home.features.balanceQuota'), desc: t('home.features.balanceQuotaDesc') }
])
const comparisonRows = computed(() => {
  const raw = tm('home.comparison.items') as Record<string, { feature: string; official: string; us: string }>
  return raw
})
const providerList = [
  { code: 'AN', name: t('home.providers.claude'), tone: 'tone-orange' },
  { code: 'OA', name: 'GPT / CODEX', tone: 'tone-emerald' },
  { code: 'GG', name: t('home.providers.gemini'), tone: 'tone-blue' },
  { code: 'AG', name: t('home.providers.antigravity'), tone: 'tone-violet' }
]

// ===== 工作原理 / 平台能力 / FAQ =====
const howSteps = computed(() => tm('home.how.steps') as Array<{ title: string; desc: string }>)
const capItems = computed(() => tm('home.cap.items') as Array<{ title: string; desc: string; icon: string }>)
function capIcon(name: string): 'swap' | 'chart' | 'sync' | 'lock' {
  return (['swap', 'chart', 'sync', 'lock'].includes(name) ? name : 'swap') as 'swap' | 'chart' | 'sync' | 'lock'
}
const faqItems = computed(() => tm('home.faq.items') as Array<{ q: string; a: string }>)
const faqOpen = ref<number | null>(0)
function toggleFaq(i: number): void {
  faqOpen.value = faqOpen.value === i ? -1 : i
}
const apiBaseUrl = computed(() => appStore.cachedPublicSettings?.api_base_url || 'https://api.example.com')

// ===== 客户案例 / 信任 marquee =====
const caseItems = computed(() => tm('home.cases.items') as Array<{ name: string; role: string; quote: string; metric: string; metricLabel: string }>)
const featuredCase = computed(() => caseItems.value[0])
const marqueeClients = ['Nova Labs', 'PixelForge', 'DataMind', 'CodePilot CN', 'WriteFlow', 'GeniusEDU', 'Aurora AI', 'ByteFlow', 'ThinkBase', 'PromptIQ']

// ===== 开屏动画 =====
const introVisible = ref(true)
const introDone = ref(false)
const introMarkPop = ref(false)
const introProgress = ref(0)
const introLineShown = ref<boolean[]>([false, false, false, false])
const introLines = computed(() => [
  t('home.intro.line1'),
  t('home.intro.line2'),
  t('home.intro.line3'),
  t('home.intro.line4')
])
let introTimers: ReturnType<typeof setTimeout>[] = []

function runIntro() {
  introMarkPop.value = true
  const lineDur = 420
  introLines.value.forEach((_, i) => {
    const tm1 = setTimeout(() => { introLineShown.value[i] = true }, 300 + i * lineDur)
    introTimers.push(tm1)
    const tm2 = setTimeout(() => {
      const target = ((i + 1) / introLines.value.length) * 100
      animateNumber(introProgress.value, target, 360, (v) => (introProgress.value = v))
    }, 300 + i * lineDur)
    introTimers.push(tm2)
  })
  const total = 300 + introLines.value.length * lineDur + 380
  const tmEnd = setTimeout(() => {
    introDone.value = true
    const tmHide = setTimeout(() => { introVisible.value = false }, 700)
    introTimers.push(tmHide)
  }, total)
  introTimers.push(tmEnd)
}

// ===== 动效：数字计数 =====
const animatedUptime = ref(0)
const animatedModels = ref(0)
const animatedLatency = ref(0)
const latencyMs = ref(642)

function animateNumber(from: number, to: number, duration: number, onUpdate: (v: number) => void, decimals = 0) {
  const start = performance.now()
  const step = (now: number) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    const v = from + (to - from) * eased
    onUpdate(decimals > 0 ? Number(v.toFixed(decimals)) : Math.round(v))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// ===== 动效：打字机模型名 =====
const typedModel = ref('')
const modelCycle = ['claude-sonnet', 'gpt-4o', 'gemini-1.5-pro', 'claude-opus', 'grok-2']
let modelIdx = 0
let typeTimer: ReturnType<typeof setTimeout> | null = null
function typeNextModel() {
  const target = modelCycle[modelIdx % modelCycle.length]
  let i = 0
  typedModel.value = ''
  const tick = () => {
    if (i <= target.length) {
      typedModel.value = target.slice(0, i)
      i++
      typeTimer = setTimeout(tick, 65)
    } else {
      typeTimer = setTimeout(() => {
        modelIdx++
        typeNextModel()
      }, 1800)
    }
  }
  tick()
}

// ===== 动效：延迟波动 =====
let latencyTimer: ReturnType<typeof setInterval> | null = null
function startLatencyJitter() {
  latencyTimer = setInterval(() => {
    latencyMs.value = 380 + Math.floor(Math.random() * 420)
  }, 1500)
}

// ===== 动效：波形 + 预览数据 =====
const animatedBalance = ref(0)
const requestsToday = ref(0)
const barHeights = ref<number[]>(Array.from({ length: 28 }, () => 30 + Math.random() * 55))
const modelChips = [
  { id: 'claude-sonnet', name: 'Claude', color: 'chip-orange' },
  { id: 'gpt-4o', name: 'GPT-4o', color: 'chip-emerald' },
  { id: 'gemini-1.5-pro', name: 'Gemini', color: 'chip-blue' },
  { id: 'grok-2', name: 'Grok', color: 'chip-zinc' },
  { id: 'claude-opus', name: 'Opus', color: 'chip-violet' }
]
let barTimer: ReturnType<typeof setInterval> | null = null
function startBars() {
  barTimer = setInterval(() => {
    barHeights.value = barHeights.value.map((h) => Math.max(15, Math.min(95, h + (Math.random() - 0.5) * 26)))
  }, 900)
}

// ===== 滚动入场 =====
let io: IntersectionObserver | null = null
function initRevealOnScroll() {
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => el.classList.add('revealed'))
    return
  }
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          io?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )
  setTimeout(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => io?.observe(el))
  }, 60)
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  initTheme()
  authStore.checkAuth()
  if (!appStore.publicSettingsLoaded) appStore.fetchPublicSettings()

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    introVisible.value = false
  } else {
    runIntro()
  }

  animateNumber(0, 99.9, 1400, (v) => (animatedUptime.value = v), 1)
  animateNumber(0, 20, 1200, (v) => (animatedModels.value = v))
  animateNumber(0, 642, 1200, (v) => (animatedLatency.value = v))
  animateNumber(0, 128.4, 1200, (v) => (animatedBalance.value = v), 2)
  animateNumber(0, 1284, 1200, (v) => (requestsToday.value = v))
  typeNextModel()
  startLatencyJitter()
  startBars()
  initRevealOnScroll()
})

onUnmounted(() => {
  if (typeTimer) clearTimeout(typeTimer)
  if (latencyTimer) clearInterval(latencyTimer)
  if (barTimer) clearInterval(barTimer)
  if (io) io.disconnect()
  introTimers.forEach((tm) => clearTimeout(tm))
})
</script>

<style scoped>
.home-shell { color: var(--ink); background: var(--surface-bg); }

/* 液态背景球 */
.orb { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; opacity: .55; }
.orb-1 { width: 520px; height: 520px; top: -160px; right: -120px; background: radial-gradient(circle, rgba(139,92,246,.42), transparent 68%); animation: orb-drift 20s ease-in-out infinite; }
.orb-2 { width: 460px; height: 460px; bottom: -120px; left: -140px; background: radial-gradient(circle, rgba(212,160,23,.34), transparent 68%); animation: orb-drift 26s ease-in-out infinite reverse; }
@keyframes orb-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, -30px) scale(1.12); }
}

/* 导航 */
.nav-bar { position: relative; z-index: 20; display: flex; align-items: center; justify-content: space-between; max-width: 76rem; margin: 0 auto; padding: 28px 32px; }
.brand { display: inline-flex; align-items: center; gap: 12px; }
.brand-mark { width: 36px; height: 36px; border-radius: 12px; overflow: hidden; display: grid; place-items: center; background: var(--surface-1); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
.brand-mark img { width: 100%; height: 100%; object-fit: contain; }
.brand-mark .font-display { font-size: 18px; font-weight: 700; background-image: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; color: transparent; }
.brand-name { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: var(--ink-strong); }
.nav-right { display: flex; align-items: center; gap: 8px; }
.nav-link { display: inline-flex; align-items: center; height: 36px; padding: 0 12px; font-size: 13px; font-weight: 500; color: var(--ink-muted); border-radius: 10px; transition: 180ms var(--ease-out); }
.nav-link:hover { color: var(--ink); background: var(--surface-2); }
.icon-action { display: inline-flex; width: 36px; height: 36px; align-items: center; justify-content: center; border-radius: 10px; color: var(--ink-muted); border: 1px solid transparent; transition: 180ms var(--ease-out); }
.icon-action:hover { color: var(--ink); background: var(--surface-2); }
.nav-cta { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 16px; border-radius: 10px; color: #fff; background-image: var(--gradient-primary); font-size: 13px; font-weight: 600; box-shadow: var(--shadow-glow); transition: 200ms var(--ease-out); }
.nav-cta:hover { transform: translateY(-1px); box-shadow: var(--shadow-card-hover); }

/* Hero */
.hero { position: relative; max-width: 76rem; margin: 0 auto; padding: 80px 32px 56px; min-height: 78vh; display: flex; flex-direction: column; justify-content: center; }
.hero-orb { position: absolute; width: 620px; height: 620px; max-width: 90vw; right: -120px; top: 30%; border-radius: 50%; background-image: var(--gradient-brand); filter: blur(60px); opacity: .5; animation: orb-pulse 12s ease-in-out infinite; z-index: -1; }
@keyframes orb-pulse { 0%,100% { transform: scale(1) rotate(0deg); opacity: .45; } 50% { transform: scale(1.15) rotate(20deg); opacity: .6; } }
.hero-copy { max-width: 880px; }
.hero-eyebrow { font-size: 13px; font-weight: 500; color: var(--color-primary-strong); letter-spacing: .02em; margin-bottom: 24px; }
.dark .hero-eyebrow { color: var(--color-primary); }
.hero-title { font-size: clamp(64px, 11vw, 168px); line-height: .9; font-weight: 900; letter-spacing: -0.04em; color: var(--ink-strong); }
.hero-sub { margin-top: 24px; font-size: clamp(22px, 3vw, 38px); line-height: 1.15; font-weight: 400; color: var(--ink); max-width: 680px; }
.hero-sub em { font-style: italic; background-image: var(--gradient-brand); -webkit-background-clip: text; background-clip: text; color: transparent; }
.hero-actions { display: flex; align-items: center; gap: 22px; margin-top: 40px; flex-wrap: wrap; }
.primary-action { display: inline-flex; align-items: center; gap: 10px; height: 52px; padding: 0 26px; border-radius: 14px; color: #fff; background-image: var(--gradient-primary); font-size: 15px; font-weight: 600; box-shadow: var(--shadow-glow); transition: 220ms var(--ease-out); }
.primary-action:hover { transform: translateY(-2px) scale(1.02); box-shadow: var(--shadow-card-hover); }
.text-action { display: inline-flex; align-items: center; gap: 6px; color: var(--ink); font-size: 14px; font-weight: 600; border-bottom: 1.5px solid var(--color-primary); padding-bottom: 3px; transition: 180ms; }
.text-action:hover { color: var(--color-primary); }

.live-row { display: flex; align-items: center; gap: 16px; margin-top: 56px; flex-wrap: wrap; font-size: 13px; color: var(--ink-muted); }
.live-row strong { color: var(--ink-strong); font-weight: 700; }
.live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--color-success); box-shadow: 0 0 0 4px var(--color-success-soft); animation: live-pulse 1.8s infinite; }
@keyframes live-pulse { 50% { opacity: .5; } }
.live-sep { width: 1px; height: 16px; background: var(--line-strong); }
.live-model { font-family: ui-monospace, monospace; font-size: 12px; color: var(--color-primary); padding: 4px 10px; border-radius: 999px; background: color-mix(in srgb, var(--color-primary) 10%, transparent); }

/* Manifesto */
.manifesto { position: relative; max-width: 76rem; margin: 0 auto; padding: 96px 32px; }
.waveform { display: flex; align-items: center; gap: 4px; height: 60px; margin-bottom: 56px; }
.wave-bar { flex: 1; max-width: 6px; border-radius: 3px; background: linear-gradient(to top, var(--color-primary), var(--color-accent)); opacity: .5; transition: height 900ms var(--ease-out); min-height: 8px; }
.manifesto-text { font-size: clamp(28px, 4.2vw, 56px); line-height: 1.25; font-weight: 400; letter-spacing: -0.02em; color: var(--ink-strong); max-width: 920px; }
.manifesto-stats { display: flex; gap: 56px; margin-top: 56px; flex-wrap: wrap; }
.ms { display: grid; }
.ms strong { font-size: 44px; font-weight: 700; letter-spacing: -0.03em; color: var(--color-primary); }
.ms span { margin-top: 6px; font-size: 13px; color: var(--ink-muted); }

/* Editorial 通用 */
.editorial { max-width: 76rem; margin: 0 auto; padding: 80px 32px; }
.section-kicker { font-size: 14px; font-weight: 600; color: var(--color-accent); letter-spacing: .04em; margin-bottom: 18px; }
.section-title { font-size: clamp(36px, 5.5vw, 76px); line-height: 1; font-weight: 700; letter-spacing: -0.03em; color: var(--ink-strong); }
.section-sub { margin-top: 18px; font-size: 16px; color: var(--ink-muted); max-width: 560px; }

/* 痛点列表 */
.pain-list { display: flex; flex-direction: column; margin-top: 56px; }
.pain-item { display: grid; grid-template-columns: 88px 1fr; gap: 32px; padding: 32px 0; border-top: 1px solid var(--line); transition: 240ms var(--ease-out); align-items: start; }
.pain-item:last-child { border-bottom: 1px solid var(--line); }
.pain-item:hover { padding-left: 16px; }
.pain-num { font-size: 28px; font-weight: 400; font-style: italic; color: var(--ink-subtle); transition: 240ms; }
.pain-item:hover .pain-num { color: var(--color-primary); }
.pain-body h3 { font-size: clamp(22px, 2.6vw, 30px); font-weight: 600; letter-spacing: -0.02em; color: var(--ink-strong); }
.pain-body p { margin-top: 10px; font-size: 15px; line-height: 1.7; color: var(--ink-muted); max-width: 620px; }

/* 解决方案流 */
.flow { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 56px; border-top: 1px solid var(--line); }
.flow-item { position: relative; padding: 40px 32px 40px 0; border-right: 1px solid var(--line); }
.flow-item:last-child { border-right: 0; }
.flow-icon { display: grid; width: 44px; height: 44px; place-items: center; border-radius: 12px; background: var(--surface-2); color: var(--color-primary); margin-bottom: 24px; transition: 220ms; }
.flow-item:hover .flow-icon { background-image: var(--gradient-primary); color: #fff; }
.flow-num { font-size: 13px; font-style: italic; color: var(--ink-subtle); margin-bottom: 14px; }
.flow-item h3 { font-size: 22px; font-weight: 600; letter-spacing: -0.02em; color: var(--ink-strong); }
.flow-item p { margin-top: 12px; font-size: 14px; line-height: 1.7; color: var(--ink-muted); max-width: 340px; }

/* 对比散文 */
.compare { display: grid; grid-template-columns: 1fr auto 1fr; gap: 32px; margin-top: 56px; align-items: start; }
.compare-col { display: flex; flex-direction: column; gap: 20px; }
.compare-head { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; padding-bottom: 16px; border-bottom: 2px solid var(--line); }
.compare-them .compare-head { color: var(--ink-subtle); }
.compare-us .compare-head { color: var(--color-primary); border-color: var(--color-primary); }
.compare-line { font-size: clamp(17px, 2vw, 22px); line-height: 1.5; color: var(--ink-muted); font-weight: 400; }
.compare-us .compare-line { color: var(--ink-strong); font-weight: 500; display: flex; align-items: flex-start; gap: 10px; }
.compare-check { color: var(--color-primary); margin-top: 4px; flex-shrink: 0; }
.compare-vs { font-size: 40px; font-style: italic; font-weight: 400; color: var(--ink-subtle); align-self: center; padding: 0 8px; }

/* 模型跑马灯 */
.model-marquee { overflow: hidden; margin-top: 48px; -webkit-mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent); mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent); }
.marquee-track { display: flex; gap: 48px; width: max-content; animation: marquee 30s linear infinite; }
.model-word { font-size: clamp(40px, 6vw, 80px); font-weight: 700; letter-spacing: -0.03em; color: var(--ink-subtle); white-space: nowrap; line-height: 1.1; transition: color 200ms; }
.model-word:hover { color: var(--color-primary); }
.marquee-item { font-size: 22px; font-weight: 600; color: var(--ink-muted); white-space: nowrap; opacity: .6; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.model-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
.mchip { padding: 8px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; border: 1px solid var(--line); background: var(--surface-1); color: var(--ink-muted); transition: 240ms; }
.mchip.active { color: #fff; border-color: transparent; box-shadow: var(--shadow-glow); transform: translateY(-2px); }
.chip-orange.active { background: #f97316; } .chip-emerald.active { background: #10b981; } .chip-blue.active { background: #3b82f6; } .chip-zinc.active { background: #71717a; } .chip-violet.active { background: #8b5cf6; }

/* 信任 marquee */
.trust-marquee { overflow: hidden; margin-top: 40px; padding: 18px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }

/* 工作原理 */
.how-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; margin-top: 56px; align-items: start; }
.how-steps { display: flex; flex-direction: column; gap: 8px; }
.how-step { display: grid; grid-template-columns: 64px 1fr; gap: 22px; padding: 28px 0; border-top: 1px solid var(--line); transition: 240ms var(--ease-out); }
.how-step:last-child { border-bottom: 1px solid var(--line); }
.how-step:hover { padding-left: 12px; }
.how-num { font-size: 26px; font-style: italic; font-weight: 400; color: var(--ink-subtle); transition: 240ms; }
.how-step:hover .how-num { color: var(--color-primary); }
.how-step h3 { font-size: 22px; font-weight: 600; letter-spacing: -0.02em; color: var(--ink-strong); }
.how-step p { margin-top: 10px; font-size: 14px; line-height: 1.7; color: var(--ink-muted); }
.how-code { position: relative; border-radius: 18px; background: var(--surface-1); border: 1px solid var(--line); overflow: hidden; box-shadow: var(--shadow-card); }
.code-orb { position: absolute; width: 280px; height: 280px; right: -80px; top: -80px; border-radius: 50%; background-image: var(--gradient-brand); filter: blur(40px); opacity: .35; pointer-events: none; animation: orb-pulse 12s ease-in-out infinite; }
.code-snippet { position: relative; margin: 0; padding: 28px; font-family: ui-monospace, "SFMono-Regular", monospace; font-size: 13px; line-height: 1.85; color: var(--ink); overflow-x: auto; white-space: pre; }
.code-snippet .c-key { color: var(--color-primary); font-weight: 600; }
.code-snippet .c-str { color: var(--color-accent); }
.code-foot { display: flex; align-items: center; gap: 8px; padding: 14px 24px; border-top: 1px solid var(--line); font-family: ui-monospace, monospace; font-size: 12px; color: var(--ink-muted); }
.code-foot strong { color: var(--color-success); font-weight: 600; }

/* 平台能力 */
.cap-rail { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 56px; border-top: 1px solid var(--line); }
.cap-item { position: relative; padding: 36px 28px 36px 0; border-right: 1px solid var(--line); transition: 240ms var(--ease-out); }
.cap-item:last-child { border-right: 0; }
.cap-item:hover { background: color-mix(in srgb, var(--color-primary) 4%, transparent); }
.cap-icon { display: grid; width: 44px; height: 44px; place-items: center; border-radius: 12px; background: color-mix(in srgb, var(--color-primary) 12%, transparent); color: var(--color-primary); margin-bottom: 20px; transition: 240ms; }
.cap-item:hover .cap-icon { background-image: var(--gradient-primary); color: #fff; }
.cap-num { font-size: 13px; font-style: italic; color: var(--ink-subtle); display: block; margin-bottom: 12px; }
.cap-item h3 { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; color: var(--ink-strong); }
.cap-item p { margin-top: 10px; font-size: 13px; line-height: 1.7; color: var(--ink-muted); }

/* FAQ */
.faq-list { margin-top: 48px; max-width: 840px; }
.faq-item { border-top: 1px solid var(--line); }
.faq-item:last-child { border-bottom: 1px solid var(--line); }
.faq-q { display: flex; align-items: center; justify-content: space-between; gap: 20px; width: 100%; padding: 26px 4px; text-align: left; background: none; border: 0; cursor: pointer; transition: 200ms; }
.faq-q span.font-display { font-size: clamp(18px, 2.2vw, 24px); font-weight: 500; letter-spacing: -0.01em; color: var(--ink-strong); transition: color 200ms; }
.faq-q:hover span.font-display { color: var(--color-primary); }
.faq-icon { position: relative; width: 18px; height: 18px; flex-shrink: 0; transition: transform 300ms var(--ease-out); }
.faq-icon::before, .faq-icon::after { content: ''; position: absolute; left: 50%; top: 50%; background: var(--color-primary); border-radius: 2px; transform: translate(-50%, -50%); }
.faq-icon::before { width: 14px; height: 2px; }
.faq-icon::after { width: 2px; height: 14px; transition: transform 300ms var(--ease-out); }
.faq-item.open .faq-icon::after { transform: translate(-50%, -50%) scaleY(0); }
.faq-a { max-height: 0; overflow: hidden; transition: max-height 360ms var(--ease-out); }
.faq-item.open .faq-a { max-height: 280px; }
.faq-a p { padding: 0 4px 28px; font-size: 15px; line-height: 1.75; color: var(--ink-muted); max-width: 700px; }

/* 特色引语 */
.featured-quote { position: relative; margin-top: 56px; max-width: 920px; }
.quote-mark { font-size: 120px; line-height: .5; color: var(--color-primary); opacity: .25; font-style: italic; }
.quote-text { font-size: clamp(24px, 3vw, 40px); line-height: 1.35; font-weight: 400; font-style: italic; letter-spacing: -0.01em; color: var(--ink-strong); margin-top: 8px; }
.quote-foot { display: flex; align-items: baseline; gap: 14px; margin-top: 32px; flex-wrap: wrap; }
.quote-name { font-size: 18px; font-weight: 600; color: var(--ink-strong); }
.quote-role { font-size: 14px; color: var(--ink-muted); }
.quote-metric { font-size: 15px; font-weight: 600; color: var(--color-accent); margin-left: auto; }

/* CTA */
.cta-section { position: relative; max-width: 76rem; margin: 0 auto; padding: 120px 32px; text-align: center; overflow: hidden; }
.cta-orb { position: absolute; width: 560px; height: 560px; max-width: 95vw; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; background-image: var(--gradient-aurora); filter: blur(50px); opacity: .8; z-index: -1; animation: orb-pulse 14s ease-in-out infinite; }
.cta-title { font-size: clamp(40px, 6vw, 88px); line-height: 1; font-weight: 700; letter-spacing: -0.03em; color: var(--ink-strong); }
.cta-desc { margin: 24px auto 0; max-width: 540px; font-size: 16px; color: var(--ink-muted); }
.cta-button { display: inline-flex; align-items: center; gap: 10px; margin-top: 40px; height: 56px; padding: 0 32px; border-radius: 16px; color: #fff; background-image: var(--gradient-primary); font-size: 16px; font-weight: 600; box-shadow: var(--shadow-glow); transition: 240ms var(--ease-spring); }
.cta-button:hover { transform: translateY(-3px) scale(1.03); box-shadow: var(--shadow-card-hover); }

/* Footer */
.home-footer { display: flex; max-width: 76rem; margin: 0 auto; padding: 40px 32px; align-items: center; justify-content: space-between; border-top: 1px solid var(--line); color: var(--ink-muted); font-size: 12px; }
.home-footer div { display: flex; gap: 22px; }
.home-footer a:hover { color: var(--color-primary); }

/* 入场 */
.reveal { opacity: 0; animation: reveal-up .8s cubic-bezier(.2,.8,.2,1) forwards; }
.reveal-1 { animation-delay: .08s; } .reveal-2 { animation-delay: .16s; } .reveal-3 { animation-delay: .28s; } .reveal-4 { animation-delay: .4s; }
.reveal-on-scroll { opacity: 0; transform: translateY(28px); transition: opacity .8s var(--ease-out) var(--delay, 0ms), transform .8s var(--ease-out) var(--delay, 0ms); }
.reveal-on-scroll.revealed { opacity: 1; transform: translateY(0); }
@keyframes reveal-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* 开屏 */
.intro-overlay { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; background: var(--surface-bg); transition: opacity 600ms var(--ease-out), visibility 600ms; }
.intro-overlay.intro-done { opacity: 0; visibility: hidden; pointer-events: none; }
.intro-aurora { position: absolute; inset: -20%; background-image: var(--gradient-aurora); filter: blur(24px); animation: intro-aurora 8s ease-in-out infinite alternate; }
@keyframes intro-aurora { 0% { transform: scale(1); } 100% { transform: scale(1.18) rotate(4deg); } }
.intro-inner { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 24px; }
.intro-mark { width: 76px; height: 76px; border-radius: 20px; display: grid; place-items: center; overflow: hidden; border: 1px solid var(--line-strong); background: var(--surface-1); box-shadow: var(--shadow-card), 0 0 48px -8px rgba(139,92,246,.5); transform: scale(.6); opacity: 0; transition: 420ms var(--ease-spring); }
.intro-mark.pop { transform: scale(1); opacity: 1; }
.intro-mark img { width: 100%; height: 100%; object-fit: contain; }
.intro-mark-fallback { font-size: 32px; font-weight: 700; background-image: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; color: transparent; }
.intro-brand { margin-top: 24px; font-size: 28px; font-weight: 700; letter-spacing: -0.02em; color: var(--ink-strong); }
.intro-tagline { margin-top: 8px; font-size: 12px; color: var(--ink-muted); }
.intro-lines { margin-top: 30px; display: flex; flex-direction: column; gap: 9px; font-size: 12px; }
.intro-line { display: flex; align-items: center; gap: 10px; color: var(--ink-subtle); opacity: 0; transform: translateX(-8px); transition: 260ms var(--ease-out); }
.intro-line.shown { opacity: 1; transform: translateX(0); color: var(--ink); }
.intro-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-primary); box-shadow: 0 0 8px var(--color-primary); opacity: 0; transition: opacity 200ms 60ms; }
.intro-line.shown .intro-dot { opacity: 1; }
.intro-text { min-width: 160px; text-align: left; }
.intro-progress { margin-top: 28px; width: 280px; max-width: 70vw; height: 3px; border-radius: 99px; background: var(--surface-3); overflow: hidden; }
.intro-progress-bar { height: 100%; background-image: var(--gradient-primary); border-radius: 99px; transition: width 360ms var(--ease-out); box-shadow: 0 0 12px rgba(139,92,246,.6); }
.intro-pct { margin-top: 10px; font-size: 11px; color: var(--ink-subtle); font-family: ui-monospace, monospace; }
.intro-fade-leave-active { transition: opacity 600ms var(--ease-out); }
.intro-fade-leave-to { opacity: 0; }

@media (max-width: 1024px) {
  .flow { grid-template-columns: 1fr; }
  .flow-item { border-right: 0; border-bottom: 1px solid var(--line); padding: 32px 0; }
  .flow-item:last-child { border-bottom: 0; }
  .compare { grid-template-columns: 1fr; gap: 16px; }
  .compare-vs { justify-self: start; padding: 0; }
  .how-grid { grid-template-columns: 1fr; gap: 32px; }
  .cap-rail { grid-template-columns: repeat(2, 1fr); }
  .cap-item:nth-child(2) { border-right: 0; }
  .cap-item:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
}
@media (max-width: 640px) {
  .nav-bar { padding: 16px 16px; }
  .brand-name { display: none; }
  .nav-link { display: none; }
  .hero { padding: 40px 16px 32px; min-height: auto; }
  .hero-orb { right: -50vw; width: 420px; height: 420px; }
  .hero-title { font-size: clamp(48px, 14vw, 80px); }
  .hero-sub { font-size: clamp(18px, 5vw, 24px); }
  .hero-actions { gap: 14px; margin-top: 30px; }
  .primary-action { width: 100%; height: 48px; }
  .text-action { font-size: 13px; }
  .live-row { flex-direction: column; align-items: flex-start; gap: 8px; margin-top: 36px; font-size: 12px; }
  .live-sep { display: none; }
  .manifesto, .editorial, .cta-section { padding-left: 16px; padding-right: 16px; }
  .manifesto { padding-top: 64px; padding-bottom: 64px; }
  .editorial { padding-top: 56px; padding-bottom: 56px; }
  .waveform { height: 44px; margin-bottom: 40px; }
  .manifesto-stats { gap: 28px; }
  .ms strong { font-size: 32px; }
  .section-title { font-size: clamp(30px, 9vw, 44px); }
  .pain-item { grid-template-columns: 48px 1fr; gap: 14px; padding: 24px 0; }
  .pain-num { font-size: 22px; }
  .pain-body h3 { font-size: 19px; }
  .pain-body p { font-size: 14px; }
  .cap-rail { grid-template-columns: 1fr; }
  .cap-item { border-right: 0; border-bottom: 1px solid var(--line); padding: 28px 0; }
  .cap-item:last-child { border-bottom: 0; }
  .how-step { grid-template-columns: 48px 1fr; gap: 14px; padding: 22px 0; }
  .how-num { font-size: 22px; }
  .code-snippet { font-size: 11px; padding: 18px; line-height: 1.7; }
  .compare-line { font-size: 16px; }
  .quote-text { font-size: clamp(20px, 6vw, 28px); }
  .cta-section { padding: 80px 16px; }
  .cta-title { font-size: clamp(34px, 11vw, 52px); }
  .home-footer { flex-direction: column; gap: 14px; text-align: center; padding: 32px 16px; }
  .intro-text { min-width: 120px; }
  .intro-mark { width: 64px; height: 64px; }
  .intro-brand { font-size: 24px; }
  .intro-progress { width: 240px; }
}
@media (max-width: 380px) {
  .hero-title { font-size: 44px; }
  .hero-eyebrow { font-size: 12px; }
  .nav-cta { padding: 0 12px; font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .reveal, .orb, .hero-orb, .cta-orb, .intro-aurora, .marquee-track, .live-dot, .wave-bar { animation: none !important; }
  .reveal-on-scroll { opacity: 1; transform: none; }
  .intro-overlay { display: none; }
}
</style>