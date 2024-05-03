import { useRef } from 'react';
import { Button, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
import { Footer } from '../../components/footer/Footer';
import { PostArea, PostsAreaProps } from '../../components/post/Post';
import { TagsBar, TagsBarProps, tagModTypes } from '../../components/tagsBar/TagsBar';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { AnotherIcon, CalendarIcon, ClockIcon, PlusIcon, ShovelIcon } from '../../icons/Icons';
import blankImg from '../../images/blank-img.jpg';
import './People.scss';
import { UpArrow } from '../../components/upArrow/UpArrow';

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

const news: PostsAreaProps = {
  posts: [
    {
      id: '',
      Header: 'Экспедиция на острове Амоксары',
      Description:
        'С 21 июня по 10 июля 2022 г. отрядом Марийской археологической экспедиции (под руководством д.и.н. Никитиной Т.Б., при участии Акилбаева А.В., Михеев)',
      Date: '3 часа назад',
      AuthorName: 'Иван Березин',
      FirstScreenImageName: '../../images/blank-img.jpg',
      Theme: 'Раскопки',
      tag: {
        tagTypes: ButtonContentTypes.Icon,
        icon: <ShovelIcon />,
        text: 'Раскопки',
        tagMod: tagModTypes.NoneMod,
      },
    },
  ],
};

const MainContent = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  return (
    <section className="main-content-area-wrapper">
      <div className="main-content-area-wrapper__header">
        <h1>Люди</h1>
      </div>
      <div className="main-content-area-wrapper__content-wrapper">
        <TagsBar Tags={tagsContent.Tags} />
        <div>
          <PostArea {...news} />
        </div>
        <div className="main-content-area-wrapper__creation-button">
          <Button
            type={ButtonTypes.Linked}
            content={{
              contentType: ButtonContentTypes.IconText,
              icon: <PlusIcon />,
              text: 'Создать',
            }}
          />
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
            }}
          />
        </div>
      </div>
    </section>
  );
};

export const PeoplePage = () => {
  return (
    <div className="main-page">
      <TopPanel />
      <MainContent />
      <Footer />
    </div>
  );
};
