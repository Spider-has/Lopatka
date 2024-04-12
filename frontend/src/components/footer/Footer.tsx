import { LogoIcon, TgLogo, VkLogo, logoColorType, logoSizeType } from "../../icons/Icons"
import { InfotechLogo } from "../images/Images"
import './Footer.scss'
export const Footer = () => {
    return (
        <footer>
            <div className="footer-wrapper">
                <div className="footer-wrapper__info-area footer-wrapper__info-area_small-gap">
                    <div>
                        <LogoIcon color={logoColorType.Dark} size={logoSizeType.Small} />
                    </div>
                    <div className="footer-wrapper__row-info-elements">
                        <div>
                            при поддержке лицея
                        </div>
                        <div>
                            <InfotechLogo />
                        </div>
                    </div>
                </div>
                <div className="footer-wrapper__info-area">
                    <div>
                        <VkLogo />
                        <TgLogo />
                    </div>
                    <div>
                        По всем вопросам +7 991 463-35-04
                    </div>
                </div>
            </div>
        </footer>
    )
}