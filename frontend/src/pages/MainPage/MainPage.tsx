import { ArheologyHeading } from '../../components/images/Images';
import { TopPanel, topPanelColortype } from '../../components/topPanel/TopPanel';
import './MainPage.scss';

import textFieldLopata from '../../images/textFieldLopata.png';
import skelet from '../../images/skelet-small.svg';
import aboutUsImg from '../../images/about-us-image.jpg';
import skeletNormalSize from '../../images/skelet-normal.svg';
import excavationsTextField from '../../images/exvacationTextField.png';

import swiper1 from '../../images/swiper1.jpg';
import swiper2 from '../../images/swiper2.jpg';
import swiper3 from '../../images/swiper3.jpg';
import swiper4 from '../../images/swiper4.jpg';
import swiper5 from '../../images/swiper5.jpg';

import {
  Button,
  ButtonColorTypes,
  ButtonContentTypes,
  ButtonSizeTypes,
  ButtonTypes,
} from '../../components/button/Button';
import { ArrowLeft, ArrowRight, ExpeditionMap, LinkedArrowDark } from '../../icons/Icons';
import { useEffect, useRef, useState } from 'react';
import { fetchGetRequest } from '../../utils/fetchRequests/fetchRequest';
import { sortByDate } from '../News/News';
import { PostsAreaProps, convertDbDataToNormalNewsProps } from '../../components/post/Post';
import { Registration } from '../../components/registration/Registration';
import { Footer } from '../../components/footer/Footer';

const HeaderInfo = () => {
  return (
    <header className="main-header">
      <div className="main-header__heading">
        <ArheologyHeading />
        <span>Это интересно</span>
      </div>
    </header>
  );
};

const FirstParagraph = () => {
  return (
    <div className="about-us">
      <div className="about-us__wrapper">
        <div className="about-us__registration-wrapper">
          <img className="about-us__text-field-image" src={textFieldLopata} alt="о лопате" />
          <img src={skelet} alt="скелет" />
          <div className="about-us__button-wrapper">
            <Button
              type={ButtonTypes.Functional}
              content={{
                contentType: ButtonContentTypes.Text,
                text: 'Записаться на раскопки',
              }}
              size={ButtonSizeTypes.Big}
            />
          </div>
        </div>
        <div className="about-us__img">
          <div>
            <img src={aboutUsImg} alt="члены экспедиции" />
          </div>
        </div>
      </div>
    </div>
  );
};

type eventCardProps = {
  header: string;
  description: string;
  linkTo: string;
};

const EventCard = (props: eventCardProps) => {
  return (
    <div className="event-card">
      <div className="event-card__content-wrapper">
        <h2>{props.header}</h2>
        <p>{props.description}</p>
      </div>
      <div className="event-card__button-wrapper">
        <Button
          type={ButtonTypes.Linked}
          content={{
            contentType: ButtonContentTypes.Icon,
            icon: <LinkedArrowDark />,
          }}
          colors={ButtonColorTypes.Transparent}
          linkTo={props.linkTo}
        />
      </div>
    </div>
  );
};

const newPath = '/new/';

const convertToEventProps = (data: PostsAreaProps): eventCardProps[] => {
  const arrCopy = data.posts.length <= 6 ? data.posts : data.posts.slice(0, 7);
  return [
    ...arrCopy.map(el => {
      return {
        header: el.Header,
        description: el.Description,
        linkTo: newPath + el.id,
      };
    }),
  ];
};

const LastEvents = () => {
  const [eventsData, setEventsData] = useState<eventCardProps[]>();
  useEffect(() => {
    fetchGetRequest('http://localhost:8000/api/news/public/')
      .then(res => {
        if (res.data)
          setEventsData(convertToEventProps(sortByDate(convertDbDataToNormalNewsProps(res.data))));
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);
  const events = eventsData?.map((el, i) => <EventCard key={i} {...el} />);
  return (
    <div className="last-events">
      <div className="last-events__content-wrapper">
        <h2 className="last-events__heading">Последние события</h2>
        <div className="last-events__events-block">{events}</div>
      </div>
    </div>
  );
};

const ExcavationsPlaces = () => {
  return (
    <div className="excavations">
      <div className="excavations__wrapper">
        <div className="excavations__heading">Где проходили раскопки</div>
        <div className="excavations__map-area">
          <div className="excavations__selected-excavation"></div>
          <div className="excavations__map-wrapper">
            <ExpeditionMap />
            <div className="excavations__skeletos-area">
              <img className="excavations__text-field" src={excavationsTextField} alt="о экспедициях" />
              <img src={skeletNormalSize} alt="скелет" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type swiperElem = {
  src: string;
  text: string;
};

type imageSwiper = {
  images: swiperElem[];
  indexNow: number;
};
const imageData: swiperElem[] = [
  {
    src: swiper1,
    text: 'это дружественная и спокойная атмосфера',
  },
  {
    src: swiper2,
    text: 'это увлекательные рассказы',
  },
  {
    src: swiper3,
    text: 'это интересные находки',
  },
  {
    src: swiper4,
    text: 'это запоминающиеся приключения',
  },
  {
    src: swiper5,
    text: 'это удивительные сюрпризы',
  },
];

const SwiperDots = (props: { count: number; indexNow: number; setIndex: (i: number) => void }) => {
  const dots = [];
  const onClickHandler = (i: number) => {
    props.setIndex(i);
  };
  for (let i = 0; i < props.count; i++) {
    if (i != props.indexNow)
      dots.push(
        <div
          key={i}
          onClick={() => {
            onClickHandler(i);
          }}
          className="image-swiper__dot"
        ></div>,
      );
    else dots.push(<div key={i} className="image-swiper__dot image-swiper__dot_active"></div>);
  }
  return <>{dots}</>;
};

const ImageSwiper = () => {
  const [images, setImages] = useState<imageSwiper>({
    images: imageData,
    indexNow: 0,
  });
  const imgDataBefore = {
    src: images.images[images.indexNow - 1 >= 0 ? images.indexNow - 1 : images.images.length - 1].src,
    text: images.images[images.indexNow - 1 >= 0 ? images.indexNow - 1 : images.images.length - 1].text,
  };
  const imgDataAfter = {
    src: images.images[images.indexNow + 1 < images.images.length ? images.indexNow + 1 : 0].src,
    text: images.images[images.indexNow + 1 < images.images.length ? images.indexNow + 1 : 0].text,
  };
  const beforeImg = useRef<HTMLDivElement>(null);
  const nowImg = useRef<HTMLDivElement>(null);
  const afterImg = useRef<HTMLDivElement>(null);
  let timeOut: NodeJS.Timeout;
  return (
    <div className="image-swiper">
      <h2 className="image-swiper__heading">Археология - это не просто ковыряние в земле</h2>
      <div className="image-swiper__swiper">
        <div className="image-swiper__swiper-wrapper">
          <div className="image-swiper__swiper-button-area">
            <div
              className="image-swiper__swiper-button"
              onClick={() => {
                if (timeOut) clearTimeout(timeOut);
                if (beforeImg.current && nowImg.current) {
                  beforeImg.current.classList.add('image-swiper__image_left-move');
                  nowImg.current.classList.add('image-swiper__image_left-move');
                }
                timeOut = setTimeout(() => {
                  if (beforeImg.current && nowImg.current) {
                    beforeImg.current.classList.remove('image-swiper__image_left-move');
                    nowImg.current.classList.remove('image-swiper__image_left-move');
                  }
                  setImages({
                    ...images,
                    indexNow: images.indexNow - 1 >= 0 ? images.indexNow - 1 : images.images.length - 1,
                  });
                }, 500);
              }}
            >
              <ArrowLeft />
            </div>
          </div>
          <div className="image-swiper__image-area">
            <div ref={beforeImg} className="image-swiper__image">
              <img src={imgDataBefore.src} alt="картинка с экспедиции!" />
              <div>{imgDataBefore.text}</div>
            </div>
            <div ref={nowImg} className="image-swiper__image">
              <img src={images.images[images.indexNow].src} alt="картинка с экспедиции!" />
              <div>{images.images[images.indexNow].text}</div>
            </div>
            <div ref={afterImg} className="image-swiper__image">
              <img src={imgDataAfter.src} alt="картинка с экспедиции!" />
              <div>{imgDataAfter.text}</div>
            </div>
          </div>
          <div className="image-swiper__swiper-button-area">
            <div
              className="image-swiper__swiper-button"
              onClick={() => {
                if (timeOut) clearTimeout(timeOut);
                if (afterImg.current && nowImg.current) {
                  afterImg.current.classList.add('image-swiper__image_right-move');
                  nowImg.current.classList.add('image-swiper__image_right-move');
                }
                timeOut = setTimeout(() => {
                  if (afterImg.current && nowImg.current) {
                    afterImg.current.classList.remove('image-swiper__image_right-move');
                    nowImg.current.classList.remove('image-swiper__image_right-move');
                  }
                  setImages({
                    ...images,
                    indexNow: images.indexNow + 1 < images.images.length ? images.indexNow + 1 : 0,
                  });
                }, 500);
              }}
            >
              <ArrowRight />
            </div>
          </div>
        </div>
        <div className="image-swiper__swiper-stages">
          <SwiperDots
            count={images.images.length}
            indexNow={images.indexNow}
            setIndex={(i: number) => {
              setImages({ ...images, indexNow: i });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const MainPage = () => {
  return (
    <div className="main-wrapper">
      <TopPanel colorType={topPanelColortype.light} withSearch={false} />
      <HeaderInfo />
      <FirstParagraph />
      <LastEvents />
      <ExcavationsPlaces />
      <Registration />
      <ImageSwiper />
      <Footer isLight={true} />
    </div>
  );
};
