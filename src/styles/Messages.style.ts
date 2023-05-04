import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    0% {
        opacity: 1;
    }
  
    100% {
        opacity: 0;

    }
  
`;

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  15%, 85% {
    opacity: 1;
  }
`;

export const MessagesLayout = styled.div`
  .active {
    animation: ${fadeIn} 1s ease-in-out;
  }

  .hidden {
    animation-fill-mode: forwards;
    animation: ${fadeOut} 1s ease-in-out;
  }
`;

export const Text = styled.span`
  font-size: 40px;
  animation: ${fadeInOut} 12s linear infinite;
`;
