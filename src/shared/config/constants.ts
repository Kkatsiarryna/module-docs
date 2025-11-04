const IS_DEV = import.meta.env.MODE === 'development'

export const config = {
  BASE_URL: IS_DEV ? '/api' : window.__ENV__.BASE_URL,
}
