export default {
  batchImageGuide: {
    title: '图片批量生成',
    description: '一次提交多条提示词，任务完成后可统一下载图片结果'
  },
  // Home Page
  home: {
    viewOnGithub: '在 GitHub 上查看',
    viewDocs: '查看文档',
    docs: '文档',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    dashboard: '控制台',
    login: '登录',
    getStarted: '立即开始',
    goToDashboard: '进入控制台',
    enterprise: {
      nav: ['模型', '安全', '企业服务', '价格', '文档'],
      status: '全球低延迟路由现已上线',
      heroPrefix: '一个网关连接',
      heroEmphasis: '所有',
      heroSuffix: '企业级',
      heroHighlight: 'AI 基础设施',
      heroInfrastructure: '',
      heroDescription: '使用 {siteName} 稳定您的大模型技术栈。高性能接入 OpenAI、Claude 和 Gemini，内置全球低延迟网络与企业级合规能力。',
      deploy: '立即部署网关',
      apiDocs: '查看 API 文档',
      providersLabel: '支持的模型与服务商',
      providers: ['OpenAI', 'Anthropic', 'Google', 'Meta', 'Mistral', 'Azure'],
      features: {
        title: '稳定性随业务共同扩展',
        description: '专注构建产品功能，无需管理限流和故障切换逻辑。繁重的 AI 基础设施工作交给我们。',
        uptimeTitle: '99.99% 可用性保障',
        uptimeDescription: '全球分布式网关配合自动故障转移，即使上游服务异常，您的应用依然稳定运行。',
        codeMethod: 'POST',
        codeRouteHeader: 'X-Relay-Route:',
        codeRouteValue: '"global-fast"',
        codeFallbackHeader: 'X-Relay-Fallback:',
        codeFallbackValue: 'true',
        piiTitle: '企业级隐私信息清理',
        piiDescription: '敏感数据在发送至模型服务商前自动脱敏，轻松满足合规要求。',
        piiItems: ['身份证信息脱敏', '银行卡信息遮蔽', '健康记录保护'],
        invoicingTitle: '统一账单',
        invoicingDescription: '所有 AI 用量统一结算，并可按团队、项目或 API 密钥查看详细成本。',
        observabilityTitle: '实时可观测性',
        observabilityDescription: '追踪每一次请求，监控延迟波动，实时分析全部模型的成本效率。',
        latency: '延迟（毫秒）'
      },
      architecture: {
        eyebrow: '架构',
        title: '为低延迟速度与全球规模而构建。',
        description: '传统 AI 网关会引入不必要的开销。{siteName} 的边缘原生基础设施针对亚毫秒级路由优化，让全球用户都能获得快速响应。',
        edgeTitle: '全球边缘网络',
        edgeDescription: '覆盖主要区域的节点最大限度降低物理距离带来的延迟。',
        cacheTitle: '智能语义缓存',
        cacheDescription: '通过相似请求的智能响应缓存，最高可降低 40% 成本。',
        networkLabel: '全球边缘网络',
        imageAlt: '展现全球边缘网络覆盖范围的地球夜景',
        live: '实时',
        core: '路由核心',
        regions: '活跃区域',
        availability: '可用率',
        routing: '路由开销',
        nodes: ['东京', '新加坡', '法兰克福', '弗吉尼亚'],
        nodeStatus: '节点状态：东京东部',
        nodeDescription: '最优路由已启用，延迟降低 142 毫秒'
      },
      cta: {
        title: '准备好稳定您的 AI 基础设施了吗？',
        description: '加入使用 {siteName} 构建更快速、更安全、更可靠 AI 应用的团队。',
        createAccount: '免费创建账户',
        sales: '联系销售',
        note: '免费套餐每月包含 10 万次请求。'
      },
      footerLinks: ['服务状态', '隐私政策', '服务条款', '安全'],
      copyright: '版权所有 {year} {siteName}。保留所有权利。'
    },
    // 新增：面向用户的价值主张
    heroSubtitle: '一个密钥，畅用多个 AI 模型',
    heroDescription: '无需管理多个订阅账号，一站式接入 Claude、GPT、Gemini 等主流 AI 服务',
    tags: {
      subscriptionToApi: '订阅转 API',
      stickySession: '会话保持',
      realtimeBilling: '按量计费'
    },
    // 用户痛点区块
    painPoints: {
      title: '你是否也遇到这些问题？',
      items: {
        expensive: {
          title: '订阅费用高',
          desc: '每个 AI 服务都要单独订阅，每月支出越来越多'
        },
        complex: {
          title: '多账号难管理',
          desc: '不同平台的账号、密钥分散各处，管理起来很麻烦'
        },
        unstable: {
          title: '服务不稳定',
          desc: '单一账号容易触发限制，影响正常使用'
        },
        noControl: {
          title: '用量无法控制',
          desc: '不知道钱花在哪了，也无法限制团队成员的使用'
        }
      }
    },
    // 解决方案区块
    solutions: {
      title: '我们帮你解决',
      subtitle: '简单三步，开始省心使用 AI'
    },
    features: {
      unifiedGateway: '一键接入',
      unifiedGatewayDesc: '获取一个 API 密钥，即可调用所有已接入的 AI 模型，无需分别申请。',
      multiAccount: '稳定可靠',
      multiAccountDesc: '智能调度多个上游账号，自动切换和负载均衡，告别频繁报错。',
      balanceQuota: '用多少付多少',
      balanceQuotaDesc: '按实际使用量计费，支持设置配额上限，团队用量一目了然。'
    },
    // 优势对比
    comparison: {
      title: '为什么选择我们？',
      headers: {
        feature: '对比项',
        official: '官方订阅',
        us: '本平台'
      },
      items: {
        pricing: {
          feature: '付费方式',
          official: '固定月费，用不完也付',
          us: '按量付费，用多少付多少'
        },
        models: {
          feature: '模型选择',
          official: '单一服务商',
          us: '多模型随意切换'
        },
        management: {
          feature: '账号管理',
          official: '每个服务单独管理',
          us: '统一密钥，一站管理'
        },
        stability: {
          feature: '服务稳定性',
          official: '单账号易触发限制',
          us: '多账号池，自动切换'
        },
        control: {
          feature: '用量控制',
          official: '无法限制',
          us: '可设配额、查明细'
        }
      }
    },
    providers: {
      title: '已支持的 AI 模型',
      description: '一个 API，多种选择',
      supported: '已支持',
      soon: '即将推出',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: '更多'
    },
    // 工作原理
    how: {
      title: '如何运作',
      subtitle: '三行代码，接入全部模型',
      steps: [
        { title: '注册获取密钥', desc: '创建账户，即可拿到一个统一的 API Key，无需分别申请各家。' },
        { title: '替换接口地址', desc: '把请求指向我们的网关，其余代码一字不改，兼容 OpenAI 接口。' },
        { title: '开始调用模型', desc: '一个密钥在 Claude、GPT、Gemini 间自由切换，按 Token 用量计费。' }
      ]
    },
    // 平台能力
    cap: {
      title: '为生产而生',
      subtitle: '不只是中转，是一整套可观测、可控、可扩展的网关',
      items: [
        { title: '智能路由', desc: '多账号池自动负载均衡与故障转移，请求永不中断。', icon: 'swap' },
        { title: '实时计量', desc: '按 Token 精确计费，余额、配额、明细一目了然。', icon: 'chart' },
        { title: '会话保持', desc: '长任务稳定续接，同一上下文不被打散。', icon: 'sync' },
        { title: '安全合规', desc: 'TLS 加密、密钥隔离、日志可审计，数据绝不外泄。', icon: 'lock' }
      ]
    },
    // 常见问题
    faq: {
      title: '常见问题',
      items: [
        { q: '需要管理多个订阅账号吗？', a: '不需要。只需一个本平台的 API Key，即可调用所有已接入的模型。账号池、密钥、负载均衡都由我们维护。' },
        { q: '计费方式是怎样的？', a: '按实际 Token 用量后付费，无月费、无最低消费。余额低于阈值可设置提醒，充值后立即恢复。' },
        { q: '接口兼容我的现有代码吗？', a: '完全兼容 OpenAI 接口规范，仅需替换 base URL 与 API Key，业务代码无需改动。' },
        { q: '服务稳定性如何保障？', a: '多账号池自动故障转移，目标可用率 99.9%。单账号限流不影响你的请求，会自动切换到健康节点。' },
        { q: '我的数据会被存储吗？', a: '默认不存储请求/响应正文，仅记录 token 计数与时间戳用于计费。你可随时在隐私设置中调整日志保留策略。' }
      ]
    },
    // 开屏动画
    intro: {
      line1: '初始化网关',
      line2: '加载模型网络',
      line3: '建立路由节点',
      line4: '系统就绪',
      tagline: '安全稳定的大模型中转平台'
    },
    // 客户案例 / 信任
    trust: {
      title: '已被众多团队选择',
      subtitle: '从初创到企业，开发者们用我们稳定地构建 AI 产品'
    },
    cases: {
      title: '客户案例',
      subtitle: '看看他们如何用 sub2api 提效',
      items: [
        { name: 'Nova Labs', role: 'AI 创业团队', quote: '接入后我们的模型调用再没中断过，多账号自动切换让上线节奏稳了很多。', metric: '99.98%', metricLabel: '调用可用率' },
        { name: 'PixelForge', role: '独立游戏工作室', quote: '一个密钥就能在 Claude 和 GPT 间切换，按量计费让小团队也能毫无负担地用顶配模型。', metric: '3.2x', metricLabel: '迭代速度提升' },
        { name: 'DataMind', role: '数据分析 SaaS', quote: '用量明细和配额控制非常透明，团队成本终于可控了，账单不再有惊喜。', metric: '47%', metricLabel: '成本下降' },
        { name: 'CodePilot CN', role: '开发者工具', quote: '延迟比我们之前自建的中转低不少，路由调度很智能，几乎感觉不到切换。', metric: '120ms', metricLabel: '平均延迟' },
        { name: 'WriteFlow', role: '内容生成平台', quote: '从接入到上线只花了半天，文档清晰，遇到问题响应也快。', metric: '0.5d', metricLabel: '接入耗时' },
        { name: 'GeniusEDU', role: '教育科技公司', quote: '会话保持让我们能稳定跑长任务，多模型组合调用体验非常顺滑。', metric: '10M+', metricLabel: '月调用次数' }
      ]
    },
    // CTA 区块
    cta: {
      title: '准备好开始了吗？',
      description: '注册即可获得免费试用额度，体验一站式 AI 服务',
      button: '免费注册'
    },
    footer: {
      allRightsReserved: '保留所有权利。'
    }
  },

  // Key Usage Query Page
  keyUsage: {
    title: 'API Key 用量查询',
    subtitle: '输入您的 API Key 以查看实时消费金额与使用状态',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: '查询',
    querying: '查询中...',
    privacyNote: '您的 Key 仅在浏览器本地处理，不会被存储',
    dateRange: '统计范围:',
    dateRangeToday: '今日',
    dateRange7d: '7 天',
    dateRange30d: '30 天',
    dateRange90d: '90 天',
    dateRangeCustom: '自定义',
    apply: '应用',
    used: '已使用',
    detailInfo: '详细信息',
    tokenStats: 'Token 统计',
    dailyDetail: '按日明细',
    modelStats: '模型用量统计',
    // Table headers
    date: '日期',
    model: '模型',
    requests: '请求数',
    inputTokens: '输入 Tokens',
    outputTokens: '输出 Tokens',
    cacheCreationTokens: '缓存创建',
    cacheReadTokens: '缓存读取',
    cacheWriteTokens: '缓存写入',
    totalTokens: '总 Tokens',
    cost: '费用',
    // Status
    quotaMode: 'Key 限额模式',
    walletBalance: '钱包余额',
    // Ring card titles
    totalQuota: '总额度',
    limit5h: '5 小时限额',
    limitDaily: '日限额',
    limit7d: '7 天限额',
    limitWeekly: '周限额',
    limitMonthly: '月限额',
    // Detail rows
    remainingQuota: '剩余额度',
    expiresAt: '过期时间',
    todayExpires: '(今日到期)',
    daysLeft: '({days} 天)',
    usedQuota: '已用额度',
    resetNow: '即将重置',
    subscriptionType: '订阅类型',
    subscriptionExpires: '订阅到期',
    // Usage stat cells
    todayRequests: '今日请求',
    todayInputTokens: '今日输入',
    todayOutputTokens: '今日输出',
    todayTokens: '今日 Tokens',
    todayCacheCreation: '今日缓存创建',
    todayCacheRead: '今日缓存读取',
    todayCost: '今日费用',
    rpmTpm: 'RPM / TPM',
    totalRequests: '累计请求',
    totalInputTokens: '累计输入',
    totalOutputTokens: '累计输出',
    totalTokensLabel: '累计 Tokens',
    totalCacheCreation: '累计缓存创建',
    totalCacheRead: '累计缓存读取',
    totalCost: '累计费用',
    avgDuration: '平均耗时',
    // Messages
    enterApiKey: '请输入 API Key',
    querySuccess: '查询成功',
    queryFailed: '查询失败',
    queryFailedRetry: '查询失败，请稍后重试',
    noDailyUsage: '暂无按日用量数据',
  },

  // Setup Wizard
  setup: {
    title: 'Sub2API 安装向导',
    description: '配置您的 Sub2API 实例',
    database: {
      title: '数据库配置',
      description: '连接到您的 PostgreSQL 数据库',
      host: '主机',
      port: '端口',
      username: '用户名',
      password: '密码',
      databaseName: '数据库名称',
      sslMode: 'SSL 模式',
      passwordPlaceholder: '密码',
      ssl: {
        disable: '禁用',
        require: '要求',
        verifyCa: '验证 CA',
        verifyFull: '完全验证'
      }
    },
    redis: {
      title: 'Redis 配置',
      description: '连接到您的 Redis 服务器',
      host: '主机',
      port: '端口',
      password: '密码（可选）',
      database: '数据库',
      passwordPlaceholder: '密码',
      enableTls: '启用 TLS',
      enableTlsHint: '连接 Redis 时使用 TLS（公共 CA 证书）'
    },
    admin: {
      title: '管理员账户',
      description: '创建您的管理员账户',
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      passwordPlaceholder: '至少 8 个字符',
      confirmPasswordPlaceholder: '确认密码',
      passwordMismatch: '密码不匹配'
    },
    ready: {
      title: '准备安装',
      description: '检查您的配置并完成安装',
      database: '数据库',
      redis: 'Redis',
      adminEmail: '管理员邮箱'
    },
    status: {
      testing: '测试中...',
      success: '连接成功',
      testConnection: '测试连接',
      installing: '安装中...',
      completeInstallation: '完成安装',
      completed: '安装完成！',
      redirecting: '正在跳转到登录页面...',
      restarting: '服务正在重启，请稍候...',
      timeout: '服务重启时间超出预期，请手动刷新页面。'
    }
  },

  // Common
}
