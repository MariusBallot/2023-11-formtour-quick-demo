"use client"
import React, { useEffect, useRef } from 'react'
import styles from "./FormGLScene.module.css"
import MainThreeScene from "./glScripts/mainThreeScene"

export default function FormGLScene() {
  const glContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (glContainer === null) return
    MainThreeScene.init(glContainer.current)
  }, [])

  return (
    <div>
      <div ref={glContainer} className={styles.glContainer}></div>
    </div>
  )
}
