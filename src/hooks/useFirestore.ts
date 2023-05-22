import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { galleryState } from "src/states/galleryStates";
import { firestore } from "src/firebase";
import { userState } from "src/states/userStates";
import { defaultMessages } from "src/types/messagesTypes";
import { messagesState } from "src/states/messagesStates";
import { defaultSettings, Settings } from "src/types/settingsTypes";
import { firebaseSettingsState } from "src/states/firebaseSettingStates";

const useFirestore = () => {
  const setGallery = useSetRecoilState(galleryState);
  const setMessages = useSetRecoilState(messagesState);
  const setSettings = useSetRecoilState(firebaseSettingsState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user) {
      const userCollectionRef = collection(firestore, user.uid!);
      const galleryDocRef = doc(userCollectionRef, "gallery");
      const messageDocRef = doc(userCollectionRef, "message");
      const settingsDocRef = doc(userCollectionRef, "settings");

      // Firestore에서 Gallery Document를 실시간으로 감시
      const unsubscribeGallery = onSnapshot(galleryDocRef, async (doc) => {
        if (doc.exists()) {
          // 해당 Document가 있을 경우 Gallery State에 저장
          setGallery(doc.data().photos);
        } else {
          // 해당 Document가 없을 경우 Firestore에 Document를 생성
          await setDoc(galleryDocRef, { photos: [] });
        }
      });

      // Firestore에서 Message Document를 실시간으로 감시
      const unsubscribeMessage = onSnapshot(messageDocRef, async (doc) => {
        if (doc.exists()) {
          // 해당 Document가 있을 경우 Gallery State에 저장
          setMessages(doc.data()!);
        } else {
          // 해당 Document가 없을 경우 Firestore에 Document를 생성
          await setDoc(messageDocRef, defaultMessages);
        }
      });

      // Firestore에서 Settings Document를 실시간으로 감시
      const unscribeSettings = onSnapshot(settingsDocRef, async (doc) => {
        if (doc.exists()) {
          const settings = doc.data() as Settings;
          setSettings(settings);
        } else {
          // 해당 Document가 없을 경우 Firestore에 Document를 생성
          await setDoc(settingsDocRef, defaultSettings);
        }
      });

      return () => {
        unsubscribeGallery();
        unsubscribeMessage();
        unscribeSettings();
      };
    } else {
      console.log("Firebase 유저 정보 없음");
      return;
    }
  }, []);
};

export default useFirestore;
