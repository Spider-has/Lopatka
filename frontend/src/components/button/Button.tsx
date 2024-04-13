import "./Button.scss"


export enum ButtonTypes {
    Functional = "Functional",
    Linked = "Linked",
}

export enum ButtonContentTypes {
    Icon = "Icon",
    Text = "IcoTextn",
    IconText = "IconText",
    TextIcon = "TextIcon",
}

type ButtonProps = {
    type: ButtonTypes,
    content: ButtonContent,
    handler?: () => void,
    linkTo?: string,
}

type ButtonContent = {
    contentType: ButtonContentTypes
    icon?: JSX.Element,
    text?: string,
}

export const Button = (props: ButtonProps) => {
    const handler = props.handler
    switch (props.type) {
        case ButtonTypes.Functional:
            return (
                <button className="button"
                    onClick={() => {
                        if (handler) handler()
                    }}>
                    <ButtonContent {...props.content} />
                </button>
            )
        case ButtonTypes.Linked:
            return (
                <a className="button">
                    <ButtonContent {...props.content} />
                </a>
            )
    }
}

const ButtonContent = (props: ButtonContent) => {
    switch (props.contentType) {
        case ButtonContentTypes.Icon:
            return <>{props.icon}</>
        case ButtonContentTypes.Text:
            return <>{props.text}</>
        case ButtonContentTypes.IconText:
            return (
                <>
                    <div>{props.icon}</div>
                    <div>{props.text}</div>
                </>)
        case ButtonContentTypes.TextIcon:
            (
                <>
                    <div>{props.text}</div>
                    <div>{props.icon}</div>
                </>)
    }
}