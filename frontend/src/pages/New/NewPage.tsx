import { useEffect, useRef, useState } from 'react';
import { Footer } from '../../components/footer/Footer';
import { Article, ArticleProps, convertDbDataToNewProps } from '../../components/post/Article';
import { TopPanel, topPanelColortype } from '../../components/topPanel/TopPanel';
import { UpArrow } from '../../components/upArrow/UpArrow';
import { useParams } from 'react-router-dom';
import { fetchGetRequest } from '../../utils/fetchRequests/fetchRequest';

const ArticleContentBlock = (props: ArticleProps) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  return (
    <div className="main-content-area-wrapper">
      <div className="main-content-area-wrapper__single-content-wrapper ">
        <Article {...props} />
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
  );
};

export const NewPage = () => {
  const { id } = useParams();
  const [articleData, setData] = useState<ArticleProps>();
  useEffect(() => {
    if (id) {
      fetchGetRequest('http://localhost:8000/api/news/public/' + id).then(res => {
        if (res) {
          setData(convertDbDataToNewProps(res));
        }
      });
    }
  }, []);

  return (
    <div className="main-page">
      <div className="main-page__top-panel-wrapper">
        <TopPanel colorType={topPanelColortype.dark} withSearch={true} />
      </div>
      {articleData != undefined && <ArticleContentBlock {...articleData} />}
      <Footer />
    </div>
  );
};
