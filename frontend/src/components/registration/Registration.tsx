
import './Registration.scss'
export const Registration = () => {
    return (
        <div className="registration">
            <div className="registration-wrapper">
                <div className="registration-wrapper__title">
                    <h1>Запись на <br /> раскопки за</h1> <h1 className="text-below"><span className="big-number">3</span> простых шага</h1>
                </div>
                <div className="steps-wrapper">
                    <div className="steps-wrapper__step">
                        <p className="big-number">1</p>
                        <div className="steps-wrapper__step__info">
                            <div className="steps-wrapper__step__info__header">Создай аккаунт</div>
                            <div className="steps-wrapper__step__info__text">Чтобы участвовать в экспедиции достаточно зарегистрироваться на площадке <a className="link" href="https://dobro.ru/" target="_blank" rel="noreferrer">добро.ру</a> - сайте для волонтеров, где располагаются все активные записи на раскопки и их подробное описание</div>
                        </div>
                        <div className="steps-wrapper__step__photo1" />
                    </div>
                    <div className="steps-wrapper__step">
                        <p className="big-number">2</p>
                        <div className="steps-wrapper__step__info">
                            <div className="steps-wrapper__step__info__header">Оформи свой профиль</div>
                            <div className="steps-wrapper__step__info__text">Возраст, увлечения, контактную информацию и другое. Это поможет нам узнать тебя перед приглашением в экспедицию</div>
                        </div>
                        <div className="steps-wrapper__step__photo2" />
                    </div>
                    <div className="steps-wrapper__step">
                        <p className="big-number">3</p>
                        <div className="steps-wrapper__step__info">
                            <div className="steps-wrapper__step__info__header">Отправь заявку</div>
                            <div className="steps-wrapper__step__info__text">Посмотри дату экспедиции, узнай свои обязанности и оставляй заявку, мы посмотрим твой профиль и свяжемся с тобой</div>
                        </div>
                        <div className="steps-wrapper__step__photo3" />
                    </div>
                </div>
            </div>
            <div className="form-area">
                <div className="form-area__wrapper">
                    <h1 className="form-area__wrapper__title">А если нет доступных экспедиций</h1>
                    <div className="form-area__wrapper__main">
                        <div className="form-area__wrapper__main__image"></div>
                        <form className="form-area__wrapper__main__form">
                            <label>
                                <input type="text" name="name" placeholder="Введите ваше имя" className="form-area__wrapper__main__input" />
                            </label>
                            <label>
                                <input type="text" name="name" placeholder="Введите электронную почту" className="form-area__wrapper__main__input" />
                            </label>
                            <input type="submit" value="Оставить заявку" className="form-area__wrapper__main__output" />
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}
