const PRODUCTION_HOSTNAME = 'sprakkafe-oslo.vercel.app'
export const INTERNAL_ANALYTICS_STORAGE_KEY = 'sprakkafe.analytics.internal'

export function filterAnalyticsEvent(event) {
  if (window.location.hostname !== PRODUCTION_HOSTNAME) {
    return null
  }

  try {
    if (window.localStorage.getItem(INTERNAL_ANALYTICS_STORAGE_KEY) === '1') {
      return null
    }
  } catch {
    // If storage is unavailable, keep normal production analytics active.
  }

  return event
}
