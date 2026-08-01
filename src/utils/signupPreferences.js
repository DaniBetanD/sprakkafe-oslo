const DISMISSED_UNTIL_KEY = "sprakkafe-signup-prompt-dismissed-until";
const ENGAGED_SESSION_KEY = "sprakkafe-signup-engaged";
const PROMPT_SHOWN_SESSION_KEY = "sprakkafe-signup-prompt-shown";
const SUBSCRIBED_KEY = "sprakkafe-signup-subscribed";

export const SIGNUP_ENGAGED_EVENT = "sprakkafe:signup-engaged";

function readStorage(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch {
    // The prompt remains functional for this page view when storage is unavailable.
  }
}

export function canShowSignupPrompt() {
  const dismissedUntil = Number(readStorage(window.localStorage, DISMISSED_UNTIL_KEY) || 0);
  return readStorage(window.localStorage, SUBSCRIBED_KEY) !== "true"
    && dismissedUntil <= Date.now()
    && readStorage(window.sessionStorage, ENGAGED_SESSION_KEY) !== "true"
    && readStorage(window.sessionStorage, PROMPT_SHOWN_SESSION_KEY) !== "true";
}

export function markSignupPromptShown() {
  writeStorage(window.sessionStorage, PROMPT_SHOWN_SESSION_KEY, "true");
}

export function dismissSignupPrompt() {
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  writeStorage(window.localStorage, DISMISSED_UNTIL_KEY, String(Date.now() + sevenDays));
}

export function markSignupEngaged() {
  writeStorage(window.sessionStorage, ENGAGED_SESSION_KEY, "true");
  window.dispatchEvent(new CustomEvent(SIGNUP_ENGAGED_EVENT));
}

export function markSignupSubscribed() {
  writeStorage(window.localStorage, SUBSCRIBED_KEY, "true");
  markSignupEngaged();
}
