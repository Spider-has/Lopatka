import "./ArticleCreation.scss"

import { InputField, InputTypes, ValidationTypes } from "../../components/input/input"
import { ArrowBackIcon, LogoIcon, logoColorType, logoSizeType } from "../../icons/Icons"


const Form = () => {
    return (
        <section className="creation-form">
            <div className="creation-form__header-wrapper">
                <div className="creation-form__header">
                    <h1>
                        Создание новости
                    </h1>
                    <span>
                        Чтобы опубликовать новость, заполните все поля
                    </span>
                </div>
                <div>
                    <InputField type={InputTypes.Submit} validationTypes={ValidationTypes.Normal} dataRef={null} required={false} />
                </div>
            </div>
            <div className="creation-form__main-area">
                <form className="creation-form__content-wrapper">
                    <div className="creation-form__article-info-wrapper">
                        <h2>Главная информация</h2>

                        <div className="creation-form__article-info">
                            <label className="creation-form__input-area">
                                <p>Заголовок (не более 60 символов)*</p>
                                <InputField type={InputTypes.Text} validationTypes={ValidationTypes.Normal} dataRef={null} required={true} />
                            </label>
                            <label className="creation-form__input-area">
                                <p>Заголовок (не более 60 символов)*</p>
                                <InputField type={InputTypes.Text} validationTypes={ValidationTypes.Normal} dataRef={null} required={true} />
                            </label>
                            <label className="creation-form__input-area">
                                <p>Заголовок (не более 60 символов)*</p>
                                <InputField type={InputTypes.Text} validationTypes={ValidationTypes.Normal} dataRef={null} required={true} />
                            </label>
                            <label className="creation-form__input-area">
                                <p>Заголовок (не более 60 символов)*</p>
                                <InputField type={InputTypes.Text} validationTypes={ValidationTypes.Normal} dataRef={null} required={true} />
                            </label>
                            <label className="creation-form__input-area">
                                <p>Заголовок (не более 60 символов)*</p>
                                <InputField type={InputTypes.Text} validationTypes={ValidationTypes.Normal} dataRef={null} required={true} />
                            </label>
                            <label className="creation-form__input-area">
                                <p>Заголовок (не более 60 символов)*</p>
                                <InputField type={InputTypes.Text} validationTypes={ValidationTypes.Normal} dataRef={null} required={true} />
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export const ArticleCreation = () => {
    return (
        <div className="article-creation-page">
            <div className="article-creation-content-wrapper">
                <header className="article-creation-header ">
                    <div>
                        <ArrowBackIcon />
                    </div>
                    <LogoIcon size={logoSizeType.Small} color={logoColorType.Dark} />
                </header>
                <Form />
            </div>
        </div>
    )
}