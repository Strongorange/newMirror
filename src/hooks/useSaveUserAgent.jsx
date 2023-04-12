import {
  serverTimestamp,
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { useEffect } from "react";

async function saveUserAgent(userAgent) {
  const data = {
    data: userAgent,
    createdAt: serverTimestamp(),
  };

  const userAgentCollectionRef = collection(firestore, "userAgent");

  try {
    const docRef = await addDoc(userAgentCollectionRef, data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const useSaveUserAgent = () => {
  useEffect(() => {
    async function getUserAgent() {
      const userAgent = navigator.userAgent;
      if (userAgent) {
        await saveUserAgent(userAgent);
      }
    }
    getUserAgent();
  }, []);
};

export default useSaveUserAgent;
