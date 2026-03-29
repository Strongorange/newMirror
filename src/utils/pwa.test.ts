import {
  isIOSDevice,
  isSafariBrowser,
  isStandaloneMode,
  shouldShowIOSInstallPrompt,
} from "./pwa";

const iPadSafariUserAgent =
  "Mozilla/5.0 (iPad; CPU OS 12_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1";

const iPadChromeUserAgent =
  "Mozilla/5.0 (iPad; CPU OS 12_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1";

describe("pwa helpers", () => {
  it("detects classic iOS user agents", () => {
    expect(isIOSDevice(iPadSafariUserAgent, true)).toBe(true);
  });

  it("detects iPadOS desktop-class user agents when touch is available", () => {
    expect(
      isIOSDevice(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
        true
      )
    ).toBe(true);
  });

  it("only treats Safari as install-instruction target browser", () => {
    expect(isSafariBrowser(iPadSafariUserAgent)).toBe(true);
    expect(isSafariBrowser(iPadChromeUserAgent)).toBe(false);
  });

  it("considers either display-mode or navigator.standalone as standalone", () => {
    expect(isStandaloneMode(true, false)).toBe(true);
    expect(isStandaloneMode(false, true)).toBe(true);
    expect(isStandaloneMode(false, false)).toBe(false);
  });

  it("shows the prompt for non-standalone iOS Safari", () => {
    expect(
      shouldShowIOSInstallPrompt({
        userAgent: iPadSafariUserAgent,
        hasTouchEnd: true,
        displayModeStandalone: false,
        navigatorStandalone: false,
      })
    ).toBe(true);
  });

  it("suppresses the prompt after home-screen launch on legacy iOS", () => {
    expect(
      shouldShowIOSInstallPrompt({
        userAgent: iPadSafariUserAgent,
        hasTouchEnd: true,
        displayModeStandalone: false,
        navigatorStandalone: true,
      })
    ).toBe(false);
  });
});
