// 함수형 컴포넌트 파일 이름은 대문자로 시작 -> rfce 로 함수형 컴포넌트 생성
/** @jsxImportSource @emotion/react */

import { signUpRequest } from '@/apis';
import { SignUpRequestDto } from '@/dtos/request/auth/sign-up.request.dto';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as authStyle from '@/views/auth/auth.style';


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

    const response = await signUpRequest(requestBody);
    const { result, message } = response;

    if (!result) {
      setMessage(message);
      return;
    }

    alert("회원가입을 성공하였습니다.");
    navigate('/auth/sign-in');
  }

  return (
    <div css={authStyle.containerStyle}>
      <h2>회원가입</h2>
      <input 
        type="email" 
        placeholder='이메일'
        name='email'
        value={form.email}
        onChange={onInputChange}
        css={authStyle.inputStyle}
      />
      <input 
        type="password" 
        placeholder='비밀번호'
        name='password'
        value={form.password}
        onChange={onInputChange}
        css={authStyle.inputStyle}

      />
      <input 
        type="password" 
        placeholder='비밀번호 확인'
        name='confirmPassword'
        value={form.confirmPassword}
        onChange={onInputChange}
        css={authStyle.inputStyle}

      />
      <button onClick={onSignUpClick} css={authStyle.buttonStyle}>
        회원가입
      </button>
      {message && <p css={authStyle.errorMessageStyle}>{message}</p>}
    </div>
  )
}

export default SignUp