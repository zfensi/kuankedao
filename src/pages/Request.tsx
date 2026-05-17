import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/i18n/useI18n'
import { createRequest } from '@/api/kuankedao'
import { splitComma } from '@/utils/strings'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Request() {
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')

  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactValue, setContactValue] = useState('')
  const [industry, setIndustry] = useState('')
  const [budgetRange, setBudgetRange] = useState('')
  const [projectCycle, setProjectCycle] = useState('')
  const [targetMarketsText, setTargetMarketsText] = useState('')
  const [promotionGoalsText, setPromotionGoalsText] = useState('')
  const [requirementDescription, setRequirementDescription] = useState('')

  const canSubmit = useMemo(() => {
    if (!companyName.trim()) return false
    if (!contactValue.trim()) return false
    if (!industry.trim()) return false
    if (!budgetRange.trim()) return false
    if (!projectCycle.trim()) return false
    if (!requirementDescription.trim()) return false
    return true
  }, [companyName, contactValue, industry, budgetRange, projectCycle, requirementDescription])

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h1 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{t('requestTitle')}</h1>
        <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">{t('requestDesc')}</p>
        <Card className="mt-6 p-5">
          <div className="text-xs text-[rgb(var(--muted))]">{t('brandNameEn')}</div>
          <div className="mt-2 text-sm font-medium text-[rgb(var(--fg))]">{t('heroTitleB')}</div>
          <div className="mt-3 text-xs leading-relaxed text-[rgb(var(--muted))]">{t('heroDesc')}</div>
        </Card>
      </div>

      <div className="lg:col-span-7">
        <Card className="p-6">
          <form
            className="grid gap-4"
            onSubmit={async (e) => {
              e.preventDefault()
              if (!canSubmit || status === 'submitting') return
              setStatus('submitting')
              try {
                const res = await createRequest({
                  companyName: companyName.trim(),
                  contactName: contactName.trim(),
                  contactValue: contactValue.trim(),
                  industry: industry.trim(),
                  budgetRange: budgetRange.trim(),
                  projectCycle: projectCycle.trim(),
                  targetMarkets: splitComma(targetMarketsText),
                  promotionGoals: splitComma(promotionGoalsText),
                  requirementDescription: requirementDescription.trim(),
                })
                if (!res.success) throw new Error('failed')
                setStatus('success')
              } catch {
                setStatus('error')
              }
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formCompany')}</div>
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </div>
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formIndustry')}</div>
                <Input value={industry} onChange={(e) => setIndustry(e.target.value)} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formContactName')}</div>
                <Input value={contactName} onChange={(e) => setContactName(e.target.value)} />
              </div>
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formContactValue')}</div>
                <Input value={contactValue} onChange={(e) => setContactValue(e.target.value)} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formBudget')}</div>
                <Input value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} />
              </div>
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formCycle')}</div>
                <Input value={projectCycle} onChange={(e) => setProjectCycle(e.target.value)} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formMarkets')}</div>
                <Input value={targetMarketsText} onChange={(e) => setTargetMarketsText(e.target.value)} />
              </div>
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formGoals')}</div>
                <Input value={promotionGoalsText} onChange={(e) => setPromotionGoalsText(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="text-xs text-[rgb(var(--muted))]">{t('formRequirement')}</div>
              <Textarea value={requirementDescription} onChange={(e) => setRequirementDescription(e.target.value)} />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-[rgb(var(--muted))]">
                {status === 'success' && <span className="text-[rgb(var(--fg))]">{t('formSuccess')}</span>}
                {status === 'error' && <span className="text-[rgb(var(--fg))]">{t('formError')}</span>}
              </div>
              <Button type="submit" disabled={!canSubmit || status === 'submitting'}>
                {status === 'submitting' ? t('formSubmitting') : t('formSubmit')}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

