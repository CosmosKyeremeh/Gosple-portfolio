'use client'

import { motion, type Variants } from 'framer-motion'

interface AnimateInProps {
  children:   React.ReactNode
  className?: string
  delay?:     number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?:  number
}

const variants: Record<string, Variants> = {
  up:    { hidden: { opacity: 0, y: 24 },  visible: { opacity: 1, y: 0  } },
  down:  { hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0  } },
  left:  { hidden: { opacity: 0, x: 24 },  visible: { opacity: 1, x: 0  } },
  right: { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0  } },
  none:  { hidden: { opacity: 0 },         visible: { opacity: 1        } },
}

export default function AnimateIn({
  children,
  className = '',
  delay     = 0,
  direction = 'up',
  duration  = 0.5,
}: AnimateInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants[direction]}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}