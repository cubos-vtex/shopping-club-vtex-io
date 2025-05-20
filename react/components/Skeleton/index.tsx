import type { CSSProperties } from 'react'
import React from 'react'

import styles from './styles.css'

export function Skeleton(props: CSSProperties) {
  return <div style={{ ...props }} className={styles.skeleton} />
}
