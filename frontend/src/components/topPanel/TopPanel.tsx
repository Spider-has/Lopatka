import './TopPanel.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon, Lupa, SearchIcon, YellowLogo, logoColorType, logoSizeType } from '../../icons/Icons';

type burgerPopoverProps = {
  burgerState: boolean;
};

const BurgerPopover = (props: burgerPopoverProps) => {
  const burgerState = props.burgerState;
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popoverRef.current) {
      if (burgerState) {
        popoverRef.current.classList.add('burger-popover_opened');
      } else {
        popoverRef.current.classList.remove('burger-popover_opened');
      }
    }
  }, [burgerState]);
  return (
    <div ref={popoverRef} className="burger-popover">
      <Link className="burger-popover__link" to={''}>
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
      <Link className="burger-popover__link" to={''}>
        Раскопки
      </Link>
    </div>
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

export const BurgerTopPanel = () => {
  const [burgerState, setBurgerState] = useState(false);
  return (
    <header className="burger-top-panel">
      <div className="burger-top-panel__navigation-bar-wrapper">
        <div className="burger-top-panel__burger-icon">
          <BurgerIcon
            handler={() => {
              if (burgerState) setBurgerState(false);
              else setBurgerState(true);
            }}
            burgerState={burgerState}
          />
          <BurgerPopover burgerState={burgerState} />
        </div>
        <div className="burger-top-panel__logo">
          <LogoIcon size={logoSizeType.Small} color={logoColorType.Light} />
        </div>
      </div>
      <label className="search-input-wrapper">
        <input type="search" placeholder="Поиск по названию..." />
        <div className="search-input-wrapper__icon">
          <SearchIcon />
        </div>
      </label>
    </header>
  );
};

export enum topPanelColortype {
  light = 'top-panel_light',
  dark = 'top-panel_dark',
}

type TopPanelProps = {
  colorType: topPanelColortype;
  withSearch: boolean;
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
    <div className={`top-panel ${props.colorType}`}>
      <div className={`top-panel__border ${borderMod}`}></div>
      <div className="top-panel__logo">
        {props.colorType == topPanelColortype.dark && (
          <LogoIcon size={logoSizeType.Small} color={logoColorType.Light} />
        )}
        {props.colorType == topPanelColortype.light && <YellowLogo />}
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
  );
};
