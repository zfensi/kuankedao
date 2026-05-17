import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/i18n/useI18n'
import { createPartnerApplication } from '@/api/kuankedao'
import { splitComma } from '@/utils/strings'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Partners() {
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')

  const [organizationName, setOrganizationName] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactValue, setContactValue] = useState('')
  const [serviceCategoriesText, setServiceCategoriesText] = useState('')
  const [serviceRegionsText, setServiceRegionsText] = useState('')
  const [clientIndustriesText, setClientIndustriesText] = useState('')
  const [caseSummary, setCaseSummary] = useState('')
  const [website, setWebsite] = useState('')

  const canSubmit = useMemo(() => {
    if (!organizationName.trim()) return false
    if (!contactValue.trim()) return false
    if (!caseSummary.trim()) return false
    if (splitComma(serviceCategoriesText).length < 1) return false
    return true
  }, [organizationName, contactValue, caseSummary, serviceCategoriesText])

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h1 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{t('partnersTitle')}</h1>
        <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">{t('partnersDesc')}</p>
        <Card className="mt-6 p-5">
          <div className="text-xs text-[rgb(var(--muted))]">{t('brandNameEn')}</div>
          <div className="mt-2 text-sm font-medium text-[rgb(var(--fg))]">{t('sectionFeaturedResources')}</div>
          <div className="mt-3 text-xs leading-relaxed text-[rgb(var(--muted))]">
            {t('resourcesDesc')}
          </div>
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
                const res = await createPartnerApplication({
                  organizationName: organizationName.trim(),
                  contactName: contactName.trim(),
                  contactValue: contactValue.trim(),
                  serviceCategories: splitComma(serviceCategoriesText),
                  serviceRegions: splitComma(serviceRegionsText),
                  clientIndustries: splitComma(clientIndustriesText),
                  caseSummary: caseSummary.trim(),
                  website: website.trim() || undefined,
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
                <div className="text-xs text-[rgb(var(--muted))]">{t('formOrgName')}</div>
                <Input value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} />
              </div>
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formWebsite')}</div>
                <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
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

            <div>
              <div className="text-xs text-[rgb(var(--muted))]">{t('formServiceCategories')}</div>
              <Input value={serviceCategoriesText} onChange={(e) => setServiceCategoriesText(e.target.value)} />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formServiceRegions')}</div>
                <Input value={serviceRegionsText} onChange={(e) => setServiceRegionsText(e.target.value)} />
              </div>
              <div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('formClientIndustries')}</div>
                <Input value={clientIndustriesText} onChange={(e) => setClientIndustriesText(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="text-xs text-[rgb(var(--muted))]">{t('formCaseSummary')}</div>
              <Textarea value={caseSummary} onChange={(e) => setCaseSummary(e.target.value)} />
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

