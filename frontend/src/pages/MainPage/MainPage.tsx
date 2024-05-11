import { ArheologyHeading } from '../../components/images/Images';
import { TopPanel, burgerColors, topPanelColortype } from '../../components/topPanel/TopPanel';
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
import { ArrowLeft, ArrowRight, LinkedArrow, LinkedArrowDark } from '../../icons/Icons';
import { useEffect, useRef, useState } from 'react';
import { fetchGetRequest } from '../../utils/fetchRequests/fetchRequest';
import { sortByDate } from '../News/News';
import { PostsAreaProps, convertDbDataToNormalNewsProps } from '../../components/post/Post';
import { Registration } from '../../components/registration/Registration';
import { Footer } from '../../components/footer/Footer';
import { UpArrow } from '../../components/upArrow/UpArrow';
import { ExpMap, PointProps } from '../../components/map/Map';
import { monumentPath } from '../Monuments/Monuments';

import skeletMobile from '../../images/skelet-mobile-main.png';
import mapMobile from '../../images/map-mobile.png';
import skeletMapMobile from '../../images/skelet-map-main-mobile.png';

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
    <>
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
      <div className="about-us-mobile">
        <div className="about-us-mobile__header-info">
          <h1>Пощупай археологию</h1>
          <p>На этом сайте ты сможешь погрузиться в мир археологии и даже записаться на раскопки!</p>
        </div>
        <div className="about-us-mobile__link-area">
          <div className="about-us-mobile__button-wrapper">
            <Button
              type={ButtonTypes.Linked}
              content={{
                contentType: ButtonContentTypes.Text,
                text: 'Читать про раскопки',
              }}
              linkTo={'/excavations'}
            />
          </div>
          <div className="about-us-mobile__skelet-wrapper ">
            <img src={skeletMobile} alt="Аркадий" />
          </div>
        </div>
      </div>
    </>
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
const peoplePath = '/people/';

const convertToEventProps = (data: PostsAreaProps, linkto: string): eventCardProps[] => {
  const arrCopy = data.posts.length <= 3 ? data.posts : data.posts.slice(0, 7);
  return [
    ...arrCopy.map(el => {
      return {
        header: el.Header,
        description: el.Description,
        linkTo: linkto + el.id,
      };
    }),
  ];
};

const LastEvents = () => {
  const [eventsData, setEventsData] = useState<eventCardProps[]>([]);
  useEffect(() => {
    fetchGetRequest('http://localhost:8000/api/news/public/')
      .then(res1 => {
        console.log(res1);
        fetchGetRequest('http://localhost:8000/api/peoples/public/')
          .then(res2 => {
            if (res2.data && res1.data)
              setEventsData([
                ...convertToEventProps(sortByDate(convertDbDataToNormalNewsProps(res1.data)), newPath),
                ...convertToEventProps(sortByDate(convertDbDataToNormalNewsProps(res2.data)), peoplePath),
              ]);
            else if (res2.data)
              setEventsData([
                ...convertToEventProps(sortByDate(convertDbDataToNormalNewsProps(res2.data)), peoplePath),
              ]);
            else
              setEventsData([
                ...convertToEventProps(sortByDate(convertDbDataToNormalNewsProps(res1.data)), newPath),
              ]);
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);
  console.log(eventsData);
  const [eventIndexNow, setIndex] = useState(0);
  const events = eventsData?.map((el, i) => <EventCard key={i} {...el} />);
  return (
    <>
      <div className="last-events">
        <div className="last-events__content-wrapper">
          <h2 className="last-events__heading">Последние события</h2>
          <div className="last-events__events-block">{events}</div>
        </div>
      </div>
      <div className="last-events-mobile">
        <h2 className="last-events-mobile__heading">Последние события</h2>
        <div className="last-events-mobile__event-wrapper">
          <div
            className="image-swiper__swiper-button last-events-mobile__swiper-button-left"
            onClick={() => {
              setIndex(eventIndexNow - 1 >= 0 ? eventIndexNow - 1 : eventsData.length - 1);
            }}
          >
            <ArrowLeft />
          </div>
          <div className="last-events-mobile__events-block">
            <EventCard {...eventsData[eventIndexNow]} />
          </div>
          <div
            className="image-swiper__swiper-button last-events-mobile__swiper-button-right"
            onClick={() => {
              setIndex(eventIndexNow + 1 < eventsData.length ? eventIndexNow + 1 : 0);
            }}
          >
            <ArrowRight />
          </div>
          <div className="image-swiper__swiper-stages last-events-mobile__swiper-stages">
            <SwiperDots
              count={eventsData.length}
              indexNow={eventIndexNow}
              setIndex={(i: number) => {
                setIndex(i);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
type cordDbData = {
  id: string;
  Coordinates: string;
  Header: string;
};

const getMonumentIndexById = (data: PointProps[], id: string) => {
  let index = 0;
  data.forEach((el, i) => {
    if (el.id == id) index = i;
  });
  return index;
};

const convertToPointData = (data: cordDbData[]): PointProps[] => {
  return [
    ...data.map(el => {
      return {
        id: el.id,
        isSelected: false,
        cordN:
          Number(el.Coordinates.slice(0, 2)) +
          Number(el.Coordinates.slice(3, 5)) / 60 +
          Number(el.Coordinates.slice(6, 8)) / 3600,
        cordE:
          Number(el.Coordinates.slice(11, 13)) +
          Number(el.Coordinates.slice(14, 16)) / 60 +
          Number(el.Coordinates.slice(17, 19)) / 3600,
      };
    }),
  ];
};
const ExcavationsPlaces = () => {
  const [mapData, setMapData] = useState<cordDbData[]>([]);
  useEffect(() => {
    fetchGetRequest('http://localhost:8000/api/monuments/public/map-data')
      .then(res => {
        console.log(res);
        if (res) setMapData(res.data);
      })
      .catch(err => console.log(err.message));
  }, []);
  const [mapPointId, setMapPointId] = useState<string>('0');
  const mapDataPoints = convertToPointData(mapData);
  const selectedCard = mapData[getMonumentIndexById(mapDataPoints, mapPointId)];
  return (
    <>
      <div className="excavations">
        <div className="excavations__wrapper">
          <div className="excavations__heading">Где проходили раскопки</div>
          <div className="excavations__map-area">
            <div className="excavations__selected-excavation">
              <div className="excavations__selected-excavation-header">
                {selectedCard
                  ? selectedCard.Header
                  : 'Пока у нас нет памятников, но они уже скоро появятся!!!!'}
              </div>
              <div>
                <Button
                  type={ButtonTypes.Linked}
                  colors={ButtonColorTypes.LightTransparent}
                  content={{
                    contentType: ButtonContentTypes.Icon,
                    icon: <LinkedArrow />,
                  }}
                  linkTo={selectedCard ? monumentPath + selectedCard.id : ''}
                />
              </div>
            </div>
            <div className="excavations__map-wrapper">
              <ExpMap setSelected={setMapPointId} selectedId={mapPointId} points={mapDataPoints} />
              <div className="excavations__skeletos-area">
                <img className="excavations__text-field" src={excavationsTextField} alt="о экспедициях" />
                <img src={skeletNormalSize} alt="скелет" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="excavations-mobile">
        <div className="excavations-mobile__header">Где проходят раскопки</div>
        <div className="excavations-mobile__map-area">
          <div className="excavations-mobile__skelet">
            <img src={skeletMapMobile} alt="аркаша!" />
          </div>
          <div>
            <img src={mapMobile} alt="карта" />
          </div>
        </div>
        <div>
          <Button
            type={ButtonTypes.Linked}
            content={{
              contentType: ButtonContentTypes.Text,
              text: 'Археологические памятники',
            }}
            linkTo={'/monuments'}
          />
        </div>
      </div>
    </>
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
              className="image-swiper__swiper-button image-swiper__left"
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
                }, 490);
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
              className="image-swiper__swiper-button image-swiper__right"
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
                }, 490);
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
  const arrowRef = useRef<HTMLDivElement>(null);
  return (
    <div className="main-wrapper">
      <div className="main-wrapper__content">
        <TopPanel
          burgerProps={{ colorType: burgerColors.light }}
          colorType={topPanelColortype.light}
          withSearch={false}
        />
        <HeaderInfo />
        <FirstParagraph />
        <LastEvents />
        <ExcavationsPlaces />
        <Registration />
        <ImageSwiper />
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
      <Footer isLight={true} />
    </div>
  );
};
