export const serverImageUrl = 'http://localhost:8000/static/post_images/';

export const convertDateIntoDBStyle = (date: string) => {
  const [day, month, year] = date.split('.');
  if (
    Number(day) > 0 &&
    Number(day) <= 31 &&
    Number(month) > 0 &&
    Number(month) <= 12 &&
    Number(year) < 5874897 &&
    Number(year) > 0
  ) {
    return `${year}-${month}-${day}`;
  }
  return '';
};

export const convertToEuropeanDateStyle = (date: string) => {
  const [year, month, day] = date.split('-');
  const normalDay = day.slice(0, 2);
  if (
    Number(normalDay) > 0 &&
    Number(normalDay) <= 31 &&
    Number(month) > 0 &&
    Number(month) <= 12 &&
    Number(year) < 5874897 &&
    Number(year) > 0
  ) {
    return `${normalDay}.${month}.${year}`;
  }
  return '';
};

export const ImgNameLen = 20;

export const generateImgName = (strokeLength: number) => {
  let imgName = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < strokeLength; i++) {
    imgName += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return imgName;
};
