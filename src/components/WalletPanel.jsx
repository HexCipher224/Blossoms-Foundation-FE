import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, Check, AlertTriangle, RefreshCw } from 'lucide-react'
import { useLocale } from '../context/LocaleContext.jsx'
import { claimDonation, getDonation } from '../config/api.js'
import './WalletPanel.css'

const TX_PATTERN = /^[A-Za-z0-9]{16,128}$/

function CopyButton({ label, value, copied, onCopy, t }) {
  return (
    <button type="button" className="wallet__copy" onClick={() => onCopy(label, value)}>
      {copied === label ? <Check size={15} /> : <Copy size={15} />}
      {copied === label ? t('wallet.copied') : t('wallet.copy')}
    </button>
  )
}

export default function WalletPanel({ donation, onBack }) {
  const { t } = useLocale()
  const [status, setStatus] = useState(donation.status || 'pending')
  const [txHash, setTxHash] = useState('')
  const [txError, setTxError] = useState('')
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState('')

  const { wallet } = donation

  async function copy(label, value) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      setTimeout(() => setCopied(''), 1800)
    } catch {
      /* clipboard unavailable: user can still select the text manually */
    }
  }

  async function submitTx(e) {
    e.preventDefault()
    const clean = txHash.trim().replace(/^0x/i, '')
    if (!TX_PATTERN.test(clean)) {
      setTxError(t('wallet.txInvalid'))
      return
    }
    setTxError('')
    setBusy(true)
    try {
      const res = await claimDonation(donation.reference, txHash.trim())
      setStatus(res.status)
    } catch {
      setTxError(t('donate.err.api'))
    } finally {
      setBusy(false)
    }
  }

  async function refresh() {
    setBusy(true)
    try {
      const res = await getDonation(donation.reference)
      setStatus(res.status)
    } catch {
      setTxError(t('donate.err.api'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="wallet card">
      <h2>{t('wallet.title')}</h2>
      <p className="wallet__intro">{t('wallet.intro')}</p>

      <div className="wallet__grid">
        <div className="wallet__qr">
          <QRCodeSVG value={wallet.address} size={180} level="M" includeMargin />
        </div>

        <dl className="wallet__details">
          <div>
            <dt>{t('wallet.amount')}</dt>
            <dd className="wallet__amount">
              {donation.usdtAmount} USDT
              <CopyButton label="amount" value={String(donation.usdtAmount)} copied={copied} onCopy={copy} t={t} />
            </dd>
          </div>
          <div>
            <dt>{t('wallet.network')}</dt>
            <dd>{wallet.networkLabel}</dd>
          </div>
          <div>
            <dt>{t('wallet.address')}</dt>
            <dd className="wallet__address">
              <code>{wallet.address}</code>
              <CopyButton label="address" value={wallet.address} copied={copied} onCopy={copy} t={t} />
            </dd>
          </div>
          {wallet.payId && (
            <div>
              <dt>{t('wallet.payId')}</dt>
              <dd>
                <code>{wallet.payId}</code>
                <CopyButton label="payid" value={wallet.payId} copied={copied} onCopy={copy} t={t} />
              </dd>
            </div>
          )}
          <div>
            <dt>{t('wallet.reference')}</dt>
            <dd>
              <code>{donation.reference}</code>
              <CopyButton label="ref" value={donation.reference} copied={copied} onCopy={copy} t={t} />
            </dd>
          </div>
        </dl>
      </div>

      <p className="wallet__warn">
        <AlertTriangle size={18} /> {t('wallet.warn')}
      </p>

      <p className={`wallet__status wallet__status--${status}`} role="status">
        {t(`wallet.status.${status}`)}
      </p>

      {status !== 'confirmed' && (
        <form className="wallet__tx" onSubmit={submitTx} noValidate>
          <h3>{t('wallet.txTitle')}</h3>
          <label htmlFor="tx-hash">{t('wallet.txLabel')}</label>
          <input
            id="tx-hash"
            type="text"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            aria-invalid={Boolean(txError)}
            autoComplete="off"
            spellCheck="false"
          />
          <p className="wallet__help">{t('wallet.txHelp')}</p>
          {txError && <p className="field-error">{txError}</p>}
          <div className="wallet__actions">
            <button type="submit" className="btn btn-dark" disabled={busy}>
              {t('wallet.txSubmit')}
            </button>
            <button type="button" className="btn btn-outline" onClick={refresh} disabled={busy}>
              <RefreshCw size={16} /> {t('wallet.check')}
            </button>
          </div>
        </form>
      )}

      <button type="button" className="wallet__back" onClick={onBack}>
        {t('wallet.back')}
      </button>
    </div>
  )
}
