import { useEffect, useMemo, useRef, useState } from 'react';
import { Tag, TagProps } from '../tagsBar/TagsBar';
import './Post.scss';
import { convertToEuropeanDateStyle, serverImageUrl } from '../../utils/utils';
import { parseMonumentsTagsIntoTag, parseNewsThemeIntoTag, parsePeopleThemeIntoTag, postType } from './Post';
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

type Article = {
  id: string;
  Header: string;
  Description: string;
  Date: string;
  AuthorName: string;
  FirstScreenImageName: string;
  MainContent: string;
};

export interface News extends Article {
  type: postType.News;
  Theme: string;
  tag: TagProps;
}

export interface Peoples extends Article {
  type: postType.Peoples;
  Theme: string;
  tag: TagProps;
}

export interface MonumentsPost extends Article {
  type: postType.Monuments;
  Type: string;
  Culture: string;
  District: string;
  Era: string;
  monumentTag: TagProps;
  cultureTag: TagProps;
  districtTag: TagProps;
  eraTag: TagProps;
  Coordinates: string;
}

export type ArticleProps = News | MonumentsPost | Peoples;

export const convertDbDataToNewProps = (data: News): News => {
  return {
    ...data,
    type: postType.News,
    Date: convertToEuropeanDateStyle(data.Date),
    tag: parseNewsThemeIntoTag(data.Theme),
  };
};

export const convertDbDataToPeopleProps = (data: Peoples): Peoples => {
  return {
    ...data,
    type: postType.Peoples,
    Date: convertToEuropeanDateStyle(data.Date),
    tag: parsePeopleThemeIntoTag(data.Theme),
  };
};

export const convertDbDataToMonumentProps = (data: MonumentsPost): MonumentsPost => {
  return {
    ...data,
    type: postType.Monuments,
    Date: convertToEuropeanDateStyle(data.Date),
    monumentTag: parseMonumentsTagsIntoTag(data.Type),
    cultureTag: parseMonumentsTagsIntoTag(data.Culture),
    eraTag: parseMonumentsTagsIntoTag(data.Era),
    districtTag: parseMonumentsTagsIntoTag(data.District),
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
  const editLink = useMemo(() => {
    switch (props.type) {
      case postType.News:
        return '/newEdit/';
      case postType.Peoples:
        return '/peopleArticleEdit/';
      case postType.Monuments:
        return '/monumentEdit/';
    }
  }, [props.type]);
  return (
    <article className="article">
      <div className="article-wrapper">
        <div className="article__article-info-wrapper ">
          <div className="article-wrapper__article-info">
            {(props.type == postType.News || props.type == postType.Peoples) && (
              <div className="article-wrapper__tag-wrapper">
                <Tag {...props.tag} />
              </div>
            )}
            <div className="article__header-area">{props.AuthorName}</div>
            <div className="article-wrapper__publication-time">{props.Date}</div>
          </div>
          <div className="article-wrapper__edit-button">
            {isAdmin && (
              <Button
                type={ButtonTypes.Linked}
                linkTo={`${editLink}${props.id}`}
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
          <div
            className={`article__content-wrapper ${
              props.type == postType.Monuments ? 'article-wrapper__content-wrapper_small-gap' : ''
            }`}
          >
            <div className={`article-wrapper__header`}>
              <h2>{props.Header}</h2>
              {props.type == postType.Monuments && (
                <div className="article-wrapper__header-tags-wrapper">
                  <Tag {...props.monumentTag} />
                  <Tag {...props.cultureTag} />
                  <Tag {...props.eraTag} />
                  <Tag {...props.districtTag} />
                </div>
              )}
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

      {props.type == postType.Monuments && (
        <div className="article__mobile-tags">
          <Tag {...props.monumentTag} />
          <Tag {...props.cultureTag} />
          <Tag {...props.eraTag} />
          <Tag {...props.districtTag} />
        </div>
      )}
    </article>
  );
};
