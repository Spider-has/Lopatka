import { Tag, TagProps } from "../tagsBar/TagsBar"
import "./Post.scss"




export enum ContentType {
    Text = "Text",
    Image = "Image"
}


export enum TextMod {
    Bold = "Bold",
    Cursive = "italic",
    Normal = ""
}

interface ArticleContent {
    ContentType: ContentType;
}

interface TextContent extends ArticleContent {
    ContentType: ContentType.Text;
    Value: string;
    Mod: TextMod
}

interface ImageContent extends ArticleContent {
    ContentType: ContentType.Image;
    src: string
}

export type ArticleContentElement = TextContent | ImageContent

export type ArticleProps = {
    tag: TagProps,
    author: string,
    time: string,
    header: string,
    image: string,
    content: ArticleContentElement[]
}

const ArticleContent = (props: ArticleContentElement) => {
    switch (props.ContentType) {
        case ContentType.Text:
            return (
                <p style={{ fontWeight: props.Mod }}>
                    {props.Value}
                </p>
            )
        case ContentType.Image:
            return (
                <img src={props.src} alt="post image" />
            )
    }
}



export const Article = (props: ArticleProps) => {

    const content = props.content.map((content, i) => (
        <ArticleContent {...content} key={i} />
    ))

    return (
        <article className="article">
            <div className="article-wrapper">
                <div className="article-wrapper__article-info">
                    <div className="article-wrapper__tag-wrapper">
                        <Tag {...props.tag} />
                    </div>

                    <div >
                        {props.author}
                    </div>
                    <div className="article-wrapper__publication-time">
                        {props.time}
                    </div>
                </div>
                <div className="article-wrapper__main-content">
                    <div className="article-wrapper__content-wrapper">
                        <div className="article-wrapper__header">
                            <h2>{props.header}</h2>
                        </div>
                    </div>
                    <div className="article-wrapper__image-area">
                        <img className="article-wrapper__image" src={props.image} alt="post image" />
                    </div>
                </div>
            </div>
            <div className="article__main-content">
                {content}
            </div>
        </article>
    )
}
