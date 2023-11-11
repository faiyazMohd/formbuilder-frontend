import React, { useState } from "react";
import Categorize from "../components/Categorize";
import Cloze from "../components/Cloze";
import Comprehension from "../components/Comprehension";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addQuestion } from "../utils/store/questionsSlice";
const BuildForm = () => {
  const questions = useSelector((store) => store.questions.questions);
  const [addQuestionsCategories, setAddQuestionsCategories] = useState("");
  
  const dispatch = useDispatch();
  
  return (
    <div className="text-blue-950">
      <div className="flex justify-center items-center gap-4">
        <h2 className="m-5 font-bold text-center text-2xl">Build Form</h2>
      </div>
      <div className="questionsContainer m-auto w-full max-w-[1000px] ">
        <div className="addingQuestionContainer w-full font-semibold text-2xl flex flex-col justify-center ">
          <div className="Questions">
            {questions.map((question, index) => {
              if (question.questionType === "Categorize") {
                return (
                  <Categorize
                    key={question.questionType + index}
                    question={question}
                    quesNum={index + 1}
                  />
                );
              } else if (question.questionType === "Cloze") {
                return (
                  <Cloze
                    key={question.questionType + index}
                    question={question}
                    quesNum={index + 1}
                  />
                );
              } else if (question.questionType === "Comprehension") {
                return (
                  <Comprehension
                    key={question.questionType + index}
                    question={question}
                    quesNum={index + 1}
                  />
                );
              }
            })}
          </div>
          <div className="flex gap-2 items-center justify-center my-8">
            <div className="">Add a Question with category</div>
            <div className="">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="quetionCategory"
                  value={addQuestionsCategories}
                  onChange={(e) => {
                    if (e.target.value === "Categorize") {
                      dispatch(
                        addQuestion({
                          questionNumber:
                            questions.length === 0
                              ? 1
                              : questions[questions.length - 1].questionNumber +
                                1,
                          questionType: e.target.value,
                          answer: {},
                          question: {
                            questionDescription: "",
                            categories: [
                              {
                                categoryNumber: 1,
                                categoryName: "",
                              },
                              {
                                categoryNumber: 2,
                                categoryName: "",
                              },
                            ],
                            items: [
                              {
                                itemNumber: 1,
                                itemName: "",
                                belongsTo: "",
                              },
                              {
                                itemNumber: 2,
                                itemName: "",
                                belongsTo: "",
                              },
                            ],
                          },
                        })
                      );
                    } else if (e.target.value === "Cloze") {
                      dispatch(
                        addQuestion({
                          questionNumber: questions.length + 1,
                          questionType: e.target.value,
                          answer: {},
                          question: {
                            sentence: "",
                            options: [],
                          },
                        })
                      );
                    } else {
                      dispatch(
                        addQuestion({
                          questionNumber: questions.length + 1,
                          questionType: e.target.value,
                          answer: {},
                          question: {
                            passage: "",
                            mcqQuestions: [
                              {
                                mcqNumber: 1,
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
                    }

                    setAddQuestionsCategories("");
                  }}
                >
                  <MenuItem value={"Categorize"}>Categorize</MenuItem>
                  <MenuItem value={"Cloze"}>Cloze</MenuItem>
                  <MenuItem value={"Comprehension"}>Comprehension</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildForm;
