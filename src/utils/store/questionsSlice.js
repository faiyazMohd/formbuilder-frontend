import { createSlice, current } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
  },
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    updateQuestion:(state,action)=>{
      console.log(action.payload);
      state.questions = state.questions.map((element)=>{
        if (element.questionNumber === action.payload.questionNumber) {
          return action.payload
        } else {
          return element
        }
      })
    },
    deleteQuestion: (state, action) => {
      console.log(action.payload);
      const indexToRemove = state.questions.findIndex((element) =>{
        return element.questionNumber === action.payload.questionNumber}
      );
      state.questions.splice(indexToRemove,1)
      // console.log(current(state.questions));
    },
  },
});

export const { addQuestion, deleteQuestion,updateQuestion} = questionsSlice.actions;
export default questionsSlice.reducer;
