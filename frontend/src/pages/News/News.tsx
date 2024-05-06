import { useEffect, useRef, useState } from 'react';
import { Button, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
import { Footer } from '../../components/footer/Footer';
import {
  NoPostsArticle,
  PostArea,
  PostsAreaProps,
  convertDbDataToNormalPostsProps,
} from '../../components/post/Post';
import { FilterTagsBar, TagsBarProps, tagModTypes } from '../../components/tagsBar/TagsBar';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { UpArrow } from '../../components/upArrow/UpArrow';
import { AnotherIcon, CalendarIcon, PlusIcon, ShovelIcon, SmallCross } from '../../icons/Icons';
import './News.scss';
import { fetchGetRequest } from '../../utils/fetchRequests/fetchRequest';
import { isUserAuthCorrect } from '../../utils/auth';
import { useLocation } from 'react-router-dom';

const filterArrayByTag = (Data: PostsAreaProps, TagValue: string): PostsAreaProps => {
  return { posts: [...Data.posts.filter(elem => elem.tag.text == TagValue)] };
};

const sortByDate = (Data: PostsAreaProps) => {
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
        if (res.data) setData(sortByDate(convertDbDataToNormalPostsProps(res.data)));
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

type PopupData = {
  content: string;
  header: string;
};

export const MainPage = () => {
  const location = useLocation();
  const [popupData, setPopup] = useState<PopupData>();
  useEffect(() => {
    if (location.pathname == '/news/success-creation') {
      setPopup({
        header: 'Новость опубликована!',
        content: '💃🕺💃',
      });
    } else if (location.pathname == '/news/success-update') {
      setPopup({
        header: 'Новость успешно обновлена!',
        content: '💃🕺💃',
      });
    } else if (location.pathname == '/news/success-delete') {
      setPopup({
        header: 'Новость удалена!',
        content: '',
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
          setPopupClosed={() => {
            setPopup(undefined);
          }}
          header={popupData.header}
          content={popupData.content}
        />
      )}
    </div>
  );
};

const InfoPopup = (props: { setPopupClosed: () => void; header: string; content: string }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div
        onClick={() => {
          props.setPopupClosed();
        }}
        className="popup-background"
      ></div>
      <div className="popup popup_success-type" ref={popupRef}>
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
        <div className="popup__main-area popup__main-area_creation-type">
          <div>{props.header}</div>
          <div className="popup__subtitle-text">{props.content}</div>
        </div>
      </div>
    </>
  );
};
