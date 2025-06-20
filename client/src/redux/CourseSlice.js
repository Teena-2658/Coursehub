// CourseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const CourseSlice = createSlice({
  name: "course", // small "c" here also
  initialState: {
    course: []   // small "c"
  },
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload; // small "c"
    }
  }
});

export const { setCourse } = CourseSlice.actions;
export default CourseSlice.reducer;
