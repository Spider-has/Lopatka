import {
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
  ModsTypes,
  getOnlyImageContent,
  getParsedContentIntoBD,
  mod,
} from '../../components/richTextEditor/RichTextEditor';
import { fetchGetRequest, fetchPostRequestWithVerify } from '../../utils/fetchRequests/fetchRequest';
import { getJwtToken } from '../../utils/token';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { isUserAuthCorrect } from '../../utils/auth';
import { Button, ButtonColorTypes, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
import { convertDateIntoDBStyle, serverImageUrl } from '../../utils/utils';
import { ArticleProps, convertDbDataToArticleProps } from '../../components/post/Article';
import { tagModTypes } from '../../components/tagsBar/TagsBar';
import { DeletePopup } from '../ArticleCreation/ArticleCreation';

const Form = (props: ArticleProps) => {
  const navigate = useNavigate();

  const [dataLoad, ondataLoad] = useState(false);
  const [editorData, setEditor] = useState<Editor>({
    count: 0,
    content: [],
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
  useEffect(() => {
    console.log(1);
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
      themeRef.current.value = props.Theme;
      console.log(props.MainContent);
      setEditor(convertIntoEditorFormat(props.MainContent));
      setImageData({
        name: props.FirstScreenImageName,
        href: serverImageUrl + props.FirstScreenImageName,
      });

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
                    loaded={dataLoad}
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
                    loaded={dataLoad}
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

export const EditNew = () => {
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

const convertIntoEditorFormat = (data: string): Editor => {
  let dataCopy = data.substring(0, data.length);
  const editor: Editor = { count: 0, content: [] };
  console.log(dataCopy);
  const spanPos = dataCopy.search(/<span.*?>/g);
  const imgPos = dataCopy.search(/<img.*?>/g);
  while (spanPos != -1 || imgPos != -1) {
    console.log(spanPos, imgPos);
    if ((imgPos != -1 && spanPos != -1 && spanPos < imgPos) || (spanPos != -1 && imgPos == -1)) {
      dataCopy = dataCopy.replace(/<span.*?>/g, '');
      const endSpanPos = dataCopy.search(/<\/span>/g);
      if (endSpanPos != -1) {
        transformSpanIntoEditorType(dataCopy, spanPos, endSpanPos);
        console.log(1);
        dataCopy = dataCopy.replace(/<\/span.*?>/g, '');
        dataCopy = dataCopy.slice(endSpanPos, dataCopy.length);
      } else break;
    } else if (imgPos != -1 && imgPos < spanPos) {
      //
      break;
    }
    break;
  }

  return {
    count: 1,
    content: [
      {
        type: ContentTypes.Text,
        value: '',
        mods: [],
        id: 'el-0',
      },
    ],
  };
};

const transformSpanIntoEditorType = (dataCopy: string, spanStart: number, spanEnd: number) => {
  let spanContent = dataCopy.slice(spanStart, spanEnd);
  const mods: mod[] = [];
  console.log(spanContent);
  while (ModsInclude(spanContent)) {
    const minPos = getMinPos(spanContent);
    console.log(minPos);
    console.log(spanContent);
    if (spanContent.search('<b>') == minPos) {
      const data = replaceAndGetModPositions(spanContent, '<b>', '</b>');
      spanContent = data.strCopy;
      mods.push({
        from: data.Start,
        to: data.End,
        formats: [ModsTypes.Bold],
      });
    } else if (spanContent.search('<c>') == minPos) {
      const data = replaceAndGetModPositions(spanContent, '<c>', '</c>');
      spanContent = data.strCopy;
      mods.push({
        from: data.Start,
        to: data.End,
        formats: [ModsTypes.Cursive],
      });
    } else if (spanContent.search('<bc>') == minPos) {
      const data = replaceAndGetModPositions(spanContent, '<bc>', '</bc>');
      spanContent = data.strCopy;
      mods.push({
        from: data.Start,
        to: data.End,
        formats: [ModsTypes.Bold, ModsTypes.Cursive],
      });
    } else break;
  }
  console.log(spanContent);
  console.log(mods);
};

const replaceAndGetModPositions = (str: string, openTag: string, closeTag: string) => {
  let strCopy = str;
  const Start = strCopy.search(openTag);
  strCopy = strCopy.replace(openTag, '');
  const End = strCopy.search(closeTag);
  strCopy = strCopy.replace(closeTag, '');
  return { strCopy, Start, End };
};

const ModsInclude = (str: string): boolean => {
  if (
    str.search('<b>') != -1 ||
    str.search('<c>') != -1 ||
    str.search('<bc>') != -1 ||
    str.search(/<.*?f.*?>/g) != -1
  )
    return true;
  else return false;
};

const getMinPos = (str: string): number => {
  let minPos = 1000000;
  if (str.search('<b>') != -1) {
    minPos = Math.min(str.search('<b>'), minPos);
  }
  if (str.search('<c>') != -1) {
    minPos = Math.min(str.search('<c>'), minPos);
  }
  if (str.search(/<f.*?>/g) != -1) {
    minPos = Math.min(str.search(/<f.*?>/g), minPos);
  }
  if (str.search('<bc>') != -1) {
    minPos = Math.min(str.search('<bc>'), minPos);
  }
  if (str.search(/<bcf.*?>/g) != -1) {
    minPos = Math.min(str.search(/<bcf.*?>/g), minPos);
  }
  if (str.search(/<bf.*?>/g) != -1) {
    minPos = Math.min(str.search(/<bf.*?>/g), minPos);
  }
  if (str.search(/<cf.*?>/g) != -1) {
    minPos = Math.min(str.search(/<cf.*?>/g), minPos);
  }
  return minPos;
};

const replacer = (value: string) => {
  return value
    .replaceAll('<br>', '\n')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('<b>', '')
    .replaceAll('</b>', '')
    .replaceAll('<c>', '')
    .replaceAll('</c>', '')
    .replaceAll('<bc>', '')
    .replaceAll('</bc>', '')
    .replaceAll(/<.*?f.*?>/g, '')
    .replaceAll(/<\/.*?f.*?>/g, '');
};
