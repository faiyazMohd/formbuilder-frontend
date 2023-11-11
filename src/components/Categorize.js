import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteQuestionDialog from "./DeleteQuestionDialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../utils/store/questionsSlice";
const Categorize = ({ question, quesNum }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      question.question.categories[question.question.categories.length - 1]
        .categoryName !== ""
    ) {
      dispatch(
        updateQuestion({
          ...question,
          question: {
            ...question.question,
            categories: [
              ...question.question.categories,
              {
                categoryNumber:
                  question.question.categories[
                    question.question.categories.length-1
                  ].categoryNumber + 1,
                categoryName: "",
              },
            ],
          },
        })
      );
    }
  }, [question.question.categories]);

  useEffect(() => {
    if (
      question.question.items[question.question.items.length - 1].itemName !==
      ""
    ) {
      dispatch(
        updateQuestion({
          ...question,
          question: {
            ...question.question,
            items: [
              ...question.question.items,
              {
                itemNumber:
                  question.question.items[question.question.items.length-1].itemNumber + 1,
                itemName: "",
                belongsTo: "",
              },
            ],
          },
        })
      );
    }
  }, [question.question.items]);

  return (
    <>
      <div className="categorizeQuesContainer w-full ml-2">
        <div className="questionNumber mt-2">
          Question {quesNum} : <span className="text-base"> (Categorize)</span>
          <span
            className="cursor-pointer mx-2"
            onClick={() => setShowDeleteModal(true)}
          >
            <DeleteForeverIcon sx={{ color: "red" }} />
          </span>
        </div>
        <div className="description">
          <input
            value={question.question.questionDescription}
            onChange={(e) => {
              dispatch(
                updateQuestion({
                  ...question,
                  question: {
                    ...question.question,
                    questionDescription: e.target.value,
                  },
                })
              );
            }}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-3 my-3"
            placeholder="Descritpion(Optional)"
          />
        </div>
        <div className="categoriesContainer text-lg  font-semibold">
          <div className="categories mt-2">Categories</div>
          {question.question.categories.map((category, index) => {
            return (
              <div className="flex gap-3 items-center">
                <input
                  value={category.categoryName}
                  onChange={(e) => {
                    const categoryToChange = question.question.categories.map(
                      (element) => {
                        if (
                          element.categoryNumber === category.categoryNumber
                        ) {
                          const updatedObj = {
                            ...element,
                            categoryName: e.target.value,
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
                          categories: categoryToChange,
                        },
                      })
                    );
                  }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-3 my-3 "
                  placeholder={`Category ${index + 1} ${
                    category.categoryNumber > 2 &&
                    question.question.categories.length > 2
                      ? "(Optional)"
                      : ""
                  }`}
                />
                {question.question.categories.length > 2 &&
                index + 1 !== question.question.categories.length ? (
                  <div
                    className="crossIcon cursor-pointer"
                    onClick={() => {
                      const indexToRemove =
                        question.question.categories.findIndex(
                          (element) =>
                            element.categoryNumber === category.categoryNumber
                        );
                      const tempCategories = [...question.question.categories];
                      tempCategories.splice(indexToRemove, 1);
                      dispatch(
                        updateQuestion({
                          ...question,
                          question: {
                            ...question.question,
                            categories: tempCategories,
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
        <div className="itemsContainer text-lg  font-semibold flex w-full">
          <div className="flex flex-col justify-between w-2/4 ">
            <div className="items mt-2">Items</div>
            {question.question.items.map((item, index) => {
              return (
                <div
                  key={item.itemNumber}
                  className="flex gap-3 items-center w-2/3"
                >
                  <input
                    value={item.itemName}
                    onChange={(e) => {
                      const itemToChange = question.question.items.map(
                        (element) => {
                          if (element.itemNumber === item.itemNumber) {
                            const updatedObj = {
                              ...element,
                              itemName: e.target.value,
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
                            items: itemToChange,
                          },
                        })
                      );
                    }}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-3 my-3 w-full"
                    placeholder={`Item ${index + 1} ${
                      item.itemNumber > 2 && question.question.items.length > 2
                        ? "(Optional)"
                        : ""
                    }`}
                  />
                  {question.question.items.length > 2 &&
                  index + 1 !== question.question.items.length ? (
                    <div
                      className="crossIcon cursor-pointer"
                      onClick={() => {
                        const indexToRemove = question.question.items.findIndex(
                          (element) => element.itemNumber === item.itemNumber
                        );
                        const tempItems = [...question.question.items];
                        tempItems.splice(indexToRemove, 1);
                        dispatch(
                          updateQuestion({
                            ...question,
                            question: {
                              ...question.question,
                              items: tempItems,
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
          <div className="flex flex-col justify-between w-2/4 ">
            <div className="items mt-2">Belongs To</div>
            {question.question.items.map((item) => {
              return (
                <div className="flex gap-3 items-center w-2/3">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="category"
                      value={item.belongsTo || ""}
                      onChange={(e) => {
                        const itemToChange = question.question.items.map(
                          (element) => {
                            if (element.itemNumber === item.itemNumber) {
                              const updatedObj = {
                                ...element,
                                belongsTo: e.target.value,
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
                              items: itemToChange,
                            },
                          })
                        );
                      }}
                    >
                      {question.question.categories.map((category) => {
                        if (category.categoryName === "") {
                          return null;
                        }
                        return (
                          <MenuItem value={category.categoryName}>
                            {category.categoryName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
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

export default Categorize;
