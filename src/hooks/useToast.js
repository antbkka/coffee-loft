import toast from 'react-hot-toast'

/**
 * Обёртка над react-hot-toast с единым стилевым форматом проекта.
 * Использование: const notify = useToast(); notify.success('Готово')
 */
export function useToast() {
  const baseStyle = {
    background: '#1a1a1a',
    color: '#c9c5bd',
    border: '1px solid #b87333',
    padding: '14px 18px',
    borderRadius: '2px',
    fontSize: '14px',
    letterSpacing: '0.02em',
  }

  return {
    success: (msg) => toast.success(msg, { style: baseStyle, iconTheme: { primary: '#b87333', secondary: '#0d0d0d' } }),
    error: (msg) => toast.error(msg, { style: baseStyle, iconTheme: { primary: '#8b3a2e', secondary: '#0d0d0d' } }),
    info: (msg) => toast(msg, { style: baseStyle, icon: '☕' }),
  }
}