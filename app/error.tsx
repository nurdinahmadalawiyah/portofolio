'use client'

import { useEffect } from 'react'
import { useT } from '@/i18n/context'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const t = useT()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>{t.error.title}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {t.error.retry}
      </button>
    </div>
  )
}
