import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { projectTypes, } from "@/commontypes/index"

type initialTypes = {
  selectedProject: projectTypes | null,
  filterURLValue: {
    string: string;
    urlobject: {
      orderType: string;
      priority: string;
      userIds: string;
      label: "";
    };
  }
}

const initialState: initialTypes = {
  selectedProject: JSON.parse(localStorage.getItem("selectedProject")),
  filterURLValue: { string: "", urlobject: { orderType: "", label: "", userIds: '', priority: "" } }
};
const manageticketSlice = createSlice({
  name: 'manageticket',
  initialState,
  reducers: {
    setselectedProject: (state, action: PayloadAction<projectTypes>) => {
      state.selectedProject = action.payload;
    },
    setFilterURLValue: (state, action: PayloadAction<{
      string: string;
      urlobject: {
        orderType: string;
        priority: string;
        userIds: string;
        label: "";
      };
    }>) => {
      state.filterURLValue = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { setselectedProject, setFilterURLValue } =
  manageticketSlice.actions;

export const manageticketReducer = manageticketSlice.reducer;
