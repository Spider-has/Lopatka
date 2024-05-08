import { useEffect, useRef, useState } from 'react';
import { Button, ButtonColorTypes, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
import { Footer } from '../../components/footer/Footer';
import {
  NoPostsArticle,
  PostArea,
  PostsAreaProps,
  convertDbDataToNormalMonumentsProps,
  postType,
} from '../../components/post/Post';
import {
  MonumentsTagsBar,
  MonumentsTagsBarProps,
  tagListType,
  tagModTypes,
} from '../../components/tagsBar/TagsBar';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { UpArrow } from '../../components/upArrow/UpArrow';
import { ExpeditionMap, LinkedArrow, PlusIcon } from '../../icons/Icons';
import './Monuments.scss';
import { fetchGetRequest } from '../../utils/fetchRequests/fetchRequest';
import { isUserAuthCorrect } from '../../utils/auth';
import { sortByDate } from '../News/News';
import { useLocation } from 'react-router-dom';
import { InfoPopup, PopupBackgrouds, popupData } from '../../components/popup/Popup';

const MonumentsTags: MonumentsTagsBarProps = {
  filterHandler: () => {
    //
  },
  lists: [
    {
      listType: tagListType.Row,
      listHeader: 'Тип памятника',
      tags: [
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Стоянка',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Селище (Поселение)',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Городище',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Могильник',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: '⁠Курганный могильник',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Святилище',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Прочее',
          tagMod: tagModTypes.DescriptionText,
        },
      ],
    },
    {
      listType: tagListType.Column,
      listHeader: 'Культура',
      tags: [
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Абашевская культура',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Поздняковская культура',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Балановская культура',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Культура текстильной керамики',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Древнемарийская культура',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Ананьинская культура',
          tagMod: tagModTypes.DescriptionText,
        },
      ],
    },
    {
      listType: tagListType.Column,
      listHeader: 'Эпоха',
      tags: [
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Поздний палеолит\n(35-8 тыс лет до н. э.)',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Мезолит (8-7 тыс лет до н. э.)',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Неолит (7-3,5  тыс лет до н. э.)',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Бронзовый век\n(3,5 тыс лет до н.э. - XII в. до н. э.)',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Железный век (XII в. до н. э. - V в.)',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Раннее Средневековье (V - IX вв.) ',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Высокое Средневековье (X-XIII вв.)',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Позднее Средневековье\n(XIV - XV вв.)',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Новое время (XVI - XIX вв.)',
          tagMod: tagModTypes.DescriptionText,
        },
      ],
    },
    {
      listType: tagListType.Row,
      listHeader: 'Район',
      tags: [
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Волжский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Горномарийский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Звениговский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Килемарский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Куженерский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Мари-Турекский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Медведевский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Моркинский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Новоторъяльский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Оршанский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Параньгинский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Сернурский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Советский',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: 'Юринский',
          tagMod: tagModTypes.DescriptionText,
        },
      ],
    },
  ],
};

const filterArrayByTagsList = (Data: PostsAreaProps, TagsValue: string[]): PostsAreaProps => {
  return {
    posts: [
      ...Data.posts.filter(elem => {
        if (elem.type == postType.Monuments) {
          const monType = TagsValue[0].replaceAll('\n', ' ');
          const culture = TagsValue[1].replaceAll('\n', ' ');
          const era = TagsValue[2].replaceAll('\n', ' ');
          const district = TagsValue[3].replaceAll('\n', ' ');
          const Type = (monType.length > 0 && elem.Type == monType) || monType.length == 0;
          const Culture = (culture.length > 0 && elem.Culture == culture) || culture.length == 0;
          const Era = (era.length > 0 && elem.Era == era) || era.length == 0;
          const District = (district.length > 0 && elem.District == district) || district.length == 0;
          return Type && Culture && Era && District;
        }
      }),
    ],
  };
};

const MainContent = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const [postData, setData] = useState<PostsAreaProps>({
    posts: [],
  });
  const [filteredPosts, setFilteredPosts] = useState<PostsAreaProps>();
  const [auth, setAuth] = useState<boolean>(false);

  const Tags: MonumentsTagsBarProps = {
    ...MonumentsTags,
    filterHandler: (activeTags: string[]) => {
      if (activeTags[0] || activeTags[1] || activeTags[2] || activeTags[3])
        setFilteredPosts(filterArrayByTagsList(postData, activeTags));
      else setFilteredPosts(undefined);
    },
  };
  useEffect(() => {
    fetchGetRequest('http://localhost:8000/api/monuments/public/')
      .then(res => {
        if (res.data) setData(sortByDate(convertDbDataToNormalMonumentsProps(res.data)));
        console.log(res);
      })
      .catch(err => {
        console.log(err.message);
      });
    isUserAuthCorrect().then(res => setAuth(res));
  }, []);
  console.log(filteredPosts, postData);
  return (
    <section className="main-content-area-wrapper">
      <div className="main-content-area-wrapper__header">
        <h1>Памятники</h1>
      </div>
      <div className="main-content-area-wrapper__content-wrapper main-content-area-wrapper__content-wrapper_monuments-wrapper">
        <MonumentsTagsBar {...Tags} />
        <div className="main-content-area-wrapper__content-area">
          <div className="main-content-area-wrapper__map-area">
            <ExpeditionMap />
            {auth && (
              <div className="main-content-area-wrapper__map-creation-button">
                <Button
                  type={ButtonTypes.Linked}
                  content={{
                    contentType: ButtonContentTypes.IconText,
                    icon: <PlusIcon />,
                    text: 'Создать',
                  }}
                  linkTo={'/monumentCreation'}
                />
              </div>
            )}
          </div>
          <div className="main-content-area-wrapper__post-area">
            <IntrestingNowPanel text={'Экспедиция на остров Амоксары самые интересные раскопки там.'} />
            {filteredPosts != undefined && filteredPosts.posts.length > 0 && <PostArea {...filteredPosts} />}
            {filteredPosts == undefined && postData.posts.length > 0 && <PostArea {...postData} />}
            {filteredPosts == undefined && postData.posts.length == 0 && <NoPostsArticle />}
            {filteredPosts != undefined && filteredPosts.posts.length == 0 && <NoPostsArticle />}
          </div>
        </div>

        <div ref={arrowRef} className="main-content-area-wrapper__up-arrow">
          <UpArrow
            downHandler={() => {
              if (arrowRef.current)
                arrowRef.current.classList.add('main-content-area-wrapper__up-arrow_down-mod');
            }}
            upHandler={() => {
              if (arrowRef.current)
                arrowRef.current.classList.remove('main-content-area-wrapper__up-arrow_down-mod');
            }} />
        </div>
      </div>
    </section>
  );
};

const IntrestingNowPanel = (props: { text: string }) => {
  return (
    <div className="interesting-panel">
      <div className="interesting-panel__content">{props.text}</div>
      <div>
        <Button
          type={ButtonTypes.Linked}
          colors={ButtonColorTypes.LightTransparent}
          content={{
            contentType: ButtonContentTypes.Icon,
            icon: <LinkedArrow />,
          }}
          linkTo={'/'}
        />
      </div>
    </div>
  );
};

export const MonumentsPage = () => {
  const location = useLocation();
  const [popupData, setPopup] = useState<popupData>();
  useEffect(() => {
    if (location.pathname == '/monuments/success-creation') {
      setPopup({
        header: 'Памятник добавлен!',
        content: '💃🕺💃',
        backgroundType: PopupBackgrouds.Accent,
      });
    } else if (location.pathname == '/monuments/success-update') {
      setPopup({
        header: 'Памятник успешно обновлен!',
        content: '💃🕺💃',
        backgroundType: PopupBackgrouds.Accent,
      });
    } else if (location.pathname == '/monuments/success-delete') {
      setPopup({
        header: 'Памятник удален!',
        content: '',
        backgroundType: PopupBackgrouds.Accent,
      });
    }
  }, [location]);
  return (
    <div className="main-page">
      <TopPanel />
      <MainContent />
      <Footer />
      {popupData != undefined && (
        <InfoPopup
          setClosed={() => {
            setPopup(undefined);
          }}
          data={popupData}
        />
      )}
    </div>
  );
};
