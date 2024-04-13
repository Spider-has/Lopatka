import { useEffect, useRef, useState } from "react"
import { OpenCloseListIcon } from "../../icons/Icons"
import "./TagsBar.scss"

export enum tagModTypes {
    NoneMod = "",
    SmallGap = "tag_small-gap",
    DescriptionText = "_text-small"
}

export enum tagTypes {
    IconText = "IconText",
    Text = "Text"
}

export type TagProps = {
    tagTypes: tagTypes,
    icon?: JSX.Element,
    text: string,
    tagMod: tagModTypes,
}

export type TagsBarProps = {
    Tags: TagProps[]
}

export const TagsBar = (props: TagsBarProps) => {
    const tags = props.Tags.map((tag, i) => (
        <div key={i} className="tags-bar-wrapper__tag-container">
            <Tag {...tag} />
        </div>))
    return (
        <div className="tags-bar-wrapper">
            {tags}
        </div>
    )
}

export type MonumentsTagsBarProps = {
    lists: TagsListProps[]
}

export const MonumentsTagsBar = (props: MonumentsTagsBarProps) => {
    const tagsLists = props.lists.map((tagList, i) => (
        <TagsList key={i} {...tagList} />
    ))
    return (
        <div className="monuments-tags-bar">
            {tagsLists}
        </div>
    )
}

export enum tagListType {
    Row = "tags-list-wrapper__tags_row",
    Column = "tags-list-wrapper__tags_column"
}

type TagsListProps = {
    listType: tagListType
    listHeader: string,
    tags: TagProps[],

}

const TagsList = (props: TagsListProps) => {

    const tags = props.tags.map((tag, i) => (
        <div key={i} className="tags-list-wrapper__tag-area">
            <Tag {...tag} />
        </div>

    ))

    const [isOpen, setIsOpen] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const listButtonRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (listRef.current && listButtonRef.current)
            if (isOpen) {
                listRef.current.classList.add("tags-list-wrapper__tags_opened")
                listButtonRef.current.classList.add("tags-list-wrapper__list-icon_opened")
            } else {
                listRef.current.classList.remove("tags-list-wrapper__tags_opened")
                listButtonRef.current.classList.remove("tags-list-wrapper__list-icon_opened")
            }
    }, [isOpen])

    return (
        <div className="tags-list-wrapper">
            <div className="tags-list-wrapper__list-header">
                <span>{props.listHeader}</span>
                <div className="tags-list-wrapper__list-icon" ref={listButtonRef} onClick={() => { setIsOpen(!isOpen) }}>
                    <OpenCloseListIcon />
                </div>
            </div>
            <div ref={listRef} className={`tags-list-wrapper__tags ${props.listType}`}>
                {tags}
            </div>
        </div>
    )
}


export const Tag = (props: TagProps) => {
    switch (props.tagTypes) {
        case tagTypes.IconText:
            return (
                <div className={`tag ${props.tagMod}`}>
                    {props.icon}
                    <div>
                        {props.text}
                    </div>
                </div>
            )
        case tagTypes.Text:
            return (
                <div className={`tag ${props.tagMod}`}>
                    {props.text}
                </div>
            )
    }
}