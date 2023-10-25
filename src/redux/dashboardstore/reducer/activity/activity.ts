import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActivityType, } from "@/commontypes/index"

type initialTypes = {
    pagination: {
        offset: number, limit: number
    }
    activitystateInfo: ActivityType[],
    isUpdated: string
}

const initialState: initialTypes = {
    pagination: {
        offset: 1, limit: 10
    },
    isUpdated: "",
    activitystateInfo: []
};
const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        setPagination: (state, action: PayloadAction<{
            offset: number, limit: number
        }>) => {
            state.pagination = {
                offset: action.payload.offset, limit: 10
            };
        },
        setactivitystateInfo: (state, action: PayloadAction<{ comments: ActivityType[], isClear?: boolean }>) => {
            if (action.payload.isClear) {
                state.activitystateInfo = [];
                state.pagination = { offset: 1, limit: 10 }
                return
            }
            state.activitystateInfo = action.payload.comments;
        },
    }
});

// Action creators are generated for each case reducer function
export const { setPagination, setactivitystateInfo, } =
    activitySlice.actions;

export const activityreducer = activitySlice.reducer;
