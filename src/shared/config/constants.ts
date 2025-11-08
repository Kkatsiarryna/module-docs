const IS_DEV = import.meta.env.MODE === 'development'

export const config = {
  BASE_URL: IS_DEV ? 'https://backoffice-service-team-4:8080' : (window.__ENV__?.BASE_URL ?? ''),
}
