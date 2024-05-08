import { useEffect, useRef, useState } from 'react';
import { CloseQuestion, OpenQuestion } from '../../icons/Icons';
import './Question.scss';


type QuestionProps = {
  text: string;
  answer: string;
};

type OpenQuestionButtonProps = {
  text: string;
  handler: () => void,
  questionState: boolean
}

const OpenQuestionButton = (props: OpenQuestionButtonProps) => {
  return (
    <div className="question__title" onClick={() => { props.handler() }}>
      {
        props.text
      }
      {!props.questionState && <OpenQuestion />}
      {props.questionState && <CloseQuestion />}
    </div>
  )
}

export const Question = (props: QuestionProps) => {

  const [questionState, setQuestionState] = useState(false)
  const answerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (answerRef.current) {
      if (questionState) {
        answerRef.current.classList.add("question__answer_opened")
      }
      else {
        answerRef.current.classList.remove("question__answer_opened")
      }
    }
  }, [questionState])
  return (
    <div className="question" >
      <OpenQuestionButton
        handler={() => {
          if (questionState)
            setQuestionState(false)
          else
            setQuestionState(true)
        }}
        questionState={questionState} text={props.text}
      />
      {
        <div className="question__answer" ref={answerRef}>
          {
            props.answer
          }
        </div>
      }
      <div className={"question__line" + (!questionState ? " question__line_up" : "")}></div>
    </div>
  )
};

