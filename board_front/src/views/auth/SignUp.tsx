// 함수형 컴포넌트 파일 이름은 대문자로 시작 -> rfce 로 함수형 컴포넌트 생성
/** @jsxImportSource @emotion/react */

import { SignUpRequest } from '@/apis';
import { SignUpRequestDto } from '@/dtos/request/auth/sign-up.request.dto';
import { css } from '@emotion/css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

//* === Style === //
const containerStyle = css`
  max-width: 400px;
  margin: 60px auto;
  padding: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
`;

const titleStyle = css`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const inputStyle = css`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border 0.3s;
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const buttonStyle = css`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background-color: #4caf50;
  transition: background-color 0.3s;
  &:hover {
    background-color: #43a047;
  }
`;

const errorMessageStyle = css`
  color: red;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
`

function SignUp() { // 함수형 컴포넌트

  // & == Hook == //
  const navigate = useNavigate();

  // & == State == //
  const [form, setForm] = useState({
    email: "", 
    password: "",
    confirmPassword: ""
  })

  const [message, setMessage] = useState('');

  // & == Handler == //
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  const onSignUpClick = async() => {
    const { email, password, confirmPassword } = form; // 구조분해할당

    if (!email || !password || !confirmPassword) {
      // 셋 중 하나라도 없다면 {}
      setMessage('모든 항목을 입력해주세요');
      return;
  }

    if (password != confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.')
      return;
    }

    const requestBody: SignUpRequestDto = {
      email,
      password,
      confirmPassword
    }

    const response = await SignUpRequest(requestBody);
    const { result, message } = response;

    if (!result) {
      setMessage(message);
      return;
    }

    alert("회원가입을 성공하였습니다.");
    navigate('/auth/sign-in');
  }

  return (
    <div css={containerStyle}>
      <h2>회원가입</h2>
      <input 
        type="email" 
        placeholder='이메일'
        name='email'
        value={form.email}
        onChange={onInputChange}
        style={{
          width: "100%",
          marginBottom: 10
        }}
      />
      <input 
        type="password" 
        placeholder='비밀번호'
        name='password'
        value={form.password}
        onChange={onInputChange}
        style={{
          width: "100%",
          marginBottom: 10
        }}

      />
      <input 
        type="password" 
        placeholder='비밀번호 확인'
        name='confirmPassword'
        value={form.confirmPassword}
        onChange={onInputChange}
        style={{
          width: "100%",
          marginBottom: 10
        }}

      />
      <button onClick={onSignUpClick} style={{width: "100%", padding: 10}}>
        회원가입
      </button>
      {message && <p style={{
        color: 'red',

      }}>{message}</p>}
    </div>
  )
}

export default SignUp