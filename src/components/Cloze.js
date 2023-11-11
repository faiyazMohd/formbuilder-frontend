import React, { useRef, useState } from "react";
import DeleteQuestionDialog from "./DeleteQuestionDialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../utils/store/questionsSlice";
const Cloze = ({ question, quesNum }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const textAreaRef = useRef();
  const dispatch = useDispatch();
  return (
    <>
      <div className="categorizeQuesContainer w-full ml-2">
        <div className="questionNumber mt-2">
          Question {quesNum} : <span className="text-base"> (Cloze)</span>
          <span
            className="cursor-pointer mx-2"
            onClick={() => setShowDeleteModal(true)}
          >
            <DeleteForeverIcon sx={{ color: "red" }} />
          </span>
        </div>
        <div className="mt-3">
          <div className="previewSentence">
            <div className="previewLabel text-base ">Preview</div>
            <input
              value={
                question.question.options.length === 0
                  ? question.question.sentence
                  : question.question.options.reduce((acc, option) => {
                      const underScores = "_".repeat(option.optionValue.length);
                      return acc.replace(option.optionValue, underScores);
                    }, question.question.sentence)
              }
              onChange={(e) => {
                dispatch(
                  updateQuestion({
                    ...question,
                    question: {
                      ...question.question,
                      sentence: e.target.value,
                    },
                  })
                );
              }}
              type="text"
              disabled
              className="bg-gray-50 border focus:outline-none text-gray-900 text-sm rounded-lg block w-1/2 p-3 my-3 "
              placeholder="Preview"
            />
          </div>
          <div className="sentence mt-5">
            <div className="sentenceLabel text-base">Sentence</div>
            <div className="flex gap-3">
              <textarea
                ref={textAreaRef}
                value={
                  question.question.options.length === 0
                    ? question.question.sentence
                    : question.question.options.reduce((acc, option) => {
                        return acc.replace(
                          option.optionValue,
                          option.optionValue.toUpperCase()
                        );
                      }, question.question.sentence)
                }
                onChange={(e) => {
                  dispatch(
                    updateQuestion({
                      ...question,
                      question: {
                        ...question.question,
                        sentence: e.target.value,
                      },
                    })
                  );
                }}
                rows={1}
                type="text"
                className="bg-gray-50 border resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-3 my-3 "
                placeholder="Select the words here and click on U button to convert them into blanks"
              />
              <div
                className="p-3 px-4 my-3 text-sm underline rounded-lg bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer"
                onClick={() => {
                  const start = textAreaRef.current.selectionStart;
                  const end = textAreaRef.current.selectionEnd;
                  const selectedText = question.question.sentence.substring(
                    start,
                    end
                  );
                  const isOptionPresent = question.question.options.findIndex(
                    (option) => option.optionValue === selectedText
                  );
                  if (selectedText.length === 0) {
                    return "";
                  }
                  if (isOptionPresent < 0) {
                    dispatch(
                      updateQuestion({
                        ...question,
                        question: {
                          ...question.question,
                          options: [
                            ...question.question.options,
                            {
                              optionNumber:
                                question.question.options.length === 0
                                  ?  1
                                  : question.question.options[question.question.options.length-1].optionNumber +1 ,
                              optionValue: selectedText,
                            },
                          ],
                        },
                      })
                    );
                  } else {
                    const tempOptions = [...question.question.options];
                    tempOptions.splice(isOptionPresent, 1);
                    dispatch(
                      updateQuestion({
                        ...question,
                        question: {
                          ...question.question,
                          options: tempOptions,
                        },
                      })
                    );
                  }
                }}
              >
                U
              </div>
            </div>
          </div>
          <div className="optionsConta mt-4">
            <div className="text-base">Options</div>
            {question.question.options.map((option) => {
              return (
                <div className="bg-gray-50 border focus:outline-none text-gray-900 text-sm rounded-lg block w-1/4 p-3 my-3 ">
                  {option.optionValue}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteQuestionDialog
          setShowDeleteModal={setShowDeleteModal}
          question={question}
        />
      )}
    </>
  );
};

export default Cloze;
