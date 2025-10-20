'use client'

import { LOCAL_STORAGE_KEYS } from '@/shared/constants'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './WelcomeMessage.module.scss'

export const WelcomeMessage = () => {
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage(
    LOCAL_STORAGE_KEYS.WELCOME_SEEN,
    false
  )
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState<React.CSSProperties>({})
  const iconRef = useRef<HTMLElement | null>(null)

  const updatePosition = () => {
    if (!iconRef.current) return
    const rect = iconRef.current.getBoundingClientRect()
    setCoords({
      position: 'absolute',
      top: `${rect.bottom + 8}px`,
      left: `${rect.left - 230}px`,
    })
  }

  useLayoutEffect(() => {
    const icon = document.querySelector('[aria-label="Buscar"]') as HTMLElement | null
    if (!icon) return
    iconRef.current = icon
    updatePosition()

    const observer = new ResizeObserver(() => updatePosition())
    observer.observe(icon)

    const onResize = () => requestAnimationFrame(updatePosition)
    window.addEventListener('resize', onResize)

    if (!hasSeenWelcome) setVisible(true)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [hasSeenWelcome])

  const handleClose = () => {
    setVisible(false)
    setHasSeenWelcome(true)
  }

  if (!visible || !iconRef.current) return null

  return createPortal(
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={styles.message} style={coords}>
        <div className={styles.arrow} />
        <div className={styles.content}>
          <header>
            <strong>Bem-vindo!!</strong>
            <button onClick={handleClose}>X</button>
          </header>
          <p>Utilize a barra de busca para encontrar produtos, marcas e muito mais!</p>
        </div>
      </div>
    </>,
    document.body
  )
}
