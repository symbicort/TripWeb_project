import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../store/features/authSlice';
import { checkUserId, checkUserNickname } from '../store/features/authUserCheck';
// import '../assets/css/auth.css';

export default function SignUp() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (userdata) => {
    console.log('onSubmit', userdata);
    dispatch(signUpUser(userdata));
  };

  const onError = (errors) => {
    console.log('onError', errors);
  };

  const userId = watch('user_id');
  const nickname = watch('nickname');

  useEffect(() => {
    if(userId){
      dispatch(checkUserId(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if(nickname){
      dispatch(checkUserNickname(nickname));
    }
  }, [nickname, dispatch]);



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label htmlFor="username">이름</label>
        <input
          type="text"
          id="username"
          placeholder="이름을 입력해주세요"
          {...register('username', {
            required: '이름을 입력해주세요',
            minLength: {
              message: '이름은 최소 2글자 이상 작성해주세요',
              value: 2,
            },
          })}
        />
        {errors.username && <span role="alert">{errors.username.message}</span>}

        <label htmlFor="user_id">아이디</label>
        <input
          type="text"
          id="user_id"
          placeholder="ID를 입력해주세요"
          {...register('user_id', {
            required: 'ID를 입력해주세요',
          })}
        />
        {errors.user_id && <span role="alert">{errors.user_id.message}</span>}
        {userId && <span>{userId}은(는) 사용 가능한 아이디입니다.</span>}

        <label htmlFor='nickname'>닉네임</label>
        <input
          type='text'
          id='nickname'
          placeholder='닉네임을 입력해주세요'
          {...register('nickname',{
            required : '닉네임을 입력해주세요'
          })}
        />
        {errors.nickname && <span role='alert'>{errors.nickname.message}</span>}
        {nickname && <span>{nickname}은(는) 사용 가능한 닉네임입니다.</span>}

        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          placeholder="이메일 주소"
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '유효한 이메일 주소를 입력하세요',
            },
          })} autoComplete='new-email'
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="'영문, 숫자, 대문자, 특수문자 포함 8자리 이상'"
          {...register('password', {
            required: '비밀번호를 입력하세요',
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다',
            },
            validate: (value) => {
              const pwNumber = /\d/.test(value);
              const pwUpperCase = /[A-Z]/.test(value);
              const pwLowerCase = /[a-z]/.test(value);
              const pwSpecialChar = /[!@#$%^&*]/.test(value);
              return (
                pwNumber &&
                pwUpperCase &&
                pwLowerCase &&
                pwSpecialChar ||
                '비밀번호는 숫자, 대문자, 소문자, 특수문자를 포함해야 합니다'
              );
            },
          })} autoComplete='new-password'
        />
        {errors.password && <span role="alert">{errors.password.message}</span>}

        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="비밀번호와 동일하게 입력해주세요"
          {...register('confirmPassword', {
            required: '비밀번호를 한번 더 입력해주세요',
            validate: (value) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다',
          })} autoComplete='new-confirmPassword'
        />
        {errors.confirmPassword && (
          <span role="alert">{errors.confirmPassword.message}</span>
        )}

        <div>
          <label htmlFor="agree">위에 약관에 동의하십니까?</label>
          <input
            type="checkbox"
            id="agree"
            {...register('agree', { required: '약관에 동의해주세요' })}
          />
          {errors.agree && <span role="alert">{errors.agree.message}</span>}
        </div>
        
        <button type="submit">가입하기</button>
      </form>
    </>
  );
}
