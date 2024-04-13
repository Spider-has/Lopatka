import { Link } from "react-router-dom"
import { Tag, TagProps } from "../tagsBar/TagsBar"
import "./Post.scss"
type PostProps = {
    tag: TagProps,
    author: string,
    time: string,
    header: string,
    description: string,
    image: string,
    link: string
}

export type PostsAreaProps = {
    posts: PostProps[]
}

export const PostArea = (props: PostsAreaProps) => {
    const posts = props.posts.map((post, i) => <Post key={i} {...post} />)
    return (
        <div className="post-area">
            {posts}
        </div>
    )
}

export const Post = (props: PostProps) => {
    return (
        <Link to={props.link}>
            <article className="article">
                <div className="article-wrapper ">
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
                            <p className="article-wrapper__description">
                                {props.description}
                            </p>
                        </div>
                        <div className="article-wrapper__image-area">
                            <img className="article-wrapper__image" src={props.image} alt="post image" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}