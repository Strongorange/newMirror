import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  isIOSDevice,
  isStandaloneMode,
  shouldShowIOSInstallPrompt,
} from "../../../utils/pwa";

const PWAInstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  useEffect(() => {
    const hasTouchEnd = "ontouchend" in document;
    const standalone = isStandaloneMode(
      window.matchMedia?.("(display-mode: standalone)").matches ?? false,
      (window.navigator as Navigator & { standalone?: boolean }).standalone
    );
    const iOS = isIOSDevice(navigator.userAgent, hasTouchEnd);

    setIsIOS(iOS);
    setIsStandalone(standalone);

    if (
      !shouldShowIOSInstallPrompt({
        userAgent: navigator.userAgent,
        hasTouchEnd,
        displayModeStandalone:
          window.matchMedia?.("(display-mode: standalone)").matches ?? false,
        navigatorStandalone: (window.navigator as Navigator & { standalone?: boolean })
          .standalone,
      })
    ) {
      return;
    }

    const closedUntil = localStorage.getItem("pwaPromptClosed");
    const isPromptSuppressed =
      closedUntil !== null && new Date(closedUntil).getTime() > Date.now();

    if (isPromptSuppressed) {
      return;
    }

    localStorage.removeItem("pwaPromptClosed");

    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closePrompt = () => {
    setShowPrompt(false);
    // 사용자가 팝업을 닫았다는 것을 저장 (7일 동안 다시 표시하지 않음)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    localStorage.setItem("pwaPromptClosed", expiryDate.toISOString());
  };

  if (!showPrompt || !isIOS || isStandalone) return null;

  return (
    <PromptContainer>
      <PromptContent>
        <CloseButton onClick={closePrompt}>×</CloseButton>
        <PromptTitle>홈 화면에서 전체 화면으로 열기</PromptTitle>
        <PromptText>
          iPad Safari 탭으로 열면 주소창이 남습니다. 홈 화면에 추가한 뒤
          홈 화면 아이콘으로 실행하면 앱처럼 더 넓게 사용할 수 있습니다.
        </PromptText>
        <InstallInstructions>
          <InstructionStep>
            1. Safari의 <ShareIcon>공유</ShareIcon> 버튼을 탭하세요.
          </InstructionStep>
          <InstructionStep>
            2. "홈 화면에 추가" 옵션을 선택하세요.
          </InstructionStep>
          <InstructionStep>
            3. 홈 화면에 생긴 Mirror 아이콘으로 앱을 실행하세요.
          </InstructionStep>
        </InstallInstructions>
        <PromptNote>
          Safari 탭이나 최근 방문 목록으로 다시 열면 주소창이 다시 보일 수
          있습니다.
        </PromptNote>
      </PromptContent>
    </PromptContainer>
  );
};

const PromptContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  padding: 16px;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const PromptContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const PromptTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #000;
`;

const PromptText = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
  color: #333;
`;

const InstallInstructions = styled.div`
  margin-top: 15px;
`;

const InstructionStep = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
`;

const PromptNote = styled.p`
  margin-top: 12px;
  font-size: 13px;
  line-height: 1.5;
  color: #666;
`;

const ShareIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #007aff;
  color: white;
  border-radius: 4px;
  text-align: center;
  line-height: 20px;
  margin: 0 3px;
  font-size: 12px;
  vertical-align: middle;
  &:before {
    content: "↑";
  }
`;

export default PWAInstallPrompt;
