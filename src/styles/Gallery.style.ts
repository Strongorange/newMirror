import styled from "styled-components";

// App.style.ts 의 그리드 아이템
export const GalleryLayout = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  //Home.tsx의 상위 그리드의 자식으로서 grid-position
  grid-row: 2 / 3;
  grid-column: 1 / 3;

  // 사진의 부모 그리드
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 5px;
`;

export const PhotoBox = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;

  @supports (aspect-ratop: 1/1) {
    aspect-ratio: 1/1;
    padding-bottom: 0;
  }
`;

export const PhotoItem = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
