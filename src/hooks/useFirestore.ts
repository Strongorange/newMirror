import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { galleryState } from "src/states/galleryStates";
import { firestore } from "src/firebase";
import { userState } from "src/states/userStates";
import { defaultMessages } from "src/types/messagesTypes";
import { messagesState } from "src/states/messagesStates";

const useFirestore = () => {
  const setGallery = useSetRecoilState(galleryState);
  const setMessages = useSetRecoilState(messagesState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user) {
      const userCollectionRef = collection(firestore, user.uid!);
      const galleryDocRef = doc(userCollectionRef, "gallery");
      const messageDocRef = doc(userCollectionRef, "message");

      const unsubscribeGallery = onSnapshot(galleryDocRef, async (doc) => {
        if (doc.exists()) {
          // 해당 Document가 있을 경우 Gallery State에 저장
          setGallery(doc.data().photos);
        } else {
          // 해당 Document가 없을 경우 Firestore에 Document를 생성
          await setDoc(galleryDocRef, { photos: [] });
        }
      });

      const unsubscribeMessage = onSnapshot(messageDocRef, async (doc) => {
        if (doc.exists()) {
          // 해당 Document가 있을 경우 Gallery State에 저장
          setMessages(doc.data()!);
        } else {
          // 해당 Document가 없을 경우 Firestore에 Document를 생성
          await setDoc(messageDocRef, defaultMessages);
        }
      });

      return () => {
        unsubscribeGallery();
        unsubscribeMessage();
      };
    }
  }, []);
};

export default useFirestore;
