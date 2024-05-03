import { RefObject, useEffect, useState } from 'react';
import './Input.scss';
import { CLoseIcon, ImageUploaderIcon, OpenCloseListIcon } from '../../icons/Icons';
import { Editor, ImgNameLen, RichTextEditor, generateImgName } from '../richTextEditor/RichTextEditor';

export enum InputTypes {
  Text = 'text',
  Password = 'password',
  TextField = 'textField',
  List = 'list',
  ImageUploader = 'imageUploader',
  Submit = 'submit',
  Editor = 'editor',
  Datalist = 'Datalist',
}

export enum ValidationTypes {
  Normal = 'Normal',
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
  setEditor?: (editor: Editor) => void;
  setImage?: (image: ImageData) => void;
};

export const InputField = (props: InputProps) => {
  switch (props.type) {
    case InputTypes.Text: {
      switch (props.validationTypes) {
        case ValidationTypes.Normal:
          break;
      }
      const letterCount = props.lettersCount ? props.lettersCount : 0;
      const [letterCounter, setCount] = useState(0);
      const overflowClass = letterCounter >= letterCount ? 'input-letter-counter_overflow' : '';
      const InpRef = props.dataRef as RefObject<HTMLTextAreaElement>;
      if (letterCount)
        return (
          <>
            <textarea
              onInput={() => {
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
              className={`input ${overflowClass} ${props.heightType}`}
            ></textarea>
            <div className="input-letter-counter">
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
            className={`input ${props.heightType}`}
          ></textarea>
        );
    }
    case InputTypes.Password:
    case InputTypes.TextField:
    case InputTypes.List:
    case InputTypes.Datalist: {
      const InpRef = props.dataRef as RefObject<HTMLInputElement>;
      const [option, setOption] = useState<string>('');
      const [open, setOpen] = useState(false);
      const openedClass = open ? 'input-list-element__open-list-icon_opened' : '';
      return (
        <div className="input-list-element">
          <input ref={InpRef} value={option} readOnly />
          <div className="input-list-element__option-now ">
            <span>{option}</span>
            <div
              onClick={() => {
                setOpen(!open);
              }}
              className={`input-list-element__open-list-icon ${openedClass}`}
            >
              <OpenCloseListIcon />
            </div>
          </div>
          {open && (
            <div className="input-list-element__list">
              <div onClick={() => setOption('Экспедиции')}>Экспедиции</div>
              <div onClick={() => setOption('События')}>События</div>
              <div onClick={() => setOption('Люди')}>Люди</div>
              <div onClick={() => setOption('Другое')}>Другое</div>
            </div>
          )}
        </div>
      );
    }
    case InputTypes.Submit:
      return <input type={props.type} className="submit-input" />;
    case InputTypes.ImageUploader: {
      const InpRef = props.dataRef as RefObject<HTMLInputElement>;
      const [imageD, setImageD] = useState<ImageData>({
        name: '',
        href: '',
      });
      useEffect(() => {
        if (props.setImage) {
          props.setImage(imageD);
        }
      }, [imageD.href, imageD.name]);
      return (
        <div className="input-image-uploader">
          {imageD.href.length > 0 && (
            <div className="input-image-uploader__input-image-wrapper">
              <img className="input-image-uploader__input-image" src={imageD.href} />
              <div
                className="input-image-uploader__delete-image-button"
                onClick={() => {
                  setImageD({ href: '', name: '' });
                }}
              >
                <CLoseIcon />
              </div>
            </div>
          )}
          {imageD.href.length == 0 && (
            <label>
              <input
                onChange={() => {
                  if (InpRef.current) {
                    if (InpRef.current && InpRef.current.files && InpRef.current.files[0]) {
                      const reader = new FileReader();

                      reader.onload = event => {
                        if (event.target && event.target.result) {
                          const href = event.target.result as string;
                          setImageD({ href: href, name: generateImgName(ImgNameLen) });
                        }
                      };

                      reader.readAsDataURL(InpRef.current.files[0]);
                    }
                  }
                }}
                ref={InpRef}
                type="file"
                className="input-image-uploader__input"
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
