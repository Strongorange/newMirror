import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { galleryState } from "src/states/galleryStates";
import { firestore } from "src/firebase";
import { userState } from "src/states/userStates";

const useFirestore = () => {
  const [gallery, setGallery] = useRecoilState(galleryState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user) {
      const userCollectionRef = collection(firestore, user.uid!);
      const galleryDocRef = doc(userCollectionRef, "gallery");
      const unsubscribe = onSnapshot(galleryDocRef, async (doc) => {
        if (doc.exists()) {
          // 해당 Document가 있을 경우 Gallery State에 저장
          setGallery(doc.data().photos);
        } else {
          // 해당 Document가 없을 경우 Firestore에 Document를 생성
          await setDoc(galleryDocRef, { photos: [] });
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  return gallery;
};

export default useFirestore;
