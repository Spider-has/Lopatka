import "./Login.scss"
import * as Icons from "../../icons/Icons"
import { useRef, useState } from "react"
import { fetchPostRequest } from "../../fetchRequests/fetchRequest";


export const LoginPage = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [passwordType, setPasswordType] = useState("password");
    const [visibleError, setVisibleError] = useState(false);
    const [visibleLoginError, setVisibleLoginError] = useState(false);
    const [visiblePasswordError, setVisiblePasswordError] = useState(false);
    return (
        <div className="login-page">
            <div className="logination">
                <Icons.LogoIcon />
                <form className="logination__form">
                    <h1 className="logination__header">
                        Вход в учётную запись
                    </h1>
                    {
                        visibleError && <div className="logination__error-message-wrapper">
                            <Icons.ErrorIcon />
                            {
                                !(visibleLoginError || visiblePasswordError) &&
                                <span>
                                    Логин или пароль неверны
                                </span>
                            }
                            {
                                (visibleLoginError || visiblePasswordError) &&
                                <span>
                                    Проверьте все поля
                                </span>
                            }
                        </div>
                    }
                    <div className="logination__inputs-area">
                        <label className="logination__input-wrapper">
                            <input required ref={nameRef} type="text" className="logination__input logination__input_data" placeholder="Логин" />
                        </label>
                        {visibleLoginError && <div className="logination__empty-data-error-message">
                            Введите логин
                        </div>}
                        <label className="logination__input-wrapper">
                            <input required ref={passwordRef} type={passwordType} className="logination__input logination__input_data" placeholder="Пароль" />
                            <div
                                onClick={() => {
                                    if (passwordRef.current) {
                                        if (passwordType == "password")
                                            setPasswordType("text")
                                        else
                                            setPasswordType("password")
                                    }
                                }}
                                className="logination__password-icon">
                                {passwordType === "password" && <Icons.PasswordEyeIcon />}
                                {passwordType === "text" && <Icons.PasswordClosedEyeIcon />}
                            </div>
                        </label>
                        {visiblePasswordError && <div className="logination__empty-data-error-message">
                            <span>
                                Введите пароль
                            </span>
                        </div>}
                        <label className="logination__input-wrapper">
                            <input onClick={(event) => {
                                event.preventDefault()
                                if (passwordRef.current && nameRef.current) {   
                                    fetchPostRequest("http://localhost:8000/auth/sign-in", {
                                        userEmail: nameRef.current.value,
                                        password: passwordRef.current.value
                                    }).then((response) => {
                                        if (!response.ok) {
                                            throw new Error('Error occurred!')
                                        }
                                        window.location.assign("/mainPage");
                                    }).catch(() => {
                                        if (nameRef.current) {
                                            setVisibleLoginError(nameRef.current.value === '');
                                        }
                                        if (passwordRef.current) {
                                            setVisiblePasswordError(passwordRef.current.value === '');
                                        }
                                        setVisibleError(true);
                                    });
                                    console.log({
                                        email: nameRef.current.value,
                                        password: passwordRef.current.value
                                    })
                                }
                            }} type="submit" className="logination__input logination__input_submit-type" value="Войти" />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}