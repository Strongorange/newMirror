type InstallPromptEnvironment = {
  userAgent: string;
  hasTouchEnd: boolean;
  displayModeStandalone: boolean;
  navigatorStandalone?: boolean;
};

const IOS_DEVICE_PATTERN = /iPad|iPhone|iPod/;
const SAFARI_PATTERN = /Safari/i;
const NON_SAFARI_IOS_BROWSERS_PATTERN =
  /CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|YaBrowser/i;

export function isIOSDevice(
  userAgent: string,
  hasTouchEnd: boolean
): boolean {
  return IOS_DEVICE_PATTERN.test(userAgent) || (userAgent.includes("Mac") && hasTouchEnd);
}

export function isSafariBrowser(userAgent: string): boolean {
  return (
    SAFARI_PATTERN.test(userAgent) &&
    !/Android/i.test(userAgent) &&
    !NON_SAFARI_IOS_BROWSERS_PATTERN.test(userAgent)
  );
}

export function isStandaloneMode(
  displayModeStandalone: boolean,
  navigatorStandalone?: boolean
): boolean {
  return displayModeStandalone || navigatorStandalone === true;
}

export function shouldShowIOSInstallPrompt(
  environment: InstallPromptEnvironment
): boolean {
  return (
    isIOSDevice(environment.userAgent, environment.hasTouchEnd) &&
    isSafariBrowser(environment.userAgent) &&
    !isStandaloneMode(
      environment.displayModeStandalone,
      environment.navigatorStandalone
    )
  );
}
