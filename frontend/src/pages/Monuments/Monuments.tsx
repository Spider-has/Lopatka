import { useRef } from 'react';
import { Button, ButtonColorTypes, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
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
import { ExpeditionMap, LinkedArrow, PlusIcon, ShovelIcon } from '../../icons/Icons';
import './Monuments.scss';

const MonumentsTags: MonumentsTagsBarProps = {
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
      <div className="main-content-area-wrapper__content-wrapper main-content-area-wrapper__content-wrapper_monuments-wrapper">
        <MonumentsTagsBar {...MonumentsTags} />
        <div className="main-content-area-wrapper__content-area">
          <div className="main-content-area-wrapper__map-area">
            <ExpeditionMap />
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
          </div>
          <div className="main-content-area-wrapper__post-area">
            <IntrestingNowPanel text={'Экспедиция на остров Амоксары самые интересные раскопки там.'} />
            <PostArea {...news} />
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
            }}
          />
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
  return (
    <div className="main-page">
      <TopPanel />
      <MainContent />
      <Footer />
    </div>
  );
};
