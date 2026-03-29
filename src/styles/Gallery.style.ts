import styled, { css } from "styled-components";

// App.style.ts 의 그리드 아이템
export const GalleryLayout = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 0;
  overflow: hidden;

  //Home.tsx의 상위 그리드의 자식으로서 grid-position
  grid-row: 2 / 3;
  grid-column: 1 / 3;

  // 사진의 부모 그리드
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 5px;
  align-items: stretch;
`;

export const PhotoBox = styled.div`
  position: relative;
  min-width: 0;
  height: 100%;
  overflow: hidden;
`;

const mediaStyles = css`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PhotoItem = styled.img`
  ${mediaStyles}
`;

export const VideoItem = styled.video`
  ${mediaStyles}
`;
