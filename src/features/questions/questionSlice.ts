import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
type Question = {
    question: string,
    difficulty: string,
    tags: string,
    link: string
}

interface QuestionState {
    questions: Question[]
}

// Define the initial state using that type
const initialState: QuestionState = {
  questions: [],
} 

export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion: (state, action:PayloadAction<Question>) => {
        state.questions.push(action.payload)
    },
  },
})

export const { addQuestion } = questionSlice.actions
export default questionSlice.reducer