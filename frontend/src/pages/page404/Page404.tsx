import { Button, ButtonContentTypes, ButtonSizeTypes, ButtonTypes } from '../../components/button/Button';
import './Page404.scss';
import Img404 from '../../images/404.jpg';
import { LogoIcon, TgLogo, VkLogo, logoColorType, logoSizeType } from '../../icons/Icons';
import { Link } from 'react-router-dom';
import { InfotechLogo } from '../../components/images/Images';

export const Page404 = () => {
  return (
    <div className="page-404-main-wrapper">
      <div className="page-404">
        <div className="page-404__content-wrapper">
          <h1>404</h1>
          <p>Что-то пошло не так...</p>
          <div className="page-404__button-wrapper">
            <Button
              type={ButtonTypes.Linked}
              content={{
                contentType: ButtonContentTypes.Text,
                text: 'На главную',
              }}
              size={ButtonSizeTypes.Big}
              linkTo="/main"
            />
          </div>
        </div>
        <div className="page-404__image-wrapper">
          <div className="page-404__image">
            <img src={Img404} alt="это мы:3" />
          </div>
        </div>
        <div className="page-404__mobile-wrapper">
          <Button
            type={ButtonTypes.Linked}
            content={{
              contentType: ButtonContentTypes.Text,
              text: 'На главную',
            }}
            size={ButtonSizeTypes.Big}
            linkTo="/main"
          />
        </div>
        <div className="page-404__footer">
          <div className="page-404__logos">
            <a href="https://vk.com/arxays12" target="_blank" rel="noreferrer">
              <VkLogo color={logoColorType.Dark} />
            </a>
            <a href="https://t.me/arxlopata12" target="_blank" rel="noreferrer">
              <TgLogo color={logoColorType.Dark} />
            </a>
          </div>
          <div className="page-404__main">
            <Link to="/main">
              <LogoIcon color={logoColorType.Dark} size={logoSizeType.extraSmall} />
            </Link>
          </div>
          <div className="page-404__liceum">
            <span>при поддержке лицея</span>
            <div>
              <InfotechLogo isLight={false} />
            </div>
          </div>
          <div className="page-404__phone">По всем вопросам +7 991 463-35-04</div>
        </div>
      </div>
    </div>
  );
};
