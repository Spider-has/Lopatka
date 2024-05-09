import './TopPanel.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon, SearchIcon, YellowLogo, logoColorType, logoSizeType } from '../../icons/Icons';

type burgerPopoverProps = {
  content?: JSX.Element;
  isOpen?: boolean;
  setClose?: () => void;
};

const DefaultNavigationBurger = () => {
  return (
    <>
      <Link className="burger-popover__link" to={'/main'}>
        Главная
      </Link>
      <Link className="burger-popover__link" to={'/news'}>
        Новости
      </Link>
      <Link className="burger-popover__link" to={'/monuments'}>
        Памятники
      </Link>
      <Link className="burger-popover__link" to={'/peoples'}>
        Люди
      </Link>
      <Link className="burger-popover__link" to={'/excavations'}>
        Раскопки
      </Link>
    </>
  );
};

const BurgerPopover = (props: burgerPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false);
  useEffect(() => {
    console.log(1);
    if (popoverRef.current && backgroundRef.current) {
      if (burgerOpen) {
        popoverRef.current.classList.add('burger-popover_opened');
        backgroundRef.current.classList.add('burger-background_opened');
      } else {
        popoverRef.current.classList.remove('burger-popover_opened');
        backgroundRef.current.classList.remove('burger-background_opened');
      }
    }
  }, [burgerOpen]);
  useEffect(() => {
    console.log(props.isOpen);
    if (props.isOpen && !burgerOpen) setBurgerOpen(true);
  }, [props.isOpen]);
  return (
    <>
      <div className="burger-menu">
        <div className="burger-menu__open-button">
          <div className="burger-top-panel__burger-icon">
            <BurgerIcon
              handler={() => {
                if (burgerOpen) {
                  setBurgerOpen(false);
                  if (props.setClose)
                    setTimeout(() => {
                      if (props.setClose) props.setClose();
                    }, 300);
                } else setBurgerOpen(true);
              }}
              burgerState={burgerOpen}
            />
          </div>
          <div className="burger-top-panel__logo">
            <Link to={'/main'}>
              <LogoIcon size={logoSizeType.Small} color={logoColorType.Light} />
            </Link>
          </div>
        </div>
        <div ref={popoverRef} className="burger-popover">
          {props.content != undefined && props.content}
          {props.content == undefined && <DefaultNavigationBurger />}
        </div>
      </div>
      <div
        onClick={() => {
          setBurgerOpen(false);
          if (props.setClose)
            setTimeout(() => {
              if (props.setClose) props.setClose();
            }, 300);
        }}
        ref={backgroundRef}
        className="burger-background"
      ></div>
    </>
  );
};

type burgerIconProps = {
  handler: () => void;
  burgerState: boolean;
};

const BurgerIcon = (props: burgerIconProps) => {
  const burgerState = props.burgerState;
  const lineRef1 = useRef<HTMLDivElement>(null);
  const lineRef2 = useRef<HTMLDivElement>(null);
  const lineRef3 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lineRef1.current && lineRef2.current && lineRef3.current) {
      if (burgerState) {
        lineRef1.current.classList.add('burger-icon__line_line1-transform');
        lineRef2.current.classList.add('burger-icon__line_line2-transform');
        lineRef3.current.classList.add('burger-icon__line_line3-transform');
      } else {
        lineRef1.current.classList.remove('burger-icon__line_line1-transform');
        lineRef2.current.classList.remove('burger-icon__line_line2-transform');
        lineRef3.current.classList.remove('burger-icon__line_line3-transform');
      }
    }
  }, [burgerState]);
  return (
    <div
      className="burger-icon"
      onClick={() => {
        props.handler();
      }}
    >
      <div ref={lineRef1} className="burger-icon__line"></div>
      <div ref={lineRef2} className="burger-icon__line"></div>
      <div ref={lineRef3} className="burger-icon__line"></div>
    </div>
  );
};

export const BurgerTopPanel = (props: burgerPopoverProps) => {
  return (
    <div className="burger-top-panel">
      <div className="burger-top-panel__navigation-bar-wrapper">
        <BurgerPopover {...props} />
      </div>
      <div className="burger-top-panel__search-wrapper">
        <div className="burger-top-panel__lupa">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export enum topPanelColortype {
  light = 'top-panel_light',
  dark = 'top-panel_dark',
}

type TopPanelProps = {
  colorType: topPanelColortype;
  withSearch: boolean;
  burgerProps?: burgerPopoverProps;
};

export const TopPanel = (props: TopPanelProps) => {
  const borderMod = useMemo(() => {
    if (props.colorType == topPanelColortype.light) return 'top-panel__border_dark';
    else return 'top-panel__border_light';
  }, [props.colorType]);
  const textMod = useMemo(() => {
    if (props.colorType == topPanelColortype.light) return 'top-panel__link_light';
    else return 'top-panel__link_dark';
  }, [props.colorType]);
  return (
    <>
      <div className={`top-panel ${props.colorType}`}>
        <div className={`top-panel__border ${borderMod}`}></div>
        <div className="top-panel__logo">
          <Link to={'/main'}>
            {props.colorType == topPanelColortype.dark && (
              <LogoIcon size={logoSizeType.Small} color={logoColorType.Light} />
            )}
            {props.colorType == topPanelColortype.light && <YellowLogo />}
          </Link>
        </div>
        <div className="top-panel__links-search-wrapper">
          <div className="top-panel__links">
            <Link className={`top-panel__link ${textMod}`} to={'/main'}>
              Главная
            </Link>
            <Link className={`top-panel__link ${textMod}`} to={'/news'}>
              Новости
            </Link>
            <Link className={`top-panel__link ${textMod}`} to={'/monuments'}>
              Памятники
            </Link>
            <Link className={`top-panel__link ${textMod}`} to={'/peoples'}>
              Люди
            </Link>
            <Link className={`top-panel__link ${textMod}`} to={'/excavations'}>
              Раскопки
            </Link>
          </div>
          {props.withSearch && (
            <div className="top-panel__lupa">
              <SearchIcon />
            </div>
          )}
        </div>
      </div>
      <BurgerTopPanel {...props.burgerProps} />
    </>
  );
};
