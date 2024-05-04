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
import { AnotherIcon, CalendarIcon, ClockIcon, PlusIcon, ShovelIcon, SmallCross } from '../../icons/Icons';
import './News.scss';
import { fetchGetRequest } from '../../utils/fetchRequests/fetchRequest';
import { isUserAuthCorrect } from '../../utils/auth';
import { useLocation } from 'react-router-dom';

const filterArrayByTag = (Array: PostsAreaProps, TagValue: string): PostsAreaProps => {
  return { posts: [...Array.posts.filter(elem => elem.tag.text == TagValue)] };
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
        icon: <ClockIcon />,
        text: 'Свежее',
        tagMod: tagModTypes.NoneMod,
      },
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
        if (res.data) setData(convertDbDataToNormalPostsProps(res.data));
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
                linkTo="/articleCreation"
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

export const MainPage = () => {
  const location = useLocation();
  const [openPopup, setOpen] = useState(false);
  useEffect(() => {
    console.log(location);
    if (location.pathname == '/news/success-creation') {
      setOpen(true);
    }
  }, [location]);

  return (
    <div className="main-page">
      <TopPanel />
      <MainContent />
      <Footer />
      {openPopup && (
        <SuccessCreationPopup
          setPopupClosed={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

const SuccessCreationPopup = (props: { setPopupClosed: () => void }) => {
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
          <div>Новость опубликована!</div>
          <div className="popup__subtitle-text">💃🕺💃</div>
        </div>
      </div>
    </>
  );
};
