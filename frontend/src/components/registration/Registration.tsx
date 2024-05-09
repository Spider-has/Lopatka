import './Registration.scss';
import step1Img from '../../images/reg1.png';
import step2Img from '../../images/reg2.png';
import step3Img from '../../images/reg3.png';

import skelet from '../../images/skeletonReg.png';

export const Registration = () => {
  return (
    <div className="registration">
      <div className="registration-wrapper">
        <div className="registration-wrapper__title">
          <h1>
            Запись на <br /> раскопки за
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
            <div className="steps-wrapper__step-image">
              <img src={step1Img} alt="шаг 1" />
            </div>
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
            <div className="steps-wrapper__step-image">
              <img src={step2Img} alt="шаг 1" />
            </div>
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
            <div className="steps-wrapper__step-image">
              <img src={step3Img} alt="шаг 1" />
            </div>
          </div>
        </div>
      </div>
      <div className="form-area">
        <div className="form-area__wrapper">
          <h1 className="form-area__title">А если нет доступных экспедиций</h1>
          <div className="form-area__main-content">
            <div className="form-area__main-content-image">
              <img src={skelet} alt="скелет" />
            </div>
            <form className="form-area__form">
              <label>
                <input type="text" name="name" placeholder="Введите ваше имя" className="form-area__input" />
              </label>
              <label>
                <input
                  type="text"
                  name="name"
                  placeholder="Введите электронную почту"
                  className="form-area__input"
                />
              </label>
              <input type="submit" value="Оставить заявку" className="form-area__output" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
