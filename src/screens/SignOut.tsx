import React from "react";
import * as S from "../styles/auth/auth.style";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();
  const signOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <S.AuthLayout>
      <S.SignOutButton onClick={signOut}>로그 아웃</S.SignOutButton>
    </S.AuthLayout>
  );
};

export default SignOut;
