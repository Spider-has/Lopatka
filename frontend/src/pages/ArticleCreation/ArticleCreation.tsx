import './ArticleCreation.scss';

import {
  ImageData,
  InputField,
  InputHeightTypes,
  InputTypes,
  ValidationTypes,
} from '../../components/input/Input';
import { ArrowBackIcon, LogoIcon, SmallCross, logoColorType, logoSizeType } from '../../icons/Icons';
import { useEffect, useRef, useState } from 'react';
import {
  ContentTypes,
  Editor,
  getOnlyImageContent,
  getParsedContentIntoBD,
} from '../../components/richTextEditor/RichTextEditor';
import { fetchPostRequestWithVerify } from '../../utils/fetchRequests/fetchRequest';
import { getJwtToken } from '../../utils/token';
import { Link, useNavigate } from 'react-router-dom';
import { isUserAuthCorrect } from '../../utils/auth';
import {
  Button,
  ButtonColorTypes,
  ButtonContentTypes,
  ButtonSizeTypes,
  ButtonTypes,
} from '../../components/button/Button';
import { convertDateIntoDBStyle } from '../../utils/utils';

const Form = () => {
  const navigate = useNavigate();
  const [editorData, setEditor] = useState<Editor>({
    count: 1,
    content: [
      {
        type: ContentTypes.Text,
        value: '',
        mods: [],
        id: 'el-0',
      },
    ],
  });
  const [imageData, setImageData] = useState<ImageData>({
    name: '',
    href: '',
  });
  const headerRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLTextAreaElement>(null);
  const authorRef = useRef<HTMLTextAreaElement>(null);
  const ImageRef = useRef<HTMLInputElement>(null);
  const themeRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section className="creation-form">
      <div className="creation-form__header-wrapper">
        <div className="creation-form__header">
          <h1>Создание новости</h1>
          <span>Чтобы опубликовать новость, заполните все поля</span>
        </div>
        <div
          onClick={() => {
            if (
              headerRef.current &&
              descriptionRef.current &&
              dateRef.current &&
              authorRef.current &&
              themeRef.current
            ) {
              const ArticleCreationData = {
                Header: headerRef.current.value,
                Description: descriptionRef.current.value,
                Date: convertDateIntoDBStyle(dateRef.current.value),
                AuthorName: authorRef.current.value,
                FirstScreenImageName: imageData.name,
                FirstScreenImageHref: imageData.href,
                Theme: themeRef.current.value,
                MainContent: getParsedContentIntoBD(editorData),
                MainContentImageData: getOnlyImageContent(editorData),
              };
              console.log(ArticleCreationData);
              if (
                ArticleCreationData.Header &&
                ArticleCreationData.Description &&
                ArticleCreationData.FirstScreenImageName &&
                ArticleCreationData.FirstScreenImageHref &&
                ArticleCreationData.Theme &&
                ArticleCreationData.MainContent
              ) {
                const token = getJwtToken();
                if (token)
                  fetchPostRequestWithVerify(
                    'http://localhost:8000/api/news/private/',
                    token,
                    ArticleCreationData,
                  )
                    .then(res => {
                      if (!res.ok) {
                        throw new Error();
                      }
                      return res.json();
                    })
                    .then(res => {
                      console.log(res);
                      navigate('/news/success-creation');
                    })
                    .catch(err => console.log(err.message));
                else {
                  alert('no token');
                }
              } else {
                alert('sosem!');
              }
            }
          }}
        >
          <InputField type={InputTypes.Submit} validationTypes={ValidationTypes.Normal} required={false} />
        </div>
      </div>
      <div className="creation-form__main-area">
        <div
          onSubmit={event => {
            event.preventDefault();
          }}
          className="creation-form__content-wrapper"
        >
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
                    dataRef={dateRef}
                    required={true}
                    heightType={InputHeightTypes.Auto}
                  />
                </label>
                <div className="creation-form__image-wrapper">
                  <h2>Вставка фотографии</h2>
                  <div className="creation-form__input-area">
                    <p>Первый экран (желательно 1020×500)*</p>
                    <InputField
                      type={InputTypes.ImageUploader}
                      validationTypes={ValidationTypes.Normal}
                      dataRef={ImageRef}
                      required={false}
                      setImage={(image: ImageData) => {
                        setImageData(image);
                      }}
                      imageData={imageData}
                    />
                  </div>
                </div>
              </div>
              <div className="creation-form__article-info">
                <label className="creation-form__input-area">
                  <p>Тема статьи*</p>
                  <InputField
                    type={InputTypes.Datalist}
                    validationTypes={ValidationTypes.Normal}
                    dataRef={themeRef}
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
                  type={InputTypes.Editor}
                  validationTypes={ValidationTypes.Normal}
                  required={true}
                  heightType={InputHeightTypes.Full}
                  setEditor={(editor: Editor) => {
                    setEditor(editor);
                  }}
                  EditorData={editorData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ArticleCreation = () => {
  const navigate = useNavigate();
  useEffect(() => {
    isUserAuthCorrect().then(res => {
      if (!res) {
        navigate('/news');
      }
    });
  }, []);
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="article-creation-page">
      <div className="article-creation-content-wrapper">
        <header className="article-creation-header ">
          <Link to={'/News'}>
            <ArrowBackIcon />
          </Link>
          <Link to={'/'}>
            <LogoIcon size={logoSizeType.Small} color={logoColorType.Dark} />
          </Link>
        </header>
        <Form />
        <div>
          <Button
            type={ButtonTypes.Functional}
            colors={ButtonColorTypes.Transparent}
            content={{
              contentType: ButtonContentTypes.Text,
              text: 'Удалить',
            }}
            handler={() => {
              setShowPopup(true);
            }}
          />
        </div>
      </div>
      {showPopup && (
        <DeletePopup
          deleteHandler={() => {
            navigate('/news');
          }}
          setPopupClosed={() => {
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
};

export const DeletePopup = (props: { deleteHandler: () => void; setPopupClosed: () => void }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div
        onClick={() => {
          props.setPopupClosed();
        }}
        className="popup-background"
      ></div>
      <div className="popup popup_delete-type" ref={popupRef}>
        <div className="popup__cross-area">
          <div
            className="popup__cross"
            onClick={() => {
              props.setPopupClosed();
            }}
          >
            <SmallCross />
          </div>
        </div>
        <div className="popup__main-area">
          <div>Вы уверены, что хотите удалить новость?</div>
          <div className="popup__buttons-area">
            <div>
              <Button
                type={ButtonTypes.Functional}
                handler={() => {
                  props.deleteHandler();
                }}
                colors={ButtonColorTypes.Transparent}
                size={ButtonSizeTypes.LargePadding}
                content={{
                  contentType: ButtonContentTypes.Text,
                  text: 'Да',
                }}
              />
            </div>
            <div>
              <Button
                handler={() => {
                  props.setPopupClosed();
                }}
                type={ButtonTypes.Functional}
                colors={ButtonColorTypes.Black}
                size={ButtonSizeTypes.LargePadding}
                content={{
                  contentType: ButtonContentTypes.Text,
                  text: 'Нет',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
