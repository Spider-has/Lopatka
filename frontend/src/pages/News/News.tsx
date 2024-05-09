import { useEffect, useRef, useState } from 'react';
import { Button, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
import { Footer } from '../../components/footer/Footer';
import {
  NoPostsArticle,
  PostArea,
  PostsAreaProps,
  convertDbDataToNormalNewsProps,
  postType,
} from '../../components/post/Post';
import { FilterTagsBar, TagsBarProps, tagModTypes } from '../../components/tagsBar/TagsBar';
import { TopPanel, topPanelColortype } from '../../components/topPanel/TopPanel';
import { UpArrow } from '../../components/upArrow/UpArrow';
import { AnotherIcon, CalendarIcon, PlusIcon, ShovelIcon } from '../../icons/Icons';
import './News.scss';
import { fetchGetRequest } from '../../utils/fetchRequests/fetchRequest';
import { isUserAuthCorrect } from '../../utils/auth';
import { useLocation } from 'react-router-dom';
import { InfoPopup, PopupBackgrouds, popupData } from '../../components/popup/Popup';

export const filterArrayByTag = (Data: PostsAreaProps, TagValue: string): PostsAreaProps => {
  return {
    posts: [
      ...Data.posts.filter(elem => {
        if (elem.type == postType.News || elem.type == postType.Peoples) return elem.tag.text == TagValue;
      }),
    ],
  };
};

export const sortByDate = (Data: PostsAreaProps) => {
  return {
    posts: Data.posts.toSorted((el1, el2) => {
      const day1 = Number(el1.Date.slice(0, 2));
      const day2 = Number(el2.Date.slice(0, 2));
      const month1 = Number(el1.Date.slice(3, 5));
      const month2 = Number(el2.Date.slice(3, 5));
      const year1 = Number(el1.Date.slice(6, 10));
      const year2 = Number(el2.Date.slice(6, 10));
      if (year1 < year2) return 1;
      if (year1 == year2 && month1 < month2) return 1;
      if (year1 == year2 && month1 == month2 && day1 < day2) return 1;
      return -1;
    }),
  };
};

const MainContent = () => {
  const tagsContent: TagsBarProps = {
    filterHandler: (tagValue: string) => {
      if (postData) {
        if (tagValue) setFilteredPosts(filterArrayByTag(postData, tagValue));
        else setFilteredPosts(undefined);
      }
    },
    Tags: [
      {
        tagTypes: ButtonContentTypes.IconText,
        icon: <ShovelIcon />,
        text: 'Экспедиции',
        tagMod: tagModTypes.NoneMod,
      },
      {
        tagTypes: ButtonContentTypes.IconText,
        icon: <CalendarIcon />,
        text: 'События',
        tagMod: tagModTypes.NoneMod,
      },
      {
        tagTypes: ButtonContentTypes.IconText,
        icon: <AnotherIcon />,
        text: 'Другое',
        tagMod: tagModTypes.NoneMod,
      },
    ],
  };
  const [postData, setData] = useState<PostsAreaProps>({
    posts: [],
  });
  const [filteredPosts, setFilteredPosts] = useState<PostsAreaProps>();
  const [auth, setAuth] = useState<boolean>(false);
  useEffect(() => {
    fetchGetRequest('http://localhost:8000/api/news/public/')
      .then(res => {
        if (res.data) setData(sortByDate(convertDbDataToNormalNewsProps(res.data)));
      })
      .catch(err => {
        console.log(err.message);
      });
    isUserAuthCorrect().then(res => setAuth(res));
  }, []);

  const arrowRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <section className="main-content-area-wrapper">
        <div className="main-content-area-wrapper__header">
          <h1>Новости</h1>
        </div>
        <div className="main-content-area-wrapper__content-wrapper">
          <div>
            <FilterTagsBar {...tagsContent} />
          </div>

          <div className="post-area-wrapper">
            {filteredPosts != undefined && filteredPosts.posts.length > 0 && <PostArea {...filteredPosts} />}
            {filteredPosts == undefined && postData.posts.length > 0 && <PostArea {...postData} />}
            {filteredPosts == undefined && postData.posts.length == 0 && <NoPostsArticle />}
            {filteredPosts != undefined && filteredPosts.posts.length == 0 && <NoPostsArticle />}
          </div>
          {auth && (
            <div className="main-content-area-wrapper__creation-button">
              <Button
                type={ButtonTypes.Linked}
                linkTo="/newCreation"
                content={{
                  contentType: ButtonContentTypes.IconText,
                  icon: <PlusIcon />,
                  text: 'Создать',
                }}
              />
            </div>
          )}
          <div ref={arrowRef} className="main-content-area-wrapper__up-arrow">
            <UpArrow
              downHandler={() => {
                if (arrowRef.current)
                  arrowRef.current.classList.add('main-content-area-wrapper__up-arrow_down-mod');
              }}
              upHandler={() => {
                if (arrowRef.current)
                  arrowRef.current.classList.remove('main-content-area-wrapper__up-arrow_down-mod');
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export const NewsPage = () => {
  const location = useLocation();
  const [popupData, setPopup] = useState<popupData>();
  useEffect(() => {
    if (location.pathname == '/news/success-creation') {
      setPopup({
        header: 'Новость опубликована!',
        content: '💃🕺💃',
        backgroundType: PopupBackgrouds.Primary,
      });
    } else if (location.pathname == '/news/success-update') {
      setPopup({
        header: 'Новость успешно обновлена!',
        content: '💃🕺💃',
        backgroundType: PopupBackgrouds.Primary,
      });
    } else if (location.pathname == '/news/success-delete') {
      setPopup({
        header: 'Новость удалена!',
        content: '',
        backgroundType: PopupBackgrouds.Primary,
      });
    }
  }, [location]);

  return (
    <div className="main-page">
      <div className="main-page__top-panel-wrapper">
        <TopPanel colorType={topPanelColortype.dark} withSearch={true} />
      </div>
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
