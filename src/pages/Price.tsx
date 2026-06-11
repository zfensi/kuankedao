import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { useI18n } from '@/i18n/useI18n'

type FaqItem = {
  q: string
  yes: boolean
  a: string[]
}

type PriceContent = {
  eyebrow: string
  title: string
  intro: string
  highlights: Array<{ label: string; value: string }>
  addOns: Array<{ title: string; desc: string }>
  notesTitle: string
  notes: string[]
  faqTitle: string
  faqIntro: string
  faqs: FaqItem[]
}

const zhContent: PriceContent = {
  eyebrow: '价格方案 / PRICING + FAQ',
  title: '299 包月方案 + FAQ 合并页',
  intro:
    '这个页面把价格、服务边界、额外收费项和常见问题放在一起，方便你先快速判断是否适合，再决定是否下单。整体原则是：价格透明、数据透明、边界透明，不做夸张承诺。',
  highlights: [
    { label: '包月价格', value: '299 RMB / 月' },
    { label: '项目配置', value: '1 个 URL，1~3 个关键词' },
    { label: '配速范围', value: '10~100 / day' },
    { label: '外链结构', value: '支持 Tier1、Tier2 搭建' },
  ],
  addOns: [
    {
      title: '自然收录 Natural Indexing',
      desc: '默认支持免费自然 Google 收录，但整体偏慢，通常需要 10 天到 1 个月左右，具体取决于站点状态、页面质量、外链节奏和 Google 抓取情况。',
    },
    {
      title: '快速 Google 收录宝（额外收费）',
      desc: '100 元 / 月，属于额外收费项。用于加快部分页面的收录尝试，当前经验值约为 20%~30% 收录成功率，通常 3~5 天看到结果，但不做百分百收录保证。',
    },
  ],
  notesTitle: '服务说明 Service Notes',
  notes: [
    '系统以自动外链分发为核心，不承诺“流量翻倍”或固定排名提升。',
    '你主要看 Dashboard 数据即可，日常不需要自己手动逐条发外链。',
    '系统平均约 12 小时更新一次数据；配置修改、关键词替换、URL 替换通常 12~24 小时生效。',
    '注册账号查看入口通常按周提供一次，不建议多地同时登录，以免 IP / Proxy 环境冲突导致风控。',
  ],
  faqTitle: '常见问题 Frequently Asked Questions',
  faqIntro:
    '下面这些 FAQ 基本就是把你真正会问到的事情直接说清楚，包括流量预期、账号查看、隐私、暂停、退费、Guest Post 和数据延迟等问题。',
  faqs: [
    {
      q: '流量保证翻倍不？',
      yes: false,
      a: [
        'NO。我们不承诺翻倍流量，也不做“给 2999 元就立刻翻倍流量”的销售话术。',
        'Google SEO 代运营在市场上通常是几千到几万元一个月，而且往往要做 3~6 个月才逐步见效，这是市场常见节奏。',
        '我们提供的是自动外链分发系统。对你来说更偏向全自动执行，你只需要关注 Dashboard 数据；系统由我们自己在用，也有专人持续维护和做算法适配。',
      ],
    },
    {
      q: '注册账号提供不？',
      yes: true,
      a: [
        'YES。通常 1 周提供一次查看入口，便于你检查数据。',
        '不建议频繁自行登录或多人同时登录，因为大家的 IP / Proxy 环境不同，同时登录存在触发风控的可能。',
      ],
    },
    {
      q: '外链永久有效不？',
      yes: true,
      a: [
        'YES。无论包月 1 个月还是 6 个月，已经产出的外链数据、账号数据本质上都归属于你的项目。',
        'Google 一旦收录，后续流量归你。我们不会专门花时间去删除账号、删除已经发出的外链帖子，这点可以放心。',
      ],
    },
    {
      q: '提供免费试用不？',
      yes: false,
      a: [
        'NO。平台不提供传统意义上的“试用套餐”。',
        '但外链平台是实时公开的，你可以先用邮箱注册，免费下载最近 7 天数据，再判断外链质量、数据量和整体体验后决定是否下单。',
      ],
    },
    {
      q: '大批量购买，有优惠没？',
      yes: false,
      a: [
        'NO，原则上不做直接打折。一分钱一分货，我们更希望把价格、数据和服务边界都做透明。',
        '不过如果你包月 3 个月，我们免费赠送 1 个月；如果你包月 6 个月，我们免费赠送 2 个月。',
        '和一些信息不透明的平台相比，我们更强调实时数据、过程透明和长期维护。',
      ],
    },
    {
      q: '配置速度、关键词替换，实时不？',
      yes: true,
      a: [
        'YES，但不是秒级实时。系统整体较忙，平均约 12 小时更新一次数据。',
        '你完成配置后，我们内部还要做适配，通常约 12~24 小时后新的外链才会逐步体现出来。',
      ],
    },
    {
      q: '包月时间内，URL 可以替换不？关键词可以替换不？',
      yes: true,
      a: [
        'YES，可以替换。新的 URL、新的关键词通常会在 12~24 小时左右逐步生效。',
        '更换后建议继续观察 Dashboard 数据，而不是只盯某个第三方工具的即时显示。',
      ],
    },
    {
      q: '为啥 299 元这么便宜？',
      yes: true,
      a: [
        'YES。因为我们本质上是技术团队，不是传统外链中介。这个渠道也是 2026 年夏天开始做的新方向，我们自己就在使用同一套系统。',
        '早期我们在找外链、做 SEO 的过程中也踩过很多坑，花过不少成本，感觉这个市场最大的问题之一就是不透明。',
        '所以现在的思路很直接：把数据、流程和结果尽量公开，减少包装。你的付费也会一起分摊 VPS、Proxy、Captcha、软件与 Cloudcode Token 等真实技术成本。',
      ],
    },
    {
      q: '包月可以暂停不？',
      yes: true,
      a: [
        'YES。你可以在 Dashboard 后台勾选暂停，大约 12 小时左右系统会逐步暂停该 project 的新外链任务。',
        '暂停不等于删除历史数据，只是停止继续推进新的外链分发。',
      ],
    },
    {
      q: '包月退费不？',
      yes: true,
      a: [
        'YES，但有边界。如果包月大于 1 个月，第 1 个月通常不退，后续尚未消耗的月份可以继续协商退费。',
        '原因很简单：启动配置、调度和适配本身很繁琐，而外链和 SEO 通常也是 2~6 个月才更容易看到效果，1 个月内频繁下单又退费，会影响正常业务。',
        '如果你暂时不想继续推进，也可以先暂停，后续再继续更换 URL 使用；包月周期按自然 30 天计算。',
      ],
    },
    {
      q: '为啥我停止了，陆续还有新的外链来？',
      yes: true,
      a: [
        'YES，这种现象可能出现，但不代表系统还在无限继续投放。',
        'Google Search、Semrush、Ahrefs 这类工具本身就有数据滞后性。我们见过一个外链 3 天出现，也见过 2 周后才被第三方工具看见。',
        '原则上停止后，我们不会继续无限制消耗 Proxy 资源给你送新外链。通常在 12~24 小时内，新任务会停止；你后面看到的更多是索引或第三方工具的延迟反映。',
      ],
    },
    {
      q: '你们提供 Guest Post 的高质量外链合作不？',
      yes: false,
      a: [
        'NO。我们目前不主打赚 Guest Post 中间差价，这块我们自己也在持续探索。',
        '10 美元到 300 美元区间的外链合作我们也接触过很多，你如果愿意，也可以直接去试平台，不一定非要通过我们转手。',
        '平台外链更适合“先小后大、先低成本试错”。如果未来有靠谱个人或团队能提供更高质量资源，也欢迎留言，我们愿意免费搭桥。',
      ],
    },
    {
      q: '你们保护隐私不？我不想别人知道我的外链数据',
      yes: true,
      a: [
        'YES。基本商业隐私我们是重视的，系统账号彼此隔离。',
        '除了我们自己的官网 kuankedao.com 和博客 chaoniulian.com 这类公开项目外，你的账号和外链数据默认不会向其他用户展示。',
        '因为外链数据体量大、数据库压力也大，在你包月期间我们会为你存储；更建议你把 Json 下载下来，或者通过 API 同步到自己电脑保存。',
        '如果停止包月，我们会免费保留 3 个月数据，之后系统会自动删除账号。你也可以选择在停止包月时同步删除系统内数据库记录。这里指的是删除系统记录，不包含帮你去互联网逐条删外链。',
      ],
    },
    {
      q: '外链靠谱不？299 套餐适合谁？',
      yes: true,
      a: [
        'YES，但要看你的业务体量和预期。外链市场一直都在，几百刀、几千刀、上万刀长期做外链的人一直很活跃。',
        '如果你已经是高流量、大预算项目，299 的套餐未必能带得动你的业务体量；但如果你是新站、月收入几十刀到几百刀的业务，这种低成本试错方式仍然值得一试。',
        '本质上外链仍然是一种博弈。299 元人民币的投入，连续 3 个月也就不到 1000 元，是否继续，可以完全根据你自己的数据反馈来决定。',
      ],
    },
  ],
}

const enContent: PriceContent = {
  eyebrow: 'PRICING + FAQ / Price Overview',
  title: '299 Monthly Plan + FAQ',
  intro:
    'This page combines pricing, scope, extra-charge add-ons, and FAQ in one place so you can judge whether the plan fits before ordering. The core principle is simple: transparent pricing, transparent data, and clear service boundaries.',
  highlights: [
    { label: 'Monthly Price', value: '299 RMB / month' },
    { label: 'Project Setup', value: '1 URL, 1~3 keywords' },
    { label: 'Delivery Pace', value: '10~100 / day' },
    { label: 'Link Structure', value: 'Tier1 + Tier2 supported' },
  ],
  addOns: [
    {
      title: 'Natural Indexing',
      desc: 'Free natural Google indexing is supported by default, but it is slower. In most cases it may take around 10 days to 1 month depending on site condition, page quality, publishing pace, and Google crawl behavior.',
    },
    {
      title: 'Fast Google Index Booster (Extra Charge)',
      desc: '100 RMB / month as an extra-charge add-on. It is used to speed up indexing attempts for some pages. Current observed success rate is around 20%~30%, and results are often seen within 3~5 days, but there is no guaranteed indexing promise.',
    },
  ],
  notesTitle: 'Service Notes',
  notes: [
    'The system focuses on automated backlink distribution and does not promise traffic doubling or fixed ranking improvement.',
    'For most users, the main task is simply to review dashboard data instead of manually posting backlinks one by one.',
    'The system updates on roughly a 12-hour cycle. Configuration changes, keyword replacement, and URL replacement usually take about 12~24 hours to become visible.',
    'Account access is typically provided about once per week. Frequent self-login is not recommended because different IP / proxy environments may trigger platform risk controls.',
  ],
  faqTitle: 'Frequently Asked Questions',
  faqIntro:
    'These FAQ entries cover the main issues users actually care about, including traffic expectations, account access, privacy, pause, refund, guest post, and delayed data visibility.',
  faqs: [
    {
      q: 'Do you guarantee doubled traffic?',
      yes: false,
      a: [
        'NO. We do not promise doubled traffic, and we do not use sales language like “pay 2999 and your traffic will instantly double.”',
        'In the Google SEO market, managed SEO services usually cost from several thousand to tens of thousands per month, and they often need 3~6 months before meaningful results appear. That is normal market reality.',
        'What we provide is an automated backlink distribution system. From your side, it is closer to automated execution: you mainly monitor dashboard data while we handle system maintenance and ongoing Google SEO adaptation.',
      ],
    },
    {
      q: 'Do you provide account access?',
      yes: true,
      a: [
        'YES. Access is usually provided about once a week so you can review the data.',
        'Frequent manual login is not recommended because different IP / proxy environments may cause account or risk-control issues when multiple parties log in.',
      ],
    },
    {
      q: 'Do the backlinks remain effective permanently?',
      yes: true,
      a: [
        'YES. Whether you subscribe for 1 month or 6 months, the backlink data and project-level account data generated during the plan belong to your project.',
        'Once Google indexes the pages, the traffic benefit belongs to you. We do not spend time deleting accounts or removing previously published backlink posts afterward.',
      ],
    },
    {
      q: 'Do you offer a free trial?',
      yes: false,
      a: [
        'NO. There is no traditional free-trial package.',
        'However, the backlink platform is publicly visible in real time. You can register with email first, download the most recent 7-day data, review quality and volume, and decide later whether to order.',
      ],
    },
    {
      q: 'Is there a discount for bulk purchase?',
      yes: false,
      a: [
        'NO. In principle, we do not directly discount the service. We prefer price transparency and process transparency over aggressive discounting.',
        'That said, if you subscribe for 3 months, we give 1 extra month for free. If you subscribe for 6 months, we give 2 extra months for free.',
        'Compared with platforms that are opaque about what they actually deliver, we emphasize real-time data, transparency, and ongoing maintenance.',
      ],
    },
    {
      q: 'Are configuration changes and keyword replacement real-time?',
      yes: true,
      a: [
        'YES, but not second-level real-time. The system is busy and updates on an average cycle of about 12 hours.',
        'After you finish configuration, internal adaptation is still required, so new backlinks usually begin to show up after about 12~24 hours.',
      ],
    },
    {
      q: 'Can I replace the URL or keywords during the subscription period?',
      yes: true,
      a: [
        'YES. Both the target URL and keyword set can be replaced, and the new setup usually takes effect in around 12~24 hours.',
        'After changes are made, it is better to keep watching dashboard data instead of relying only on instant visibility from third-party tools.',
      ],
    },
    {
      q: 'Why is the 299 plan so cheap?',
      yes: true,
      a: [
        'YES, the price is really 299. We are fundamentally a technical team rather than a traditional backlink reseller, and this channel started as a newer direction for us in the summer of 2026.',
        'We also spent real money and made mistakes while testing backlinks and SEO ourselves. One major pain point we saw in this market was lack of transparency.',
        'So our approach is direct: make data, workflow, and outcomes as transparent as possible. Your payment also helps cover actual technical costs such as VPS, proxies, captchas, software, and token-based infrastructure.',
      ],
    },
    {
      q: 'Can a monthly plan be paused?',
      yes: true,
      a: [
        'YES. You can pause the project from the dashboard, and in most cases the system will stop new backlink tasks within about 12 hours.',
        'Pausing does not delete existing history. It only stops the ongoing new distribution workflow.',
      ],
    },
    {
      q: 'Is the monthly plan refundable?',
      yes: true,
      a: [
        'YES, but with boundaries. If the subscription is longer than 1 month, the first month is usually non-refundable, while later unused months can still be discussed.',
        'The reason is practical: initial setup, scheduling, and adaptation work are time-consuming, and backlink / SEO impact typically takes 2~6 months to show more clearly. Frequent ordering and refund requests within the first month affect normal operations.',
        'If you do not want to continue immediately, pausing is usually the better option. You can later resume or switch the URL while the subscription period continues on a 30-day basis.',
      ],
    },
    {
      q: 'Why do I still see new backlinks after I stop?',
      yes: true,
      a: [
        'YES, this can happen, but it does not mean the system is still sending unlimited new backlinks.',
        'Google Search, Semrush, Ahrefs, and similar tools all have data delay. We have seen backlinks appear in 3 days, but also after 2 weeks.',
        'In principle, once a project is stopped, we do not continue spending proxy traffic indefinitely. Usually new tasks stop within 12~24 hours, while later visibility is often just delayed indexing or delayed reporting from external tools.',
      ],
    },
    {
      q: 'Do you offer high-quality guest post backlink deals?',
      yes: false,
      a: [
        'NO. We are not mainly trying to earn a markup from guest post middleman deals, and we are still exploring that area ourselves.',
        'We have used many guest post offers in the 10 USD to 300 USD range. If you want, you can also test platforms directly instead of paying us to resell them.',
        'Our platform-style backlinks are better suited to small-to-large testing and low-cost experimentation first. If high-quality resource owners want to cooperate later, we are happy to help connect them.',
      ],
    },
    {
      q: 'Do you protect privacy? I do not want others to see my backlink data.',
      yes: true,
      a: [
        'YES. Basic business privacy matters to us, and project accounts are isolated from one another.',
        'Except for our own public projects such as kuankedao.com and chaoniulian.com, your account and backlink data are not meant to be visible to other users.',
        'Because backlink data volume is large and database pressure is real, we store it for you during the subscription period. We still recommend downloading JSON data or syncing it to your own machine through API where possible.',
        'After the subscription ends, we keep the data free for about 3 months, after which the system may delete the account automatically. You can also choose to delete the system-side database record earlier. That does not mean we manually remove every backlink already published on the internet.',
      ],
    },
    {
      q: 'Is this 299 plan reliable, and who is it for?',
      yes: true,
      a: [
        'YES, but suitability depends on your business size and expectations. The backlink market has always existed, and serious buyers at hundreds, thousands, or tens of thousands of dollars are still active.',
        'If you already run a large-budget, high-traffic business, a 299 plan may not be powerful enough for your scale. But if you are a newer site or a small business making tens or hundreds of dollars per month, this can still be a reasonable low-cost experiment.',
        'At the end of the day, backlinks are still part of an SEO game. If you invest 299 RMB per month and observe the dashboard for a few months, whether to continue should be based on your own data feedback.',
      ],
    },
  ],
}

export default function Price() {
  const { locale } = useI18n()
  const content = locale === 'en' ? enContent : zhContent

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:px-8">
        <div className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">{content.eyebrow}</div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[rgb(var(--fg))] sm:text-4xl">{content.title}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[rgb(var(--muted))]">{content.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge>299 RMB / month</Badge>
          <Badge>Tier1 + Tier2</Badge>
          <Badge>1 URL / 1~3 keywords</Badge>
          <Badge>10~100 / day</Badge>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {content.highlights.map((item) => (
          <Card key={item.label} className="p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">{item.label}</div>
            <div className="mt-3 text-lg font-semibold tracking-tight text-[rgb(var(--fg))]">{item.value}</div>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {content.addOns.map((item) => (
          <Card key={item.title} className="p-6">
            <h2 className="text-lg font-semibold tracking-tight text-[rgb(var(--fg))]">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted))]">{item.desc}</p>
          </Card>
        ))}
      </section>

      <section>
        <Card className="p-6">
          <h2 className="text-lg font-semibold tracking-tight text-[rgb(var(--fg))]">{content.notesTitle}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {content.notes.map((item) => (
              <div key={item} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4 text-sm leading-7 text-[rgb(var(--muted))]">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">FAQ</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[rgb(var(--fg))]">{content.faqTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted))]">{content.faqIntro}</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {content.faqs.map((item) => (
            <Card key={item.q} className="p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium tracking-tight text-[rgb(var(--fg))]">{item.q}</h3>
                <Badge
                  className={
                    item.yes
                      ? 'border-transparent bg-emerald-500/12 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700'
                      : 'border-transparent bg-rose-500/12 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.22em] text-rose-700'
                  }
                >
                  {item.yes ? 'YES' : 'NO'}
                </Badge>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[rgb(var(--muted))]">
                {item.a.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
