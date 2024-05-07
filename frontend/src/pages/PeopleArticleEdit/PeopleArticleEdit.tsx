import {
  ErrorMessage,
  ImageData,
  InputField,
  InputHeightTypes,
  InputTypes,
  ValidationTypes,
} from '../../components/input/Input';
import { ArrowBackIcon, LogoIcon, logoColorType, logoSizeType } from '../../icons/Icons';
import { useEffect, useRef, useState } from 'react';
import {
  ContentTypes,
  Editor,
  convertIntoEditorFormat,
  getParsedContentIntoBD,
} from '../../components/richTextEditor/RichTextEditor';
import {
  fetchDeleteRequest,
  fetchGetRequest,
  fetchPutRequestWithVerify,
} from '../../utils/fetchRequests/fetchRequest';
import { getJwtToken } from '../../utils/token';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { isUserAuthCorrect } from '../../utils/auth';
import { Button, ButtonColorTypes, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
import { convertToEuropeanDateStyle, serverImageUrl } from '../../utils/utils';
import { DeleteActiclePopup } from '../../components/popup/Popup';
import {
  changeElemValid,
  checkAllValid,
  defaultValid,
  getInputData,
  useValidateChanger,
  validationStates,
} from '../NewCreationEdit/NewCreation';
import { optionElems } from './PeopleArticleCreation';

const Form = (props: NewPost) => {
  const navigate = useNavigate();

  const [dataLoad, ondataLoad] = useState(false);

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
  console.log(editorData);
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

  useEffect(() => {
    if (
      props.id &&
      headerRef.current &&
      descriptionRef.current &&
      dateRef.current &&
      authorRef.current &&
      themeRef.current &&
      ImageRef.current
    ) {
      headerRef.current.value = props.Header;
      descriptionRef.current.value = props.Description;
      dateRef.current.value = props.Date;
      authorRef.current.value = props.AuthorName;
      setTheme(props.Theme);
      setEditor(convertIntoEditorFormat(props.MainContent));
      setImageData({
        name: props.FirstScreenImageName,
        href: serverImageUrl + props.FirstScreenImageName,
      });
      console.log(props);
      ondataLoad(true);
    }
  }, [props]);

  return (
    <section className="creation-form">
      <div className="creation-form__header-wrapper">
        <div className="creation-form__header">
          <h1>Редактирование статьи про человека</h1>
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
              const id = props.id;
              if (
                id &&
                ArticleCreationData.Header &&
                ArticleCreationData.Description &&
                ArticleCreationData.FirstScreenImageName &&
                ArticleCreationData.FirstScreenImageHref &&
                ArticleCreationData.Theme &&
                ArticleCreationData.MainContent
              ) {
                const token = getJwtToken();
                if (token)
                  fetchPutRequestWithVerify(
                    `http://localhost:8000/api/peoples/private/${id}`,
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
                      navigate('/peoples/success-update');
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
                    loaded={dataLoad}
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
                    loaded={dataLoad}
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
                    loaded={dataLoad}
                    newDate={props.Date}
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
                  loaded={dataLoad}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type NewPost = {
  id: string;
  Header: string;
  Description: string;
  Date: string;
  AuthorName: string;
  FirstScreenImageName: string;
  Theme: string;
  MainContent: string;
};

const convertDbDataToEditorProps = (data: NewPost): NewPost => {
  return {
    ...data,
    Date: convertToEuropeanDateStyle(data.Date),
  };
};

export const PeopleArticleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [articleData, setData] = useState<NewPost>({
    id: '',
    Header: '',
    Description: '',
    Date: '',
    AuthorName: '',
    FirstScreenImageName: '',
    Theme: '',
    MainContent: '',
  });
  useEffect(() => {
    if (id) {
      fetchGetRequest('http://localhost:8000/api/peoples/public/' + id).then(res => {
        if (res) {
          setData(convertDbDataToEditorProps(res));
        }
      });
    }
    isUserAuthCorrect().then(res => {
      if (!res) {
        navigate('/peoples');
      }
    });
  }, []);
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="article-creation-page">
      <div className="article-creation-content-wrapper">
        <header className="article-creation-header ">
          <Link to={'/peoples'}>
            <ArrowBackIcon />
          </Link>
          <Link to={'/'}>
            <LogoIcon size={logoSizeType.Small} color={logoColorType.Dark} />
          </Link>
        </header>
        <Form {...articleData} />
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
            fetchDeleteRequest(`http://localhost:8000/api/peoples/private/${id}`).then(res => {
              if (res) {
                console.log(res);
                if (res.status == 'ok') navigate('/peoples/success-delete');
              }
            });
          }}
          setPopupClosed={() => {
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
};
