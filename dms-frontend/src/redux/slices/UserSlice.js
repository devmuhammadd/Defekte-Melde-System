import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
    getUsersApi, updateUserApi
} from 'src/repository/UsersRepository';

const UserSlice = createSlice({
    name: 'userSlice',
    initialState: {
        users: [],
        loading: false
    },
    reducers: {
        setUsers: (state, { payload }) => {
            state.users = payload;
        },
        updateUserParams: (state, { payload }) => {
            const updatedUsers = [...state.users];
            const index = updatedUsers.findIndex((user) => user.id === payload.id);
            updatedUsers[index] = payload;
            state.users = updatedUsers;
        },
        loadingStart: state => {
            state.loading = true;
        },
        loadingCompleted: state => {
            state.loading = false;
        }
    }
});

export const useUserActions = () => {
    const dispatch = useDispatch();
    const { setUsers,
        updateUserParams,
        loadingStart,
        loadingCompleted
    } = UserSlice.actions;

    const getUsers = async (organizationId) => {
        dispatch(loadingStart());
        await getUsersApi(organizationId).then((res) => {
            dispatch(setUsers(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const updateUser = async (params) => {
        dispatch(loadingStart());
        await updateUserApi(params).then((res) => {
            dispatch(updateUserParams(res?.data));
        });
        dispatch(loadingCompleted());
    };

    return { getUsers, updateUser };
};

export default UserSlice;