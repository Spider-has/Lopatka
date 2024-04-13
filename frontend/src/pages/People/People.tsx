import { Button, ButtonContentTypes, ButtonTypes } from "../../components/button/Button";
import { Footer } from "../../components/footer/Footer";
import { PostArea, PostsAreaProps } from "../../components/post/Post";
import { TagsBar, TagsBarProps, tagModTypes } from "../../components/tagsBar/TagsBar";
import { TopPanel } from "../../components/topPanel/TopPanel";
import { AnotherIcon, CalendarIcon, ClockIcon, PlusIcon, ShovelIcon } from "../../icons/Icons";
import blankImg from "../../images/blank-img.jpg"
import "./People.scss"

const tagsContent: TagsBarProps = {
    Tags: [
        {
            Icon: <ClockIcon />,
            Text: "Свежее",
            tagMod: tagModTypes.NoneMod
        },
        {
            Icon: <ShovelIcon />,
            Text: "Интервью",
            tagMod: tagModTypes.NoneMod
        },
        {
            Icon: <CalendarIcon />,
            Text: "Биография",
            tagMod: tagModTypes.NoneMod
        },
        {
            Icon: <AnotherIcon />,
            Text: "Другое",
            tagMod: tagModTypes.NoneMod
        },
    ]
}

const news: PostsAreaProps = {
    posts: [{
        tag: {
            Icon: <ShovelIcon />,
            Text: "Интервью",
            tagMod: tagModTypes.SmallGap
        },
        author: "Иван Березин",
        time: "3 часа назад",
        header: "Экспедиция на острове Амоксары",
        description: "С 21 июня по 10 июля 2022 г. отрядом Марийской археологической экспедиции (под руководством д.и.н. Никитиной Т.Б., при участии Акилбаева А.В., Михеев)",
        image: blankImg,
        link: "/article"
    },
    {
        tag: {
            Icon: <CalendarIcon />,
            Text: "Биография",
            tagMod: tagModTypes.SmallGap
        },
        author: "Иван Березин",
        time: "3 часа назад",
        header: "Экспедиция на острове Амоксары",
        description: "С 21 июня по 10 июля 2022 г. отрядом Марийской археологической экспедиции (под руководством д.и.н. Никитиной Т.Б., при участии Акилбаева А.В., Михеев)",
        image: blankImg,
        link: "/article"
    },
    {
        tag: {
            Icon: <AnotherIcon />,
            Text: "Другое",
            tagMod: tagModTypes.SmallGap
        },
        author: "Иван Березин",
        time: "3 часа назад",
        header: "Экспедиция на острове Амоксары",
        description: "С 21 июня по 10 июля 2022 г. отрядом Марийской археологической экспедиции (под руководством д.и.н. Никитиной Т.Б., при участии Акилбаева А.В., Михеев)",
        image: blankImg,
        link: "/article"
    }]
}

const MainContent = () => {
    return (
        <section className="main-content-area-wrapper">
            <div className="main-content-area-wrapper__header">
                <h1>Люди</h1>
            </div>
            <div className="main-content-area-wrapper__content-wrapper">
                <TagsBar Tags={tagsContent.Tags} />
                <div>
                    <PostArea {...news} />
                </div>
                <div className="main-content-area-wrapper__creation-button">
                    <Button type={ButtonTypes.Linked} content={{
                        contentType: ButtonContentTypes.IconText,
                        icon: <PlusIcon />,
                        text: "Создать"
                    }} />
                </div>
            </div>
        </section>
    )
}

export const PeoplePage = () => {
    return (
        <div className="main-page">
            <TopPanel />
            <MainContent />
            <Footer />
        </div>
    )
}