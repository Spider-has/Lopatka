import { useEffect, useRef, useState } from 'react';
import { Button, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
import { Footer } from '../../components/footer/Footer';
import { PostArea, PostsAreaProps } from '../../components/post/Post';
import { TagsBar, TagsBarProps, tagModTypes } from '../../components/tagsBar/TagsBar';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { UpArrow } from '../../components/upArrow/UpArrow';
import { AnotherIcon, CalendarIcon, ClockIcon, PlusIcon, ShovelIcon } from '../../icons/Icons';
import './News.scss';
import { fetchGetRequest } from '../../utils/fetchRequests/fetchRequest';
import { isUserAuthCorrect } from '../../utils/auth';

const tagsContent: TagsBarProps = {
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

const MainContent = () => {
  const [postData, setData] = useState<PostsAreaProps>({
    posts: [
      {
        id: '',
        Header: '',
        Description: '',
        Date: '',
        AuthorName: '',
        FirstScreenImageName: '',
        Theme: '',
        tag: {
          tagTypes: ButtonContentTypes.Icon,
          icon: undefined,
          text: '',
          tagMod: tagModTypes.NoneMod,
        },
      },
    ],
  });
  const [auth, setAuth] = useState<boolean>(false);
  useEffect(() => {
    fetchGetRequest('http://localhost:8000/api/news/public/')
      .then(res => {
        if (res.data)
          setData({
            posts: [...res.data],
          });
      })
      .catch(err => {
        console.log(err.message);
      });
    isUserAuthCorrect().then(res => setAuth(res));
  }, []);
  const arrowRef = useRef<HTMLDivElement>(null);
  return (
    <section className="main-content-area-wrapper">
      <div className="main-content-area-wrapper__header">
        <h1>Новости</h1>
      </div>
      <div className="main-content-area-wrapper__content-wrapper">
        <div>
          <TagsBar Tags={tagsContent.Tags} />
        </div>

        <div>
          <PostArea {...postData} />
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
  );
};

export const MainPage = () => {
  return (
    <div className="main-page">
      <TopPanel />
      <MainContent />
      <Footer />
    </div>
  );
};
