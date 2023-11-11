import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateQuestion } from '../utils/store/questionsSlice';
import LoopIcon from "@mui/icons-material/Loop";
const ComprehensionPreview = ({ question, quesNum }) => {
  const dispatch = useDispatch()
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
          Question {quesNum} :{" "}
          <span className="text-base"> (Comprehension)</span>
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
          }}
        >
          <LoopIcon sx={{ width: "2rem", height: "2rem" }} />
        </div>
      </div>
      <div className="description mt-2 text-lg">
        {question.question.passage}
      </div>
      <div className="categoriesContainer text-lg  font-semibold">
          <div className="categories mt-2">MCQs</div>
          {question.question.mcqQuestions.map((mcqQuestion, index) => {
            return (
              <div className="flex gap-3" key={mcqQuestion.mcqNumber}>
                <div className="border rounded-sm w-2/3 mt-3">
                  <div className="w-[95%] m-auto mt-6 pb-5">
                    <div className="">
                      Question&nbsp;{quesNum}:{index + 1}
                    </div>
                    <div className="my-3">{mcqQuestion.mcqName}</div>
                    <div className="mcqOptions mt-3">
                      <div>
                        {mcqQuestion.mcqOptions.map((option, optionIndex) => {
                          if (option.optionName === "") {
                            return  ""
                          }
                          return (
                            <div
                              className="flex gap-3 items-center"
                              key={option.optionNumber}
                            >
                              <div class="flex items-center ">
                                <input
                                  type="radio"
                                  id={mcqQuestion.mcqNumber+option.optionName+option.optionNumber}
                                  name={mcqQuestion.mcqNumber}
                                  value={mcqQuestion.correctOption}
                                  checked={question.answer[mcqQuestion.mcqName]===option.optionName}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                        dispatch(
                                          updateQuestion({
                                            ...question,
                                            answer: {
                                              ...question.answer,
                                              [mcqQuestion.mcqName]:option.optionName,
                                            },
                                          })
                                        );
                                      
                                    }
                                  }}
                                  class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                              </div>
                              <label for={mcqQuestion.mcqNumber+option.optionName+option.optionNumber}>{option.optionName}</label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  </div>
  )
}

export default ComprehensionPreview
