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
import {
  DeletePopup,
  changeElemValid,
  checkAllValid,
  checkValidElem,
  useValidateChanger,
} from '../NewCreationEdit/NewCreation';
import { convertDateIntoDBStyle } from '../../utils/utils';

type validationState = {
  valid: boolean;
};
export type validationStates = validationState[];

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

export const typeOptionElems: optionElem[] = [
  {
    text: 'Стоянка',
  },
  {
    text: 'Селище (Поселение)',
  },
  {
    text: 'Городище',
  },
  {
    text: 'Могильник',
  },
  {
    text: 'Курганный могильник',
  },
  {
    text: 'Святилище',
  },
  {
    text: 'Прочее',
  },
];

export const cultureOptionElems: optionElem[] = [
  {
    text: 'Абашевская культура',
  },
  {
    text: 'Поздняковская культура',
  },
  {
    text: 'Балановская культура',
  },
  {
    text: 'Культура текстильной керамики',
  },
  {
    text: 'Древнемарийская культура',
  },
  {
    text: 'Ананьинская культура',
  },
];

export const eraOptionElems: optionElem[] = [
  {
    text: 'Поздний палеолит (35-8 тыс лет до н. э.)',
  },
  {
    text: 'Мезолит (8-7 тыс лет до н. э.)',
  },
  {
    text: 'Неолит (7-3,5  тыс лет до н. э.)',
  },
  {
    text: 'Бронзовый век (3,5 тыс лет до н.э. - XII в. до н. э.)',
  },
  {
    text: 'Железный век (XII в. до н. э. - V в.)',
  },
  {
    text: 'Раннее Средневековье (V - IX вв.)',
  },
  {
    text: 'Высокое Средневековье (X-XIII вв.)',
  },
  {
    text: 'Позднее Средневековье(XIV - XV вв.)',
  },
  {
    text: 'Новое время (XVI - XIX вв.)',
  },
];

export const districtOptionElems: optionElem[] = [
  {
    text: 'Волжский',
  },
  {
    text: 'Горномарийский',
  },
  {
    text: 'Звениговский',
  },
  {
    text: 'Килемарский',
  },
  {
    text: 'Куженерский',
  },
  {
    text: 'Мари-Турекский',
  },
  {
    text: 'Медведевский',
  },
  {
    text: 'Моркинский',
  },
  {
    text: 'Новоторъяльский',
  },
  {
    text: 'Оршанский',
  },
  {
    text: 'Параньгинский',
  },
  {
    text: 'Сернурский',
  },
  {
    text: 'Советский',
  },
  {
    text: 'Юринский',
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
  const [type, setType] = useState('');
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
                    lettersCount={300}
                    heightType={InputHeightTypes.Auto}
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
                  validationTypes={validation[8].valid ? ValidationTypes.Valid : ValidationTypes.NoneValid}
                  required={true}
                  heightType={InputHeightTypes.Full}
                  setEditor={(editor: Editor) => {
                    setEditor(editor);
                  }}
                  EditorData={editorData}
                  setValid={() => {
                    setValidation(changeElemValid(validation, 8));
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

export const MonumentCreation = () => {
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

export const getMonumentInputData = (
  header: string,
  description: string,
  date: string,
  authorName: string,
  firstScreenImgName: string,
  firstScreenImgHref: string,
  type: string,
  culture: string,
  era: string,
  district: string,
  coordinates: string,
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
    Type: type,
    Culture: culture,
    Era: era,
    District: district,
    Coordinates: coordinates,
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
      valid: checkValidElem(ArticleCreationData.Type.length),
    },
    {
      valid: checkValidElem(ArticleCreationData.Culture.length),
    },
    {
      valid: checkValidElem(ArticleCreationData.Era.length),
    },
    {
      valid: checkValidElem(ArticleCreationData.District.length),
    },
    {
      valid: ArticleCreationData.Coordinates.length == 21,
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
