import { useEffect, useRef, useState } from 'react';
import { OpenCloseListIcon } from '../../icons/Icons';
import './TagsBar.scss';
import { ButtonContentTypes } from '../button/Button';

export enum supportedTags {
  Fresh = 'Свежее',
  Expedition = 'Экспедиции',
  Events = 'События',
  Other = 'Прочее',
}

export enum tagModTypes {
  NoneMod = '',
  SmallGap = 'tag_small-gap',
  DescriptionText = '_text-small',
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
  lists: TagsListProps[];
};

export const MonumentsTagsBar = (props: MonumentsTagsBarProps) => {
  const tagsLists = props.lists.map((tagList, i) => <TagsList key={i} {...tagList} />);
  return <div className="monuments-tags-bar">{tagsLists}</div>;
};

export enum tagListType {
  Row = 'tags-list-wrapper__tags_row',
  Column = 'tags-list-wrapper__tags_column',
}

type TagsListProps = {
  listType: tagListType;
  listHeader: string;
  tags: TagProps[];
};

const TagsList = (props: TagsListProps) => {
  const tags = props.tags.map((tag, i) => (
    <div key={i} className="tags-list-wrapper__tag-area">
      <Tag {...tag} />
    </div>
  ));

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
        <span>{props.listHeader}</span>
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
      <div ref={listRef} className={`tags-list-wrapper__tags ${props.listType}`}>
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
