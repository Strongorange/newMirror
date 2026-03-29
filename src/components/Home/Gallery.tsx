import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { galleryState } from "src/states/galleryStates";
import { MirrorMediaItem } from "src/types/mediaTypes";
import * as S from "../../styles/Gallery.style";

const GallerySlot = ({ item, index }: { item: MirrorMediaItem | null; index: number }) => {
  const [isVideoError, setIsVideoError] = useState(false);

  if (!item) {
    return <S.PhotoBox />;
  }

  if (item.type === "video" && !isVideoError) {
    return (
      <S.PhotoBox>
        <S.VideoItem
          src={item.src}
          poster={item.posterSrc ?? undefined}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          onError={() => setIsVideoError(true)}
        />
      </S.PhotoBox>
    );
  }

  return (
    <S.PhotoBox>
      <S.PhotoItem
        src={item.type === "video" ? item.posterSrc ?? "" : item.src}
        alt={`mirror-gallery-${index}`}
      />
    </S.PhotoBox>
  );
};

const Gallery = () => {
  const gallery = useRecoilValue(galleryState);

  return (
    <S.GalleryLayout>
      {gallery.map((photo, index) => (
        <GallerySlot key={photo?.id ?? index} item={photo} index={index} />
      ))}
    </S.GalleryLayout>
  );
};

export default Gallery;
