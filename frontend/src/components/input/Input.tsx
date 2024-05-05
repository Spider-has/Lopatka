import { RefObject, useEffect, useState } from 'react';
import './Input.scss';
import { CLoseIcon, ImageUploaderIcon, OpenCloseListIcon } from '../../icons/Icons';
import { Editor, RichTextEditor } from '../richTextEditor/RichTextEditor';
import { ImgNameLen, generateImgName } from '../../utils/utils';

export enum InputTypes {
  Text = 'text',
  Date = 'date',
  Password = 'password',
  TextField = 'textField',
  List = 'list',
  ImageUploader = 'imageUploader',
  Submit = 'submit',
  Editor = 'editor',
  Datalist = 'Datalist',
}

export enum ValidationTypes {
  Valid = 'Valid',
  NoneValid = 'NoneValid',
}

export enum InputHeightTypes {
  Full = 'input_full',
  Large = 'input_large',
  Auto = 'input_auto',
}

export type ImageData = {
  name: string;
  href: string;
};

export type InputProps = {
  type: InputTypes;
  validationTypes: ValidationTypes;
  heightType?: InputHeightTypes;
  dataRef?: RefObject<HTMLTextAreaElement> | RefObject<HTMLInputElement>;
  placeholder?: string;
  required: boolean;
  lettersCount?: number;
  loaded?: boolean;
  setEditor?: (editor: Editor) => void;
  setImage?: (image: ImageData) => void;
  setOption?: (option: string) => void;
  optionData?: string;
  imageData?: ImageData;
  EditorData?: Editor;
};

export const InputField = (props: InputProps) => {
  switch (props.type) {
    case InputTypes.Text: {
      const ValidMod = props.validationTypes == ValidationTypes.NoneValid ? 'input_error' : '';
      const ValidLetterMod =
        props.validationTypes == ValidationTypes.NoneValid ? 'input-letter-counter_error' : '';
      const letterCount = props.lettersCount ? props.lettersCount : 0;
      const [letterCounter, setCount] = useState(0);
      const overflowClass = letterCounter >= letterCount ? 'input-letter-counter_overflow' : '';
      const InpRef = props.dataRef as RefObject<HTMLTextAreaElement>;
      useEffect(() => {
        if (props.dataRef?.current && props.loaded) {
          setCount(props.dataRef.current.value.length);
          if (props.heightType == InputHeightTypes.Auto) {
            props.dataRef.current.style.height = ``;
            props.dataRef.current.style.height = props.dataRef.current.scrollHeight + 'px';
          }
        }
      }, [props.loaded]);
      if (letterCount)
        return (
          <>
            <textarea
              onChange={() => {
                if (props.dataRef)
                  if (props.dataRef.current) {
                    setCount(props.dataRef.current.value.length);
                    if (props.heightType == InputHeightTypes.Auto) {
                      props.dataRef.current.style.height = ``;
                      props.dataRef.current.style.height = props.dataRef.current.scrollHeight + 'px';
                    }
                  }
              }}
              rows={props.heightType == InputHeightTypes.Auto ? 1 : undefined}
              required={props.required}
              ref={InpRef}
              maxLength={props.lettersCount}
              className={`input ${overflowClass} ${props.heightType} ${ValidMod}`}
            ></textarea>
            <div className={`input-letter-counter ${ValidLetterMod}`}>
              {letterCounter}/{letterCount}
            </div>
          </>
        );
      else
        return (
          <textarea
            onInput={() => {
              if (props.dataRef)
                if (props.dataRef.current) {
                  if (props.heightType == InputHeightTypes.Auto) {
                    props.dataRef.current.style.height = ``;
                    props.dataRef.current.style.height = props.dataRef.current.scrollHeight + 'px';
                  }
                }
            }}
            rows={props.heightType == InputHeightTypes.Auto ? 1 : undefined}
            required={props.required}
            ref={InpRef}
            className={`input ${props.heightType} ${ValidMod}`}
          ></textarea>
        );
    }
    case InputTypes.Date: {
      const InpRef = props.dataRef as RefObject<HTMLTextAreaElement>;
      return (
        <textarea
          rows={1}
          placeholder="дд.мм.гггг"
          maxLength={10}
          required={props.required}
          ref={InpRef}
          className={`input ${props.heightType}`}
        ></textarea>
      );
    }
    case InputTypes.Datalist: {
      const InpRef = props.dataRef as RefObject<HTMLInputElement>;
      const optionD: string = props.optionData ? props.optionData : '';
      const [open, setOpen] = useState(false);
      const ValidMod =
        props.validationTypes == ValidationTypes.NoneValid ? 'input-list-element__option-now_error' : '';
      return (
        <div className={`input-list-element`}>
          <input ref={InpRef} value={optionD} readOnly />
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className={`input-list-element__option-now ${ValidMod}`}
          >
            <span>{optionD}</span>
            <div className={`input-list-element__open-list-icon`}>
              <OpenCloseListIcon />
            </div>
          </div>
          {open && (
            <div className="input-list-element__list">
              <div
                onClick={() => {
                  if (props.setOption) props.setOption('Экспедиции');
                }}
              >
                Экспедиции
              </div>
              <div
                onClick={() => {
                  if (props.setOption) props.setOption('События');
                }}
              >
                События
              </div>
              <div
                onClick={() => {
                  if (props.setOption) props.setOption('Другое');
                }}
              >
                Другое
              </div>
            </div>
          )}
        </div>
      );
    }
    case InputTypes.Submit:
      return <input type={props.type} className="submit-input" />;
    case InputTypes.ImageUploader: {
      const InpRef = props.dataRef as RefObject<HTMLInputElement>;
      const imageD: ImageData = props.imageData
        ? props.imageData
        : {
            name: '',
            href: '',
          };
      const ValidMod = props.validationTypes == ValidationTypes.NoneValid ? 'input-image-uploader_error' : '';
      return (
        <div className={`input-image-uploader ${ValidMod}`}>
          {imageD.href.length > 0 && (
            <div className="input-image-uploader__input-image-wrapper">
              <img className="input-image-uploader__input-image" src={imageD.href} />
              <div
                className="input-image-uploader__delete-image-button"
                onClick={() => {
                  if (props.setImage) props.setImage({ href: '', name: '' });
                }}
              >
                <CLoseIcon />
              </div>
            </div>
          )}
          {imageD.href.length == 0 && (
            <label className="input-image-uploader__upload-wrapper">
              <input
                onChange={() => {
                  if (InpRef.current) {
                    if (InpRef.current && InpRef.current.files && InpRef.current.files[0]) {
                      const reader = new FileReader();

                      reader.onload = event => {
                        if (event.target && event.target.result) {
                          const href = event.target.result as string;
                          if (props.setImage)
                            props.setImage({ href: href, name: generateImgName(ImgNameLen) });
                        }
                      };

                      reader.readAsDataURL(InpRef.current.files[0]);
                    }
                  }
                }}
                ref={InpRef}
                type="file"
                className="input-image-uploader__input"
                accept="image/png, image/jpeg"
              />
              <ImageUploaderIcon />
              <span>png,jpg</span>
            </label>
          )}
        </div>
      );
    }
    case InputTypes.Editor:
      if (props.setEditor) return <RichTextEditor {...props} />;
  }
};
