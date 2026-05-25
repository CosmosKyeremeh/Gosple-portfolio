'use client'

import katex from 'katex'

export function BlockMath({ tex }: { tex: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, {
          displayMode: true,
          throwOnError: false,
        }),
      }}
    />
  )
}

export function InlineMath({ tex }: { tex: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, {
          displayMode: false,
          throwOnError: false,
        }),
      }}
    />
  )
}