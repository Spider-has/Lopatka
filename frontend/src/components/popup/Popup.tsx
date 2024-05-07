import { useRef } from 'react';
import { SmallCross } from '../../icons/Icons';
import { Button, ButtonColorTypes, ButtonContentTypes, ButtonSizeTypes, ButtonTypes } from '../button/Button';
import './Popup.scss';

export enum PopupBackgrouds {
  Accent = 'popup_accent-background',
  Primary = 'popup_primary-background',
}

export type popupData = {
  content: string;
  header: string;
  backgroundType: PopupBackgrouds;
};

export type PopupProps = {
  data: popupData;
  setClosed: () => void;
};

export const InfoPopup = (props: PopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div
        onClick={() => {
          props.setClosed();
        }}
        className="popup-background"
      ></div>
      <div className={`popup popup_success-type ${props.data.backgroundType}`} ref={popupRef}>
        <div className="popup__cross-area">
          <div
            className="popup__cross"
            onClick={() => {
              props.setClosed();
            }}
          >
            <SmallCross />
          </div>
        </div>
        <div className="popup__main-area popup__main-area_creation-type">
          <div>{props.data.header}</div>
          <div className="popup__subtitle-text">{props.data.content}</div>
        </div>
      </div>
    </>
  );
};

export const DeleteActiclePopup = (props: { deleteHandler: () => void; setPopupClosed: () => void }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div
        onClick={() => {
          props.setPopupClosed();
        }}
        className="popup-background"
      ></div>
      <div className="popup popup_delete-type popup_primary-background" ref={popupRef}>
        <div className="popup__cross-area">
          <div
            className="popup__cross"
            onClick={() => {
              props.setPopupClosed();
            }}
          >
            <SmallCross />
          </div>
        </div>
        <div className="popup__main-area">
          <div>Вы уверены, что хотите удалить новость?</div>
          <div className="popup__buttons-area">
            <div>
              <Button
                type={ButtonTypes.Functional}
                handler={() => {
                  props.deleteHandler();
                }}
                colors={ButtonColorTypes.Transparent}
                size={ButtonSizeTypes.LargePadding}
                content={{
                  contentType: ButtonContentTypes.Text,
                  text: 'Да',
                }}
              />
            </div>
            <div>
              <Button
                handler={() => {
                  props.setPopupClosed();
                }}
                type={ButtonTypes.Functional}
                colors={ButtonColorTypes.Black}
                size={ButtonSizeTypes.LargePadding}
                content={{
                  contentType: ButtonContentTypes.Text,
                  text: 'Нет',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
