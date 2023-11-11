import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../utils/store/questionsSlice";
import LoopIcon from "@mui/icons-material/Loop";
const CategorizePreview = ({ question, quesNum }) => {
  const [draggingItemNumber, setDraggingItemNumber] = useState("");
  const [items, setItems] = useState(question.question.items);
  const dispatch = useDispatch();
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
            <span className="text-base"> (Categorize)</span>
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
              setItems(question.question.items);
            }}
          >
            <LoopIcon sx={{ width: "2rem", height: "2rem" }} />
          </div>
        </div>
        <div className="description mt-2">
          {question.question.questionDescription}
        </div>
        <div className="itemsContainer mt-3 flex justify-center gap-3 flex-wrap">
          {items.map((item) => {
            if (item.itemName === "") {
              return "";
            }
            return (
              <div
                key={item.itemNumber}
                draggable
                onDragStart={() => {
                  setDraggingItemNumber(item.itemNumber);
                }}
                className={`w-fit h-12 px-5 flex justify-center items-center text-xl cursor-grab  border border-gray-700 rounded-xl`}
              >
                {item.itemName}
              </div>
            );
          })}
        </div>
        <div className="categoriesContainer mt-10 flex justify-center gap-5 flex-wrap">
          {question.question.categories.map((category) => {
            if (category.categoryName === "") {
              return "";
            }
            return (
              <div
                className="flex flex-col justify-center items-center gap-3"
                key={category.categoryNumber}
              >
                <div className="w-fit h-14 px-10 bg-sky-300 flex justify-center items-center   rounded-xl">
                  {category.categoryName}
                </div>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const indexToRemove = items.findIndex((element) => {
                      return element.itemNumber === draggingItemNumber;
                    });
                    const tempItems = [...items];
                    const dropedItem = tempItems.splice(indexToRemove, 1);
                    setItems(tempItems);
                    dispatch(
                      updateQuestion({
                        ...question,
                        answer: {
                          ...question.answer,
                          [category.categoryName]: [
                            ...(question.answer[category.categoryName] || []),
                            ...dropedItem,
                          ],
                        },
                      })
                    );
                  }}
                  className="max-w-fit  min-h-[8rem] px-10 py-3 bg-sky-300 flex flex-col gap-3 justify-center items-center flex-wrap   rounded-xl"
                >
                  {question.answer[category.categoryName]?.map((item) => {
                    if (item.itemName === "") {
                      return "";
                    }
                    return (
                      <div
                        key={item.itemNumber}
                        className={`w-fit h-12 px-5 flex justify-center items-center text-xl  border border-gray-700 rounded-xl`}
                      >
                        {item.itemName}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorizePreview;
