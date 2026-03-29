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
import {
  createMirrorGalleryDoc,
  sanitizeMirrorGallerySlots,
} from "src/types/mediaTypes";

const useFirestore = () => {
  const setGallery = useSetRecoilState(galleryState);
  const setMessages = useSetRecoilState(messagesState);
  const setSettings = useSetRecoilState(firebaseSettingsState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user) {
      const userCollectionRef = collection(firestore, user.uid!);
      const galleryDocRef = doc(userCollectionRef, "gallery");
      const messageDocRef = doc(userCollectionRef, "messages");
      const settingsDocRef = doc(userCollectionRef, "settings");

      // Firestore에서 Gallery Document를 실시간으로 감시
      const unsubscribeGallery = onSnapshot(galleryDocRef, async (doc) => {
        if (doc.exists() && doc.data()?.schemaVersion === 2) {
          setGallery(sanitizeMirrorGallerySlots(doc.data()?.slots));
        } else {
          setGallery(createMirrorGalleryDoc().slots);
          await setDoc(galleryDocRef, createMirrorGalleryDoc());
        }
      });

      // Firestore에서 Message Document를 실시간으로 감시
      const unsubscribeMessages = onSnapshot(messageDocRef, async (doc) => {
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
        unsubscribeMessages();
        unscribeSettings();
      };
    } else {
      console.log("Firebase 유저 정보 없음");
      return;
    }
  }, [setGallery, setMessages, setSettings, user]);
};

export default useFirestore;
