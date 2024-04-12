import { Footer } from "../../components/footer/Footer";
import { PostArea, PostsAreaProps } from "../../components/post/Post";
import { TagsBar, TagsBarProps } from "../../components/tagsBar/TagsBar";
import { TopPanel } from "../../components/topPanel/TopPanel";
import { AnotherIcon, CalendarIcon, ClockIcon, ShovelIcon } from "../../icons/Icons";
import blankImg from "../../images/blank-img.jpg"
import "./MainPage.scss"

const tagsContent: TagsBarProps = {
    Tags: [
        {
            Icon: <ClockIcon />,
            Text: "Свежее"
        },
        {
            Icon: <ShovelIcon />,
            Text: "Свежее"
        },
        {
            Icon: <CalendarIcon />,
            Text: "Свежее"
        },
        {
            Icon: <AnotherIcon />,
            Text: "Свежее"
        },
    ]
}

const news: PostsAreaProps = {
    posts: [{
        tag: {
            Icon: <ShovelIcon />,
            Text: "Экспедиции"
        },
        author: "Иван Березин",
        time: "3 часа назад",
        header: "Экспедиция на острове Амоксары",
        description: "С 21 июня по 10 июля 2022 г. отрядом Марийской археологической экспедиции (под руководством д.и.н. Никитиной Т.Б., при участии Акилбаева А.В., Михеев)",
        image: blankImg
    }]
}

const MainContent = () => {
    return (
        <section className="main-content-area-wrapper">
            <div className="main-content-area-wrapper__header">
                <h1>Новости</h1>
            </div>
            <div className="main-content-area-wrapper__content-wrapper">
                <TagsBar Tags={tagsContent.Tags} />
                <div>
                    <PostArea {...news} />
                </div>
                <div>
                    <button>
                        Создать
                    </button>
                </div>
            </div>
        </section>
    )
}

export const MainPage = () => {
    return (
        <div className="main-page">
            <TopPanel />
            <MainContent />
            <Footer />
        </div>
    )
}