import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { projectTypes, } from "@/commontypes/index"

type initialTypes = {
  selectedProject: projectTypes | null,
}
const initialState: initialTypes = {
  selectedProject: JSON.parse(localStorage.getItem("selectedProject")),
};
const manageticketSlice = createSlice({
  name: 'manageticket',
  initialState,
  reducers: {
    setselectedProject: (state, action: PayloadAction<projectTypes>) => {
      state.selectedProject = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { setselectedProject } =
  manageticketSlice.actions;

export const manageticketReducer = manageticketSlice.reducer;
