import styled from "styled-components";

export const AuthLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: black;
  color: white;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const FormTitle = styled.h1`
  margin: auto;
  font-size: 1.5rem;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

export const FormLabel = styled.label``;

export const FormInput = styled.input`
  height: 28px;
`;

export const FormActions = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormButton = styled.button`
  width: 100%;
`;

export const FormSocials = styled.div``;
