import { useEffect, useRef, useState } from 'react';
import { Footer } from '../../components/footer/Footer';
import { Article, ArticleProps } from '../../components/post/Article';
import { tagModTypes } from '../../components/tagsBar/TagsBar';
import { TopPanel } from '../../components/topPanel/TopPanel';
import { UpArrow } from '../../components/upArrow/UpArrow';
import { ButtonContentTypes } from '../../components/button/Button';
import { useParams } from 'react-router-dom';
import { fetchGetRequest } from '../../utils/fetchRequests/fetchRequest';
import { parseThemeIntoTag } from '../../components/post/Post';

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

export const ArticlePage = () => {
  const { id } = useParams();
  const [articleData, setData] = useState<ArticleProps>({
    Header: '',
    Description: '',
    Date: '',
    AuthorName: '',
    FirstScreenImageName: '',
    Theme: '',
    MainContent: '',
    tag: {
      tagTypes: ButtonContentTypes.Icon,
      text: '',
      tagMod: tagModTypes.NoneMod,
    },
  });
  useEffect(() => {
    if (id) {
      fetchGetRequest('http://localhost:8000/api/news/public/' + id).then(res => {
        if (res) {
          console.log(res);
          setData(res);
        }
      });
    }
  }, []);

  return (
    <div className="main-page">
      <TopPanel />
      <ArticleContentBlock {...articleData} tag={parseThemeIntoTag(articleData.Theme)} />
      <Footer />
    </div>
  );
};
