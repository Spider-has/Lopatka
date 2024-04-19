import { useRef } from "react";
import { Footer } from "../../components/footer/Footer";
import { Article, ArticleProps, ContentType, TextMod } from "../../components/post/Article";
import { tagModTypes } from "../../components/tagsBar/TagsBar";
import { TopPanel } from "../../components/topPanel/TopPanel";
import { UpArrow } from "../../components/upArrow/UpArrow";
import { ShovelIcon } from "../../icons/Icons";
import blankImg from "../../images/blank-img.jpg"
import rndImg from "../../images/randomImg.jpg"
import { ButtonContentTypes } from "../../components/button/Button";

const article: ArticleProps = {
    tag: {
        tagTypes: ButtonContentTypes.IconText,
        icon: <ShovelIcon />,
        text: "Экспедиции",
        tagMod: tagModTypes.SmallGap
    },
    author: "Иван Березин",
    time: "3 часа назад",
    header: "Экспедиция на острове Амоксары",
    image: blankImg,
    content: [
        {
            ContentType: ContentType.Text,
            Value: "С 21 июня по 10 июля 2022 г. отрядом Марийской археологической экспедиции (под руководством д.и.н. Никитиной Т.Б., при участии Акилбаева А.В., Михеевой А.И., Скулкина Д.Р., Кувшинской Т.Л.), сотрудниками Чувашского государственного института гуманитарных наук (Мясников Н.С., Березин А.Ю.) и волонтерами Йошкар-Олинского лицея «Инфотех» проведены раскопки Амоксарского могильника, расположенного на острове Чебоксарского водохранилища в Моргаушском районе Чувашской Республики. В ходе работ обнаружены и изучены 14 захоронений (с 2021 г. – 17 захоронений).",
            Mod: TextMod.Normal
        },
        {
            ContentType: ContentType.Text,
            Value: "Погребения предварительно датированы X – XII вв.",
            Mod: TextMod.Bold
        },
        {
            ContentType: ContentType.Text,
            Value: "Могильник отличается богатством погребального инвентаря. В женских захоронениях найдены разнообразные головные венчики, височные подвески, монеты, бусы, шумящие подвески, в составе шейных ожерелий, гривны, браслеты, перстни, детали наборных поясов и обувная гарнитура. В мужских захоронениях встречаются предметы оружия и орудия труда: топоры, ножи, копья, наконечники стрел, кресала и кремни, детали конского снаряжения. В составе погребального инвентаря присутствуют дарственные комплексы, состоящие из медных котлов, деревянной посуды, украшений и орудий труда.",
            Mod: TextMod.Normal
        },
        {
            ContentType: ContentType.Image,
            src: rndImg
        },
        {
            ContentType: ContentType.Text,
            Value: "Могильник представляет огромный интерес для выяснения этнокультурной ситуации в Чувашско-Марийском Поволжье в средние века. Его изучение позволит продвинуться в вопросах географии расселения средневековых марийцев и проникновения булгар на территорию Чувашии в домонгольское время. Совместные исследования марийских и чувашских коллег будут продолжены в следующем году.",
            Mod: TextMod.Normal
        },
    ]
}

const ArticleContentBlock = () => {
    const arrowRef = useRef<HTMLDivElement>(null)
    return (
        <div className="main-content-area-wrapper">
            <div className="main-content-area-wrapper__content-wrapper">
                <Article {...article} />
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
    )
}

export const ArticlePage = () => {
    return (
        <div className="main-page">
            <TopPanel />
            <ArticleContentBlock />
            <Footer />
        </div>
    )
}