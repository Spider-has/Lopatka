import './ArticleCreation.scss';

import { InputField, InputHeightTypes, InputTypes, ValidationTypes } from '../../components/input/Input';
import { ArrowBackIcon, LogoIcon, logoColorType, logoSizeType } from '../../icons/Icons';
import { useRef } from 'react';

const Form = () => {
  const headerRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const datenRef = useRef<HTMLTextAreaElement>(null);
  const authorRef = useRef<HTMLTextAreaElement>(null);
  const ImageRef = useRef<HTMLTextAreaElement>(null);
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <section className="creation-form">
      <div className="creation-form__header-wrapper">
        <div className="creation-form__header">
          <h1>Создание новости</h1>
          <span>Чтобы опубликовать новость, заполните все поля</span>
        </div>
        <div>
          <InputField
            type={InputTypes.Submit}
            validationTypes={ValidationTypes.Normal}
            dataRef={ref}
            required={false}
          />
        </div>
      </div>
      <div className="creation-form__main-area">
        <form className="creation-form__content-wrapper">
          <div className="creation-form__article-info-wrapper">
            <h2>Главная информация</h2>
            <div className="creation-form__article-info-area">
              <div className="creation-form__article-info">
                <label className="creation-form__input-area">
                  <p>Заголовок (не более 60 символов)*</p>
                  <InputField
                    type={InputTypes.Text}
                    validationTypes={ValidationTypes.Normal}
                    dataRef={headerRef}
                    required={true}
                    lettersCount={60}
                    heightType={InputHeightTypes.Auto}
                  />
                </label>
                <label className="creation-form__input-area">
                  <p>Краткое описание (не более 150 символов)*</p>
                  <InputField
                    type={InputTypes.Text}
                    validationTypes={ValidationTypes.Normal}
                    dataRef={descriptionRef}
                    required={true}
                    lettersCount={150}
                    heightType={InputHeightTypes.Large}
                  />
                </label>
                <label className="creation-form__input-area">
                  <p>Автор (по умолчанию автор не указывается)</p>
                  <InputField
                    type={InputTypes.Text}
                    validationTypes={ValidationTypes.Normal}
                    dataRef={authorRef}
                    required={true}
                    heightType={InputHeightTypes.Auto}
                  />
                </label>
                <label className="creation-form__input-area">
                  <p>Дата публикации (не выставите, определится автоматически)</p>
                  <InputField
                    type={InputTypes.Text}
                    validationTypes={ValidationTypes.Normal}
                    dataRef={datenRef}
                    required={true}
                    heightType={InputHeightTypes.Auto}
                  />
                </label>
                <div className="creation-form__image-wrapper">
                  <h2>Вставка фотографии</h2>
                  <label className="creation-form__input-area">
                    <p>Первый экран (желательно 1020×500)*</p>
                    <InputField
                      type={InputTypes.ImageUploader}
                      validationTypes={ValidationTypes.Normal}
                      dataRef={ImageRef}
                      required={false}
                    />
                  </label>
                </div>
              </div>
              <div className="creation-form__article-info">
                <label className="creation-form__input-area">
                  <p>Тема статьи*</p>
                  <InputField
                    type={InputTypes.Text}
                    validationTypes={ValidationTypes.Normal}
                    dataRef={ref}
                    required={true}
                    lettersCount={60}
                    heightType={InputHeightTypes.Auto}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="creation-form__article-content-wrapper">
            <h2>Текст*</h2>
            <div className="creation-form__article-content-area">
              <div></div>
              <div className="creation-form__article-content">
                <InputField
                  type={InputTypes.Text}
                  validationTypes={ValidationTypes.Normal}
                  dataRef={ref}
                  required={true}
                  heightType={InputHeightTypes.Full}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

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
  );
};
