import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoopIcon from "@mui/icons-material/Loop";
import { updateQuestion } from "../utils/store/questionsSlice";

const ClozePreview = ({ question, quesNum }) => {
  const dispatch = useDispatch();
  const [draggingItemNumber, setDraggingItemNumber] = useState("");
  const [optionItems, setOptionItems] = useState(question.question.options);
  useEffect(() => {
    dispatch(
      updateQuestion({
        ...question,
        answer: {},
      })
    );
  }, []);
  return (
    <div className="w-full rounded-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-4 my-6">
      <div className="w-[90%] m-auto">
        <div className="flex justify-between">
          <div className="questionNumber mt-2">
            Question {quesNum} : <span className="text-base"> (Cloze)</span>
          </div>
          <div
            className="flex justify-center items-center cursor-pointer -rotate-45"
            onClick={() => {
              dispatch(
                updateQuestion({
                  ...question,
                  answer: {},
                })
              );
              setOptionItems(question.question.options);
            }}
          >
            <LoopIcon sx={{ width: "2rem", height: "2rem" }} />
          </div>
        </div>
        <div className="itemsContainer mt-10 flex  gap-5 flex-wrap">
          {optionItems.map((option) => {
            return (
              <div
                key={option.optionNumber}
                draggable
                onDragStart={() => {
                  setDraggingItemNumber(option.optionNumber);
                }}
                className={`w-fit h-12 px-5 bg-sky-300  flex justify-center items-center text-xl cursor-move   rounded-lg`}
              >
                {option.optionValue}
              </div>
            );
          })}
        </div>
        <div className="sentenceContainer my-8  mt-12 flex  items-center gap-5 flex-wrap">
          {question.question.sentence.split(" ").map((word) => {
            const optionIndex = question.question.options.findIndex(
              (option) => {
                return option.optionValue.trim() === word;
              }
            );
            if (optionIndex < 0) {
              return word + " ";
            } else {
              return (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (!question.answer[word]) {
                      
                      const indexToRemove = optionItems.findIndex((element) => {
                        return element.optionNumber === draggingItemNumber;
                      });
                      const tempItems = [...optionItems];
                      const dropedItem = tempItems.splice(indexToRemove, 1);
                      setOptionItems(tempItems);
                      dispatch(
                        updateQuestion({
                          ...question,
                          answer: {
                            ...question.answer,
                            [word]: dropedItem[0].optionValue.trim(),
                          },
                        })
                      );
                    }
                  }}
                  className={`min-w-[6rem] max-w-fit h-12 px-5 ${
                    question.answer[word] ? "bg-sky-300 " : "bg-gray-200 "
                  }  flex justify-center items-center text-xl rounded-lg`}
                >
                  {question.answer[word] ? question.answer[word] : ""}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ClozePreview;
