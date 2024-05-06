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
import { serverImageUrl } from '../../utils/utils';
import { ArticleProps, convertDbDataToArticleProps } from '../../components/post/Article';
import { tagModTypes } from '../../components/tagsBar/TagsBar';
import {
  cultureOptionElems,
  defaultValid,
  districtOptionElems,
  eraOptionElems,
  getMonumentInputData,
  typeOptionElems,
  validationStates,
} from './MonumentsCreation';
import {
  DeletePopup,
  changeElemValid,
  checkAllValid,
  useValidateChanger,
} from '../NewCreationEdit/NewCreation';
const Form = (props: ArticleProps) => {
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
  const [type, setType] = useState('');
  const [dataLoad, ondataLoad] = useState(false);
  const [culture, setCulture] = useState('');
  const [district, setDistrict] = useState('');
  const [era, setEra] = useState('');
  const [coords, setCoords] = useState('');
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
  const coordinatesRef = useRef<HTMLTextAreaElement>(null);

  useValidateChanger(validation, 3, type.length, setValidation);
  useValidateChanger(validation, 4, culture.length, setValidation);
  useValidateChanger(validation, 5, era.length, setValidation);
  useValidateChanger(validation, 6, district.length, setValidation);
  useValidateChanger(validation, 7, coords.length, setValidation);

  useValidateChanger(validation, 8, parsedEditor.length, setValidation);

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
      //  setTheme(props.Theme);
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
              themeRef.current &&
              coordinatesRef.current
            ) {
              const ArticleCreationData = getMonumentInputData(
                headerRef.current.value,
                descriptionRef.current.value,
                dateRef.current.value,
                authorRef.current.value,
                imageData.name,
                imageData.href,
                type,
                culture,
                era,
                district,
                coordinatesRef.current.value,
                parsedEditor,
                editorData,
                setValidation,
              );
              const id = props.id;
              if (
                ArticleCreationData.Header &&
                ArticleCreationData.Description &&
                ArticleCreationData.FirstScreenImageName &&
                ArticleCreationData.FirstScreenImageHref &&
                ArticleCreationData.Type &&
                ArticleCreationData.Culture &&
                ArticleCreationData.Era &&
                ArticleCreationData.District &&
                ArticleCreationData.MainContent
              ) {
                const token = getJwtToken();
                if (token)
                  fetchPutRequestWithVerify(
                    `http://localhost:8000/api/news/private/${id}`,
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
                      navigate('/news/success-update');
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
                <div className="creation-form__article-two-inputs-area">
                  <div className="creation-form__article-two-inputs-wrapper">
                    <label className={`creation-form__input-area ${validation[3].valid ? '' : errorMod}`}>
                      <p>Тип памятника*</p>
                      <InputField
                        type={InputTypes.Datalist}
                        validationTypes={
                          validation[3].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid
                        }
                        dataRef={themeRef}
                        required={true}
                        heightType={InputHeightTypes.Auto}
                        OptionListData={{
                          optionElems: typeOptionElems,
                          setOption: setType,
                        }}
                        setValid={() => {
                          setValidation(changeElemValid(validation, 3));
                        }}
                        optionData={type}
                      />
                    </label>
                  </div>
                  <div className="creation-form__article-two-inputs-wrapper">
                    <label className={`creation-form__input-area ${validation[4].valid ? '' : errorMod}`}>
                      <p>Культура*</p>
                      <InputField
                        type={InputTypes.Datalist}
                        validationTypes={
                          validation[4].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid
                        }
                        dataRef={themeRef}
                        required={true}
                        heightType={InputHeightTypes.Auto}
                        OptionListData={{
                          optionElems: cultureOptionElems,
                          setOption: setCulture,
                        }}
                        setValid={() => {
                          setValidation(changeElemValid(validation, 4));
                        }}
                        optionData={culture}
                      />
                    </label>
                  </div>
                </div>
                <label className={`creation-form__input-area ${validation[5].valid ? '' : errorMod}`}>
                  <p>Эпоха*</p>
                  <InputField
                    type={InputTypes.Datalist}
                    validationTypes={validation[5].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid}
                    dataRef={themeRef}
                    required={true}
                    heightType={InputHeightTypes.Auto}
                    OptionListData={{
                      optionElems: eraOptionElems,
                      setOption: setEra,
                    }}
                    setValid={() => {
                      setValidation(changeElemValid(validation, 5));
                    }}
                    optionData={era}
                  />
                </label>
                <label className={`creation-form__input-area ${validation[6].valid ? '' : errorMod}`}>
                  <p>Район*</p>
                  <InputField
                    type={InputTypes.Datalist}
                    validationTypes={validation[6].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid}
                    dataRef={themeRef}
                    required={true}
                    heightType={InputHeightTypes.Auto}
                    OptionListData={{
                      optionElems: districtOptionElems,
                      setOption: setDistrict,
                    }}
                    setValid={() => {
                      setValidation(changeElemValid(validation, 6));
                    }}
                    optionData={district}
                  />
                </label>
                <label className={`creation-form__input-area ${validation[7].valid ? '' : errorMod}`}>
                  <p>Координаты памятника*</p>
                  <InputField
                    type={InputTypes.Coordinates}
                    validationTypes={validation[7].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid}
                    dataRef={coordinatesRef}
                    required={true}
                    cords={coords}
                    setCords={setCoords}
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

export const NewEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [articleData, setData] = useState<ArticleProps>({
    id: '',
    Header: '',
    Description: '',
    Date: '',
    AuthorName: '',
    FirstScreenImageName: '',
    Theme: '',
    MainContent: '',
    tag: {
      tagTypes: ButtonContentTypes.Icon,
      text: '',
      tagMod: tagModTypes.NoneMod,
    },
  });
  useEffect(() => {
    if (id) {
      fetchGetRequest('http://localhost:8000/api/news/public/' + id).then(res => {
        if (res) {
          setData(convertDbDataToArticleProps(res));
        }
      });
    }
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
        <DeletePopup
          deleteHandler={() => {
            fetchDeleteRequest(`http://localhost:8000/api/news/private/${id}`).then(res => {
              if (res) {
                console.log(res);
                if (res.status == 'ok') navigate('/news/success-delete');
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
