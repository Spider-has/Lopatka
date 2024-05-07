import { useEffect, useRef, useState } from 'react';
import { OpenCloseListIcon } from '../../icons/Icons';
import './TagsBar.scss';
import { ButtonContentTypes } from '../button/Button';

export enum supportedNewsTags {
  Expedition = 'Экспедиции',
  Events = 'События',
  Other = 'Прочее',
}

export enum supportedPeoplesTags {
  Interview = 'Интервью',
  Biography = 'Биография',
  Other = 'Прочее',
}

export enum tagModTypes {
  NoneMod = '',
  SmallGap = 'tag_small-article-gap',
  DescriptionText = 'tag_text-small',
  ArticleText = 'tag_article-text',
}

export type TagProps = {
  tagTypes: ButtonContentTypes;
  icon?: JSX.Element;
  text: string;
  tagMod: tagModTypes;
};

export type TagsBarProps = {
  Tags: TagProps[];
  filterHandler: (tagValue: string) => void;
};

export const FilterTagsBar = (props: TagsBarProps) => {
  const [activeTagState, setActive] = useState<string>('');
  const tags = props.Tags.map((tag, i) => {
    const activeState = activeTagState == tag.text;
    const activeMod = activeState ? 'tags-bar-wrapper__tag-container_active' : '';
    return (
      <div
        onClick={() => {
          if (activeState) {
            setActive('');
          } else {
            setActive(tag.text);
          }
        }}
        key={i}
        className={`tags-bar-wrapper__tag-container ${activeMod}`}
      >
        <Tag {...tag} />
      </div>
    );
  });
  useEffect(() => {
    props.filterHandler(activeTagState);
  }, [activeTagState]);
  return <div className="tags-bar-wrapper">{tags}</div>;
};

export type MonumentsTagsBarProps = {
  filterHandler: (activeTags: string[]) => void;
  lists: tagsListData[];
};

export const MonumentsTagsBar = (props: MonumentsTagsBarProps) => {
  const [activeTags, setActiveTags] = useState<string[]>(['', '', '', '']);
  console.log(activeTags);
  const tagsLists = props.lists.map((tagList, i) => (
    <TagsList
      key={i}
      data={tagList}
      setActive={(tagName: string) => {
        setActiveTags(changeActiveTags(activeTags, i, tagName));
      }}
      activeTag={activeTags[i]}
    />
  ));
  useEffect(() => {
    props.filterHandler(activeTags);
  }, [activeTags]);
  return (
    <div className="monuments-tags-bar">
      <div className="monuments-tags-bar__wrapper">{tagsLists}</div>
    </div>
  );
};

const changeActiveTags = (activeTags: string[], index: number, value: string) => {
  return [
    ...activeTags.map((el, i) => {
      if (i == index) return value;
      return el;
    }),
  ];
};

export enum tagListType {
  Row = 'tags-list-wrapper__tags_row',
  Column = 'tags-list-wrapper__tags_column',
}

type tagsListData = {
  listType: tagListType;
  listHeader: string;
  tags: TagProps[];
};

type TagsListProps = {
  setActive: (tagName: string) => void;
  activeTag: string;
  data: tagsListData;
};

const TagsList = (props: TagsListProps) => {
  const tags = props.data.tags.map((tag, i) => {
    const activeMod = props.activeTag == tag.text ? 'tags-list-wrapper__tag-area_active' : '';
    return (
      <div
        onClick={() => {
          if (props.activeTag !== tag.text) props.setActive(tag.text);
          else props.setActive('');
        }}
        key={i}
        className={`tags-list-wrapper__tag-area ${activeMod}`}
      >
        <Tag {...tag} />
      </div>
    );
  });

  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const listButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current && listButtonRef.current)
      if (isOpen) {
        listRef.current.classList.add('tags-list-wrapper__tags_opened');
        listButtonRef.current.classList.add('tags-list-wrapper__list-icon_opened');
      } else {
        listRef.current.classList.remove('tags-list-wrapper__tags_opened');
        listButtonRef.current.classList.remove('tags-list-wrapper__list-icon_opened');
      }
  }, [isOpen]);

  return (
    <div className="tags-list-wrapper">
      <div className="tags-list-wrapper__list-header">
        <span>{props.data.listHeader}</span>
        <div
          className="tags-list-wrapper__list-icon"
          ref={listButtonRef}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <OpenCloseListIcon />
        </div>
      </div>
      <div ref={listRef} className={`tags-list-wrapper__tags ${props.data.listType}`}>
        {tags}
      </div>
    </div>
  );
};

export const Tag = (props: TagProps) => {
  switch (props.tagTypes) {
    case ButtonContentTypes.IconText:
      return (
        <div className={`tag ${props.tagMod}`}>
          {props.icon}
          <div>{props.text}</div>
        </div>
      );
    case ButtonContentTypes.Text:
      return <div className={`tag ${props.tagMod}`}>{props.text}</div>;
  }
};
