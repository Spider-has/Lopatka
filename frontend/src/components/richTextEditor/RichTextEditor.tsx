import { useEffect, useRef, useState } from 'react';
import { InputProps, ValidationTypes } from '../input/Input';
import './RichTextEditor.scss';
import {
  BolderTextIcon,
  CLoseIcon,
  CursiveTextIcon,
  ImageUploaderIcon,
  SmallMinusIcon,
  SmallPlusIcon,
} from '../../icons/Icons';
import { ImgNameLen, generateImgName, serverImageUrl } from '../../utils/utils';

export enum ContentTypes {
  Text = 'Text',
  Image = 'Image',
}

export enum ModsTypes {
  Bold = 'bold',
  Cursive = 'cursive',
  TextSize = 'textSize',
}

interface EditorElem {
  type: ContentTypes;
  id: string;
}

export interface TextType extends EditorElem {
  type: ContentTypes.Text;
  value: string;
  mods: mod[];
}

export type mod = {
  from: number;
  to: number;
  formats: ModsTypes[];
  size?: number;
};

export interface ImageType extends EditorElem {
  type: ContentTypes.Image;
  href: string;
  name: string;
}

type contentTypes = TextType | ImageType;

export type Editor = {
  count: number;
  content: contentTypes[];
};

type Selection = {
  from: number;
  to: number;
  elemid: string;
};

export const RichTextEditor = (props: InputProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorData, setEditor] = useState<Editor>({
    count: 1,
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
  const [fontSize, setFontSize] = useState<number>(20);
  const sizeRef = useRef<HTMLInputElement>(null);
  const ValidMod = props.validationTypes == ValidationTypes.NoneValid ? 'input_error' : '';
  const ValidText =
    props.validationTypes == ValidationTypes.NoneValid ? 'content-editable-area__image-tip_error' : '';

  const [hoverMinusFont, setHoverMinusFont] = useState(false);
  const [hoverFont, setHoverFont] = useState(false);
  const [hoverPlusFont, setHoverPlusFont] = useState(false);
  const [hoverBolderButton, setHoverBolderButton] = useState(false);
  const [hoverCursiveButton, setHoverCursiveButton] = useState(false);

  useEffect(() => {
    if (props.loaded && props.EditorData) setEditor(props.EditorData);
  }, [props.loaded]);

  const elems = editorData.content.map((elem, i) => {
    switch (elem.type) {
      case ContentTypes.Text: {
        return (
          <span
            onKeyDown={event => {
              if (event.key === 'Backspace') {
                if (editorRef.current) {
                  const element = editorRef.current.querySelector(`#${elem.id}`) as HTMLElement;
                  if (element) {
                    if (element.textContent === '' && elem.id !== 'el-0') {
                      setEditor(removeElem(editorData, elem.id));
                    }
                  }
                }
              }
            }}
            onInput={() => {
              if (editorRef.current) {
                const element = editorRef.current.querySelector(`#${elem.id}`) as HTMLElement;

                if (element) {
                  const value = replacer(element.innerHTML);

                  setEditor(editorEditSymbols(editorData, cursor, value, elem.id));
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
                            tagNameCheck(range.commonAncestorContainer.parentElement.tagName))
                        ) {
                          const rang = getCursorPosInNode(element).end;
                          if (countbefore == countnow)
                            setCursor({
                              from: rang,
                              to: rang,
                              elemid: element.id,
                            });
                          else if (countnow > countbefore)
                            setCursor({
                              from: cursor.from + 1,
                              to: cursor.from + 1,
                              elemid: element.id,
                            });
                          else
                            setCursor({
                              from: rang,
                              to: rang,
                              elemid: element.id,
                            });
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
        if (elem.href)
          return (
            <div key={i} className="content-editable-area__input-image-wrapper">
              <img className="content-editable-area__input-image" id={elem.id} src={elem.href} />
              <div
                className="content-editable-area__delete-image-button"
                onClick={() => {
                  setEditor(removeElem(editorData, elem.id));
                }}
              >
                <CLoseIcon />
              </div>
            </div>
          );
        else {
          return (
            <div key={i} className="content-editable-area__input-image-uploader-wrapper">
              <label className="content-editable-area__input-image-uploader">
                <input
                  id={elem.id}
                  onChange={() => {
                    if (editorRef.current) {
                      const inp = editorRef.current.querySelector(`#${elem.id}`) as HTMLInputElement;
                      if (inp && inp.files && inp.files[0]) {
                        const reader = new FileReader();

                        reader.onload = event => {
                          if (event.target && event.target.result) {
                            const href = event.target.result as string;
                            inp.src = href;

                            setEditor(setHref(editorData, href, elem.id));
                          }
                        };

                        reader.readAsDataURL(inp.files[0]);
                      }
                    }
                  }}
                  type="file"
                  className="input-image-uploader__input"
                  accept="image/png, image/jpeg, image/gif"
                />
                <ImageUploaderIcon />
                <div className="content-editable-area__input-image-description">
                  <span>желательно ширина 720px</span>
                  <span>png, jpg, gif</span>
                </div>
              </label>
              <div
                className="content-editable-area__delete-image-button"
                onClick={() => {
                  setEditor(removeElem(editorData, elem.id));
                }}
              >
                <CLoseIcon />
              </div>
            </div>
          );
        }
    }
  });

  useEffect(() => {
    if (props.setEditor) props.setEditor(editorData);
    if (cursor.elemid) {
      if (editorRef.current) {
        editorData.content.forEach(el => {
          const elem = editorRef.current?.querySelector(`#${el.id}`);
          if (el.type == ContentTypes.Text) {
            const text = innertextTransform(el);
            if (elem) {
              elem.innerHTML = text;
            }
          }
        });
        const elem = editorRef.current.querySelector(`#${cursor.elemid}`);
        if (elem) {
          const range = document.createRange();
          const sel = window.getSelection();
          if (elem.childNodes[0]) {
            const { node, from } = getCursorIntoNode(elem, cursor.from);

            if (node && node.nodeName)
              if (node.nodeName == '#text') {
                range.setStart(node, from);
              } else if (tagNameCheck(node.nodeName)) {
                if (node.childNodes[0]) range.setStart(node.childNodes[0], from);
                else range.setStart(elem.childNodes[0], 0);
              }
            if (cursor.from != cursor.to) {
              const { node, from } = getCursorIntoNode(elem, cursor.to);
              if (node && node.nodeName)
                if (node.nodeName == '#text' && node.textContent?.length && node.textContent?.length > from) {
                  range.setEnd(node, from);
                } else if (tagNameCheck(node.nodeName)) {
                  if (node.childNodes[0 && node.textContent?.length && node.textContent?.length > from])
                    range.setEnd(node.childNodes[0], from);
                  else range.setEnd(elem.childNodes[0], 0);
                }
            }
            if (sel) {
              sel.removeAllRanges();
              sel.addRange(range);
            }
          }
        }
      }
    }
  }, [editorData]);

  useEffect(() => {
    document.onselectionchange = () => {
      const selection = document.getSelection();

      if (selection?.anchorNode?.parentElement) {
        if (
          selection.anchorNode.parentElement.classList.contains('content-editable-area__elem') ||
          tagNameCheck(selection.anchorNode.parentElement.tagName)
        ) {
          if (selection.focusNode?.parentElement) {
            const style = window
              .getComputedStyle(selection.focusNode.parentElement, null)
              .getPropertyValue('font-size');
            const fontSize = parseFloat(style);
            if (fontSize) setFontSize(Number(fontSize));
          }
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

  useEffect(() => {
    const keysBind = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === 'b' || event.key === 'B' || event.key === 'и')) {
        event.preventDefault();
        setEditor(setModificatedContent(editorData, cursor, ModsTypes.Bold));
        document.removeEventListener('keydown', keysBind);
      } else if (event.ctrlKey && (event.key === 'i' || event.key === 'I' || event.key === 'ш')) {
        event.preventDefault();
        setEditor(setModificatedContent(editorData, cursor, ModsTypes.Cursive));
        document.removeEventListener('keydown', keysBind);
      } else if (
        event.ctrlKey &&
        event.shiftKey &&
        (event.key === ',' || event.key === '<' || event.key === 'Б')
      ) {
        event.preventDefault();
        setEditor(setModificatedContent(editorData, cursor, ModsTypes.TextSize, fontSize - 1));
        document.removeEventListener('keydown', keysBind);
      } else if (
        event.ctrlKey &&
        event.shiftKey &&
        (event.key === '.' || event.key === '>' || event.key === 'Ю')
      ) {
        event.preventDefault();
        setEditor(setModificatedContent(editorData, cursor, ModsTypes.TextSize, fontSize + 1));
        document.removeEventListener('keydown', keysBind);
      } else if (event.key == 'Tab') {
        event.preventDefault();
        setEditor(addImageInEditor(editorData));
      }
    };
    document.addEventListener('keydown', keysBind);
    return () => {
      document.removeEventListener('keydown', keysBind);
    };
  }, [editorData, cursor, fontSize]);

  return (
    <div className="content-editor-wrapper">
      <div className="content-editor-wrapper__buttons-area">
        <div className="content-editor-wrapper__font-size-button">
          <div
            onClick={() => {
              if (cursor.to - cursor.from > 0) {
                setEditor(setModificatedContent(editorData, cursor, ModsTypes.TextSize, fontSize - 1));
              }
              setFontSize(fontSize - 1);
            }}
            onMouseOver={() => {
              setHoverMinusFont(true);
            }}
            onMouseOut={() => {
              setHoverMinusFont(false);
            }}
            className="content-editor-wrapper__font-size-icon-wrapper"
          >
            <SmallMinusIcon />
            <HintMessage
              text={'Уменьшить размер шрифта'}
              bolderText={'Ctrl + Shift + ,'}
              show={hoverMinusFont}
            />
          </div>
          <div
            className="content-editor-wrapper__font-size-input-container"
            onMouseOver={() => {
              setHoverFont(true);
            }}
            onMouseOut={() => {
              setHoverFont(false);
            }}
          >
            <input
              ref={sizeRef}
              onChange={() => {
                if (sizeRef.current) {
                  if (sizeRef.current.value != '0' && Number(sizeRef.current.value) <= 400) {
                    setFontSize(Number(sizeRef.current.value));
                  }
                }
              }}
              onBlur={() => {
                setEditor(setModificatedContent(editorData, cursor, ModsTypes.TextSize, fontSize + 1));
              }}
              type="number"
              placeholder="15"
              value={fontSize ? fontSize : ''}
            />
            <HintMessage text={'Размер шрифта'} show={hoverFont} />
          </div>
          <div
            onMouseOver={() => {
              setHoverPlusFont(true);
            }}
            onMouseOut={() => {
              setHoverPlusFont(false);
            }}
            onClick={() => {
              if (cursor.to - cursor.from > 0) {
                setEditor(setModificatedContent(editorData, cursor, ModsTypes.TextSize, fontSize + 1));
              }
              setFontSize(fontSize + 1);
            }}
            className="content-editor-wrapper__font-size-icon-wrapper"
          >
            <SmallPlusIcon />
            <HintMessage
              text={'Увеличить размер шрифта'}
              bolderText={'Ctrl + Shift + .'}
              show={hoverPlusFont}
            />
          </div>
        </div>
        <div
          className="content-editor-wrapper__button"
          onClick={() => {
            setEditor(setModificatedContent(editorData, cursor, ModsTypes.Bold));
          }}
          onMouseOver={() => {
            setHoverBolderButton(true);
          }}
          onMouseOut={() => {
            setHoverBolderButton(false);
          }}
        >
          <BolderTextIcon />
          <HintMessage text={'Полужирный '} bolderText={'Ctrl + B'} show={hoverBolderButton} />
        </div>
        <div
          className="content-editor-wrapper__button"
          onClick={() => {
            setEditor(setModificatedContent(editorData, cursor, ModsTypes.Cursive));
          }}
          onMouseOver={() => {
            setHoverCursiveButton(true);
          }}
          onMouseOut={() => {
            setHoverCursiveButton(false);
          }}
        >
          <CursiveTextIcon />
          <HintMessage text={'Курсив'} bolderText={'Ctrl + I'} show={hoverCursiveButton} />
        </div>
      </div>
      <div className={`input input_editor ${props.heightType} editor-area ${ValidMod}`} ref={editorRef}>
        <div className="editor-area__wrapper">
          <div className="content-editable-area">
            {elems}
            <span className={`content-editable-area__image-tip ${ValidText}`}>
              Нажмите Tab для вставки фото
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HintMessage = (props: hintProps) => {
  const hintRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hintRef.current) {
      if (props.show) hintRef.current.classList.add('hint-message_opened');
      else hintRef.current.classList.remove('hint-message_opened');
    }
  }, [props.show]);
  useEffect(() => {
    if (hintRef.current) {
      const width = hintRef.current.offsetWidth;
      hintRef.current.style.right = -width / 2 + 12 + 'px';
    }
  }, []);
  return (
    <div ref={hintRef} className="hint-message">
      {props.text != undefined && <span className="hint-message__text">{props.text}</span>}
      {props.bolderText != undefined && (
        <span className="hint-message__text hint-message__text_bolder">{props.bolderText}</span>
      )}
    </div>
  );
};

const setHref = (editor: Editor, href: string, id: string): Editor => {
  return {
    ...editor,
    content: editor.content.map(el => {
      if (el.id === id && el.type === ContentTypes.Image) {
        return { ...el, href: href };
      }
      return el;
    }),
  };
};
const removeElem = (editor: Editor, id: string): Editor => {
  const editorContentCopy: contentTypes[] = [];
  editor.content.forEach(el => {
    if (!(el.id === id)) editorContentCopy.push(el);
  });
  return {
    ...editor,
    content: editorContentCopy,
  };
};

const addImageInEditor = (editor: Editor): Editor => {
  const oldCount = editor.count;
  return {
    ...editor,
    count: editor.count + 2,
    content: [
      ...editor.content,
      { type: ContentTypes.Image, href: '', id: `el-${oldCount}`, name: generateImgName(ImgNameLen) },
      { type: ContentTypes.Text, id: `el-${oldCount + 1}`, value: '', mods: [] },
    ],
  };
};

const getCursorIntoNode = (elem: Element, cursorPos: number) => {
  let i = 0;
  let node = elem.childNodes[0] as HTMLElement;
  let from = cursorPos;
  let len = 0;
  if (node) {
    if (node.textContent) len = node.textContent.length;
    else if (node.innerText) len = node.innerText.length;
    while (from > len && i < elem.childNodes.length) {
      from = from - len;
      i++;
      node = elem.childNodes[i] as HTMLElement;
      if (node) {
        if (node.textContent) len = node.textContent.length;
        else if (node.innerText) len = node.innerText.length;
      } else {
        from = 0;
        break;
      }
    }
  }
  return { node: node, from: from };
};

const replacer = (value: string) => {
  return value
    .replaceAll('<br>', '\n')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('<b>', '')
    .replaceAll('</b>', '')
    .replaceAll('<c>', '')
    .replaceAll('</c>', '')
    .replaceAll('<bc>', '')
    .replaceAll('</bc>', '')
    .replaceAll(/<.*?f.*?>/g, '')
    .replaceAll(/<\/.*?f.*?>/g, '');
};

// <b> -- bold
// <c> -- cursive
// <f(num)> -- fontSize
// <bc> -- bold&cursive
// <bf(num)> -- bold&fontSize
// <cf(num)> -- cursive&fontSize
// <bcf(num)> -- bold&cursive&fontSize

const TagNameList = ['B', 'C', 'BC', 'CF', 'BF', 'BCF', 'F'];

const tagNameCheck = (str: string) => {
  return TagNameList.includes(str.replaceAll(/[0-9]/g, ''));
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
  elModsSorted.forEach(el1 => {
    const { openedTag, closedTag } = tagConvertor(el1);
    text =
      text.slice(0, el1.from + diff) +
      openedTag +
      text.slice(el1.from + diff, el1.to + diff) +
      closedTag +
      text.slice(el1.to + diff, text.length);
    diff = diff + openedTag.length + closedTag.length;
  });
  return text;
};

export const getParsedContentIntoBD = (editor: Editor) => {
  let content = '';
  editor.content.forEach(contentEl => {
    let Text = '';
    if (contentEl.type == ContentTypes.Image) {
      Text = `<img id="${contentEl.id}" src="${serverImageUrl + contentEl.name}"/>`;
    } else {
      if (contentEl.value.length > 0)
        Text = `<span id="${contentEl.id}">${innertextTransform(contentEl)}</span>`;
    }
    content = content + Text;
  });
  return content;
};

const tagConvertor = (el: mod) => {
  let openedtag = '';
  let closedtag = '';
  const fontSize = `style="font-size:${el.size}px;"`;
  if (
    el.formats.includes(ModsTypes.Bold) &&
    el.formats.includes(ModsTypes.Cursive) &&
    el.formats.includes(ModsTypes.TextSize)
  ) {
    openedtag = `<bcf ${fontSize}>`;
    closedtag = `</bcf ${fontSize}>`;
  } else if (el.formats.includes(ModsTypes.Bold) && el.formats.includes(ModsTypes.Cursive)) {
    openedtag = '<bc>';
    closedtag = '</bc>';
  } else if (el.formats.includes(ModsTypes.Bold) && el.formats.includes(ModsTypes.TextSize)) {
    openedtag = `<bf ${fontSize}>`;
    closedtag = `</bf ${fontSize}>`;
  } else if (el.formats.includes(ModsTypes.Bold)) {
    openedtag = '<b>';
    closedtag = '</b>';
  } else if (el.formats.includes(ModsTypes.Cursive) && el.formats.includes(ModsTypes.TextSize)) {
    openedtag = `<cf ${fontSize}>`;
    closedtag = `</cf ${fontSize}>`;
  } else if (el.formats.includes(ModsTypes.Cursive)) {
    openedtag = '<c>';
    closedtag = '</c>';
  } else if (el.formats.includes(ModsTypes.TextSize)) {
    openedtag = `<f ${fontSize}>`;
    closedtag = `</f ${fontSize}>`;
  }
  return { openedTag: openedtag, closedTag: closedtag };
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
      tagNameCheck(selection.anchorNode.parentElement.tagName) &&
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
          let mods: mod[] = [];
          el.mods.forEach(mod => {
            if (
              mod.from - mod.to < 0 &&
              mod.from < el.value.length &&
              mod.to <= el.value.length &&
              mod.from >= 0 &&
              mod.to >= 0
            )
              if (cursor.from <= mod.from && cursor.to <= mod.from) {
                mods.push({ ...mod, from: mod.from + valuediff, to: mod.to + valuediff });
              } else if (cursor.from < mod.from && cursor.to >= mod.from && cursor.to < mod.to) {
                mods.push({
                  ...mod,
                  from: mod.from + valuediff + (cursor.to - mod.from),
                  to: mod.to + valuediff,
                });
              } else if (cursor.from > mod.from && cursor.to >= mod.to && cursor.from < mod.to) {
                mods.push({
                  ...mod,
                  to: mod.to - (mod.to - cursor.from),
                });
              } else if (cursor.from > mod.from && cursor.to <= mod.to) {
                mods.push({ ...mod, to: mod.to + valuediff });
              } else if (!(cursor.from <= mod.from && cursor.to >= mod.to)) {
                mods.push({ ...mod });
              }
          });
          mods = getCheckedMods(mods);
          return { ...el, value: value, mods: mods };
        }
        return { ...el };
      }
      return { ...el };
    }),
  };
};

const setModificatedContent = (
  editor: Editor,
  cursor: Selection,
  modification: ModsTypes,
  fontSize?: number,
) => {
  return {
    ...editor,
    content: editor.content.map(el => {
      if (el.id == cursor.elemid && el.type == ContentTypes.Text) {
        const newMod: mod = {
          formats: [modification],
          from: cursor.from,
          to: cursor.to,
          size: fontSize,
        };
        let mods = checkElemForModText(el.mods, newMod);
        mods = getCheckedMods(mods);

        return {
          ...el,
          mods: mods,
        };
      }
      return { ...el };
    }),
  };
};

const getCheckedMods = (mods: mod[]) => {
  const modscopy: mod[] = [...mods];

  for (let i = 0; i < modscopy.length; i++) {
    const mod = { ...modscopy[i] };
    for (let j = 0; j < modscopy.length; j++) {
      const modNow = { ...modscopy[j] };
      if (j !== i && formatsCompare(modNow.formats, mod.formats)) {
        const size = mod.size ? mod.size : modNow.size;
        if (mod.from <= modNow.from && mod.to >= modNow.to) {
          modscopy.splice(j, 1);
          i = 0;
          break;
        } else if (mod.from >= modNow.from && mod.to <= modNow.to) {
          modscopy.splice(i, 1);
          i = 0;
          break;
        } else if (mod.from <= modNow.from && mod.to <= modNow.to && mod.to > modNow.from) {
          modscopy.splice(j, 1);
          modscopy.splice(i, 1, {
            formats: mod.formats,
            from: mod.from,
            to: modNow.to,
            size: size,
          });
          i = 0;
          break;
        } else if (mod.from >= modNow.from && mod.to >= modNow.to && modNow.to > mod.from) {
          modscopy.splice(j, 1);
          modscopy.splice(i, 1, {
            formats: mod.formats,
            from: modNow.from,
            to: mod.to,
            size: size,
          });
          i = 0;
          break;
        }
      } else if (j !== i && !formatsCompare(modNow.formats, mod.formats)) {
        const modSize = mod.size ? mod.size : modNow.size;
        const modNowSize = modNow.size ? modNow.size : mod.size;
        if (mod.from > modNow.from && mod.to > modNow.to && mod.from < modNow.to) {
          const k = i > j ? i : j;
          const n = i > j ? j : i;
          modscopy.splice(k, 1);
          const mergeFormats = FormatMerger(mod.formats, modNow.formats);
          modscopy.splice(
            n,
            1,
            { formats: modNow.formats, from: modNow.from, to: mod.from, size: modNowSize },
            { formats: mergeFormats, from: mod.from, to: modNow.to, size: modSize },
            { formats: mod.formats, from: modNow.to, to: mod.to, size: modSize },
          );
          i = 0;
          break;
        } else if (mod.from < modNow.from && mod.to > modNow.to) {
          const k = i > j ? i : j;
          const n = i > j ? j : i;
          modscopy.splice(k, 1);
          const mergeFormats = FormatMerger(mod.formats, modNow.formats);
          modscopy.splice(
            n,
            1,
            { formats: mod.formats, from: mod.from, to: modNow.from, size: modSize },
            { formats: mergeFormats, from: modNow.from, to: modNow.to, size: modNowSize },
            { formats: mod.formats, from: modNow.to, to: mod.to, size: modSize },
          );
          i = 0;
          break;
        } else if (mod.from == modNow.from && mod.to == modNow.to) {
          const k = i > j ? i : j;
          const n = i > j ? j : i;
          modscopy.splice(k, 1);
          const mergeFormats = FormatMerger(mod.formats, modNow.formats);
          modscopy.splice(n, 1, {
            formats: mergeFormats,
            from: mod.from,
            to: mod.to,
            size: modSize,
          });
          i = 0;
          break;
        } else if (mod.from == modNow.from && mod.to < modNow.to) {
          const k = i > j ? i : j;
          const n = i > j ? j : i;
          modscopy.splice(k, 1);
          const mergeFormats = FormatMerger(mod.formats, modNow.formats);
          modscopy.splice(
            n,
            1,
            { formats: mergeFormats, from: mod.from, to: mod.to, size: modSize },
            { formats: modNow.formats, from: mod.to, to: modNow.to, size: modNowSize },
          );
          i = 0;
          break;
        } else if (mod.from > modNow.from && mod.to == modNow.to) {
          const k = i > j ? i : j;
          const n = i > j ? j : i;
          modscopy.splice(k, 1);
          const mergeFormats = FormatMerger(mod.formats, modNow.formats);
          modscopy.splice(
            n,
            1,
            { formats: modNow.formats, from: modNow.from, to: mod.from, size: modNowSize },
            { formats: mergeFormats, from: mod.from, to: modNow.to, size: modSize },
          );
          i = 0;
          break;
        }
      }
    }
  }
  return modscopy;
};

const checkElemForModText = (mods: mod[], newMod: mod) => {
  const modscopy = [...mods];
  let flag = true;
  if (newMod.from - newMod.to < 0) {
    for (let i = 0; i < modscopy.length; i++) {
      const modNow = { ...modscopy[i] };
      if (formatsCompare(modNow.formats, newMod.formats)) {
        if (modNow.formats.includes(ModsTypes.TextSize)) {
          if (modNow.from <= newMod.from && modNow.to >= newMod.to) {
            if (modNow.from < newMod.from && modNow.to > newMod.to) {
              modscopy.splice(
                i,
                1,
                {
                  formats: modNow.formats,
                  from: modNow.from,
                  to: newMod.from,
                  size: modNow.size,
                },
                {
                  formats: newMod.formats,
                  from: newMod.from,
                  to: newMod.to,
                  size: newMod.size,
                },
                {
                  formats: modNow.formats,
                  from: newMod.to,
                  to: modNow.to,
                  size: modNow.size,
                },
              );
            } else if (modNow.from == newMod.from && modNow.to != newMod.to) {
              modscopy.splice(
                i,
                1,
                {
                  formats: modNow.formats,
                  from: newMod.from,
                  to: newMod.to,
                  size: modNow.size,
                },
                {
                  formats: modNow.formats,
                  from: newMod.to,
                  to: modNow.to,
                  size: newMod.size,
                },
              );
            } else if (modNow.from != newMod.from && modNow.to == newMod.to) {
              modscopy.splice(
                i,
                1,
                {
                  formats: modNow.formats,
                  from: modNow.from,
                  to: newMod.from,
                  size: modNow.size,
                },
                {
                  formats: modNow.formats,
                  from: newMod.from,
                  to: newMod.to,
                  size: newMod.size,
                },
              );
            } else {
              modscopy.splice(i, 1, {
                formats: modNow.formats,
                from: newMod.from,
                to: newMod.to,
                size: newMod.size,
              });
            }
            flag = false;
          }
        } else if (modNow.from <= newMod.from && modNow.to >= newMod.to) {
          if (modNow.from != newMod.from && modNow.to != newMod.to) {
            modscopy.splice(
              i,
              1,
              { formats: modNow.formats, from: modNow.from, to: newMod.from },
              { formats: modNow.formats, from: newMod.to, to: modNow.to },
            );
          } else if (modNow.from == newMod.from && modNow.to != newMod.to) {
            modscopy.splice(i, 1, { formats: modNow.formats, from: modNow.to, to: newMod.to });
          } else if (modNow.from != newMod.from && modNow.to == newMod.to) {
            modscopy.splice(i, 1, {
              formats: modNow.formats,
              from: modNow.from,
              to: newMod.from,
            });
          } else {
            modscopy.splice(i, 1);
          }
          flag = false;
          i = i - 1;
        }
      } else if (newMod.formats.includes(ModsTypes.TextSize)) {
        if (modNow.from >= newMod.from && modNow.to <= newMod.to) {
          if (modNow.from > newMod.from && modNow.to < newMod.to) {
            const mergedFormats = FormatMerger(modNow.formats, newMod.formats);
            modscopy.splice(
              i,
              1,
              {
                formats: newMod.formats,
                from: newMod.from,
                to: modNow.from,
                size: newMod.size,
              },
              { formats: mergedFormats, from: modNow.from, to: modNow.to, size: newMod.size },
              { formats: newMod.formats, from: modNow.to, to: newMod.to, size: newMod.size },
            );
          } else if (modNow.from == newMod.from && modNow.to < newMod.to) {
            const mergedFormats = FormatMerger(modNow.formats, newMod.formats);
            modscopy.splice(
              i,
              1,
              { formats: mergedFormats, from: newMod.from, to: modNow.to, size: newMod.size },
              { formats: newMod.formats, from: modNow.to, to: newMod.to, size: newMod.size },
            );
          } else if (modNow.from > newMod.from && modNow.to == newMod.to) {
            const mergedFormats = FormatMerger(modNow.formats, newMod.formats);
            modscopy.splice(
              i,
              1,
              {
                formats: newMod.formats,
                from: newMod.from,
                to: modNow.from,
                size: newMod.size,
              },
              { formats: mergedFormats, from: modNow.from, to: newMod.to, size: newMod.size },
            );
          } else if (modNow.from == newMod.from && modNow.to == newMod.to) {
            const mergedFormats = FormatMerger(modNow.formats, newMod.formats);
            modscopy.splice(i, 1, {
              formats: mergedFormats,
              from: newMod.from,
              to: newMod.to,
              size: newMod.size,
            });
          }
          flag = false;
          break;
        }
      } else if (modNow.formats.includes(newMod.formats[0])) {
        if (modNow.from <= newMod.from && modNow.to >= newMod.to) {
          const newFormats = modNow.formats.toSpliced(modNow.formats.indexOf(newMod.formats[0]), 1);
          if (modNow.from < newMod.from && modNow.to > newMod.to) {
            modscopy.splice(
              i,
              1,
              {
                formats: modNow.formats,
                from: modNow.from,
                to: newMod.from,
                size: modNow.size,
              },
              { formats: newFormats, from: newMod.from, to: newMod.to, size: modNow.size },
              { formats: modNow.formats, from: newMod.to, to: modNow.to, size: modNow.size },
            );
          } else if (modNow.from == newMod.from && modNow.to != newMod.to) {
            modscopy.splice(
              i,
              1,
              { formats: newFormats, from: modNow.from, to: newMod.to, size: modNow.size },
              { formats: modNow.formats, from: newMod.to, to: modNow.to, size: modNow.size },
            );
          } else if (modNow.from != newMod.from && modNow.to == newMod.to) {
            modscopy.splice(
              i,
              1,
              {
                formats: modNow.formats,
                from: modNow.from,
                to: newMod.from,
                size: modNow.size,
              },
              { formats: newFormats, from: newMod.from, to: newMod.to, size: modNow.size },
            );
          } else {
            modscopy.splice(i, 1, {
              formats: newFormats,
              from: newMod.from,
              to: newMod.to,
              size: modNow.size,
            });
          }
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      modscopy.push(newMod);
    }
  }
  return modscopy;
};

type hintProps = {
  text?: string;
  bolderText?: string;
  show: boolean;
};

const FormatMerger = (f1: ModsTypes[], f2: ModsTypes[]) => {
  const newFormat = [...f1];
  for (let i = 0; i < f2.length; i++) {
    if (!newFormat.includes(f2[i])) newFormat.push(f2[i]);
  }
  return newFormat;
};

const formatsCompare = (f1: ModsTypes[], f2: ModsTypes[]) => {
  const f1copy = [...f1];
  const f2copy = [...f2];
  f1copy.sort();
  f2copy.sort();
  if (f1copy.length == f2copy.length) {
    for (let i = 0; i < f1copy.length; i++) {
      if (f1copy[i] != f2copy[i]) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
};

export const getOnlyImageContent = (editor: Editor) => {
  return editor.content.filter(el => el.type == ContentTypes.Image);
};

export const convertIntoEditorFormat = (data: string): Editor => {
  let dataCopy = data.substring(0, data.length);
  const editor: Editor = { count: 0, content: [] };
  let spanPos = dataCopy.search(/<span.*?>/g);
  let imgPos = dataCopy.search(/<img.*?>/g);
  while (spanPos != -1 || imgPos != -1) {
    if ((imgPos != -1 && spanPos != -1 && spanPos < imgPos) || (spanPos != -1 && imgPos == -1)) {
      dataCopy = dataCopy.replace(/<span.*?>/, '');
      const endSpanPos = dataCopy.search(/<\/span>/);
      if (endSpanPos != -1) {
        editor.content.push(transformSpanIntoEditorType(dataCopy, spanPos, endSpanPos, editor.count));
        editor.count = editor.count + 1;
        dataCopy = dataCopy.replace(/<\/span.*?>/, '');
        dataCopy = dataCopy.slice(endSpanPos, dataCopy.length);
      } else break;
    } else if ((imgPos != -1 && spanPos != -1 && imgPos < spanPos) || (spanPos == -1 && imgPos != -1)) {
      const endImgPos = dataCopy.search(/\/>/) + 2;
      if (endImgPos - 2 > 0) {
        editor.content.push(transformImgIntoEditorType(dataCopy, imgPos, endImgPos, editor.count));
        editor.count = editor.count + 1;
        dataCopy = dataCopy.replace(/<img.*?>/, '');
      } else break;
    } else break;
    spanPos = dataCopy.search(/<span.*?>/g);
    imgPos = dataCopy.search(/<img.*?>/g);
  }
  if (editor.content.length > 0) return { ...editor };
  else
    return {
      count: 1,
      content: [
        {
          type: ContentTypes.Text,
          value: '',
          mods: [],
          id: 'el-0',
        },
      ],
    };
};

const transformSpanIntoEditorType = (
  dataCopy: string,
  spanStart: number,
  spanEnd: number,
  count: number,
): TextType => {
  let spanContent = dataCopy.slice(spanStart, spanEnd);
  const mods: mod[] = [];
  while (ModsInclude(spanContent)) {
    const minPos = getMinPos(spanContent);
    let data = { strCopy: '', Start: 0, End: 0 };
    let fontSize = 0;
    let formats: ModsTypes[] = [];
    if (spanContent.search('<b>') == minPos) {
      data = replaceAndGetModPositions(spanContent, '<b>', '</b>');
      formats = [ModsTypes.Bold];
    } else if (spanContent.search('<c>') == minPos) {
      data = replaceAndGetModPositions(spanContent, '<c>', '</c>');
      formats = [ModsTypes.Cursive];
    } else if (spanContent.search('<bc>') == minPos) {
      data = replaceAndGetModPositions(spanContent, '<bc>', '</bc>');
      formats = [ModsTypes.Bold, ModsTypes.Cursive];
    } else if (spanContent.search(/<f.*?>/) == minPos) {
      fontSize = getFontSize(spanContent);
      data = replaceAndGetModPositions(spanContent, /<f.*?>/, /<\/f.*?>/);
      formats = [ModsTypes.TextSize];
    } else if (spanContent.search(/<cf.*?>/) == minPos) {
      fontSize = getFontSize(spanContent);
      data = replaceAndGetModPositions(spanContent, /<cf.*?>/, /<\/cf.*?>/);
      formats = [ModsTypes.Cursive, ModsTypes.TextSize];
    } else if (spanContent.search(/<bf.*?>/) == minPos) {
      fontSize = getFontSize(spanContent);
      data = replaceAndGetModPositions(spanContent, /<bf.*?>/, /<\/bf.*?>/);
      formats = [ModsTypes.Bold, ModsTypes.TextSize];
    } else if (spanContent.search(/<bcf.*?>/) == minPos) {
      fontSize = getFontSize(spanContent);
      data = replaceAndGetModPositions(spanContent, /<bcf.*?>/, /<\/bcf.*?>/);
      formats = [ModsTypes.Bold, ModsTypes.Cursive, ModsTypes.TextSize];
    }
    spanContent = data.strCopy;
    mods.push({
      from: data.Start,
      to: data.End,
      formats: formats,
      size: fontSize ? fontSize : undefined,
    });
  }
  return {
    type: ContentTypes.Text,
    mods: mods,
    value: spanContent,
    id: `el-${count}`,
  };
};

const transformImgIntoEditorType = (
  dataCopy: string,
  spanStart: number,
  spanEnd: number,
  count: number,
): ImageType => {
  const spanContent = dataCopy.slice(spanStart, spanEnd);
  const src = spanContent.slice(spanContent.search('http'), spanContent.search(/"\/>/g));
  const name = src.replace(serverImageUrl, '');
  return {
    href: src,
    type: ContentTypes.Image,
    name: name,
    id: `el-${count}`,
  };
};

const getFontSize = (str: string) => {
  return Number(str.slice(str.search(':') + 1, str.search('px')));
};

const replaceAndGetModPositions = (str: string, openTag: string | RegExp, closeTag: string | RegExp) => {
  let strCopy = str;
  const Start = strCopy.search(openTag);
  strCopy = strCopy.replace(openTag, '');
  const End = strCopy.search(closeTag);
  strCopy = strCopy.replace(closeTag, '');
  return { strCopy, Start, End };
};

const ModsInclude = (str: string): boolean => {
  if (
    str.search('<b>') != -1 ||
    str.search('<c>') != -1 ||
    str.search('<bc>') != -1 ||
    str.search(/<.*?f.*?>/g) != -1
  )
    return true;
  else return false;
};

const getMinPos = (str: string): number => {
  let minPos = 1000000;
  if (str.search('<b>') != -1) {
    minPos = Math.min(str.search('<b>'), minPos);
  }
  if (str.search('<c>') != -1) {
    minPos = Math.min(str.search('<c>'), minPos);
  }
  if (str.search(/<f.*?>/g) != -1) {
    minPos = Math.min(str.search(/<f.*?>/g), minPos);
  }
  if (str.search('<bc>') != -1) {
    minPos = Math.min(str.search('<bc>'), minPos);
  }
  if (str.search(/<bcf.*?>/g) != -1) {
    minPos = Math.min(str.search(/<bcf.*?>/g), minPos);
  }
  if (str.search(/<bf.*?>/g) != -1) {
    minPos = Math.min(str.search(/<bf.*?>/g), minPos);
  }
  if (str.search(/<cf.*?>/g) != -1) {
    minPos = Math.min(str.search(/<cf.*?>/g), minPos);
  }
  return minPos;
};
