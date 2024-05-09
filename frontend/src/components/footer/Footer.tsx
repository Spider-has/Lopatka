import { LogoIcon, TgLogo, VkLogo, logoColorType, logoSizeType } from '../../icons/Icons';
import { InfotechLogo } from '../images/Images';
import './Footer.scss';

type FooterProps = {
  isLight?: boolean;
};
export const Footer = (props: FooterProps) => {
  return (
    <footer className={'footer' + (props.isLight ? ' footer_light' : '')}>
      <div className={'footer-wrapper'}>
        <div className="footer-wrapper__info-area footer-wrapper__info-area_small-gap">
          <div>
            <LogoIcon
              color={props.isLight ? logoColorType.Light : logoColorType.Dark}
              size={logoSizeType.Small}
            />
          </div>
          <div className="footer-wrapper__row-info-elements">
            <div>при поддержке лицея</div>
            <a href="https://www.infotech12.ru/" target="_blank" rel="noreferrer">
              <InfotechLogo isLight={props.isLight} />
            </a>
          </div>
        </div>
        <div className="footer-wrapper__info-area">
          <div>
            <a href="https://vk.com/arxays12" target="_blank" rel="noreferrer">
              <VkLogo color={props.isLight ? logoColorType.Light : logoColorType.Dark} />
            </a>
            <a href="https://t.me/arxlopata12" target="_blank" rel="noreferrer">
              <TgLogo color={props.isLight ? logoColorType.Light : logoColorType.Dark} />
            </a>
          </div>
          <div className="footer-wrapper__question-text">
            По всем вопросам <span className="footer-wrapper__phone-text">+7 991 463-35-04</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
