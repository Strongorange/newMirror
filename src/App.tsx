import React, { useEffect } from "react";
import Home from "./screens/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { auth } from "./firebase";
import { useSetRecoilState } from "recoil";
import { userState } from "./states/userStates";
import HomeOther from "./screens/HomeOther";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/homeothers",
    element: <HomeOther />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const App = () => {
  // Firebase Auth 파트
  const setUserState = useSetRecoilState(userState);
  useEffect(() => {
    // 로그인 상태 관리, 로그인한 유저의 정보를 저장, 로그아웃 시 null
    const userInfoUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUserState(null);
      }
    });

    // 로그인 지속상태 관리
    setPersistence(auth, browserLocalPersistence);

    return () => {
      userInfoUnsubscribe();
    };
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
