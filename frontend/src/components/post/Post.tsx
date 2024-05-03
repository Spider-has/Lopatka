import { Link } from 'react-router-dom';
import { Tag, TagProps, supportedTags, tagModTypes } from '../tagsBar/TagsBar';
import './Post.scss';
import { ButtonContentTypes } from '../button/Button';
import { AnotherIcon, CalendarIcon, ClockIcon, ShovelIcon } from '../../icons/Icons';

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

export const serverImageUrl = 'http://localhost:8000/static/post_images/';

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
    case supportedTags.Fresh: {
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <ClockIcon />,
        text: 'Свежее',
        tagMod: tagModTypes.SmallGap,
      };
    }
    case supportedTags.Other: {
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <AnotherIcon />,
        text: 'Прочее',
        tagMod: tagModTypes.SmallGap,
      };
    }
    default:
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <ClockIcon />,
        text: 'Свежее',
        tagMod: tagModTypes.SmallGap,
      };
  }
};

export const PostArea = (props: PostsAreaProps) => {
  const posts = props.posts.map((post, i) => {
    const postData = { ...post, tag: parseThemeIntoTag(post.Theme) };
    return <Post key={i} {...postData} />;
  });
  return <div className="post-area">{posts}</div>;
};

export const articleLink = 'http://localhost:3000/article/';

export const Post = (props: PostProps) => {
  return (
    <Link to={articleLink + props.id}>
      <article className="article">
        <div className="article-wrapper ">
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
