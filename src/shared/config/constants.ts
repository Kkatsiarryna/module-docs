const IS_DEV = import.meta.env.MODE === 'development'

export const config = {
  BASE_URL: IS_DEV ? '' : (window.__ENV__?.BASE_URL ?? ''),
}
