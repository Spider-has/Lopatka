import { Button, ButtonColorTypes, ButtonContentTypes, ButtonTypes } from '../../components/button/Button';
import { Footer } from '../../components/footer/Footer';
import './Excavations.scss';
import { useRef } from 'react';
import { UpArrow } from '../../components/upArrow/UpArrow';
import { Registration } from '../../components/registration/Registration';
import { Question } from '../../components/question/Question';
import { Step } from '../../components/step/Step';
import excavationInfoImg1 from '../../images/excavationsInfo1.png';
import excavationInfoImg2 from '../../images/excavationsInfo2.png';
import excavationInfoImg3 from '../../images/excavationsInfo3.png';
import excavationInfoImg4 from '../../images/excavationsInfo4.png';
import excavationInfoImg5 from '../../images/excavationsInfo5.png';
import excavationInfoImg6 from '../../images/excavationsInfo6.png';
import volunteeringImg1 from '../../images/volunteeringImg1.png';
import volunteeringImg2 from '../../images/volunteeringImg2.png';
import volunteeringImg3 from '../../images/volunteeringImg3.png';
import { TopPanel, topPanelColortype } from '../../components/topPanel/TopPanel';
const handleExpeditionButtonClick = (id: string) => {
  const e = document.getElementById(id);
  console.log(e)
  if (e) {
    e.scrollIntoView({ block: "start", behavior: "smooth" });
    console.log('ll')
  }
}
export const ExcavationsPage = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <section className="excanations-wrapper">
        <div className="excanations-wrapper__top-panel-wrapper">
          <TopPanel colorType={topPanelColortype.light} withSearch={false} />
        </div>
        <div className="title-wrapper">
          <h1 className="title-wrapper__title">Привет! На этой страничке ты сможешь:</h1>
          <ul className="title-wrapper__subtitle-list">
            <li className="title-wrapper__subtitle">узнать что такое археология</li>
            <li className="title-wrapper__subtitle">увидеть как проходит экспедиция</li>
            <li className="title-wrapper__subtitle">записаться на раскопки</li>
            <li className="title-wrapper__subtitle">узнать чем занимаются археологи после полевого сезона</li>
          </ul>
          
        <div className="buttons-wrapper">
            <Button
            colors={ButtonColorTypes.Yellow}
            
            handler={() => { handleExpeditionButtonClick("registration");}}
            type={ButtonTypes.Functional}
            content={{
              contentType: ButtonContentTypes.Text,
              text: 'Записаться на раскопки',
            }}
          />
        </div>
        </div>
        <div className="archeology-wrapper">
          <p className="archeology-wrapper__text">
            Археология это наука, изучающая быт и культуру древних народов по сохранившимся вещественным
            памятникам. <br />И у тебя есть уникальная возможность поехать в экспедицию и попробовать себя в
            роли археолога!
          </p>
        </div>
        <div className="excavations-info-wrapper">
          <h1 className="excavations-info-wrapper__title">Как проходит экспедиция</h1>
          <p className="excavations-info-wrapper__text">
            Каждое место индивидуально и нужен разный подход. Иногда мы копаем могильник на острове, иногда -
            городище в лесу. Но можно выделить 6 частей, на которые делится каждая экспедиция:{' '}
          </p>
          <Step
            number={'1'}
            title={'Установка лагеря'}
            text={
              'Это как настоящее приключение! Мы приезжаем на место экспедиции, разбиваем палатки, расставляем оборудование и готовимся к работе.'
            }
            photo={<img src={excavationInfoImg1} className="step__img_1"></img>}
            isPhotoLeft={false}
          />
          <Step
            number={'2'}
            title={'Разбивка памятника'}
            text={
              'Важный этап, где мы определяем место будущих раскопок. Мы отмечаем границы памятника и очищаем его сверху от растительности '
            }
            photo={<img src={excavationInfoImg2} className="step__img_2"></img>}
            isPhotoLeft={true}
          />
          <Step
            number={'3'}
            title={'Раскопки'}
            text={
              'Вот где начинается самое увлекательное! Мы аккуратно раскапываем землю, ищем артефакты для дальнейшего изучения марийской культуры. Каждая находка - это маленькое открытие, которое приближает нас к пониманию прошлого.'
            }
            photo={<img src={excavationInfoImg3} className="step__img_3"></img>}
            isPhotoLeft={false}
          />
          <Step
            number={'4'}
            title={'Закапывание места раскопа'}
            text={
              'Этот этап заключительный, но такой же важный, как и остальные. Мы осторожно закрываем раскопки, возвращая местности ее первозданный вид. Это важно для сохранения целостности места и его исторической ценности.'
            }
            photo={<img src={excavationInfoImg4} className="step__img_4"></img>}
            isPhotoLeft={true}
          />
          <Step
            number={'5'}
            title={'Посвящение'}
            text={
              'Мы любим делиться своим опытом с новыми участниками и посвящаем в археологи тех, кто впервые участвует в экспедиции. Удивительно, но посвящение всегда проходит по-разному!'
            }
            photo={<img src={excavationInfoImg5} className="step__img_5"></img>}
            isPhotoLeft={false}
          />
          <Step
            number={'6'}
            title={'Окончание раскопок'}
            text={
              'Это всегда немного грустно, но и волнительно. Мы собираем вещи, прощаемся с местом экспедиции и отправляемся домой. Но знаем, что в следующем году обязательно вернемся!'
            }
            photo={<img src={excavationInfoImg6} className="step__img_6"></img>}
            isPhotoLeft={true}
          />
        </div>
        <div className="volunteering-wrapper">
          <h1 className="volunteering-wrapper__title">Что в экспедиции делают волонтеры</h1>
          <p className="volunteering-wrapper__subtitle">Волонтеры делятся на 3 группы:</p>
          <div className="volunteering-wrapper__table">
            <div className="volunteering-wrapper__table__element">
              <div className="volunteering-wrapper__table__element__title">Рабочая группа</div>
              <div className="volunteering-wrapper__table__element__text">
                Это наши самые отважные и усердные участники. Они проводят дни с лопатами и великолепно
                справляются с трудностями раскопок.
              </div>
              <img src={volunteeringImg1} className="volunteering-wrapper__table__element__img"></img>
            </div>
            <div className="volunteering-wrapper__table__element">
              <div className="volunteering-wrapper__table__element__title">Помощники археологов</div>
              <div className="volunteering-wrapper__table__element__text">
                Эти волонтеры помогают археологам в работе с артефактами. Они очищают и документируют
                найденные предметы, играя важную роль в изучении нашей культуры.
              </div>
              <img src={volunteeringImg2} className="volunteering-wrapper__table__element__img"></img>
            </div>
            <div className="volunteering-wrapper__table__element">
              <div className="volunteering-wrapper__table__element__title">Повара</div>
              <div className="volunteering-wrapper__table__element__text">
                Каждый день выбирается пара волонтеров, которые остаются на кухне и готовят для всех
                участников экспедиции. Эти волонтеры создают атмосферу уюта в нашем лагере.
              </div>
              <img src={volunteeringImg3} className="volunteering-wrapper__table__element__img"></img>
            </div>
          </div>
        </div>
        <div id="registration"></div>
        <Registration />

        <div className="questions-wrapper">
          <h1 className="questions-wrapper__title">Часто задаваемые вопросы</h1>
          <div className="questions-wrapper__questions-wrapper">
            <div className="questions-wrapper__questions-wrapper__question">
              <Question
                text={'Кто может быть волонтером?'}
                answer={
                  'Волонтёром может стать любой человек в возрасте от 16 лет. Если вам ещё нет 18, понадобится разрешение от родителей или других законных представителей. Его можно будет получить при записи в экспедицию.'
                }
              />
            </div>
            <div className="questions-wrapper__questions-wrapper__question">
              <Question
                text={'Чем еще можно помочь?'}
                answer={
                  'После окончания полевого сезона, когда все раскопки завершаются начинается работа лаборатории, где помощь волонтеров также нужна, - надо систематизировать все находки, попытаться собрать куски керамики воедино, помочь с обработкой артефактов.'
                }
              />
            </div>
          </div>
        </div>
        {/*<div className="documents-wrapper">
                    <h1 className="documents-wrapper__title">Документы, необходимые для раскопок</h1>
                    <div className="documents-wrapper__documents">
                        <a className="documents-wrapper__documents__button" href="/documents/docInstr.docx" download={"Расписание на раскопках"}>Расписание на раскопках <DownloadIcon /></a>

                        <a className="documents-wrapper__documents__button" href="/documents/docItems.docx" download={"Что нужно взять на раскопки"}>Что нужно взять с собой <DownloadIcon /></a>
                    </div>
                            </div>*/}
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
      </section>

      <Footer isLight={true} />
    </div>
  );
};
