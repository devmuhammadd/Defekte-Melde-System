import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
    getCommentsApi,
    createCommentApi,
} from 'src/repository/CommentsRepository';

const CommentSlice = createSlice({
    name: 'commentSlice',
    initialState: {
        comments: [],
        loading: false
    },
    reducers: {
        setComments: (state, { payload }) => {
            state.comments = payload;
        },
        addComment: (state, { payload }) => {
            const updatedComments = [...state.comments];
            updatedComments.unshift(payload);
            state.comments = updatedComments;
        },
        loadingStart: state => {
            state.loading = true;
        },
        loadingCompleted: state => {
            state.loading = false;
        }
    }
});

export const useCommentActions = () => {
    const dispatch = useDispatch();
    const { setComments,
        addComment,
        loadingStart,
        loadingCompleted
    } = CommentSlice.actions;

    const getComments = async (ticketId) => {
        dispatch(loadingStart());
        await getCommentsApi(ticketId).then((res) => {
            dispatch(setComments(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const createComment = async (ticketId, params) => {
        dispatch(loadingStart());
        await createCommentApi(ticketId, params).then((res) => {
            dispatch(addComment(res?.data));
        });
        dispatch(loadingCompleted());
    };

    return { getComments, createComment };
};

export default CommentSlice;