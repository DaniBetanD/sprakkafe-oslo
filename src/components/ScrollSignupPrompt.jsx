import { useEffect, useState } from "react";
import { ArrowRight, Heart, X } from "lucide-react";
import CommunitySignupModal from "./CommunitySignupModal";
import { useLanguage } from "../i18n/LanguageContext";
import {
  SIGNUP_ENGAGED_EVENT,
  canShowSignupPrompt,
  dismissSignupPrompt,
  markSignupEngaged,
  markSignupPromptShown,
} from "../utils/signupPreferences";

const SHOW_AFTER_PROGRESS = 0.55;

export default function ScrollSignupPrompt({ disabled = false }) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (disabled) return undefined;

    const hidePrompt = () => setIsVisible(false);
    const communitySection = document.getElementById("comunidad");
    const communityObserver = communitySection
      ? new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) hidePrompt();
      }, { threshold: 0.15 })
      : null;
    const checkProgress = () => {
      if (!canShowSignupPrompt()) return;
      const maximumScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maximumScroll <= 0 || window.scrollY / maximumScroll < SHOW_AFTER_PROGRESS) return;

      markSignupPromptShown();
      setIsVisible(true);
      window.removeEventListener("scroll", checkProgress);
    };

    window.addEventListener("scroll", checkProgress, { passive: true });
    window.addEventListener(SIGNUP_ENGAGED_EVENT, hidePrompt);
    if (communitySection) communityObserver?.observe(communitySection);
    checkProgress();

    return () => {
      window.removeEventListener("scroll", checkProgress);
      window.removeEventListener(SIGNUP_ENGAGED_EVENT, hidePrompt);
      communityObserver?.disconnect();
    };
  }, [disabled]);

  function closePrompt() {
    dismissSignupPrompt();
    setIsVisible(false);
  }

  function openSignup() {
    markSignupEngaged();
    setIsVisible(false);
    setShowModal(true);
  }

  return (
    <>
      {isVisible && !disabled && (
        <aside
          aria-labelledby="scroll-signup-title"
          className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-lg rounded-2xl border border-blue-100 bg-white p-4 shadow-2xl md:inset-x-auto md:right-6 md:bottom-6 md:p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600" aria-hidden="true">
              <Heart size={19} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 id="scroll-signup-title" className="pr-12 text-base font-bold leading-snug text-gray-950 md:text-lg">
                {t("scrollInviteTitle")}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {t("scrollInviteText")}
              </p>
              <button
                type="button"
                onClick={openSignup}
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                {t("scrollInviteButton")}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
            <button
              type="button"
              onClick={closePrompt}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label={t("dismissScrollInvite")}
            >
              <X size={19} />
            </button>
          </div>
        </aside>
      )}

      {showModal && <CommunitySignupModal onClose={() => setShowModal(false)} />}
    </>
  );
}
