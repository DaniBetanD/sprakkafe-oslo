export const ANALYTICS_EXCLUSION_KEY = 'sprakkafe.analytics.exclude'

export function isAnalyticsExcluded() {
  try {
    return window.localStorage.getItem(ANALYTICS_EXCLUSION_KEY) === 'true'
  } catch {
    return false
  }
}

export function filterAdminAnalytics(event) {
  return isAnalyticsExcluded() ? null : event
}
