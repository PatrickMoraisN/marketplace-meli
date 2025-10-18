'use client'

import { cn } from '@/shared/utils/classNames'
import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './TextInput.module.scss'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  variant?: 'default' | 'search'
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, className, variant = 'default', ...props }, ref) => {
    return (
      <div className={cn(styles.wrapper, className)}>
        {label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={cn(styles.input, {
            [styles[`input--${variant}`]]: variant,
          })}
          {...props}
        />
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'
