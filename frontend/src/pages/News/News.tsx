import { useRef } from "react";
import { Button, ButtonContentTypes, ButtonTypes } from "../../components/button/Button";
import { Footer } from "../../components/footer/Footer";
import { PostArea, PostsAreaProps } from "../../components/post/Post";
import { TagsBar, TagsBarProps, tagModTypes, tagTypes } from "../../components/tagsBar/TagsBar";
import { TopPanel } from "../../components/topPanel/TopPanel";
import { UpArrow } from "../../components/upArrow/UpArrow";
import { AnotherIcon, CalendarIcon, ClockIcon, PlusIcon, ShovelIcon } from "../../icons/Icons";
import blankImg from "../../images/blank-img.jpg"
import "./News.scss"

const tagsContent: TagsBarProps = {
    Tags: [
        {
            tagTypes: tagTypes.IconText,
            icon: <ClockIcon />,
            text: "Свежее",
            tagMod: tagModTypes.NoneMod
        },
        {
            tagTypes: tagTypes.IconText,
            icon: <ShovelIcon />,
            text: "Экспедиции",
            tagMod: tagModTypes.NoneMod
        },
        {
            tagTypes: tagTypes.IconText,
            icon: <CalendarIcon />,
            text: "События",
            tagMod: tagModTypes.NoneMod
        },
        {
            tagTypes: tagTypes.IconText,
            icon: <AnotherIcon />,
            text: "Другое",
            tagMod: tagModTypes.NoneMod
        },
    ]
}

const news: PostsAreaProps = {
    posts: [{
        tag: {
            tagTypes: tagTypes.IconText,
            icon: <ShovelIcon />,
            text: "Экспедиции",
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
            tagTypes: tagTypes.IconText,
            icon: <ShovelIcon />,
            text: "Экспедиции",
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
            tagTypes: tagTypes.IconText,
            icon: <ShovelIcon />,
            text: "Экспедиции",
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
    const arrowRef = useRef<HTMLDivElement>(null)
    return (
        <section className="main-content-area-wrapper">
            <div className="main-content-area-wrapper__header">
                <h1>Новости</h1>
            </div>
            <div className="main-content-area-wrapper__content-wrapper">
                <div>
                    <TagsBar Tags={tagsContent.Tags} />
                </div>

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
                <div ref={arrowRef} className="main-content-area-wrapper__up-arrow">
                    <UpArrow
                        downHandler={() => {
                            if (arrowRef.current)
                                arrowRef.current.classList.add("main-content-area-wrapper__up-arrow_down-mod")
                        }}
                        upHandler={() => {
                            if (arrowRef.current)
                                arrowRef.current.classList.remove("main-content-area-wrapper__up-arrow_down-mod")
                        }} />
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