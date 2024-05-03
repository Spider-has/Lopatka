import { useEffect, useRef } from 'react';
import { Tag, TagProps } from '../tagsBar/TagsBar';
import { serverImageUrl } from './Post';
import './Post.scss';

export enum ContentType {
  Text = 'Text',
  Image = 'Image',
}

export enum TextMod {
  Bold = 'Bold',
  Cursive = 'italic',
  Normal = '',
}

interface ArticleContent {
  ContentType: ContentType;
}

interface TextContent extends ArticleContent {
  ContentType: ContentType.Text;
  Value: string;
  Mod: TextMod;
}

interface ImageContent extends ArticleContent {
  ContentType: ContentType.Image;
  src: string;
}

export type ArticleContentElement = TextContent | ImageContent;

export type ArticleProps = {
  Header: string;
  Description: string;
  Date: string;
  AuthorName: string;
  FirstScreenImageName: string;
  Theme: string;
  MainContent: string;
  tag: TagProps;
};

export const Article = (props: ArticleProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current && props.MainContent) {
      contentRef.current.innerHTML = props.MainContent;
    }
  }, [contentRef.current, props.MainContent]);
  return (
    <article className="article">
      <div className="article-wrapper">
        <div className="article-wrapper__article-info">
          <div className="article-wrapper__tag-wrapper">
            <Tag {...props.tag} />
          </div>

          <div>{props.AuthorName}</div>
          <div className="article-wrapper__publication-time">{props.Date}</div>
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
