import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteQuestionDialog from "./DeleteQuestionDialog";
import { updateQuestion } from "../utils/store/questionsSlice";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
const Comprehension = ({ question, quesNum }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const textAreaRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${
        textAreaRef.current.scrollHeight + 5
      }px`;
    }
  }, [question.question.passage]);

  useEffect(() => {
    question.question.mcqQuestions.map((mcq) => {
      if (mcq.mcqOptions[mcq.mcqOptions.length - 1].optionName !== "") {
        dispatch(
          updateQuestion({
            ...question,
            question: {
              ...question.question,
              mcqQuestions: question.question.mcqQuestions.map((ques) => {
                if (ques.mcqNumber === mcq.mcqNumber) {
                  return {
                    ...mcq,
                    mcqOptions: [
                      ...ques.mcqOptions,
                      {
                        optionNumber: ques.mcqOptions.length + 1,
                        optionName: "",
                      },
                    ],
                  };
                } else {
                  return ques;
                }
              }),
            },
          })
        );
      }
    });
  }, [question.question.mcqQuestions]);

  return (
    <>
      <div className="categorizeQuesContainer w-full ml-2">
        <div className="questionNumber mt-2">
          Question {quesNum} :{" "}
          <span className="text-base"> (Comprehension)</span>
          <span
            className="cursor-pointer mx-2"
            onClick={() => setShowDeleteModal(true)}
          >
            <DeleteForeverIcon sx={{ color: "red" }} />
          </span>
        </div>
        <div className="description">
          <textarea
            ref={textAreaRef}
            value={question.question.passage}
            onChange={(e) => {
              dispatch(
                updateQuestion({
                  ...question,
                  question: {
                    ...question.question,
                    passage: e.target.value,
                  },
                })
              );
            }}
            type="text"
            className="bg-gray-50 border resize-none min-h-[3rem]  border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-3 my-3"
            placeholder="Type passage here"
          />
        </div>
        <div className="categoriesContainer text-lg  font-semibold">
          <div className="categories mt-2">MCQs</div>
          {question.question.mcqQuestions.map((mcqQuestion, index) => {
            return (
              <div className="flex gap-3" key={mcqQuestion.mcqNumber}>
                <div className="border rounded-sm w-2/3 mt-3">
                  <div className="w-[95%] m-auto mt-6">
                    <div className="">
                      Question&nbsp;{quesNum}:{index + 1}
                    </div>
                    <textarea
                      value={mcqQuestion.mcqName}
                      rows={1}
                      onChange={(e) => {
                        const mcqToChange = question.question.mcqQuestions.map(
                          (element) => {
                            if (element.mcqNumber === mcqQuestion.mcqNumber) {
                              const updatedObj = {
                                ...element,
                                mcqName: e.target.value,
                              };
                              return updatedObj;
                            } else {
                              return element;
                            }
                          }
                        );
                        dispatch(
                          updateQuestion({
                            ...question,
                            question: {
                              ...question.question,
                              mcqQuestions: mcqToChange,
                            },
                          })
                        );
                      }}
                      type="text"
                      className="bg-gray-50 border h-auto resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-3 my-3 "
                      placeholder="Question Text"
                    />
                    <div className="mcqOptions mt-3">
                      <div className="text-sm">Options</div>
                      <div>
                        {mcqQuestion.mcqOptions.map((option, optionIndex) => {
                          return (
                            <div
                              className="flex gap-3 items-center"
                              key={option.optionNumber}
                            >
                              <div class="flex items-center ">
                                <input
                                  type="radio"
                                  name={mcqQuestion.mcqNumber}
                                  value={mcqQuestion.correctOption}
                                  disabled={
                                    optionIndex + 1 ===
                                      mcqQuestion.mcqOptions.length &&
                                    option.optionName === "" &&
                                    mcqQuestion.mcqOptions.length > 2
                                      ? true
                                      : false
                                  }
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      const mcqToChange =
                                        question.question.mcqQuestions.map(
                                          (element) => {
                                            if (
                                              element.mcqNumber ===
                                              mcqQuestion.mcqNumber
                                            ) {
                                              const updatedObj = {
                                                ...element,
                                                correctOption:
                                                  option.optionNumber,
                                              };
                                              return updatedObj;
                                            } else {
                                              return element;
                                            }
                                          }
                                        );
                                      dispatch(
                                        updateQuestion({
                                          ...question,
                                          question: {
                                            ...question.question,
                                            mcqQuestions: mcqToChange,
                                          },
                                        })
                                      );
                                    }
                                  }}
                                  
                                  class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                              </div>
                              <input
                                value={option.optionName}
                                onChange={(e) => {
                                  const updatedOptions =
                                    mcqQuestion.mcqOptions.map((element) => {
                                      return element.optionNumber ===
                                        option.optionNumber
                                        ? {
                                            ...element,
                                            optionName: e.target.value,
                                          }
                                        : element;
                                    });
                                  dispatch(
                                    updateQuestion({
                                      ...question,
                                      question: {
                                        ...question.question,
                                        mcqQuestions:
                                          question.question.mcqQuestions.map(
                                            (mcq) =>
                                              mcq.mcqNumber ===
                                              mcqQuestion.mcqNumber
                                                ? {
                                                    ...mcq,
                                                    mcqOptions: updatedOptions,
                                                  }
                                                : mcq
                                          ),
                                      },
                                    })
                                  );
                                }}
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-3 my-3 "
                                placeholder={`Option ${optionIndex + 1} ${
                                  option.optionNumber > 2 &&
                                  mcqQuestion.mcqOptions.length > 2
                                    ? "(Optional)"
                                    : ""
                                }`}
                              />
                              {mcqQuestion.mcqOptions.length > 2 &&
                              optionIndex + 1 !==
                                mcqQuestion.mcqOptions.length ? (
                                <div
                                  className="crossIcon cursor-pointer"
                                  onClick={() => {
                                    const indexToRemove =
                                      mcqQuestion.mcqOptions.findIndex(
                                        (element) =>
                                          element.optionNumber ===
                                          option.optionNumber
                                      );
                                    const tempOption = [
                                      ...mcqQuestion.mcqOptions,
                                    ];
                                    tempOption.splice(indexToRemove, 1);

                                    dispatch(
                                      updateQuestion({
                                        ...question,
                                        question: {
                                          ...question.question,
                                          mcqQuestions:
                                            question.question.mcqQuestions.map(
                                              (mcq) => {
                                                if (
                                                  mcq.mcqNumber ===
                                                  mcqQuestion.mcqNumber
                                                ) {
                                                  return {
                                                    ...mcq,
                                                    mcqOptions: tempOption,
                                                  };
                                                } else {
                                                  return mcq;
                                                }
                                              }
                                            ),
                                        },
                                      })
                                    );
                                  }}
                                >
                                  <CloseIcon />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div
                    className="addMcq mt-3 cursor-pointer "
                    onClick={() => {
                      dispatch(
                        updateQuestion({
                          ...question,
                          question: {
                            ...question.question,
                            mcqQuestions: [
                              ...question.question.mcqQuestions,
                              {
                                mcqNumber:
                                  question.question.mcqQuestions[
                                    question.question.mcqQuestions.length - 1
                                  ].mcqNumber + 1,
                                mcqName: "",
                                mcqOptions: [
                                  {
                                    optionNumber: 1,
                                    optionName: "",
                                  },
                                  {
                                    optionNumber: 2,
                                    optionName: "",
                                  },
                                ],
                                correctOption: "",
                              },
                            ],
                          },
                        })
                      );
                    }}
                  >
                    <AddCircleIcon />
                  </div>
                  {question.question.mcqQuestions.length > 1 ? (
                    <div
                      className="deleteMcq mt-3 cursor-pointer "
                      onClick={() => {
                        const indexToRemove =
                          question.question.mcqQuestions.findIndex(
                            (element) =>
                              element.mcqNumber === mcqQuestion.mcqNumber
                          );
                        const tempQuestion = [
                          ...question.question.mcqQuestions,
                        ];
                        tempQuestion.splice(indexToRemove, 1);

                        dispatch(
                          updateQuestion({
                            ...question,
                            question: {
                              ...question.question,
                              mcqQuestions: tempQuestion,
                            },
                          })
                        );
                      }}
                    >
                      <DeleteIcon />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
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

export default Comprehension;
