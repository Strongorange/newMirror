import React from "react";
import { useRecoilValue } from "recoil";
import { galleryState } from "src/states/galleryStates";
import * as S from "../../styles/Gallery.style";

const Gallery = () => {
  const gallery = useRecoilValue(galleryState);
  const gallerySlots = Array.from({ length: 4 }, (_, index) => gallery[index]);

  return (
    <S.GalleryLayout>
      {gallerySlots.map((photo, index) => (
        <S.PhotoBox key={index}>
          {photo ? <S.PhotoItem src={photo} alt={`mirror-gallery-${index}`} /> : null}
        </S.PhotoBox>
      ))}
    </S.GalleryLayout>
  );
};

export default Gallery;
