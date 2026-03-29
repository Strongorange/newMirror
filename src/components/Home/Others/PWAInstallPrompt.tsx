import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PWAInstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  useEffect(() => {
    // iOS 기기 확인
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);

    // Safari 브라우저 확인
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // 이미 홈 화면에 추가되었는지 확인
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    setIsIOS(iOS);
    setIsStandalone(standalone);

    // iOS Safari에서만 팝업 표시
    if (iOS && isSafari && !standalone) {
      // 사용자가 이전에 팝업을 닫았는지 확인
      const closedUntil = localStorage.getItem("pwaPromptClosed");
      const isPromptSuppressed =
        closedUntil !== null && new Date(closedUntil).getTime() > Date.now();

      if (!isPromptSuppressed) {
        localStorage.removeItem("pwaPromptClosed");
        // 페이지 로드 후 1초 후에 팝업 표시
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
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
        <PromptTitle>홈 화면에 추가하기</PromptTitle>
        <PromptText>
          더 나은 경험을 위해 Mirror 앱을 홈 화면에 추가하세요.
        </PromptText>
        <InstallInstructions>
          <InstructionStep>
            1. Safari 하단의 <ShareIcon>공유</ShareIcon> 버튼을 탭하세요.
          </InstructionStep>
          <InstructionStep>
            2. "홈 화면에 추가" 옵션을 선택하세요.
          </InstructionStep>
          <InstructionStep>3. "추가"를 탭하세요.</InstructionStep>
        </InstallInstructions>
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
