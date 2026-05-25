'use client'

import { motion, Variants } from 'framer-motion'

interface StaggerProps {
  children:   React.ReactNode
  className?: string
  delay?:     number
}

interface StaggerItemProps {
  children:   React.ReactNode
  className?: string
}

// Explicitly typing this prevents cubic-bezier tuple inference errors during build
const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.45, 
      ease: [0.25, 0.1, 0.25, 1] 
    } 
  },
}

export function StaggerContainer({ children, className = '', delay = 0 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}