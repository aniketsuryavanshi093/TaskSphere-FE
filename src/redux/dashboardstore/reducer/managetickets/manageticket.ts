import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TaskType, projectTypes, } from "@/commontypes/index"

type initialTypes = {
  selectedProject: projectTypes | null,
  filterURLValue: {
    string: string;
    urlobject: {
      orderType: string;
      priority: string;
      userIds: string;
      label: "";
      isforUser: boolean
    };
  },
  ticketInfo: {
    isopen: boolean
    ticketdata: TaskType | null
  }
}

const initialState: initialTypes = {
  selectedProject: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("selectedProject")) : {},
  filterURLValue: { string: "", urlobject: { orderType: "", label: "", userIds: '', priority: "", isforUser: false } },
  ticketInfo: {
    isopen: false,
    ticketdata: null
  }
};
const manageticketSlice = createSlice({
  name: 'manageticket',
  initialState,
  reducers: {
    setselectedProject: (state, action: PayloadAction<projectTypes>) => {
      state.selectedProject = action.payload;
    },
    setTicketInfoClosed: (state) => {
      state.ticketInfo.isopen = false;
      state.ticketInfo.ticketdata = null;
    },
    setTicketInfoOpen: (state, action: PayloadAction<TaskType>) => {
      state.ticketInfo.isopen = true
      state.ticketInfo.ticketdata = action.payload
    },
    setFilterURLValue: (state, action: PayloadAction<{
      string: string;
      urlobject: {
        orderType: string;
        priority: string;
        isforUser: boolean;
        userIds: string;
        label: "";
      };
    }>) => {
      state.filterURLValue = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { setselectedProject, setFilterURLValue, setTicketInfoClosed,
  setTicketInfoOpen, } =
  manageticketSlice.actions;

export const manageticketReducer = manageticketSlice.reducer;
