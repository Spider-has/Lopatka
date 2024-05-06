import { Link } from 'react-router-dom';
import { Tag, TagProps, supportedTags, tagModTypes } from '../tagsBar/TagsBar';
import './Post.scss';
import { ButtonContentTypes } from '../button/Button';
import { AnotherIcon, CalendarIcon, ClockIcon, ShovelIcon } from '../../icons/Icons';
import { convertToEuropeanDateStyle, serverImageUrl } from '../../utils/utils';

type PostProps = {
  id: string;
  Header: string;
  Description: string;
  Date: string;
  AuthorName: string;
  FirstScreenImageName: string;
  Theme: string;
  tag: TagProps;
};

export type PostsAreaProps = {
  posts: PostProps[];
};

export const parseThemeIntoTag = (theme: string): TagProps => {
  switch (theme) {
    case supportedTags.Expedition: {
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <ShovelIcon />,
        text: 'Экспедиции',
        tagMod: tagModTypes.SmallGap,
      };
    }
    case supportedTags.Events: {
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <CalendarIcon />,
        text: 'События',
        tagMod: tagModTypes.SmallGap,
      };
    }
    case supportedTags.Other: {
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <AnotherIcon />,
        text: 'Другое',
        tagMod: tagModTypes.SmallGap,
      };
    }
    default:
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <ClockIcon />,
        text: 'События',
        tagMod: tagModTypes.SmallGap,
      };
  }
};

export const convertDbDataToNSinglePostProps = (data: PostProps): PostProps => {
  return {
    ...data,
    Date: convertToEuropeanDateStyle(data.Date),
    tag: parseThemeIntoTag(data.Theme),
  };
};

export const convertDbDataToNormalPostsProps = (data: PostProps[]): PostsAreaProps => {
  return {
    posts: [...data.map(post => convertDbDataToNSinglePostProps(post))],
  };
};

export const PostArea = (props: PostsAreaProps) => {
  const posts = props.posts.map((post, i) => {
    return <Post key={i} {...post} />;
  });
  return <div className="post-area">{posts}</div>;
};

export const articleLink = 'http://localhost:3000/new/';

export const NoPostsArticle = () => {
  return (
    <article className="article">
      <div className="article-wrapper article-wrapper_no-post-content">
        <div className="article-wrapper__header">
          <h2>Тут пока ещё нет постов:(</h2>
        </div>
        <p className="article-wrapper__description">Но они уже очень-очень скоро появятся!</p>
      </div>
    </article>
  );
};

export const Post = (props: PostProps) => {
  return (
    <Link to={articleLink + props.id}>
      <article className="article">
        <div className="article-wrapper ">
          <div className="article-wrapper__article-info-wrapper ">
            <div className="article-wrapper__article-info">
              <div className="article-wrapper__tag-wrapper">
                <Tag {...props.tag} />
              </div>
              <div>{props.AuthorName}</div>
              <div className="article-wrapper__publication-time">{props.Date}</div>
            </div>
          </div>
          <div className="article-wrapper__main-content">
            <div className="article-wrapper__content-wrapper">
              <div className="article-wrapper__header">
                <h2>{props.Header}</h2>
              </div>
              <p className="article-wrapper__description">{props.Description}</p>
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
      </article>
    </Link>
  );
};
