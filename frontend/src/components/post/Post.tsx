import { Link } from 'react-router-dom';
import { Tag, TagProps, supportedNewsTags, supportedPeoplesTags, tagModTypes } from '../tagsBar/TagsBar';
import './Post.scss';
import { ButtonContentTypes } from '../button/Button';
import { AnotherIcon, Biography, CalendarIcon, ClockIcon, Interview, ShovelIcon } from '../../icons/Icons';
import { convertToEuropeanDateStyle, serverImageUrl } from '../../utils/utils';
import { useMemo } from 'react';

interface Post {
  id: string;
  type: postType;
  Header: string;
  Description: string;
  Date: string;
  AuthorName: string;
  FirstScreenImageName: string;
}

export enum postType {
  News = 'News',
  Peoples = 'Peoples',
  Monuments = 'Monuments',
}

interface News extends Post {
  type: postType.News;
  Theme: string;
  tag: TagProps;
}

interface Peoples extends Post {
  type: postType.Peoples;
  Theme: string;
  tag: TagProps;
}

interface Monuments extends Post {
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

type PostProps = News | Monuments | Peoples;

export type PostsAreaProps = {
  posts: PostProps[];
};

export const parsePeopleThemeIntoTag = (theme: string): TagProps => {
  switch (theme) {
    case supportedPeoplesTags.Interview: {
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <Interview />,
        text: 'Интервью',
        tagMod: tagModTypes.SmallGap,
      };
    }
    case supportedPeoplesTags.Biography: {
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <Biography />,
        text: 'Биография',
        tagMod: tagModTypes.SmallGap,
      };
    }
    case supportedPeoplesTags.Other: {
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
        icon: <Interview />,
        text: 'Интервью',
        tagMod: tagModTypes.SmallGap,
      };
  }
};

export const parseNewsThemeIntoTag = (theme: string): TagProps => {
  switch (theme) {
    case supportedNewsTags.Expedition: {
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <ShovelIcon />,
        text: 'Экспедиции',
        tagMod: tagModTypes.SmallGap,
      };
    }
    case supportedNewsTags.Events: {
      return {
        tagTypes: ButtonContentTypes.IconText,
        icon: <CalendarIcon />,
        text: 'События',
        tagMod: tagModTypes.SmallGap,
      };
    }
    case supportedNewsTags.Other: {
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
        text: 'События',
        tagMod: tagModTypes.SmallGap,
      };
  }
};

export const parseMonumentsTagsIntoTag = (tagText: string): TagProps => {
  return {
    tagTypes: ButtonContentTypes.Text,
    text: tagText,
    tagMod: tagModTypes.ArticleText,
  };
};

export const convertDbDataToSingleMonumentProps = (data: Monuments): Monuments => {
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

export const convertDbDataToNormalMonumentsProps = (data: Monuments[]): PostsAreaProps => {
  return {
    posts: [...data.map(post => convertDbDataToSingleMonumentProps(post))],
  };
};

export const convertDbDataToSingleNewProps = (data: News): News => {
  return {
    ...data,
    type: postType.News,
    Date: convertToEuropeanDateStyle(data.Date),
    tag: parseNewsThemeIntoTag(data.Theme),
  };
};

export const convertDbDataToSinglePeopleProps = (data: Peoples): Peoples => {
  return {
    ...data,
    type: postType.Peoples,
    Date: convertToEuropeanDateStyle(data.Date),
    tag: parsePeopleThemeIntoTag(data.Theme),
  };
};

export const convertDbDataToNormalNewsProps = (data: News[]): PostsAreaProps => {
  return {
    posts: [...data.map(post => convertDbDataToSingleNewProps(post))],
  };
};

export const convertDbDataToNormalPeopleProps = (data: Peoples[]): PostsAreaProps => {
  return {
    posts: [...data.map(post => convertDbDataToSinglePeopleProps(post))],
  };
};

export const PostArea = (props: PostsAreaProps) => {
  const posts = props.posts.map((post, i) => {
    return <Post key={i} {...post} />;
  });
  return <div className="post-area">{posts}</div>;
};

export const newLink = 'http://localhost:3000/new/';

export const monumentLink = 'http://localhost:3000/monument/';

export const peopleLink = 'http://localhost:3000/people/';

export const NoPostsArticle = () => {
  return (
    <article className="post">
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
  const linkType = useMemo(() => {
    switch (props.type) {
      case postType.News:
        return newLink;
      case postType.Peoples:
        return peopleLink;
      case postType.Monuments:
        return monumentLink;
    }
  }, [props.type]);
  return (
    <Link to={linkType + props.id}>
      <article className="post">
        <div className="article-wrapper">
          <div className="article-wrapper__article-info-wrapper ">
            <div className="article-wrapper__article-info">
              {(props.type == postType.News || props.type == postType.Peoples) && (
                <div className="article-wrapper__tag-wrapper">
                  <Tag {...props.tag} />
                </div>
              )}
              <div className="article-wrapper__header-area">{props.AuthorName}</div>
              <div className="article-wrapper__publication-time">{props.Date}</div>
            </div>
          </div>
          <div className="article-wrapper__main-content">
            <div
              className={`article-wrapper__content-wrapper ${
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
