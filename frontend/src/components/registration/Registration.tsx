import './Registration.scss';
import step1Img from '../../images/reg1.png';
import step2Img from '../../images/reg2.png';
import step3Img from '../../images/reg3.png';

import skelet from '../../images/skeletonReg.png';
import { useRef } from 'react';
import { fetchPostRequest } from '../../utils/fetchRequests/fetchRequest';

export const Registration = () => {
  const NameRef = useRef<HTMLInputElement>(null);
  const EmailRef = useRef<HTMLInputElement>(null);
  return (
    <div className="registration">
      <div className="registration-wrapper">
        <div className="registration-wrapper__title">
          <h1>
            Запись на <br className="desktop-br" /> раскопки за
          </h1>
          <h1>
            <span className="big-number">3</span> простых шага
          </h1>
        </div>
        <div className="steps-wrapper">
          <div className="steps-wrapper__step">
            <div className="steps-wrapper__step-content">
              <p className="big-number">1</p>
              <div className="steps-wrapper__step-info-area">
                <div className="steps-wrapper__step-header">Создай аккаунт</div>
                <div className="steps-wrapper__step-text">
                  Чтобы участвовать в экспедиции достаточно зарегистрироваться на площадке &nbsp;
                  <a className="link" href="https://dobro.ru/" target="_blank" rel="noreferrer">
                    добро.ру
                  </a>
                  &nbsp; - сайте для волонтеров, где располагаются все активные записи на раскопки и их
                  подробное описание
                </div>
              </div>
            </div>
            <img src={step1Img} alt="шаг 1" className="steps-wrapper__step-image" />
          </div>
          <div className="steps-wrapper__step">
            <div className="steps-wrapper__step-content">
              <p className="big-number">2</p>
              <div className="steps-wrapper__step-info-area">
                <div className="steps-wrapper__step-header">Оформи свой профиль</div>
                <div className="steps-wrapper__step-text">
                  Возраст, увлечения, контактную информацию и другое. Это поможет нам узнать тебя перед
                  приглашением в экспедицию
                </div>
              </div>
            </div>
            <img src={step2Img} alt="шаг 2" className="steps-wrapper__step-image" />
          </div>
          <div className="steps-wrapper__step">
            <div className="steps-wrapper__step-content">
              <p className="big-number">3</p>
              <div className="steps-wrapper__step-info-area">
                <div className="steps-wrapper__step-header">Отправь заявку</div>
                <div className="steps-wrapper__step-text">
                  Посмотри дату экспедиции, узнай свои обязанности и оставляй заявку, мы посмотрим твой
                  профиль и свяжемся с тобой
                </div>
              </div>
            </div>
            <img src={step3Img} alt="шаг 3" className="steps-wrapper__step-image" />
          </div>
        </div>
      </div>
      <div className="form-area">
        <div className="form-area__wrapper">
          <h1 className="form-area__title">А если нет доступных экспедиций</h1>
          <div className="form-area__main-content">
            <img src={skelet} alt="скелет" className="form-area__main-content-image" />
            <form
              onSubmit={event => {
                event.preventDefault();
                if (NameRef.current && EmailRef.current) {
                  const name = NameRef.current.value;
                  const email = EmailRef.current.value;
                  if (name.length > 0 && email.length > 0) {
                    fetchPostRequest('http://localhost:8000/registration/public/', {
                      UserName: name,
                      UserEmail: email,
                    }).then(res => {
                      if (res) console.log(1);
                    });
                  }
                }
              }}
              className="form-area__form"
            >
              <label>
                <input
                  ref={NameRef}
                  type="text"
                  name="name"
                  placeholder="Введите ваше имя"
                  className="form-area__input"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="name"
                  placeholder="Введите электронную почту"
                  className="form-area__input"
                />
              </label>
              <input ref={EmailRef} type="submit" value="Оставить заявку" className="form-area__output" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
