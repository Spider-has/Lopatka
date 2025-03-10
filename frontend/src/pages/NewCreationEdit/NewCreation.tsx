import './NewCreation.scss';

import {
  ErrorMessage,
  ImageData,
  InputField,
  InputHeightTypes,
  InputTypes,
  ValidationTypes,
  optionElem,
} from '../../components/input/Input';
import { ArrowBackIcon, LogoIcon, logoColorType, logoSizeType } from '../../icons/Icons';
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
import { Button, ButtonColorTypes, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
import { convertDateIntoDBStyle } from '../../utils/utils';
import { DeleteActiclePopup } from '../../components/popup/Popup';

type validationState = {
  valid: boolean;
};
export type validationStates = validationState[];

export const checkValidElem = (len: number) => {
  return len > 0;
};

export const defaultValid: validationStates = [
  {
    valid: true,
  },
  {
    valid: true,
  },
  {
    valid: true,
  },
  {
    valid: true,
  },
  {
    valid: true,
  },
];

export const optionElems: optionElem[] = [
  {
    text: 'Экспедиции',
  },
  {
    text: 'События',
  },
  {
    text: 'Прочее',
  },
];

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

  const parsedEditor = getParsedContentIntoBD(editorData);
  const [theme, setTheme] = useState('');
  const [imageData, setImageData] = useState<ImageData>({
    name: '',
    href: '',
  });
  const [validation, setValidation] = useState<validationStates>(defaultValid);

  const errorMod = 'creation-form__input-area_error';

  const headerRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLTextAreaElement>(null);
  const authorRef = useRef<HTMLTextAreaElement>(null);
  const ImageRef = useRef<HTMLInputElement>(null);
  const themeRef = useRef<HTMLTextAreaElement>(null);

  useValidateChanger(validation, 4, parsedEditor.length, setValidation);
  useValidateChanger(validation, 3, theme.length, setValidation);

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
              const ArticleCreationData = getInputData(
                headerRef.current.value,
                descriptionRef.current.value,
                dateRef.current.value,
                authorRef.current.value,
                imageData.name,
                imageData.href,
                theme,
                parsedEditor,
                editorData,
                setValidation,
              );
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
              }
            }
          }}
        >
          <InputField type={InputTypes.Submit} validationTypes={ValidationTypes.Valid} required={false} />
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
            <div className={!checkAllValid(validation) ? 'creation-form__form-header-wrapper' : ''}>
              <h2>Главная информация</h2>
              <div className="creation-form__error-wrapper">
                <ErrorMessage opened={!checkAllValid(validation)} text={'Проверьте все обязательные поля'} />
              </div>
            </div>
            <div className="creation-form__article-info-area">
              <div className="creation-form__article-info">
                <label className={`creation-form__input-area ${validation[0].valid ? '' : errorMod}`}>
                  <p>Заголовок (не более 60 символов)*</p>
                  <InputField
                    type={InputTypes.Text}
                    validationTypes={validation[0].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid}
                    dataRef={headerRef}
                    required={true}
                    lettersCount={60}
                    heightType={InputHeightTypes.Auto}
                    setValid={() => {
                      setValidation(changeElemValid(validation, 0));
                    }}
                  />
                </label>
                <label className={`creation-form__input-area ${validation[1].valid ? '' : errorMod}`}>
                  <p>Краткое описание (не более 150 символов)*</p>
                  <InputField
                    type={InputTypes.Text}
                    validationTypes={validation[1].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid}
                    dataRef={descriptionRef}
                    required={true}
                    lettersCount={150}
                    heightType={InputHeightTypes.Large}
                    setValid={() => {
                      setValidation(changeElemValid(validation, 1));
                    }}
                  />
                </label>
                <label className="creation-form__input-area">
                  <p>Автор (по умолчанию автор не указывается)</p>
                  <InputField
                    type={InputTypes.Text}
                    validationTypes={ValidationTypes.Valid}
                    dataRef={authorRef}
                    required={true}
                    heightType={InputHeightTypes.Auto}
                  />
                </label>
                <label className="creation-form__input-area">
                  <p>Дата публикации (не выставите, определится автоматически)</p>
                  <InputField
                    type={InputTypes.Date}
                    validationTypes={ValidationTypes.Valid}
                    dataRef={dateRef}
                    required={true}
                    heightType={InputHeightTypes.Auto}
                  />
                </label>
                <div className="creation-form__image-wrapper">
                  <h2>Вставка фотографии</h2>
                  <div className={`creation-form__input-area ${validation[2].valid ? '' : errorMod}`}>
                    <p>Первый экран (желательно 1020×500)*</p>
                    <InputField
                      type={InputTypes.ImageUploader}
                      validationTypes={
                        validation[2].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid
                      }
                      dataRef={ImageRef}
                      required={false}
                      setImage={(image: ImageData) => {
                        setImageData(image);
                      }}
                      imageData={imageData}
                      setValid={() => {
                        setValidation(changeElemValid(validation, 2));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="creation-form__article-info">
                <label className={`creation-form__input-area ${validation[3].valid ? '' : errorMod}`}>
                  <p>Тема статьи*</p>
                  <InputField
                    type={InputTypes.Datalist}
                    validationTypes={validation[3].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid}
                    dataRef={themeRef}
                    required={true}
                    lettersCount={60}
                    heightType={InputHeightTypes.Auto}
                    OptionListData={{
                      optionElems: optionElems,
                      setOption: setTheme,
                    }}
                    setValid={() => {
                      setValidation(changeElemValid(validation, 3));
                    }}
                    optionData={theme}
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
                  validationTypes={validation[4].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid}
                  required={true}
                  heightType={InputHeightTypes.Full}
                  setEditor={(editor: Editor) => {
                    setEditor(editor);
                  }}
                  EditorData={editorData}
                  setValid={() => {
                    setValidation(changeElemValid(validation, 4));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const NewCreation = () => {
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
        <DeleteActiclePopup
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

export const changeElemValid = (state: validationStates, index: number) => {
  return [
    ...state.map((el, i) => {
      if (i == index)
        return {
          valid: true,
        };
      return el;
    }),
  ];
};

export const checkAllValid = (valid: validationStates): boolean => {
  let flag = true;
  valid.forEach(el => {
    if (!el.valid) {
      flag = false;
    }
  });
  return flag;
};

export const useValidateChanger = (
  validState: validationStates,
  index: number,
  validationElemLength: number,
  setValid: (valid: validationStates) => void,
) => {
  useEffect(() => {
    if (!validState[index].valid && validationElemLength > 0) setValid(changeElemValid(validState, index));
  }, [validState[index], validationElemLength]);
};

export const getInputData = (
  header: string,
  description: string,
  date: string,
  authorName: string,
  firstScreenImgName: string,
  firstScreenImgHref: string,
  Theme: string,
  MainContent: string,
  editor: Editor,
  setValid: (valid: validationStates) => void,
) => {
  const ArticleCreationData = {
    Header: header,
    Description: description,
    Date: convertDateIntoDBStyle(date),
    AuthorName: authorName,
    FirstScreenImageName: firstScreenImgName,
    FirstScreenImageHref: firstScreenImgHref,
    Theme: Theme,
    MainContent: MainContent,
    MainContentImageData: getOnlyImageContent(editor),
  };
  console.log(ArticleCreationData);
  setValid([
    {
      valid: checkValidElem(ArticleCreationData.Header.length),
    },
    {
      valid: checkValidElem(ArticleCreationData.Description.length),
    },
    {
      valid: checkValidElem(ArticleCreationData.FirstScreenImageName.length),
    },
    {
      valid: checkValidElem(ArticleCreationData.Theme.length),
    },
    {
      valid: checkValidElem(ArticleCreationData.MainContent.length),
    },
  ]);
  if (ArticleCreationData.Date == '') {
    const now = new Date();
    ArticleCreationData.Date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  }
  return ArticleCreationData;
};
