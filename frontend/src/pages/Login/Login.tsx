import './Login.scss';
import * as Icons from '../../icons/Icons';
import { useEffect, useRef, useState } from 'react';
import { isUserAuthCorrect, signIn } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { getJwtToken } from '../../utils/token';

export const LoginPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordType, setPasswordType] = useState('password');
  const [visibleError, setVisibleError] = useState(false);
  const [visibleLoginError, setVisibleLoginError] = useState(false);
  const [visiblePasswordError, setVisiblePasswordError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    isUserAuthCorrect().then(res => {
      if (res) navigate('/news');
    });
  }, []);
  return (
    <div className="login-page">
      <div className="logination">
        <Icons.LogoIcon size={Icons.logoSizeType.Large} color={Icons.logoColorType.White} />
        <form className="logination__form">
          <h1 className="logination__header">Вход в учётную запись</h1>
          {visibleError && (
            <div className="logination__error-message-wrapper">
              <Icons.ErrorIcon />
              {!(visibleLoginError || visiblePasswordError) && <span>Логин или пароль неверны</span>}
              {(visibleLoginError || visiblePasswordError) && <span>Проверьте все поля</span>}
            </div>
          )}
          <div className="logination__inputs-area">
            <label className="logination__input-wrapper">
              <input
                required
                ref={nameRef}
                type="text"
                className="logination__input logination__input_data"
                placeholder="Логин"
              />
            </label>
            {visibleLoginError && <div className="logination__empty-data-error-message">Введите логин</div>}
            <label className="logination__input-wrapper">
              <input
                required
                ref={passwordRef}
                type={passwordType}
                className="logination__input logination__input_data"
                placeholder="Пароль"
              />
              <div
                onClick={() => {
                  if (passwordRef.current) {
                    if (passwordType == 'password') setPasswordType('text');
                    else setPasswordType('password');
                  }
                }}
                className="logination__password-icon"
              >
                {passwordType === 'password' && <Icons.PasswordEyeIcon />}
                {passwordType === 'text' && <Icons.PasswordClosedEyeIcon />}
              </div>
            </label>
            {visiblePasswordError && (
              <div className="logination__empty-data-error-message">
                <span>Введите пароль</span>
              </div>
            )}
            <label className="logination__input-wrapper">
              <input
                onClick={event => {
                  event.preventDefault();
                  if (passwordRef.current && nameRef.current) {
                    signIn(nameRef.current.value, passwordRef.current.value)
                      .catch(error => {
                        if (nameRef.current) {
                          console.log(1);
                          setVisibleLoginError(nameRef.current.value === '');
                        }
                        if (passwordRef.current) {
                          setVisiblePasswordError(passwordRef.current.value === '');
                        }
                        setVisibleError(true);
                        console.log(error);
                      })
                      .then(() => {
                        if (getJwtToken()) navigate('/news');
                      });
                  }
                }}
                type="submit"
                className="logination__input logination__input_submit-type"
                value="Войти"
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
