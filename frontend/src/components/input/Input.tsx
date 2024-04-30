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
  mods: mod[];
}

type mod = {
  from: number;
  to: number;
  format: ModsTypes;
  size?: number;
};

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
        return (
          <span
            onInput={() => {
              if (editorRef.current) {
                const element = editorRef.current.querySelector(`#${elem.id}`) as HTMLElement;

                if (element) {
                  const value = replacer(element.innerHTML);

                  setEditor(editorEditSymbols(editor, cursor, value, elem.id));
                  const countbefore = (elem.value.match(/\n/g) || []).length;
                  const countnow = (value.match(/\n/g) || []).length;
                  if (window.getSelection) {
                    const sel = window.getSelection();
                    if (sel)
                      if (sel.rangeCount) {
                        const range = sel.getRangeAt(0);
                        if (
                          range.commonAncestorContainer.parentElement &&
                          (range.commonAncestorContainer.parentElement.classList.contains(
                            'content-editable-area__elem',
                          ) ||
                            range.commonAncestorContainer.parentElement.tagName == 'B')
                        ) {
                          const rang = getCursorPosInNode(element).end;
                          if (countbefore == countnow)
                            setCursor({ from: rang, to: rang, elemid: element.id });
                          else if (countnow > countbefore)
                            setCursor({ from: cursor.from + 1, to: cursor.from + 1, elemid: element.id });
                          else setCursor({ from: rang, to: rang, elemid: element.id });
                        }
                      }
                  }
                  element.innerHTML = '';
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
          const elem = editorRef.current?.querySelector(`#${el.id}`);
          if (el.type == ContentTypes.Text) {
            const text = innertextTransform(el);
            if (elem) elem.innerHTML = text;
          }
        });
        const elem = editorRef.current.querySelector(`#${cursor.elemid}`);
        if (elem) {
          const range = document.createRange();
          const sel = window.getSelection();
          if (elem.childNodes[0]) {
            let i = 0;
            let node = elem.childNodes[0];
            let from = cursor.from;
            let len;
            if (node.textContent) len = node.textContent.length;
            else if (node.innerText) len = node.innerText.length;
            while (from > len) {
              from = from - len;
              i++;
              node = elem.childNodes[i];
              if (node.textContent) len = node.textContent.length;
              else if (node.innerText) len = node.innerText.length;
            }
            if (node.nodeName == '#text') {
              range.setStart(node, from);
            } else if (node.nodeName == 'B') {
              if (node.childNodes[0]) range.setStart(node.childNodes[0], from);
              else range.setStart(elem.childNodes[0], 0);
            }
          }
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
        if (
          selection.anchorNode.parentElement.classList.contains('content-editable-area__elem') ||
          selection.anchorNode.parentElement.tagName == 'B'
        ) {
          let parentNode = getParent(selection);
          parentNode = parentNode ? parentNode : selection?.anchorNode?.parentElement;
          const cursor = getCursorPosInNode(parentNode);
          const selectedElemid = parentNode.id;
          setCursor({
            from: cursor.start,
            to: cursor.end,
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
            setEditor(setBolderContent(editor, cursor));
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

const replacer = (value: string) => {
  return value
    .replaceAll('<br>', '\n')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('<b>', '')
    .replaceAll('</b>', '');
};

const innertextTransform = (el: TextType) => {
  let text = el.value;
  let diff = 0;
  const elModsSorted = [...el.mods];
  elModsSorted.sort((el1, el2) => {
    if (el1.from > el2.from && el1.to > el2.to) return 1;
    if (el1.from < el2.from && el1.to < el2.to) return -1;
    if (el1.from < el2.from && el1.to > el2.to) return 0;
    return 0;
  });
  console.log(elModsSorted);
  elModsSorted.forEach(el1 => {
    if (el1.format == ModsTypes.Bold)
      text =
        text.slice(0, el1.from + diff) +
        '<b>' +
        text.slice(el1.from + diff, el1.to + diff) +
        '</b>' +
        text.slice(el1.to + diff, text.length);
    diff = diff + 7;
  });
  return text;
};

const getCursorPosInNode = (element: HTMLElement) => {
  let caretOffset = 0;
  let caretStart = 0;
  const doc = element.ownerDocument;
  const win = doc.defaultView;
  let sel;
  if (doc && win)
    if (win.getSelection()) {
      sel = win.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        const startrange = preCaretRange.cloneRange();
        startrange.setStart(range.startContainer, range.startOffset);
        caretOffset = preCaretRange.toString().length;
        caretStart = preCaretRange.toString().length - startrange.toString().length;
      }
    }
  return {
    start: caretStart,
    end: caretOffset,
  };
};

const getParent = (selection: globalThis.Selection) => {
  let parentNode;
  if (selection.anchorNode && selection.anchorNode.parentElement) {
    parentNode = selection.anchorNode.parentElement;
    if (
      selection.anchorNode.parentElement.tagName == 'B' &&
      selection.anchorNode.parentElement.parentElement
    ) {
      parentNode = selection.anchorNode.parentElement.parentElement;
    }
  }
  return parentNode;
};

const editorEditSymbols = (editor: Editor, cursor: Selection, value: string, elemid: string) => {
  return {
    ...editor,
    content: editor.content.map(el => {
      if (el.id == elemid) {
        if (el.type == ContentTypes.Text) {
          const valuediff = value.length - el.value.length;
          const mods: mod[] = [];
          el.mods.forEach(mod => {
            if (mod.from - mod.to < 0 && mod.from < el.value.length && mod.to <= el.value.length)
              if (cursor.from < mod.from && cursor.to < mod.from) {
                mods.push({ ...mod, from: mod.from + valuediff, to: mod.to + valuediff });
              } else if (cursor.from > mod.from && cursor.to <= mod.to) {
                mods.push({ ...mod, to: mod.to + valuediff });
              } else mods.push({ ...mod });
          });
          console.log(mods, el.mods);
          return { ...el, value: value, mods: mods };
        }
        return { ...el };
      }
      return { ...el };
    }),
  };
};

const setBolderContent = (editor: Editor, cursor: Selection) => {
  return {
    ...editor,
    content: editor.content.map(el => {
      if (el.id == cursor.elemid && el.type == ContentTypes.Text) {
        el.mods.push({
          format: ModsTypes.Bold,
          from: cursor.from,
          to: cursor.to,
        });
        const mods: mod[] = checkMods(el.mods);
        return {
          ...el,
          mods: mods,
        };
      }
      return { ...el };
    }),
  };
};

const checkMods = (mods: mod[]) => {
  const modscopy: mod[] = [...mods];
  console.log(modscopy);
  for (let i = 0; i < modscopy.length; i++) {
    const mod = { ...modscopy[i] };
    for (let j = 0; j < modscopy.length; j++) {
      console.log(i, [...modscopy]);
      const modNow = { ...modscopy[j] };
      if (j !== i && mod.format == modNow.format) {
        if (mod.from <= modNow.from && mod.to >= modNow.to) {
          modscopy.splice(j, 1);
          i = 0;
        } else if (mod.from >= modNow.from && mod.to <= modNow.to) {
          modscopy.splice(i, 1);
          i = 0;
        } else if (mod.from <= modNow.from && mod.to <= modNow.to && mod.to >= modNow.from) {
          modscopy.splice(j, 1);
          modscopy.splice(i, 1, { format: mod.format, from: mod.from, to: modNow.to });
          i = 0;
        } else if (mod.from >= modNow.from && mod.to >= modNow.to && modNow.to >= mod.from) {
          modscopy.splice(j, 1);
          modscopy.splice(i, 1, { format: mod.format, from: modNow.from, to: mod.to });
          i = 0;
        } else if (mod.to == modNow.from) {
          modscopy.splice(j, 1);
          modscopy.splice(i, 1, { format: mod.format, from: mod.from, to: modNow.to });
          i = 0;
        } else if (mod.from == modNow.to) {
          modscopy.splice(j, 1);
          modscopy.splice(i, 1, { format: mod.format, from: modNow.from, to: mod.to });
          i = 0;
        }
      }
    }
  }
  console.log(modscopy);
  return modscopy;
};
