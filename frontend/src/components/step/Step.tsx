import './Step.scss';

export type StepProps = {
  number: string;
  text: string;
  title: string;
  photo: JSX.Element;
  isPhotoLeft: boolean;
};


export const Step = (props: StepProps) => {
  return (
    <div className="step">
      {props.isPhotoLeft && props.photo}
      <p className="big-number">{props.number}</p>
      <div className="step__info">
        <div className="step__info__header">{props.title}</div>
        <div className="step__info__text">{props.text}</div>
      </div>
      {!props.isPhotoLeft && props.photo}
    </div>
  )
}