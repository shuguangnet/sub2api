<template>
  <div class="min-h-screen bg-surface-bg bg-noise relative">
    <div class="pointer-events-none fixed inset-0 bg-aurora opacity-70"></div>
    <div class="relative mx-auto max-w-5xl px-6 py-16">
      <header class="mb-12">
        <div class="mb-2 inline-flex items-center gap-2 rounded-pill bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300">
          <span class="h-1.5 w-1.5 rounded-pill bg-primary-500"></span>
          Aurora Tech · Design System
        </div>
        <h1 class="text-4xl font-extrabold tracking-tight">设计令牌总览</h1>
        <p class="mt-2 max-w-2xl text-ink-muted">冷色科技感设计系统 — Indigo/Violet 主色 + Cyan 辅色，令牌驱动深浅色双轨。</p>
        <div class="mt-4 flex gap-2">
          <button class="btn btn-primary btn-sm" @click="toggleDark">{{ isDark ? '浅色' : '深色' }}</button>
          <router-link to="/home" class="btn btn-secondary btn-sm">返回首页</router-link>
        </div>
      </header>

      <section class="mb-10">
        <h2 class="mb-4 text-lg font-bold">主色 Primary</h2>
        <div class="grid grid-cols-5 gap-2 sm:grid-cols-11">
          <div v-for="i in 11" :key="i" class="overflow-hidden rounded-lg border border-line">
            <div :class="swatchClass(50 + (i - 1) * 95)" class="h-16"></div>
            <div class="bg-surface-1 px-2 py-1 text-[10px] text-ink-muted">{{ 50 + (i - 1) * 95 }}</div>
          </div>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 text-lg font-bold">辅色 Accent</h2>
        <div class="grid grid-cols-5 gap-2 sm:grid-cols-11">
          <div v-for="i in 11" :key="i" class="overflow-hidden rounded-lg border border-line">
            <div :class="accentSwatchClass(50 + (i - 1) * 95)" class="h-16"></div>
            <div class="bg-surface-1 px-2 py-1 text-[10px] text-ink-muted">{{ 50 + (i - 1) * 95 }}</div>
          </div>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 text-lg font-bold">表面 / 文字 / 描边</h2>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div v-for="s in surfaces" :key="s.label" class="rounded-lg border border-line p-4" :style="s.style">
            <div class="text-xs font-medium text-ink-muted">{{ s.label }}</div>
            <div class="mt-1 text-sm font-bold text-ink-strong">{{ s.value }}</div>
          </div>
          <div v-for="s in inks" :key="s.label" class="rounded-lg border border-line p-4">
            <div class="text-xs font-medium text-ink-muted">{{ s.label }}</div>
            <div class="mt-1 text-sm font-bold" :style="s.style">{{ s.value }}</div>
          </div>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 text-lg font-bold">按钮</h2>
        <div class="flex flex-wrap gap-3">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-ghost">Ghost</button>
          <button class="btn btn-success">Success</button>
          <button class="btn btn-warning">Warning</button>
          <button class="btn btn-danger">Danger</button>
          <button class="btn btn-primary btn-sm">Small</button>
          <button class="btn btn-primary btn-lg">Large</button>
          <button class="btn btn-primary" disabled>Disabled</button>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 text-lg font-bold">卡片 / 阴影 / 玻璃</h2>
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="card card-hover p-5">
            <div class="text-sm font-semibold">Card Hover</div>
            <p class="mt-1 text-xs text-ink-muted">悬停上浮 + 阴影加深。</p>
          </div>
          <div class="card-glass p-5">
            <div class="text-sm font-semibold">Card Glass</div>
            <p class="mt-1 text-xs text-ink-muted">毛玻璃半透面板。</p>
          </div>
          <div class="card p-5">
            <div class="text-sm font-semibold">阴影</div>
            <div class="mt-3 grid grid-cols-3 gap-2">
              <div class="h-12 rounded-lg bg-surface-2 shadow-sm"></div>
              <div class="h-12 rounded-lg bg-surface-2 shadow-card"></div>
              <div class="h-12 rounded-lg bg-surface-2 shadow-popover"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 text-lg font-bold">输入 / 徽章 / 表格</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="card p-5">
            <label class="input-label">邮箱</label>
            <input class="input" placeholder="you@example.com" />
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="badge badge-primary">Primary</span>
              <span class="badge badge-success">Success</span>
              <span class="badge badge-warning">Warning</span>
              <span class="badge badge-danger">Danger</span>
              <span class="badge badge-gray">Gray</span>
            </div>
          </div>
          <div class="card p-0 overflow-hidden">
            <table class="table">
              <thead>
                <tr><th>模型</th><th>状态</th><th>延迟</th></tr>
              </thead>
              <tbody>
                <tr><td>Claude</td><td><span class="badge badge-success">在线</span></td><td>642ms</td></tr>
                <tr><td>GPT-4o</td><td><span class="badge badge-success">在线</span></td><td>388ms</td></tr>
                <tr><td>Gemini</td><td><span class="badge badge-warning">降级</span></td><td>1.2s</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 text-lg font-bold">渐变 / 字体</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="card p-6 text-center bg-gradient-brand text-white">gradient-brand</div>
          <div class="card p-6 text-center bg-gradient-primary text-white">gradient-primary</div>
          <div class="card p-6 text-center bg-aurora text-ink-strong">bg-aurora 极光</div>
          <div class="card p-6 text-center text-gradient text-2xl font-extrabold">Text Gradient 文字渐变</div>
        </div>
        <div class="mt-4 space-y-1">
          <p class="text-xs text-ink-muted">xs · 12px</p>
          <p class="text-sm text-ink-muted">sm · 14px</p>
          <p class="text-base">base · 16px</p>
          <p class="text-lg font-semibold">lg · 18px</p>
          <p class="text-xl font-bold">xl · 20px</p>
          <p class="text-2xl font-extrabold">2xl · 24px</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(document.documentElement.classList.contains('dark'))

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function swatchClass(step: number): string {
  const map: Record<number, string> = {
    50: 'bg-primary-50', 145: 'bg-primary-100', 240: 'bg-primary-200', 335: 'bg-primary-300',
    430: 'bg-primary-400', 525: 'bg-primary-500', 620: 'bg-primary-600', 715: 'bg-primary-700',
    810: 'bg-primary-800', 905: 'bg-primary-900', 1000: 'bg-primary-950'
  }
  return map[step] || 'bg-primary-500'
}
function accentSwatchClass(step: number): string {
  const map: Record<number, string> = {
    50: 'bg-accent-50', 145: 'bg-accent-100', 240: 'bg-accent-200', 335: 'bg-accent-300',
    430: 'bg-accent-400', 525: 'bg-accent-500', 620: 'bg-accent-600', 715: 'bg-accent-700',
    810: 'bg-accent-800', 905: 'bg-accent-900', 1000: 'bg-accent-950'
  }
  return map[step] || 'bg-accent-500'
}

const surfaces = [
  { label: 'surface-bg', value: 'var(--surface-bg)', style: { backgroundColor: 'var(--surface-bg)' } },
  { label: 'surface-1', value: 'var(--surface-1)', style: { backgroundColor: 'var(--surface-1)' } },
  { label: 'surface-2', value: 'var(--surface-2)', style: { backgroundColor: 'var(--surface-2)' } },
  { label: 'surface-3', value: 'var(--surface-3)', style: { backgroundColor: 'var(--surface-3)' } }
]
const inks = [
  { label: 'ink', value: 'var(--ink)', style: { color: 'var(--ink)' } },
  { label: 'ink-strong', value: 'var(--ink-strong)', style: { color: 'var(--ink-strong)' } },
  { label: 'ink-muted', value: 'var(--ink-muted)', style: { color: 'var(--ink-muted)' } },
  { label: 'line', value: 'var(--line)', style: { color: 'var(--ink)' } }
]
</script>