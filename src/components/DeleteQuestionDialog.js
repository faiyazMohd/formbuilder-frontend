import React from "react";
import Button from "@mui/material/Button";
import { useDispatch, } from "react-redux";
import { deleteQuestion } from "../utils/store/questionsSlice";
const DeleteQuestionDialog = ({ setShowDeleteModal, question }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="fixed top-0 right-0 left-0 bottom-0 w-full h-full bg-black opacity-25 z-20"
        onClick={() => setShowDeleteModal(false)}
      ></div>
      <div className="fixed z-30 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-lg p-2 w-full md:max-w-[600px] h-40  flex flex-col bg-white">
        <div className="w-[90%] m-auto mt-5 text-lg " >
          Are you sure you want to permenently delete this question?
        </div>
        <div className="w-[90%] m-auto mt-5 flex justify-end gap-5">
          <Button variant="outlined" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#801c14", ":hover": "#801c14" }}
            onClick={() => {
              dispatch(deleteQuestion(question));
              setShowDeleteModal(false)
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeleteQuestionDialog;
