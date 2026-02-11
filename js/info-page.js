/**
  * Performs bind back to game button.
  *
 * @returns {void}
 */
function bindBackToGameButton() {
  const backButton = document.getElementById("back-to-game-button");
  if (!backButton) return;
  backButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (returnToOpenGameTab()) return;
    if (shouldUseHistoryBack()) return window.history.back();
    window.location.href = "index.html";
  });
}

/**
  * Performs return to open game tab.
  *
 * @returns {boolean}
 */
function returnToOpenGameTab() {
  try {
    if (!window.opener || window.opener.closed) return false;
    if (window.opener.location.origin !== window.location.origin) return false;
    if (window.opener.world && typeof window.opener.world.setPaused === "function") {
      window.opener.world.setPaused(false);
    }
    window.opener.focus();
    window.close();
    return true;
  } catch {
    return false;
  }
}

/**
  * Checks whether should use history back.
  *
 * @returns {boolean}
 */
function shouldUseHistoryBack() {
  if (window.history.length <= 1) return false;
  if (!document.referrer) return false;
  try {
    const referrerUrl = new URL(document.referrer);
    return referrerUrl.origin === window.location.origin && referrerUrl.pathname.endsWith("/index.html");
  } catch {
    return false;
  }
}

document.addEventListener("DOMContentLoaded", bindBackToGameButton);
