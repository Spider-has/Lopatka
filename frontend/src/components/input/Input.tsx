import { RefObject, useEffect, useRef, useState } from 'react';
import './Input.scss';
import { CLoseIcon, ErrorIcon, ImageUploaderIcon, OpenCloseListIcon } from '../../icons/Icons';
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
  Coordinates = 'Coordinates',
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
  OptionListData?: OptionListProps;
  setValid?: () => void;
  setCords?: (cords: string) => void;
  cords?: string;
  optionData?: string;
  imageData?: ImageData;
  EditorData?: Editor;
  newDate?: string;
};

export const InputField = (props: InputProps) => {
  useEffect(() => {
    const handler = () => {
      if (props.setValid) {
        props.setValid();
      }
    };
    if (props.validationTypes == ValidationTypes.NoneValid) {
      if (props.dataRef) props.dataRef.current?.addEventListener('input', handler, { once: true });
    }
    return () => {
      if (props.dataRef) props.dataRef.current?.removeEventListener('input', handler);
    };
  });
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
      const InpRef = props.dataRef as RefObject<HTMLInputElement>;
      const placeholder = 'дд.мм.гггг';
      const [value, setValue] = useState('');
      useEffect(() => {
        if (props.loaded) {
          const date = props.newDate ? props.newDate : '';
          if (date.search(/[^0-9.]/g) == -1) setValue(date);
        }
      }, [props.loaded]);
      return (
        <div className="input-with-placeholder">
          <span className="input-with-placeholder__placeholder">
            <span className="input-with-placeholder__hidden-placeholder">{value}</span>
            {placeholder.slice(value.length, placeholder.length)}
          </span>
          <input
            onChange={() => {
              if (InpRef.current) {
                const newValue = InpRef.current.value;
                if (newValue.search(/[^0-9.]/g) == -1) setValue(newValue);
              }
            }}
            maxLength={10}
            required={props.required}
            ref={InpRef}
            className={`input ${props.heightType}`}
            value={value.toUpperCase()}
          />
        </div>
      );
    }
    case InputTypes.Datalist: {
      const InpRef = props.dataRef as RefObject<HTMLInputElement>;
      const optionD: string = props.optionData ? props.optionData : '';
      const optionListData: OptionListProps = props.OptionListData
        ? props.OptionListData
        : {
            optionElems: [],
            setOption: () => {
              //
            },
          };
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
          <OptionList state={open} data={{ ...optionListData }} />
        </div>
      );
    }
    case InputTypes.Submit:
      return <input type={props.type} className="submit-input" value={'Опубликовать'} />;
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
    case InputTypes.Coordinates: {
      const InpRef = props.dataRef as RefObject<HTMLInputElement>;
      const ValidMod = props.validationTypes == ValidationTypes.NoneValid ? 'input_error' : '';
      const ValiPlaceholderMod =
        props.validationTypes == ValidationTypes.NoneValid ? 'input-with-placeholder__placeholder_error' : '';
      const placeholder = `XX°XX'XX"N YY°YY'YY"E`;
      const setCords = props.setCords
        ? props.setCords
        : () => {
            //
          };
      const value = props.cords ? props.cords : '';
      return (
        <div className="input-with-placeholder">
          <span className={`input-with-placeholder__placeholder ${ValiPlaceholderMod}`}>
            <span className="input-with-placeholder__hidden-placeholder">{value}</span>
            {placeholder.slice(value.length, placeholder.length)}
          </span>
          <input
            onChange={() => {
              if (InpRef.current) {
                const newValue = InpRef.current.value;
                setCords(coordinatesReplacer(newValue, value));
              }
            }}
            maxLength={21}
            required={props.required}
            ref={InpRef}
            className={`input ${props.heightType}  ${ValidMod}`}
            value={value.toUpperCase()}
          />
        </div>
      );
    }
    case InputTypes.Editor:
      if (props.setEditor) return <RichTextEditor {...props} />;
  }
};

const coordinatesReplacer = (newValue: string, oldValue: string) => {
  if (newValue.search(/[^0-9°'"NE ]/g) == -1) {
    if (newValue.length >= 2 && oldValue.length <= 2 && !oldValue.includes('°'))
      return newValue.slice(0, 2) + '°' + newValue.slice(3, newValue.length);
    else if (newValue.length >= 5 && oldValue.length <= 5 && !oldValue.includes("'"))
      return newValue.slice(0, 5) + "'" + newValue.slice(6, newValue.length);
    else if (newValue.length >= 8 && oldValue.length <= 8 && !oldValue.includes('"'))
      return newValue.slice(0, 8) + '"' + newValue.slice(9, newValue.length);
    else if (newValue.length >= 13 && oldValue.length <= 13 && !oldValue.replace('°', '').includes('°'))
      return newValue.slice(0, 13) + '°' + newValue.slice(14, newValue.length);
    else if (newValue.length >= 16 && oldValue.length <= 16 && !oldValue.replace("'", '').includes("'"))
      return newValue.slice(0, 16) + "'" + newValue.slice(16, newValue.length);
    else if (newValue.length >= 19 && oldValue.length <= 19 && !oldValue.replace('"', '').includes('"'))
      return newValue.slice(0, 19) + '"' + newValue.slice(20, newValue.length);
    else return newValue;
  }
  return '';
};

export type optionElem = {
  text: string;
};

type OptionListProps = {
  optionElems: optionElem[];
  setOption: (opt: string) => void;
};

const OptionList = (props: { data: OptionListProps; state: boolean }) => {
  const options = props.data.optionElems.map((el, i) => {
    return (
      <div
        key={i}
        onClick={() => {
          if (props.data.setOption) props.data.setOption(el.text);
        }}
      >
        {el.text}
      </div>
    );
  });

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.state) listRef.current?.classList.add('input-list-element__list_opened');
    else listRef.current?.classList.remove('input-list-element__list_opened');
  }, [props.state]);

  return (
    <div ref={listRef} className="input-list-element__list">
      <div className="input-list-element__list-area">{options}</div>
    </div>
  );
};

export const ErrorMessage = (props: { text: string; opened: boolean }) => {
  useEffect(() => {
    if (props.opened) divRef.current?.classList.add('error-message-wrapper_opened');
    else divRef.current?.classList.remove('error-message-wrapper_opened');
  }, [props.opened]);
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} className="error-message-wrapper">
      <ErrorIcon />
      <span>{props.text}</span>
    </div>
  );
};
