import infotechLogo from '../../images/InfotechLogo.png';
import infotechLogoLight from '../../images/InfotechLogoLight.png';
import arhHeading from '../../images/arhHeading.png';
type InfotechLogoProps = {
  isLight?: boolean;
};

export const InfotechLogo = (props: InfotechLogoProps) => {
  return <img src={props.isLight ? infotechLogoLight : infotechLogo} alt="любимый лицей <3" />;
};

export const ArheologyHeading = () => {
  return <img src={arhHeading} alt="АРХЕОЛОГИЯ" />;
};
