import { useState } from 'react'
import { FaComments, FaPaperPlane, FaXmark } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function ChatWidget() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')

  const send = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [...current, text])
    setDraft('')
  }

  if (!open) {
    return (
      <button type="button" className="chat-launcher" onClick={() => setOpen(true)}>
        <FaComments aria-hidden="true" />
        {t('chat.open')}
      </button>
    )
  }

  return (
    <div className="chat-panel">
      <div className="chat-head">
        <h3 id="chat-title">{t('chat.title')}</h3>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setOpen(false)}
          aria-label={t('chat.close')}
        >
          <FaXmark aria-hidden="true" />
        </button>
      </div>

      <div className="chat-body" aria-live="polite">
        <p className="chat-note">{t('chat.note')}</p>
        {messages.map((message, index) => (
          <p className="chat-msg chat-msg--me" key={`${index}-${message}`}>
            {message}
          </p>
        ))}
      </div>

      <form className="chat-form" onSubmit={send}>
        <label className="sr-only" htmlFor="chat-input">
          {t('chat.placeholder')}
        </label>
        <input
          id="chat-input"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t('chat.placeholder')}
        />
        <button type="submit" className="btn btn--primary btn--sm" aria-label={t('chat.send')}>
          <FaPaperPlane aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
