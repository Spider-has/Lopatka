import { RefObject, useEffect, useRef, useState } from 'react';
import './Input.scss';
import {
  BolderTextIcon,
  CursiveTextIcon,
  ImageUploaderIcon,
  SmallMinusIcon,
  SmallPlusIcon,
} from '../../icons/Icons';

export enum InputTypes {
  Text = 'Text',
  Password = 'Password',
  TextField = 'TextField',
  List = 'List',
  ImageUploader = 'ImageUploader',
  Submit = 'Submit',
  Editor = 'Editor',
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
    case InputTypes.Editor:
      return <RichTextEditor {...props} />;
  }
};

enum ContentTypes {
  Text = 'Text',
  Image = 'Image',
}

enum ModsTypes {
  Bold = 'bold',
  Cursive = 'cursive',
  textSize = 'textSize',
}

interface EditorElem {
  type: ContentTypes;
  id: string;
}

interface TextType extends EditorElem {
  type: ContentTypes.Text;
  value: string;
  mods: { from: number; to: number; format: ModsTypes; size?: number }[];
}

interface ImageType extends EditorElem {
  type: ContentTypes.Image;
  href: string;
}

type contentTypes = TextType | ImageType;

type Editor = {
  content: contentTypes[];
};

type Selection = {
  from: number;
  to: number;
  elemid: string;
};

const RichTextEditor = (props: InputProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Editor>({
    content: [
      {
        type: ContentTypes.Text,
        value: '',
        mods: [],
        id: 'el-0',
      },
    ],
  });
  const [cursor, setCursor] = useState<Selection>({
    from: -1,
    to: -1,
    elemid: 'el--1',
  });

  const elems = editor.content.map((elem, i) => {
    switch (elem.type) {
      case ContentTypes.Text: {
        let text = <>{elem.value}</>;
        let diff = 0;
        elem.mods.forEach(el => {
          if (el.format == ModsTypes.Bold)
            text = (
              <>
                {elem.value.slice(0, el.from + diff)}
                <b>{elem.value.slice(el.from + diff, el.to + diff)}</b>
                {elem.value.slice(el.to + diff, elem.value.length)}
              </>
            );
          diff = diff + 13;
        });
        console.log(text);
        return (
          <span
            onInput={() => {
              if (editorRef.current) {
                const element = editorRef.current.querySelector(`#${elem.id}`);

                if (element) {
                  const value = element.innerHTML
                    .replaceAll('<br>', '\n')
                    .replaceAll('&nbsp;', ' ')
                    .replaceAll('<b>', '')
                    .replaceAll('</b>', '');
                  console.log(value.length);

                  setEditor({
                    ...editor,
                    content: editor.content.map(el => {
                      if (el.id == elem.id) return { ...el, value: value };
                      return { ...el };
                    }),
                  });
                  console.log(editor);
                  const countbefore = (elem.value.match(/\n/g) || []).length;
                  const countnow = (value.match(/\n/g) || []).length;

                  if (window.getSelection) {
                    const sel = window.getSelection();
                    if (sel)
                      if (sel.rangeCount) {
                        const range = sel.getRangeAt(0);
                        if (
                          range.commonAncestorContainer.parentElement &&
                          range.commonAncestorContainer.parentElement.classList.contains(
                            'content-editable-area__elem',
                          )
                        ) {
                          const rang =
                            range.endOffset > element.innerHTML.length - 1
                              ? element.innerHTML.length - 1
                              : range.endOffset;
                          if (countbefore == countnow)
                            setCursor({ from: rang, to: rang, elemid: element.id });
                          else if (countnow > countbefore)
                            setCursor({ from: cursor.from + 1, to: cursor.from + 1, elemid: element.id });
                          else setCursor({ from: rang, to: rang, elemid: element.id });
                        }
                      }
                  }
                  element.textContent = '';
                }
              }
            }}
            key={i}
            id={elem.id}
            className="content-editable-area__elem"
            contentEditable={true}
            suppressContentEditableWarning={true}
          ></span>
        );
      }
      case ContentTypes.Image:
        return <img id={elem.id} src={elem.href} />;
    }
  });

  useEffect(() => {
    if (cursor.elemid) {
      if (editorRef.current) {
        editor.content.forEach(el => {
          const elem = editorRef!.current!.querySelector(`#${el.id}`);
          if (el.type == ContentTypes.Text) {
            let text = el.value;
            let diff = 0;
            el.mods.forEach(el1 => {
              if (el1.format == ModsTypes.Bold)
                text =
                  el.value.slice(0, el1.from + diff) +
                  '<b>' +
                  el.value.slice(el1.from + diff, el1.to + diff) +
                  '</b>' +
                  el.value.slice(el1.to + diff, el.value.length);
              diff = diff + 7;
            });
            if (elem) elem.innerHTML = text;
          }
        });
        const elem = editorRef.current.querySelector(`#${cursor.elemid}`);
        if (elem) {
          const value = elem.innerHTML;
          const range = document.createRange();
          const sel = window.getSelection();
          const pos = cursor.from >= 0 ? (cursor.from > value.length ? value.length : cursor.from) : 0;

          if (elem.childNodes[0]) range.setStart(elem.childNodes[0], pos);
          range.collapse(true);
          if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    document.onselectionchange = () => {
      const selection = document.getSelection();
      if (selection?.anchorNode?.parentElement) {
        if (selection.anchorNode.parentElement.classList.contains('content-editable-area__elem')) {
          const selectedElemid = selection.anchorNode?.parentElement.id;
          const fromPos = selection.anchorOffset;
          const toPos = selection.focusOffset;
          setCursor({
            from: fromPos,
            to: toPos,
            elemid: selectedElemid,
          });
        }
      }
    };
  }, []);

  return (
    <div>
      <div>
        <SmallMinusIcon />
        <SmallPlusIcon />
        <div
          onClick={() => {
            console.log(cursor);
            setEditor({
              ...editor,
              content: editor.content.map(el => {
                if (el.id == cursor.elemid && el.type == ContentTypes.Text) {
                  return {
                    ...el,
                    mods: [
                      ...el.mods,
                      {
                        from: cursor.from,
                        to: cursor.to,
                        format: ModsTypes.Bold,
                      },
                    ],
                  };
                }
                return { ...el };
              }),
            });
          }}
        >
          <BolderTextIcon />
        </div>
        <div>
          <CursiveTextIcon />
        </div>
      </div>
      <div className={`input input_editor ${props.heightType}`} ref={editorRef}>
        <div className="content-editable-area">
          {elems}
          <span className="content-editable-area__image-tip">Нажмите Tab для вставки фото</span>
        </div>
      </div>
    </div>
  );
};
