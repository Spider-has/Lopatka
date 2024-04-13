import "./TagsBar.scss"

export enum tagModTypes {
    NoneMod = "",
    SmallGap = "tag_small-gap"
}

export type TagProps = {
    Icon: JSX.Element,
    Text: string
    tagMod: tagModTypes
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


export const Tag = (props: TagProps) => {
    return (
        <div className={`tag ${props.tagMod}`}>
            {props.Icon}
            <div>
                {props.Text}
            </div>
        </div>
    )
}