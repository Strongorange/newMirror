import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "src/firebase";
import * as S from "../styles/auth/auth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });

  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.password !== formData.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (result) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <S.AuthLayout>
      <S.LoginForm>
        <S.FormTitle>회원가입</S.FormTitle>
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
          <S.FormLabel>비밀번호 확인</S.FormLabel>
          <S.FormInput
            type="password"
            name="passwordCheck"
            value={formData.passwordCheck}
            onChange={onChange}
          />
        </S.FormField>
        <S.FormActions>
          <S.FormButton onClick={handleSignUp}>회원가입</S.FormButton>
        </S.FormActions>
      </S.LoginForm>
    </S.AuthLayout>
  );
};

export default SignUp;
