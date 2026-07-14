export default {
  batchImageGuide: {
    title: 'Batch Image Generation',
    description: 'Submit multiple prompts in one job and download the generated images when complete'
  },
  // Home Page
  home: {
    viewOnGithub: 'View on GitHub',
    viewDocs: 'View Documentation',
    docs: 'Docs',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    dashboard: 'Dashboard',
    login: 'Login',
    getStarted: 'Get Started',
    goToDashboard: 'Go to Dashboard',
    enterprise: {
      nav: ['Models', 'Security', 'Enterprise', 'Pricing', 'Docs'],
      status: 'Global low-latency routes now live',
      heroPrefix: 'One gateway for',
      heroEmphasis: 'all',
      heroSuffix: 'your',
      heroHighlight: 'Enterprise AI',
      heroInfrastructure: 'infrastructure.',
      heroDescription: 'Stabilize your LLM stack with {siteName}. High-performance access to OpenAI, Claude, and Gemini with global low latency and enterprise compliance built-in.',
      deploy: 'Deploy Relay Now',
      apiDocs: 'View API Docs',
      providersLabel: 'Supported Models & Providers',
      providers: ['OpenAI', 'Anthropic', 'Google', 'Meta', 'Mistral', 'Azure'],
      features: {
        title: 'Stability that Scales',
        description: 'Focus on building features, not managing rate limits and fallback logic. We handle the heavy lifting of AI infrastructure.',
        uptimeTitle: '99.99% Uptime Guarantee',
        uptimeDescription: 'Our globally distributed gateway keeps applications stable during provider outages with automated fallback routes.',
        codeMethod: 'POST',
        codeRouteHeader: 'X-Relay-Route:',
        codeRouteValue: '"global-fast"',
        codeFallbackHeader: 'X-Relay-Fallback:',
        codeFallbackValue: 'true',
        piiTitle: 'Enterprise PII Scrubbing',
        piiDescription: 'Automatically redact sensitive data before it reaches model providers. Maintain compliance without effort.',
        piiItems: ['SSN Redaction', 'Credit Card Masking', 'Health Records'],
        invoicingTitle: 'Unified Invoicing',
        invoicingDescription: 'One bill for all your AI usage. Detailed cost breakdowns by team, project, or API key.',
        observabilityTitle: 'Real-time Observability',
        observabilityDescription: 'Trace every request, monitor latency spikes, and analyze cost efficiency in real time across all your models.',
        latency: 'Latency (ms)'
      },
      architecture: {
        eyebrow: 'Architecture',
        title: 'Built for low-latency speed and global scale.',
        description: "Traditional AI gateways introduce unnecessary overhead. {siteName}'s edge-native infrastructure is optimized for sub-millisecond routing, keeping AI features responsive worldwide.",
        edgeTitle: 'Global Edge Network',
        edgeDescription: 'Nodes in every major region minimize physical-distance latency.',
        cacheTitle: 'Intelligent Semantic Caching',
        cacheDescription: 'Reduce costs by up to 40% with smart response caching for similar queries.',
        networkLabel: 'Global Edge Network',
        imageAlt: 'Earth at night showing the reach of the global edge network',
        live: 'Live',
        core: 'Routing Core',
        regions: 'Active Regions',
        availability: 'Availability',
        routing: 'Routing Overhead',
        nodes: ['Tokyo', 'Singapore', 'Frankfurt', 'Virginia'],
        nodeStatus: 'Node Status: Tokyo East',
        nodeDescription: 'Optimal routing active. Latency reduction: 142ms'
      },
      cta: {
        title: 'Ready to stabilize your AI infrastructure?',
        description: 'Join teams building faster, safer, and more reliable AI applications on {siteName}.',
        createAccount: 'Create Free Account',
        sales: 'Talk to Sales',
        note: 'Free tier includes 100k requests/month.'
      },
      footerLinks: ['Status', 'Privacy', 'Terms', 'Security'],
      copyright: 'Copyright {year} {siteName}. All rights reserved.'
    },
    // User-focused value proposition
    heroSubtitle: 'One Key, All AI Models',
    heroDescription: 'No need to manage multiple subscriptions. Access Claude, GPT, Gemini and more with a single API key',
    tags: {
      subscriptionToApi: 'Subscription to API',
      stickySession: 'Session Persistence',
      realtimeBilling: 'Pay As You Go'
    },
    // Pain points section
    painPoints: {
      title: 'Sound Familiar?',
      items: {
        expensive: {
          title: 'High Subscription Costs',
          desc: 'Paying for multiple AI subscriptions that add up every month'
        },
        complex: {
          title: 'Account Chaos',
          desc: 'Managing scattered accounts and API keys across different platforms'
        },
        unstable: {
          title: 'Service Interruptions',
          desc: 'Single accounts hitting rate limits and disrupting your workflow'
        },
        noControl: {
          title: 'No Usage Control',
          desc: "Can't track where your money goes or limit team member usage"
        }
      }
    },
    // Solutions section
    solutions: {
      title: 'We Solve These Problems',
      subtitle: 'Three simple steps to stress-free AI access'
    },
    features: {
      unifiedGateway: 'One-Click Access',
      unifiedGatewayDesc: 'Get a single API key to call all connected AI models. No separate applications needed.',
      multiAccount: 'Always Reliable',
      multiAccountDesc: 'Smart routing across multiple upstream accounts with automatic failover. Say goodbye to errors.',
      balanceQuota: 'Pay What You Use',
      balanceQuotaDesc: 'Usage-based billing with quota limits. Full visibility into team consumption.'
    },
    // Comparison section
    comparison: {
      title: 'Why Choose Us?',
      headers: {
        feature: 'Comparison',
        official: 'Official Subscriptions',
        us: 'Our Platform'
      },
      items: {
        pricing: {
          feature: 'Pricing',
          official: 'Fixed monthly fee, pay even if unused',
          us: 'Pay only for what you use'
        },
        models: {
          feature: 'Model Selection',
          official: 'Single provider only',
          us: 'Switch between models freely'
        },
        management: {
          feature: 'Account Management',
          official: 'Manage each service separately',
          us: 'Unified key, one dashboard'
        },
        stability: {
          feature: 'Stability',
          official: 'Single account rate limits',
          us: 'Multi-account pool, auto-failover'
        },
        control: {
          feature: 'Usage Control',
          official: 'Not available',
          us: 'Quotas & detailed analytics'
        }
      }
    },
    providers: {
      title: 'Supported AI Models',
      description: 'One API, Multiple Choices',
      supported: 'Supported',
      soon: 'Soon',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: 'More'
    },
    // How it works
    how: {
      title: 'How It Works',
      subtitle: 'Three lines of code to every model',
      steps: [
        { title: 'Get Your Key', desc: 'Sign up and receive a single unified API key — no separate applications for each provider.' },
        { title: 'Point Your Requests', desc: 'Direct your calls to our gateway. The rest of your code stays the same. OpenAI-compatible.' },
        { title: 'Call Any Model', desc: 'One key switches freely between Claude, GPT and Gemini. Billed by token usage.' }
      ]
    },
    // Platform capabilities
    cap: {
      title: 'Built for Production',
      subtitle: 'Not just a proxy — a full observable, controllable, scalable gateway',
      items: [
        { title: 'Smart Routing', desc: 'Multi-account pool with auto load-balancing and failover. Requests never drop.', icon: 'swap' },
        { title: 'Real-time Metering', desc: 'Precise token-based billing. Balance, quotas and details at a glance.', icon: 'chart' },
        { title: 'Sticky Sessions', desc: 'Long-running tasks stay coherent — context never gets split.', icon: 'sync' },
        { title: 'Secure & Compliant', desc: 'TLS encryption, key isolation, auditable logs. Your data never leaks.', icon: 'lock' }
      ]
    },
    // FAQ
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'Do I need to manage multiple subscriptions?', a: 'No. A single API key from our platform lets you call every connected model. Account pools, keys and load balancing are maintained by us.' },
        { q: 'How does billing work?', a: 'Post-paid by actual token usage — no monthly fee, no minimum spend. Set low-balance alerts and resume instantly after top-up.' },
        { q: 'Is it compatible with my existing code?', a: 'Fully OpenAI-compatible. Just swap the base URL and API key — no business code changes needed.' },
        { q: 'How is stability guaranteed?', a: 'Auto-failover across a multi-account pool, targeting 99.9% uptime. Single-account rate limits never break your requests.' },
        { q: 'Is my data stored?', a: 'Request/response bodies are not stored by default — only token counts and timestamps for billing. Adjust log retention anytime in privacy settings.' }
      ]
    },
    // Intro animation
    intro: {
      line1: 'Initializing Gateway',
      line2: 'Loading Model Network',
      line3: 'Establishing Routing Nodes',
      line4: 'System Ready',
      tagline: 'The secure, stable AI gateway'
    },
    // Trust / customer cases
    trust: {
      title: 'Trusted by Modern Teams',
      subtitle: 'From startups to enterprises, developers build AI products on our reliable gateway'
    },
    cases: {
      title: 'Customer Stories',
      subtitle: 'See how teams ship faster with sub2api',
      items: [
        { name: 'Nova Labs', role: 'AI Startup', quote: 'Since integrating, our model calls never went down. Auto-failover across accounts kept our launch rock-solid.', metric: '99.98%', metricLabel: 'Call uptime' },
        { name: 'PixelForge', role: 'Indie Game Studio', quote: 'One key to switch between Claude and GPT — pay-as-you-go lets a small team use frontier models without the overhead.', metric: '3.2x', metricLabel: 'Faster iteration' },
        { name: 'DataMind', role: 'Data Analytics SaaS', quote: 'Usage details and quota controls are transparent. Team costs are finally predictable — no more billing surprises.', metric: '47%', metricLabel: 'Cost reduction' },
        { name: 'CodePilot CN', role: 'Developer Tools', quote: 'Latency is noticeably lower than our home-brew proxy, and the routing is smart enough that failovers are invisible.', metric: '120ms', metricLabel: 'Avg latency' },
        { name: 'WriteFlow', role: 'Content Platform', quote: 'Went from signup to production in half a day. Docs are clear and support is fast.', metric: '0.5d', metricLabel: 'Time to integrate' },
        { name: 'GeniusEDU', role: 'EdTech Company', quote: 'Sticky sessions let us run long tasks reliably, and composing multiple models feels effortless.', metric: '10M+', metricLabel: 'Monthly calls' }
      ]
    },
    // CTA section
    cta: {
      title: 'Ready to Get Started?',
      description: 'Sign up now and get free trial credits to experience seamless AI access',
      button: 'Sign Up Free'
    },
    footer: {
      allRightsReserved: 'All rights reserved.'
    }
  },

  // Key Usage Query Page
  keyUsage: {
    title: 'API Key Usage',
    subtitle: 'Enter your API Key to view real-time spending and usage status',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: 'Query',
    querying: 'Querying...',
    privacyNote: 'Your Key is processed locally in the browser and will not be stored',
    dateRange: 'Date Range:',
    dateRangeToday: 'Today',
    dateRange7d: '7 Days',
    dateRange30d: '30 Days',
    dateRange90d: '90 Days',
    dateRangeCustom: 'Custom',
    apply: 'Apply',
    used: 'Used',
    detailInfo: 'Detail Information',
    tokenStats: 'Token Statistics',
    dailyDetail: 'Daily Detail',
    modelStats: 'Model Usage Statistics',
    // Table headers
    date: 'Date',
    model: 'Model',
    requests: 'Requests',
    inputTokens: 'Input Tokens',
    outputTokens: 'Output Tokens',
    cacheCreationTokens: 'Cache Creation',
    cacheReadTokens: 'Cache Read',
    cacheWriteTokens: 'Cache Write',
    totalTokens: 'Total Tokens',
    cost: 'Cost',
    // Status
    quotaMode: 'Key Quota Mode',
    walletBalance: 'Wallet Balance',
    // Ring card titles
    totalQuota: 'Total Quota',
    limit5h: '5-Hour Limit',
    limitDaily: 'Daily Limit',
    limit7d: '7-Day Limit',
    limitWeekly: 'Weekly Limit',
    limitMonthly: 'Monthly Limit',
    // Detail rows
    remainingQuota: 'Remaining Quota',
    expiresAt: 'Expires At',
    todayExpires: '(expires today)',
    daysLeft: '({days} days)',
    usedQuota: 'Used Quota',
    resetNow: 'Resetting soon',
    subscriptionType: 'Subscription Type',
    subscriptionExpires: 'Subscription Expires',
    // Usage stat cells
    todayRequests: 'Today Requests',
    todayInputTokens: 'Today Input',
    todayOutputTokens: 'Today Output',
    todayTokens: 'Today Tokens',
    todayCacheCreation: 'Today Cache Creation',
    todayCacheRead: 'Today Cache Read',
    todayCost: 'Today Cost',
    rpmTpm: 'RPM / TPM',
    totalRequests: 'Total Requests',
    totalInputTokens: 'Total Input',
    totalOutputTokens: 'Total Output',
    totalTokensLabel: 'Total Tokens',
    totalCacheCreation: 'Total Cache Creation',
    totalCacheRead: 'Total Cache Read',
    totalCost: 'Total Cost',
    avgDuration: 'Avg Duration',
    // Messages
    enterApiKey: 'Please enter an API Key',
    querySuccess: 'Query successful',
    queryFailed: 'Query failed',
    queryFailedRetry: 'Query failed, please try again later',
    noDailyUsage: 'No daily usage data',
  },

  // Setup Wizard
  setup: {
    title: 'Sub2API Setup',
    description: 'Configure your Sub2API instance',
    database: {
      title: 'Database Configuration',
      description: 'Connect to your PostgreSQL database',
      host: 'Host',
      port: 'Port',
      username: 'Username',
      password: 'Password',
      databaseName: 'Database Name',
      sslMode: 'SSL Mode',
      passwordPlaceholder: 'Password',
      ssl: {
        disable: 'Disable',
        require: 'Require',
        verifyCa: 'Verify CA',
        verifyFull: 'Verify Full'
      }
    },
    redis: {
      title: 'Redis Configuration',
      description: 'Connect to your Redis server',
      host: 'Host',
      port: 'Port',
      password: 'Password (optional)',
      database: 'Database',
      passwordPlaceholder: 'Password',
      enableTls: 'Enable TLS',
      enableTlsHint: 'Use TLS when connecting to Redis (public CA certs)'
    },
    admin: {
      title: 'Admin Account',
      description: 'Create your administrator account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      passwordPlaceholder: 'Min 8 characters',
      confirmPasswordPlaceholder: 'Confirm password',
      passwordMismatch: 'Passwords do not match'
    },
    ready: {
      title: 'Ready to Install',
      description: 'Review your configuration and complete setup',
      database: 'Database',
      redis: 'Redis',
      adminEmail: 'Admin Email'
    },
    status: {
      testing: 'Testing...',
      success: 'Connection Successful',
      testConnection: 'Test Connection',
      installing: 'Installing...',
      completeInstallation: 'Complete Installation',
      completed: 'Installation completed!',
      redirecting: 'Redirecting to login page...',
      restarting: 'Service is restarting, please wait...',
      timeout: 'Service restart is taking longer than expected. Please refresh the page manually.'
    }
  },

  // Common
}
