import React from "react";
import { useRecoilValue } from "recoil";
import { galleryState } from "src/states/galleryStates";
import * as S from "../styles/Gallery.style";

const Gallery = () => {
  const gallery = useRecoilValue(galleryState);

  return (
    <S.GalleryLayout>
      <S.PhotoBox>
        <S.PhotoItem src={gallery![0]} />
      </S.PhotoBox>
      <S.PhotoBox>
        <S.PhotoItem src={gallery![1]} />
      </S.PhotoBox>
      <S.PhotoBox>
        <S.PhotoItem src={gallery![2]} />
      </S.PhotoBox>
      <S.PhotoBox>
        <S.PhotoItem src={gallery![3]} />
      </S.PhotoBox>
    </S.GalleryLayout>
  );
};

export default Gallery;
