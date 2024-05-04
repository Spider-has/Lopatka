import { useEffect, useRef, useState } from 'react';
import { Tag, TagProps } from '../tagsBar/TagsBar';
import './Post.scss';
import { convertToEuropeanDateStyle, serverImageUrl } from '../../utils/utils';
import { parseThemeIntoTag } from './Post';
import { isUserAuthCorrect } from '../../utils/auth';
import { Button, ButtonColorTypes, ButtonContentTypes, ButtonTypes } from '../button/Button';
import { EditIcon } from '../../icons/Icons';

export enum ContentType {
  Text = 'Text',
  Image = 'Image',
}

export enum TextMod {
  Bold = 'Bold',
  Cursive = 'italic',
  Normal = '',
}

export type ArticleProps = {
  id: string;
  Header: string;
  Description: string;
  Date: string;
  AuthorName: string;
  FirstScreenImageName: string;
  Theme: string;
  MainContent: string;
  tag: TagProps;
};

export const convertDbDataToArticleProps = (data: ArticleProps): ArticleProps => {
  return {
    ...data,
    Date: convertToEuropeanDateStyle(data.Date),
    tag: parseThemeIntoTag(data.Theme),
  };
};

export const Article = (props: ArticleProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    if (contentRef.current && props.MainContent) {
      contentRef.current.innerHTML = props.MainContent;
    }
    isUserAuthCorrect().then(res => setAdmin(res));
  }, [contentRef.current, props.MainContent]);
  return (
    <article className="article">
      <div className="article-wrapper">
        <div className="article-wrapper__article-info-wrapper ">
          <div className="article-wrapper__article-info">
            <div className="article-wrapper__tag-wrapper">
              <Tag {...props.tag} />
            </div>
            <div>{props.AuthorName}</div>
            <div className="article-wrapper__publication-time">{props.Date}</div>
          </div>
          <div>
            {isAdmin && (
              <Button
                type={ButtonTypes.Linked}
                linkTo={`/editNew/${props.id}`}
                colors={ButtonColorTypes.RedBorder}
                content={{
                  contentType: ButtonContentTypes.IconText,
                  icon: <EditIcon />,
                  text: 'Редактировать',
                }}
              />
            )}
          </div>
        </div>
        <div className="article-wrapper__main-content">
          <div className="article-wrapper__content-wrapper">
            <div className="article-wrapper__header">
              <h2>{props.Header}</h2>
            </div>
          </div>
          <div className="article-wrapper__image-area">
            <img
              className="article-wrapper__image"
              src={serverImageUrl + props.FirstScreenImageName}
              alt="post image"
            />
          </div>
        </div>
      </div>
      <div ref={contentRef} className="article__main-content"></div>
    </article>
  );
};
