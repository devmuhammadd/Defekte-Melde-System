import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
    getRoomsApi,
    createRoomApi,
    updateRoomApi,
    deleteRoomApi
} from 'src/repository/RoomsRepository';

const RoomSlice = createSlice({
    name: 'roomSlice',
    initialState: {
        rooms: [],
        loading: false
    },
    reducers: {
        setRooms: (state, { payload }) => {
            state.rooms = payload;
        },
        addRoom: (state, { payload }) => {
            const updatedRooms = [...state.rooms];
            updatedRooms.push(payload);
            state.rooms = updatedRooms;
        },
        updateRoomParams: (state, { payload }) => {
            const updatedRooms = [...state.rooms];
            const index = updatedRooms.findIndex((room) => room.id === payload.id);
            updatedRooms[index] = payload;
            state.rooms = updatedRooms;
        },
        removeRoom: (state, { payload }) => {
            const updatedRooms = [...state.rooms];
            const index = updatedRooms.findIndex((room) => room.id === payload.id);
            updatedRooms.splice(index, 1);
            state.rooms = updatedRooms;
        },
        loadingStart: state => {
            state.loading = true;
        },
        loadingCompleted: state => {
            state.loading = false;
        }
    }
});

export const useRoomActions = () => {
    const dispatch = useDispatch();
    const { setRooms,
        addRoom,
        updateRoomParams,
        removeRoom,
        loadingStart,
        loadingCompleted
    } = RoomSlice.actions;

    const getRooms = async (organizationId, stationId) => {
        dispatch(loadingStart());
        await getRoomsApi(organizationId, stationId).then((res) => {
            dispatch(setRooms(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const createRoom = async (params) => {
        dispatch(loadingStart());
        await createRoomApi(params).then((res) => {
            dispatch(addRoom(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const updateRoom = async (params) => {
        dispatch(loadingStart());
        await updateRoomApi(params).then((res) => {
            dispatch(updateRoomParams(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const deleteRoom = async (id) => {
        dispatch(loadingStart());
        await deleteRoomApi(id).then(() => {
            dispatch(removeRoom({ id }));
            getRoomStats();
        });
        dispatch(loadingCompleted());
    };

    return { getRooms, createRoom, updateRoom, deleteRoom };
};

export default RoomSlice;