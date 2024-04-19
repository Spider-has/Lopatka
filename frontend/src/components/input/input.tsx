import { RefObject } from "react"
import "./input.scss"
export enum InputTypes {
    Text = "Text",
    Password = "Password",
    TextField = "TextField",
    List = "List",
    ImageUploader = "ImageUploader",
    Submit = "Submit"
}


export enum ValidationTypes {
    Normal = "Normal"
}


export type InputProps = {
    type: InputTypes,
    validationTypes: ValidationTypes,
    dataRef: RefObject<HTMLInputElement> | null,
    placeholder?: string,
    required: boolean,
}

export const InputField = (props: InputProps) => {
    switch (props.type) {
        case InputTypes.Text:
            switch (props.validationTypes) {
                case ValidationTypes.Normal:
                    break;
            }
            return (
                <input required={props.required} ref={props.dataRef} type="text" className="input" />
            )
        case InputTypes.Password:
        case InputTypes.TextField:
        case InputTypes.List:
        case InputTypes.ImageUploader:
    }
}