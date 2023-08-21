import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { selectUsers } from "@/commontypes/index"

type initialTypes = {
  addedUsers: selectUsers[],
}
const initialState: initialTypes = {
  addedUsers: [],
};
const userSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setAddedUsers: (state, action: PayloadAction<selectUsers[]>) => {
      state.addedUsers = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { setAddedUsers } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
