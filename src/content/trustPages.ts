import type { Locale } from '@/i18n/translations'

export type TrustPageId = 'terms' | 'privacy' | 'refund' | 'contact' | 'support'
export type TrustLinkTarget = 'partners' | 'privacy' | 'contact' | 'support' | 'terms' | 'refund'

type TrustPageContent = {
  navLabel: string
  title: string
  eyebrow: string
  intro: string
  updatedLabel: string
  badges: string[]
  contactCard?: {
    title: string
    emailLabel: string
    email: string
    notes: string[]
  }
  sections: Array<{
    title: string
    paragraphs: string[]
  }>
  linksTitle: string
  links: Array<{
    target: TrustLinkTarget
    label: string
    description: string
  }>
}

const zhPages: Record<TrustPageId, TrustPageContent> = {
  terms: {
    navLabel: 'Terms',
    title: '服务条款 Terms of Service',
    eyebrow: '平台规则 / Site Rules',
    intro:
      '本页面用于说明 Kuankedao 作为推广资源对接平台的基本使用规则、内容边界与合作前提。By visiting the site, submitting a request, or sending partner materials, you acknowledge these ground rules and agree to use the platform in a lawful and reasonable way.',
    updatedLabel: '最近更新：2026-06-11',
    badges: ['Terms', '平台使用规则', 'Submission Rules', '内容边界'],
    sections: [
      {
        title: '平台角色 Platform Role',
        paragraphs: [
          '宽客岛主要提供 resource discovery、需求收集、合作撮合与内容整理服务。平台会尽量提升信息透明度，但不会对所有第三方资源的最终效果、转化结果或商业收益作绝对承诺。',
          '站内页面、案例、文章和资源说明，主要用于帮助用户 understand categories, workflow, and common questions。具体合作方式、执行范围、交付标准与结算规则，仍应以双方后续确认的信息为准。',
          '平台的职责更接近 connector、curator 与 information hub，而不是所有第三方服务的实际履约主体。用户在进入合作前，应自行评估预算、时间安排、市场风险与执行匹配度。',
        ],
      },
      {
        title: '提交信息要求 Submission Standards',
        paragraphs: [
          '你提交的公司、联系人、预算、项目周期、服务案例、website、social profile 或其他材料，应尽量真实、完整、可核验，并与实际合作意图保持一致。',
          '如果资料存在明显虚假、误导、夸大、侵权、spam、恶意投递或其他高风险情况，平台可拒绝展示、暂停处理、要求补充证明，或直接终止相关对接。',
          'Repeated low-quality submissions, fake identity, or fabricated performance claims may lead to restriction, blacklist review, or permanent rejection of future submissions.',
        ],
      },
      {
        title: '可接受使用范围 Acceptable Use',
        paragraphs: [
          '不得利用本站从事违法活动、恶意爬取、批量骚扰、冒用身份、传播侵权内容、自动化灌表、绕过风控或其他破坏平台正常运行的行为。',
          'You may not use the platform to impersonate brands, inflate results, scrape protected data, or initiate abusive outreach to other users or partners.',
          '平台保留对异常访问、恶意提交、滥用接口、破坏页面稳定性或存在合规风险的行为进行限制、屏蔽、保留记录及必要时配合调查的权利。',
        ],
      },
      {
        title: '责任边界 Liability & Responsibility',
        paragraphs: [
          '对于因第三方资源方、广告平台、社交平台、支付渠道、内容审核政策变化等外部因素造成的延误、中断或效果波动，平台会尽量协助沟通，但不承担无限延展责任。',
          'Before any paid execution starts, both sides should confirm deliverables, timeline, fee structure, refund conditions, and communication owner in writing. 这有助于减少误解，也能提升后续协作效率。',
        ],
      },
    ],
    linksTitle: '相关页面 Related Pages',
    links: [
      { target: 'privacy', label: '查看隐私政策 Privacy', description: '了解表单信息、usage scope 与数据处理方式。' },
      { target: 'contact', label: '联系平台 Contact', description: '提交商务、内容修正或合作沟通请求。' },
      { target: 'support', label: '获取支持 Support', description: '遇到流程、页面或提交问题时查看处理路径。' },
    ],
  },
  privacy: {
    navLabel: 'Privacy',
    title: '隐私政策 Privacy Policy',
    eyebrow: '数据使用 / Data Handling',
    intro:
      '本页面说明 Kuankedao 在你访问网站、提交需求、提交合作资料或发起支持请求时，可能收集哪些信息，以及这些信息会如何被使用。We try to keep data collection practical, limited, and related to service delivery rather than collecting unnecessary information.',
    updatedLabel: '最近更新：2026-06-11',
    badges: ['Privacy', '表单数据', 'Usage Scope', '访问与删除请求'],
    sections: [
      {
        title: '我们收集的信息 What We Collect',
        paragraphs: [
          '当你通过需求表单、合作入驻表单或支持页面联系我们时，可能会提交公司名称、联系人、联系方式、预算范围、目标市场、案例摘要、website、social account 及其他你主动提供的信息。',
          '站点还可能记录基础访问数据，例如 page path、device type、browser info、referrer、submit time 与常规性能日志，用于保障站点稳定和分析页面可用性。',
          'We do not aim to collect sensitive data beyond what is reasonably needed for communication, matching, review, security, and service operations.',
        ],
      },
      {
        title: '信息使用目的 How We Use It',
        paragraphs: [
          '这些信息主要用于回复咨询、完成资源匹配、推进合作沟通、处理支持请求、识别异常提交、进行 risk review，以及持续改进站点内容与流程。',
          '表单资料也可能被用于 basic internal review，例如判断需求是否清晰、合作资料是否可信、服务方向是否匹配、是否存在重复提交或明显异常行为。',
          '除非为了完成你主动发起的对接、满足合规义务、解决争议或保护平台安全，否则平台不会将你的资料用于与当前沟通明显无关的滥用场景。',
        ],
      },
      {
        title: '访问、更正与删除 Access, Update, Deletion',
        paragraphs: [
          '如果你希望查看、更正或删除你通过本站提交的信息，可以通过联系页面或支持页面发起请求，并尽量说明提交时间、页面路径、邮箱、电话或其他识别信息。',
          '在不影响必要留档、compliance handling、风控记录与纠纷排查的前提下，平台会尽量在合理范围内处理这些请求。',
          'If a request is incomplete or cannot be verified, we may ask for additional proof before taking action on the data record.',
        ],
      },
      {
        title: '共享与保留 Sharing & Retention',
        paragraphs: [
          '当你主动发起需求对接、合作申请或争议协助时，平台可能在必要范围内把相关信息提供给对应的内部处理人员或相关合作对象，以推进服务流程。',
          'Information is retained for a reasonable period based on business communication, dispute review, anti-abuse needs, and operational continuity. 超过必要范围后，平台会尽量减少保留或停止继续使用。',
        ],
      },
    ],
    linksTitle: '相关页面 Related Pages',
    links: [
      { target: 'terms', label: '查看服务条款 Terms', description: '了解平台使用规则与 acceptable use 边界。' },
      { target: 'support', label: '提交隐私请求 Support', description: '通过支持路径提交 access、update 或 deletion 申请。' },
      { target: 'contact', label: '联系平台 Contact', description: '用于一般咨询、合作沟通与内容反馈。' },
    ],
  },
  refund: {
    navLabel: 'Process & Refund',
    title: '合作流程与退款说明 Our Process & Refund',
    eyebrow: '流程透明 / Process Transparency',
    intro:
      '本页面用于说明 Kuankedao 的标准沟通流程，以及涉及收费沟通、资源撮合或执行推进时的基础退款处理原则，帮助合作双方在开始前有 clearer expectations。A transparent workflow helps reduce confusion, delay, and avoidable disputes.',
    updatedLabel: '最近更新：2026-06-11',
    badges: ['Process', '流程说明', 'Refund Rules', '争议处理'],
    sections: [
      {
        title: '标准合作流程 Standard Workflow',
        paragraphs: [
          '通常流程包括需求提交、信息确认、资源筛选、合作沟通、执行推进与结果复盘。不同资源类型可能存在 additional review、排期、素材准备、account setup 或平台政策检查环节。',
          '在进入具体执行前，平台建议双方确认目标、deliverables、节奏、费用构成、验收口径、取消条件与沟通负责人，以减少执行偏差。',
          'For cross-border or multi-channel campaigns, extra time may be needed for translation, compliance review, creative adjustment, or inventory confirmation.',
        ],
      },
      {
        title: '退款原则 Refund Principles',
        paragraphs: [
          '如果某项收费仍处于沟通或确认阶段，且尚未进入实质性资源消耗、排期占用、内容制作或执行启动，平台会结合实际情况协商取消或退款。',
          '如已经进入执行阶段，或已经产生明确的人力、媒介、档期、制作、采购、booking 或账户配置等成本，退款处理将以实际消耗、书面确认结果和双方约定为依据。',
          'No refund policy should be interpreted as automatic or unconditional. Each case is reviewed according to stage, cost incurred, confirmed scope, and available evidence.',
        ],
      },
      {
        title: '申诉与材料准备 Dispute Materials',
        paragraphs: [
          '如需发起退款、争议说明或流程申诉，请尽快提交订单背景、合作对象、timeline、截图、invoice、沟通记录及希望解决的问题。',
          '资料越完整，平台越容易判断当前阶段、已发生消耗、双方确认范围以及可行的协调方案。',
          'If the dispute involves a third-party platform, campaign rejection, content policy issue, or sudden suspension, relevant notices and screenshots should be included as evidence.',
        ],
      },
      {
        title: '不适用或特殊情况 Exceptions',
        paragraphs: [
          '对于明确写明为 non-refundable 的预占档期、专项制作、加急服务、第三方固定成本或已经交付的数字服务，退款空间可能受到明显限制。',
          '如遇系统故障、平台侧明显操作失误或重复扣费等特殊情况，平台会优先核查事实并在合理范围内给出 correction、credit 或 further handling suggestion。',
        ],
      },
    ],
    linksTitle: '相关页面 Related Pages',
    links: [
      { target: 'partners', label: '资源入驻 Partners', description: '如果你是服务方或渠道方，可先补充机构资料、能力范围与案例摘要。' },
      { target: 'support', label: '申请支持 Support', description: '针对退款、争议或状态更新提交说明。' },
      { target: 'contact', label: '联系平台 Contact', description: '用于商务沟通、流程确认和一般问题反馈。' },
    ],
  },
  contact: {
    navLabel: 'Contact',
    title: '联系我们 Contact Us',
    eyebrow: '联系渠道 / Contact Channels',
    intro:
      '如果你需要商务合作、资源入驻、内容修正、隐私请求或一般咨询，可以通过本站对应页面提交信息。We route messages by request type so that business inquiries, support matters, and content feedback can be handled more efficiently.',
    updatedLabel: '最近更新：2026-06-11',
    badges: ['Contact', '商务合作', 'Content Feedback', '隐私与支持'],
    contactCard: {
      title: '公开联系 Public Contact',
      emailLabel: '官方邮箱 Official Email',
      email: 'hi@kuankedao.com',
      notes: [
        '适用于一般商务咨询、合作沟通、内容反馈与公开联系。',
        '如需更快分流，建议按问题类型使用 Partners、Support 或 Privacy 相关页面。',
      ],
    },
    sections: [
      {
        title: '联系范围 What You Can Contact Us For',
        paragraphs: [
          '适用于资源合作咨询、品牌投放需求、案例内容更正、隐私相关问题、页面纠错、support follow-up 以及一般业务沟通。',
          '为便于处理，请尽量提供你的姓名或团队名称、联系方式、相关页面路径、问题摘要、project background 以及希望的回复方式。',
          '官方联系邮箱 currently available 为 hi@kuankedao.com，你也可以通过站内页面提交合作资料或支持说明，平台会根据问题类型继续分流处理。',
          'If your request is urgent, please state the deadline, campaign date, or business impact clearly in the message.',
        ],
      },
      {
        title: '建议联系路径 Recommended Path',
        paragraphs: [
          '如你是品牌方或项目方，请优先通过联系页面直接说明目标、budget 和 timeline，这样平台更容易完成初步判断与分流。',
          '如你是资源方或服务方，请优先通过“入驻合作”页面提交机构信息、service scope、市场覆盖和案例摘要。',
          'For media, partnership, or strategic collaboration requests, you may also use this page as a general contact entry.',
        ],
      },
      {
        title: '响应说明 Response Notes',
        paragraphs: [
          '平台会按照问题类型进行分类处理，尽量在工作日内给出初步响应；如涉及多方核实、退款争议、资料补充或 compliance review，处理时间可能相应延长。',
          '对于缺少必要背景信息的咨询，平台可能先请求补充资料后再继续跟进。',
          'Submitting one clear message with complete context is usually faster than sending multiple fragmented follow-ups.',
        ],
      },
      {
        title: '联系方式建议 Contact Format',
        paragraphs: [
          '建议在留言中使用简洁结构，例如：Who you are / What you need / Target market / Budget / Expected timeline / Preferred next step。',
          'A structured message helps us route the request faster and reduces unnecessary back-and-forth communication.',
          '如直接通过 email 联系，建议在邮件主题中加入关键词，例如 Business Inquiry、Partner Application、Support Request 或 Privacy Request，以便更快识别。',
        ],
      },
    ],
    linksTitle: '相关页面 Related Pages',
    links: [
      { target: 'partners', label: '资源入驻 Partners', description: '服务方与渠道方提交入驻合作资料。' },
      { target: 'partners', label: '资源入驻 Partners', description: '服务方与渠道方提交入驻合作资料。' },
      { target: 'support', label: '支持中心 Support', description: '针对问题排查、流程状态和申诉获取帮助。' },
    ],
  },
  support: {
    navLabel: 'Support',
    title: '支持中心 Support Center',
    eyebrow: '售前售后支持 / Service Support',
    intro:
      '本页面说明当你遇到页面异常、合作流程问题、内容纠错、隐私请求或退款争议时，应该如何准备材料并通过合适路径提交支持请求。A clear support process helps both sides save time and move issues toward a practical resolution.',
    updatedLabel: '最近更新：2026-06-11',
    badges: ['Support', '问题排查', 'Process Status', '申诉协助'],
    sections: [
      {
        title: '我们可以协助的事项 What We Can Help With',
        paragraphs: [
          '包括页面访问异常、表单提交问题、合作流程状态查询、资料修正、内容纠错、隐私访问请求、refund clarification 以及争议协调。',
          '如果问题涉及具体资源方、执行方或第三方平台，请尽量提供对方名称、沟通记录、order context 与关键时间点。',
          'We can often help clarify process, identify missing information, and suggest the next step, even when the final resolution requires multiple parties.',
        ],
      },
      {
        title: '提交前建议准备 Before You Submit',
        paragraphs: [
          '请尽量整理页面链接、截图、浏览器环境、提交时间、联系人信息、订单背景、conversation record 或相关沟通记录，以减少来回确认成本。',
          '如果是内容问题，建议同时附上需要修改的原文位置、原文截图与建议改法；如果是退款问题，请附上费用构成、当前阶段说明与相关确认记录。',
          '如果你通过 hi@kuankedao.com 发起支持，请在邮件中一并附上相关背景信息，以便平台更快完成初步判断与分流。',
          'For technical issues, a clear error message, browser version, and reproduction steps will speed up diagnosis.',
        ],
      },
      {
        title: '处理方式 How Requests Are Handled',
        paragraphs: [
          '平台会先确认问题类型，再决定是直接答复、回收补充信息，还是进入内部协同与进一步核实。',
          '如涉及合作争议，平台会基于现有记录协助厘清阶段、scope 与责任边界，但最终执行结果仍需结合双方实际约定。',
          'Some cases can be resolved quickly, while others may require staged follow-up, additional review, or cross-team confirmation.',
        ],
      },
      {
        title: '处理结果类型 Possible Outcomes',
        paragraphs: [
          '支持请求的结果可能包括 direct answer、信息补充建议、内容修正、流程说明、状态同步、争议协助或建议转入其他正式路径处理。',
          'If the issue is outside our handling scope, we will try to explain the boundary clearly and point you to the most relevant next step.',
        ],
      },
    ],
    linksTitle: '相关页面 Related Pages',
    links: [
      { target: 'contact', label: '联系平台 Contact', description: '提交一般咨询、商务沟通和内容反馈。' },
      { target: 'refund', label: '查看退款说明 Refund', description: '先了解流程阶段与退款处理原则。' },
      { target: 'privacy', label: '查看隐私政策 Privacy', description: '了解数据访问、更正与删除的处理方式。' },
    ],
  },
}

const enPages: Record<TrustPageId, TrustPageContent> = {
  terms: {
    navLabel: 'Terms',
    title: 'Terms of Service 服务条款',
    eyebrow: 'Platform Rules / 平台规则',
    intro:
      'This page explains the basic rules for using Kuankedao as a promotion resource matching platform, including submission standards, usage boundaries, and cooperation expectations. 当你浏览网站、提交需求或发送合作资料时，即表示你理解并接受这些基础规则。',
    updatedLabel: 'Last updated: 2026-06-11',
    badges: ['Terms', 'Platform rules', '提交规范', 'Behavior boundaries'],
    sections: [
      {
        title: 'Platform Role 平台角色',
        paragraphs: [
          'Kuankedao provides resource presentation, request collection, partner matching, and informational content. We try to improve transparency, but we do not guarantee the outcome, conversion, or commercial return of every third-party resource.',
          'Site content is designed to help users understand categories, workflow, and common questions. 具体合作方式、交付边界、验收标准与付款规则，仍需由相关合作方进一步确认。',
          'The platform acts more like a connector, curator, and information hub than the direct delivery party for every external service listed on the site.',
        ],
      },
      {
        title: 'Information You Submit 提交信息要求',
        paragraphs: [
          'Company details, contact information, budget, timeline, case descriptions, website links, and other materials submitted through the site should be accurate, complete, and reasonably verifiable.',
          'If we detect misleading claims, fake identity, infringement, spam-like behavior, fabricated performance metrics, or other risky submissions, we may reject publication, pause processing, or stop the related matching flow.',
          '多次提交低质量资料、虚构案例或冒用身份，可能导致 future submissions being restricted or permanently rejected.',
        ],
      },
      {
        title: 'Acceptable Use 可接受使用范围',
        paragraphs: [
          'You must not use the site for unlawful activity, abusive scraping, identity spoofing, spam outreach, infringing content, automated form flooding, or behavior that disrupts normal platform operation.',
          '不得借助本站进行虚假背书、恶意引流、数据滥采、伪装品牌身份或对其他合作对象进行骚扰式触达。',
          'We reserve the right to restrict, block, or retain records of abnormal access, malicious submissions, API abuse, and other forms of misuse.',
        ],
      },
      {
        title: 'Responsibility Boundary 责任边界',
        paragraphs: [
          'Where delays or performance fluctuations are caused by third-party channels, social platforms, ad systems, payment providers, scheduling changes, or content review rules, we may assist with coordination but cannot assume unlimited liability.',
          '在任何付费执行开始前，建议双方以 written confirmation 的方式明确 deliverables、timeline、fee structure、refund conditions 与 communication owner。',
        ],
      },
    ],
    linksTitle: 'Related Pages 相关页面',
    links: [
      { target: 'privacy', label: 'Privacy Policy 隐私政策', description: 'Learn how submitted data and form records are handled.' },
      { target: 'contact', label: 'Contact Us 联系我们', description: 'Reach the platform for business or content requests.' },
      { target: 'support', label: 'Support 支持中心', description: 'Get help with process questions, status issues, or page problems.' },
    ],
  },
  privacy: {
    navLabel: 'Privacy',
    title: 'Privacy Policy 隐私政策',
    eyebrow: 'Data Handling / 数据使用',
    intro:
      'This page explains what information Kuankedao may collect when you browse the website, submit a request, apply as a partner, or ask for support, and how that information is used. 我们希望数据处理保持 practical, limited, and service-related，而不是无边界收集。',
    updatedLabel: 'Last updated: 2026-06-11',
    badges: ['Privacy', 'Form data', '用途说明', 'Access & deletion'],
    sections: [
      {
        title: 'Information We May Collect 我们收集的信息',
        paragraphs: [
          'When you contact us through request, partner onboarding, or support forms, you may provide company name, contact details, budget range, target markets, case summaries, website links, social profiles, and other information you choose to share.',
          'The site may also record basic visit data such as accessed pages, device type, browser details, referral path, submit time, and standard performance logs to keep the site stable and improve usability.',
          '我们不会以“先多收集再考虑用途”的方式处理数据，而是尽量围绕 communication, matching, review, security, and operations 来做必要处理。',
        ],
      },
      {
        title: 'Why We Use It 信息使用目的',
        paragraphs: [
          'We use this information to respond to inquiries, complete resource matching, support cooperation workflows, handle support requests, identify abnormal submissions, perform basic risk review, and improve site content and process design.',
          'Some records may also be used for internal review to evaluate whether a request is clear, whether partner materials are credible, and whether a workflow contains duplication or abuse risk.',
          '除非为了推进你主动发起的沟通、履行合规义务、处理争议或保障平台安全，否则我们不会把这些信息用于明显无关的滥用场景。',
        ],
      },
      {
        title: 'Access, Correction, and Deletion 访问与删除',
        paragraphs: [
          'If you want to access, correct, or delete information submitted through this site, you can contact us through the contact or support pages and include the submission time, page path, email, phone number, or other identifying details where possible.',
          'As long as it does not conflict with necessary records, compliance handling, anti-abuse review, or dispute assessment, we will try to process those requests within a reasonable scope.',
          '如果请求信息不足、无法验证身份或缺少关键记录，我们可能会先要求补充说明后再继续处理。',
        ],
      },
      {
        title: 'Sharing and Retention 共享与保留',
        paragraphs: [
          'Where necessary to complete a request, onboarding review, or dispute support process, relevant information may be shared with internal handlers or the relevant cooperation party on a limited basis.',
          'Information is retained for a reasonable period based on business communication, dispute review, anti-abuse needs, and operational continuity. 超出必要范围后，我们会尽量减少继续保留和继续使用。',
        ],
      },
    ],
    linksTitle: 'Related Pages 相关页面',
    links: [
      { target: 'terms', label: 'Terms of Service 服务条款', description: 'Review platform rules and acceptable use boundaries.' },
      { target: 'support', label: 'Privacy Request 支持中心', description: 'Use the support path for access, correction, or deletion requests.' },
      { target: 'contact', label: 'Contact Us 联系我们', description: 'Reach us for general inquiries and cooperation communication.' },
    ],
  },
  refund: {
    navLabel: 'Process & Refund',
    title: 'Our Process & Refund 合作流程与退款说明',
    eyebrow: 'Process Transparency / 流程透明',
    intro:
      'This page explains the standard collaboration flow used by Kuankedao and the basic refund principles that apply when paid communication, resource matching, or execution work is involved. 清晰流程有助于减少误解，也能让双方在开始前形成更稳定的预期。',
    updatedLabel: 'Last updated: 2026-06-11',
    badges: ['Process', '合作流程', 'Refund principles', '争议处理'],
    sections: [
      {
        title: 'Standard Workflow 标准合作流程',
        paragraphs: [
          'A typical flow includes request intake, information confirmation, resource screening, partner communication, execution progress, and result review. Different resource types may require additional review, scheduling, asset preparation, account setup, or policy checks.',
          'Before execution starts, we recommend that all parties confirm goals, scope, deliverables, timing, fee structure, acceptance criteria, and cancellation conditions in writing to reduce misunderstandings.',
          '对于 cross-border、multi-market 或 multi-channel 项目，translation, creative adjustment, compliance review, and inventory confirmation may add extra lead time.',
        ],
      },
      {
        title: 'Refund Principles 退款原则',
        paragraphs: [
          'If a paid item is still in the communication or confirmation stage and has not entered substantial resource consumption, scheduling allocation, production work, or execution kickoff, cancellation or refund may be discussed based on the actual situation.',
          'If execution has already started, or if human effort, media inventory, booking slots, content production, purchasing, or account configuration costs have already been consumed, refund handling depends on actual consumption, written confirmation, and the relevant agreement.',
          '退款并不表示 automatic or unconditional approval. Each case is reviewed according to stage, cost incurred, confirmed scope, and available evidence.',
        ],
      },
      {
        title: 'Dispute Submissions 申诉与材料准备',
        paragraphs: [
          'If you need to request a refund, explain a dispute, or ask for process review, please submit the project background, timeline, screenshots, communication records, invoice details, and the outcome you are seeking as clearly as possible.',
          'The more complete the material, the easier it is to assess the current stage, the work already consumed, the agreed scope, and possible coordination options.',
          '如果争议涉及第三方平台拒审、内容政策限制、账户异常或外部封禁，请同时提供相关 notice、截图或 rejection reason。',
        ],
      },
      {
        title: 'Exceptions 特殊情况',
        paragraphs: [
          'Clearly non-refundable booking slots, rush services, custom production, third-party fixed fees, or already-delivered digital work may have limited or no refund room once confirmed.',
          '对于系统异常、重复扣费、平台侧明显操作失误等特殊情况，我们会优先核查事实，并在合理范围内提供 correction、credit 或 further handling suggestion。',
        ],
      },
    ],
    linksTitle: 'Related Pages 相关页面',
    links: [
      { target: 'partners', label: 'Partner Onboarding 资源入驻', description: 'Share your profile, service scope, and case summary if you provide services or channels.' },
      { target: 'support', label: 'Get Support 支持中心', description: 'Ask for help with refund, dispute, or status questions.' },
      { target: 'contact', label: 'Contact Us 联系我们', description: 'Use this path for general business communication.' },
    ],
  },
  contact: {
    navLabel: 'Contact',
    title: 'Contact Us 联系我们',
    eyebrow: 'Contact Channels / 联系渠道',
    intro:
      'If you need business communication, partner onboarding, content correction, privacy requests, or general inquiries, use the relevant pages on this site so we can route the request correctly. 通过清晰的 contact path，我们可以让 business, support, and content-related messages进入更合适的处理流程。',
    updatedLabel: 'Last updated: 2026-06-11',
    badges: ['Contact', 'Business inquiries', '内容反馈', 'Privacy & support'],
    contactCard: {
      title: 'Public Contact 公开联系',
      emailLabel: 'Official Email 官方邮箱',
      email: 'hi@kuankedao.com',
      notes: [
        'Use this address for general business inquiries, cooperation discussions, content feedback, and public contact.',
        'For faster routing, more specific cases are usually better submitted through the partner, support, or privacy-related pages.',
      ],
    },
    sections: [
      {
        title: 'What to Contact Us For 联系范围',
        paragraphs: [
          'Use this path for resource cooperation inquiries, campaign requests, case corrections, privacy-related concerns, page error reports, support follow-up, and general business communication.',
          'To speed up handling, include your name or team, contact details, related page path, issue summary, project background, and preferred reply method whenever possible.',
          'The current public contact email is hi@kuankedao.com. You may also use on-site forms so the request can enter the right workflow directly.',
          '如果事情比较紧急，请明确 deadline、campaign launch date、预算窗口或 business impact，避免问题被误判为普通咨询。',
        ],
      },
      {
        title: 'Recommended Paths 建议联系路径',
        paragraphs: [
          'If you are a brand or project owner, the best first step is this contact page, where you can explain goals, budget, target market, and timeline in a structured way.',
          'If you are a service provider or channel partner, the best first step is the partner onboarding page, where you can share your organization profile, service range, coverage markets, and case summary.',
          'For media cooperation, strategic partnership, or PR-related communication, this page can also serve as a general contact entry.',
        ],
      },
      {
        title: 'Response Notes 响应说明',
        paragraphs: [
          'Requests are triaged by issue type and we aim to provide an initial response as soon as practical on business days. Cases involving multi-party review, refund disputes, missing information, or compliance review may take longer.',
          'If the initial message lacks enough context, we may ask for more material before continuing the review.',
          'One complete message is usually faster than multiple fragmented follow-ups, because it reduces re-checking and routing time.',
        ],
      },
      {
        title: 'Suggested Contact Format 联系格式建议',
        paragraphs: [
          'A practical structure is: Who you are / What you need / Market or channel / Budget / Timeline / Desired next step。',
          '用结构化表达提交信息，通常会比只写一句“请联系我”更容易得到准确回复。',
          'If you contact us by email, adding a clear subject such as Business Inquiry, Partner Application, Support Request, or Privacy Request will help route the message faster.',
        ],
      },
    ],
    linksTitle: 'Related Pages 相关页面',
    links: [
      { target: 'contact', label: 'Contact Us 联系我们', description: 'For brands and project owners seeking cooperation.' },
      { target: 'partners', label: 'Partner Onboarding 资源入驻', description: 'For service providers and channels applying to join.' },
      { target: 'support', label: 'Support Center 支持中心', description: 'For issue diagnosis, status follow-up, and dispute help.' },
    ],
  },
  support: {
    navLabel: 'Support',
    title: 'Support Center 支持中心',
    eyebrow: 'Service Support / 售前售后支持',
    intro:
      'This page explains how to ask for help when you encounter page issues, cooperation process questions, content corrections, privacy requests, or refund disputes, and what information is useful before you submit a support request. 明确的支持流程有助于更快定位问题，也能减少无效沟通。',
    updatedLabel: 'Last updated: 2026-06-11',
    badges: ['Support', 'Issue diagnosis', '流程状态', 'Dispute support'],
    sections: [
      {
        title: 'What We Can Help With 我们可以协助的事项',
        paragraphs: [
          'This includes page access issues, form submission problems, cooperation status questions, material corrections, content fixes, privacy access requests, refund clarification, and dispute explanations.',
          'If your case involves a specific resource partner, execution provider, or third-party platform, include names, message records, order context, and key timeline points whenever possible.',
          'We can often help clarify process, identify missing information, and suggest the next step, even when final resolution requires multiple parties to confirm.',
        ],
      },
      {
        title: 'Before You Submit 提交前建议准备',
        paragraphs: [
          'Please prepare page links, screenshots, browser details, submission time, contact information, project background, and related communication records to reduce back-and-forth clarification.',
          'For content issues, include the original passage, screenshot, and the correction you want. For refund issues, include the fee breakdown, current project stage, and any written confirmation already provided.',
          'If you submit by hi@kuankedao.com, include the relevant background in the same thread so the support review can start with enough context.',
          '对于技术问题，clear error message、browser version、device type 与 reproduction steps 往往能显著加快排查速度。',
        ],
      },
      {
        title: 'How Requests Are Handled 处理方式',
        paragraphs: [
          'We first identify the issue type, then decide whether to answer directly, request more information, or move the case into internal coordination and further review.',
          'If a case involves cooperation disputes, we can help clarify stage, scope, and responsibility based on available records, but final execution outcomes still depend on the actual agreement between the parties.',
          'Some requests can be resolved quickly, while others may require staged follow-up, additional review, or cross-team confirmation.',
        ],
      },
      {
        title: 'Possible Outcomes 处理结果类型',
        paragraphs: [
          'Support outcomes may include a direct answer, a request for more information, a content correction, a status update, a workflow explanation, dispute assistance, or guidance to a more suitable formal path.',
          '如果问题超出当前处理范围，我们会尽量说明边界，并指向最相关的 next step，而不是让请求停在模糊状态。',
        ],
      },
    ],
    linksTitle: 'Related Pages 相关页面',
    links: [
      { target: 'contact', label: 'Contact Us 联系我们', description: 'For general inquiries, business communication, and content feedback.' },
      { target: 'refund', label: 'Our Process & Refund 流程与退款', description: 'Review process stages and refund principles first.' },
      { target: 'privacy', label: 'Privacy Policy 隐私政策', description: 'Review how access, correction, and deletion requests are handled.' },
    ],
  },
}

function normalizeLocale(locale: Locale) {
  if (locale === 'zh' || locale === 'zh-tw') {
    return 'zh' as const
  }

  return 'en' as const
}

export function getTrustPageContent(locale: Locale, pageId: TrustPageId) {
  const group = normalizeLocale(locale)
  const source = group === 'zh' ? zhPages : enPages
  return source[pageId]
}

export function getTrustPageLinks(locale: Locale) {
  return (Object.keys(zhPages) as TrustPageId[]).map((pageId) => ({
    pageId,
    label: getTrustPageContent(locale, pageId).navLabel,
  }))
}
