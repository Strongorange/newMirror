import React, { MouseEvent, useState } from "react";
import * as S from "../styles/auth/auth";
import { useNavigate } from "react-router-dom";

const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};

const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <S.AuthLayout>
      <S.LoginForm>
        <S.FormTitle>로그인</S.FormTitle>
        <S.FormField>
          <S.FormLabel>아이디</S.FormLabel>
          <S.FormInput type="text" name="email" />
          <S.FormLabel>비밀번호</S.FormLabel>
          <S.FormInput type="password" name="password" />
        </S.FormField>
        <S.FormActions>
          <S.FormButton onClick={handleLogin}>로그인</S.FormButton>
          <S.FormButton onClick={() => navigate("/signup")}>
            회원가입
          </S.FormButton>
        </S.FormActions>
      </S.LoginForm>
    </S.AuthLayout>
  );
};

export default Login;
