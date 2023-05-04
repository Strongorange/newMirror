import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";

const saveUserAgentandWidthHeight = async (userAgent, width, height) => {
  const data = {
    userAgent,
    deviceSize: {
      width,
      height,
    },
    createdAt: serverTimestamp(),
  };

  const deviceInfoCollectionRef = collection(firestore, "deviceInfo");

  try {
    const deviceInfodocRef = await addDoc(deviceInfoCollectionRef, data);
    console.log("Document written with ID: ", deviceInfodocRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const useSaveUserAgentWidthHeight = () => {
  /**
   * @description 디바이스 width, height 저장
   */
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    async function getUserAgentAndDeviceSize() {
      const userAgent = navigator.userAgent;
      if (userAgent) {
        await saveUserAgentandWidthHeight(userAgent, width, height);
      }
    }

    if (process.env.REACT_APP_PRODUCTION === "true") {
      window.addEventListener("resize", handleResize);
      getUserAgentAndDeviceSize();

      return () => window.removeEventListener("resize", handleResize);
    } else {
      console.log("개발모드입니다. 디바이스 정보를 저장하지 않습니다.");
      return;
    }
  }, []);
};

export default useSaveUserAgentWidthHeight;
