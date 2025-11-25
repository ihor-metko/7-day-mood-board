'use client'

import {
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  ariaLabelledBy?: string
}

export default function Modal({
  isOpen,
  onClose,
  children,
  ariaLabelledBy,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<Element | null>(null)

  const getFocusableElements = useCallback(() => {
    if (!dialogRef.current) return []
    return Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute('disabled'))
  }, [])

  useEffect(() => {
    if (!isOpen) return

    previousActiveElement.current = document.activeElement

    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
  }, [isOpen, getFocusableElements])

  useEffect(() => {
    if (!isOpen) return

    return () => {
      if (
        previousActiveElement.current &&
        previousActiveElement.current instanceof HTMLElement
      ) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        className="bg-white dark:bg-gray-900 rounded-lg p-4 w-80"
      >
        {children}
      </div>
    </div>
  )

  const portalRoot = document.getElementById('modal-root')
  if (!portalRoot) return modalContent

  return createPortal(modalContent, portalRoot)
}
