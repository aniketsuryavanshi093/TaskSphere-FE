import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { comment, } from "@/commontypes/index"
import { access } from 'fs';

type initialTypes = {
    pagination: {
        pageNumber: number, pageSize: number
    }
    CommentsInfo: comment[],
    isUpdated: string
}

const initialState: initialTypes = {
    pagination: {
        pageNumber: 1, pageSize: 10
    },
    isUpdated: "",
    CommentsInfo: []
};
const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setPagination: (state, action: PayloadAction<{
            pageNumber: number, pageSize: number
        }>) => {
            state.pagination = {
                pageNumber: action.payload.pageNumber, pageSize: 10
            };
        },
        setCommentsInfo: (state, action: PayloadAction<{ comments: comment[], isClear?: boolean }>) => {
            if (action.payload.isClear) {
                state.CommentsInfo = [];
                state.pagination = { pageNumber: 1, pageSize: 10 }
                return
            }
            state.CommentsInfo = action.payload.comments;
        },
        addComment: (state, action: PayloadAction<comment>) => {
            state.CommentsInfo = [action.payload, ...state.CommentsInfo,]
        },
        setIsUpdated: (state, action: PayloadAction<{ upodatedstring: string }>) => {
            state.isUpdated = action.payload.upodatedstring
        },
        addCommentreply: (state, action: PayloadAction<{ comment: comment }>) => {
            let temp = [...state.CommentsInfo];
            temp.forEach((el) => {
                if (el._id === action.payload.comment) {
                    el.repliesData = [...el.repliesData, action.payload]
                }
            })
            state.CommentsInfo = temp
        }
    }
});

// Action creators are generated for each case reducer function
export const { setPagination, setCommentsInfo, setIsUpdated, addComment, addCommentreply } =
    commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;
