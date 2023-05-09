import React, { ChangeEvent, MouseEvent, useState } from "react";
import * as S from "../styles/auth/auth";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "src/firebase";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (result) {
        navigate("/");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <S.AuthLayout>
      <S.LoginForm>
        <S.FormTitle>로그인</S.FormTitle>
        <S.FormField>
          <S.FormLabel>아이디</S.FormLabel>
          <S.FormInput
            type="text"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
          <S.FormLabel>비밀번호</S.FormLabel>
          <S.FormInput
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
          />
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
