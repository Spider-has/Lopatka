import "./TagsBar.scss"

export type TagProps = {
    Icon: JSX.Element,
    Text: string
}

export type TagsBarProps = {
    Tags: TagProps[]
}

export const TagsBar = (props: TagsBarProps) => {
    const tags = props.Tags.map((tag, i) => <Tag key={i} {...tag} />)
    return (
        <div className="tags-bar-wrapper">
            {tags}
        </div>
    )
}


export const Tag = (props: TagProps) => {
    return (
        <div className="tag">
            {props.Icon}
            <div>
                {props.Text}
            </div>
        </div>
    )
}