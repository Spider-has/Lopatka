import { Link } from 'react-router-dom';
import './Button.scss';

export enum ButtonTypes {
  Functional = 'Functional',
  Linked = 'Linked',
}

export enum ButtonContentTypes {
  Icon = 'Icon',
  Text = 'IcoTextn',
  IconText = 'IconText',
  TextIcon = 'TextIcon',
}

export enum ButtonSizeTypes {
  LargePadding = 'button_large_padding',
}

export enum ButtonColorTypes {
  None = '',
  Black = 'button_black',
  Transparent = 'button_transparent',
}

type ButtonProps = {
  type: ButtonTypes;
  content: ButtonContent;
  colors?: ButtonColorTypes;
  size?: ButtonSizeTypes;
  handler?: () => void;
  linkTo?: string;
};

type ButtonContent = {
  contentType: ButtonContentTypes;
  icon?: JSX.Element;
  text?: string;
};

export const Button = (props: ButtonProps) => {
  const handler = props.handler;
  const colorMod = props.colors ? props.colors : '';
  const sizeMod = props.size ? props.size : '';
  switch (props.type) {
    case ButtonTypes.Functional: {
      return (
        <button
          className={`button ${colorMod} ${sizeMod}`}
          onClick={() => {
            if (handler) handler();
          }}
        >
          <ButtonContent {...props.content} />
        </button>
      );
    }
    case ButtonTypes.Linked: {
      return (
        <Link className={`button ${colorMod} ${sizeMod}`} to={props.linkTo ? props.linkTo : ''}>
          <ButtonContent {...props.content} />
        </Link>
      );
    }
  }
};

const ButtonContent = (props: ButtonContent) => {
  switch (props.contentType) {
    case ButtonContentTypes.Icon:
      return <>{props.icon}</>;
    case ButtonContentTypes.Text:
      return <>{props.text}</>;
    case ButtonContentTypes.IconText:
      return (
        <>
          <div>{props.icon}</div>
          <div>{props.text}</div>
        </>
      );
    case ButtonContentTypes.TextIcon:
      <>
        <div>{props.text}</div>
        <div>{props.icon}</div>
      </>;
  }
};
