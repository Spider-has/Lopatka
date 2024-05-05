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
  Editor,
  convertIntoEditorFormat,
  getOnlyImageContent,
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
import { convertDateIntoDBStyle, serverImageUrl } from '../../utils/utils';
import { ArticleProps, convertDbDataToArticleProps } from '../../components/post/Article';
import { tagModTypes } from '../../components/tagsBar/TagsBar';
import { DeletePopup } from '../ArticleCreation/ArticleCreation';

const Form = (props: ArticleProps) => {
  const navigate = useNavigate();

  const [dataLoad, ondataLoad] = useState(false);
  const [theme, setTheme] = useState('');
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
                id: props.id,
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
              if (ArticleCreationData.Date == '') {
                const now = new Date();
                ArticleCreationData.Date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
              }
              if (
                ArticleCreationData.id &&
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
                    `http://localhost:8000/api/news/private/${ArticleCreationData.id}`,
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
              } else {
                alert('sosem!');
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
            <h2>Главная информация</h2>
            <div className="creation-form__article-info-area">
              <div className="creation-form__article-info">
                <label className="creation-form__input-area">
                  <p>Заголовок (не более 60 символов)*</p>
                  <InputField
                    type={InputTypes.Text}
                    validationTypes={ValidationTypes.Valid}
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
                    validationTypes={ValidationTypes.Valid}
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
                  <div className="creation-form__input-area">
                    <p>Первый экран (желательно 1020×500)*</p>
                    <InputField
                      type={InputTypes.ImageUploader}
                      validationTypes={ValidationTypes.Valid}
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
                    validationTypes={ValidationTypes.Valid}
                    dataRef={themeRef}
                    required={true}
                    lettersCount={60}
                    heightType={InputHeightTypes.Auto}
                    setOption={(option: string) => {
                      setTheme(option);
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
                  validationTypes={ValidationTypes.Valid}
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
