import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorizePreview from "../components/CategorizePreview";
import ClozePreview from "../components/ClozePreview";
import ComprehensionPreview from "../components/ComprehensionPreview";
import { setShowAlert } from "../utils/store/appSlice";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Link } from "react-router-dom";

const PreviewForm = () => {
  const questions = useSelector((store) => store.questions.questions);
  const dispatch = useDispatch();
  const handleSaveForm = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/forms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            form: questions,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch(setShowAlert({ type: json.success, message: json.msg }));
        setTimeout(() => {
          dispatch(setShowAlert(null));
        }, 3000);
      } else {
        dispatch(setShowAlert({ type: json.success, message: json.msg }));
      }
    } catch (err) {}
  };
  return questions.length === 0 ? (
    <div className="text-blue-950">
      <div className="flex justify-center items-center gap-4">
        <Link to={"/"} className="m-5 font-bold text-center text-2xl" >Build the form first.</Link>
      </div>
    </div>
  ) : (
    <div className="text-blue-950">
      <div className="flex justify-center items-center gap-4">
        <h2 className="m-5 font-bold text-center text-2xl">Preview Form</h2>
        <div className="">
          <Button variant="contained" onClick={handleSaveForm}>
            Submit&nbsp;
            <SaveIcon />
          </Button>
        </div>
      </div>
      <div className="questionsContainer m-auto w-full max-w-[1000px] ">
        <div className="addingQuestionContainer w-full font-semibold text-2xl flex flex-col justify-center ">
          <div className="Questions">
            {questions?.map((question, index) => {
              if (question.questionType === "Categorize") {
                return (
                  <CategorizePreview
                    key={question.questionType + index}
                    question={question}
                    quesNum={index + 1}
                  />
                );
              } else if (question.questionType === "Cloze") {
                return (
                  <ClozePreview
                    key={question.questionType + index}
                    question={question}
                    quesNum={index + 1}
                  />
                );
              } else if (question.questionType === "Comprehension") {
                return (
                  <ComprehensionPreview
                    key={question.questionType + index}
                    question={question}
                    quesNum={index + 1}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewForm;
