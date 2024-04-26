import { RefObject, useState } from 'react';
import './Input.scss';
import { ImageUploaderIcon } from '../../icons/Icons';

export enum InputTypes {
  Text = 'Text',
  Password = 'Password',
  TextField = 'TextField',
  List = 'List',
  ImageUploader = 'ImageUploader',
  Submit = 'Submit',
}

export enum ValidationTypes {
  Normal = 'Normal',
}

export enum InputHeightTypes {
  Full = 'input_full',
  Large = 'input_large',
  Auto = 'input_auto',
}

export type InputProps = {
  type: InputTypes;
  validationTypes: ValidationTypes;
  heightType?: InputHeightTypes;
  dataRef: RefObject<HTMLTextAreaElement>;
  placeholder?: string;
  required: boolean;
  lettersCount?: number;
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
      if (letterCount)
        return (
          <>
            <textarea
              onInput={() => {
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
              ref={props.dataRef}
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
              if (props.dataRef.current) {
                if (props.heightType == InputHeightTypes.Auto) {
                  props.dataRef.current.style.height = ``;
                  props.dataRef.current.style.height = props.dataRef.current.scrollHeight + 'px';
                }
              }
            }}
            rows={props.heightType == InputHeightTypes.Auto ? 1 : undefined}
            required={props.required}
            ref={props.dataRef}
            className={`input ${props.heightType}`}
          ></textarea>
        );
    }
    case InputTypes.Password:
    case InputTypes.TextField:
    case InputTypes.List:
    case InputTypes.ImageUploader:
      return (
        <div className="input-image-uploader">
          <input type="file" className="input-image-uploader__input" />
          <ImageUploaderIcon />
          <span>png,jpg</span>
        </div>
      );
  }
};
