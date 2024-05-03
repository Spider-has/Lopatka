import { useRef } from 'react';
import { Button, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
import { Footer } from '../../components/footer/Footer';
import { PostArea, PostsAreaProps } from '../../components/post/Post';
import {
  MonumentsTagsBar,
  MonumentsTagsBarProps,
  tagListType,
  tagModTypes,
} from '../../components/tagsBar/TagsBar';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { UpArrow } from '../../components/upArrow/UpArrow';
import { PlusIcon, ShovelIcon } from '../../icons/Icons';
import './Monuments.scss';

const MonumentsTags: MonumentsTagsBarProps = {
  lists: [
    {
      listType: tagListType.Row,
      listHeader: 'Временной отрезок',
      tags: [
        {
          tagTypes: ButtonContentTypes.Text,
          text: '13-15 вв.',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: '9-12 вв.',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: '5-8 вв.',
          tagMod: tagModTypes.DescriptionText,
        },
        {
          tagTypes: ButtonContentTypes.Text,
          text: '7 тыс. лет до н.э.',
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
          text: 'Мезолит-неолит',
          tagMod: tagModTypes.DescriptionText,
        },
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
          text: 'Мезолит',
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
      listHeader: 'Район',
      tags: [],
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
        <h1>Памятники</h1>
      </div>
      <div className="main-content-area-wrapper__content-wrapper">
        <MonumentsTagsBar {...MonumentsTags} />
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

export const MonumentsPage = () => {
  return (
    <div className="main-page">
      <TopPanel />
      <MainContent />
      <Footer />
    </div>
  );
};
