import { useEffect, useRef, useState } from 'react';
import {
  Button,
  ButtonColorTypes,
  ButtonContentTypes,
  ButtonSizeTypes,
  ButtonTypes,
} from '../../components/button/Button';
import { Footer } from '../../components/footer/Footer';
import {
  NoPostsArticle,
  PostArea,
  PostsAreaProps,
  convertDbDataToNormalPeopleProps,
} from '../../components/post/Post';
import { FilterTagsBar, TagsBarProps, tagBarStyles, tagModTypes } from '../../components/tagsBar/TagsBar';
import { TopPanel, topPanelColortype } from '../../components/topPanel/TopPanel';
import { AnotherIcon, Biography, Filter, Interview, PlusIcon } from '../../icons/Icons';
import './People.scss';
import { UpArrow } from '../../components/upArrow/UpArrow';
import { fetchGetRequest } from '../../utils/fetchRequests/fetchRequest';
import { filterArrayByTag, sortByDate } from '../News/News';
import { isUserAuthCorrect } from '../../utils/auth';
import { useLocation } from 'react-router-dom';
import { InfoPopup, PopupBackgrouds, popupData } from '../../components/popup/Popup';

const MainContent = () => {
  const tagsContent: TagsBarProps = {
    filterHandler: (tagValue: string) => {
      console.log(tagValue);
      if (postData) {
        if (tagValue) setFilteredPosts(filterArrayByTag(postData, tagValue));
        else setFilteredPosts(undefined);
      }
    },
    styleType: tagBarStyles.desktop,
    Tags: [
      {
        tagTypes: ButtonContentTypes.IconText,
        icon: <Interview />,
        text: 'Интервью',
        tagMod: tagModTypes.NoneMod,
      },
      {
        tagTypes: ButtonContentTypes.IconText,
        icon: <Biography />,
        text: 'Биография',
        tagMod: tagModTypes.NoneMod,
      },
      {
        tagTypes: ButtonContentTypes.IconText,
        icon: <AnotherIcon />,
        text: 'Прочее',
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
    fetchGetRequest('http://localhost:8000/api/peoples/public/')
      .then(res => {
        if (res.data) setData(sortByDate(convertDbDataToNormalPeopleProps(res.data)));
      })
      .catch(err => {
        console.log(err.message);
      });
    isUserAuthCorrect().then(res => setAuth(res));
  }, []);
  const authMod = auth ? '' : 'main-content-area-wrapper__content-wrapper_without-create';
  const arrowRef = useRef<HTMLDivElement>(null);
  const [openFilterBurger, setOpenFilterBurger] = useState<boolean>(false);
  const burgerProps = openFilterBurger
    ? {
        isOpen: true,
        content: (
          <FilterTagsBar
            filterHandler={tagsContent.filterHandler}
            Tags={tagsContent.Tags}
            styleType={tagBarStyles.mobile}
          />
        ),
        setClose: () => {
          setOpenFilterBurger(false);
        },
      }
    : undefined;
  return (
    <>
      <div className="main-page__top-panel-wrapper">
        <TopPanel colorType={topPanelColortype.dark} withSearch={true} burgerProps={burgerProps} />
      </div>
      <section className="main-content-area-wrapper">
        <div className="main-content-area-wrapper__header">
          <h1>Люди</h1>
        </div>
        <div className={`main-content-area-wrapper__content-wrapper ${authMod}`}>
          <div>
            <div className="main-content-area-wrapper__filter-bar-button">
              <Button
                type={ButtonTypes.Functional}
                content={{
                  contentType: ButtonContentTypes.IconText,
                  icon: <Filter />,
                  text: 'Фильтры',
                }}
                colors={ButtonColorTypes.RedBorder}
                size={ButtonSizeTypes.Mobile}
                handler={() => {
                  setOpenFilterBurger(true);
                }}
              />
            </div>

            <div className="main-content-area-wrapper__tag-bar-wrapper">
              <FilterTagsBar {...tagsContent} />
            </div>
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
                linkTo="/peopleArticleCreation"
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

export const PeoplePage = () => {
  const location = useLocation();
  const [popupData, setPopup] = useState<popupData>();
  useEffect(() => {
    if (location.pathname == '/peoples/success-creation') {
      setPopup({
        header: 'Новость опубликована!',
        content: '💃🕺💃',
        backgroundType: PopupBackgrouds.Primary,
      });
    } else if (location.pathname == '/peoples/success-update') {
      setPopup({
        header: 'Новость успешно обновлена!',
        content: '💃🕺💃',
        backgroundType: PopupBackgrouds.Primary,
      });
    } else if (location.pathname == '/peoples/success-delete') {
      setPopup({
        header: 'Новость удалена!',
        content: '',
        backgroundType: PopupBackgrouds.Primary,
      });
    }
  }, [location]);

  return (
    <div className="main-page">
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
