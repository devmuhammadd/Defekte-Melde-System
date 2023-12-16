import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
    getStationsApi,
    createStationApi,
    updateStationApi,
    deleteStationApi
} from 'src/repository/StationsRepository';

const StationSlice = createSlice({
    name: 'stationSlice',
    initialState: {
        stations: [],
        loading: false
    },
    reducers: {
        setStations: (state, { payload }) => {
            state.stations = payload;
        },
        addStation: (state, { payload }) => {
            const updatedStations = [...state.stations];
            updatedStations.push(payload);
            state.stations = updatedStations;
        },
        updateStationParams: (state, { payload }) => {
            const updatedStations = [...state.stations];
            const index = updatedStations.findIndex((station) => station.id === payload.id);
            updatedStations[index] = payload;
            state.stations = updatedStations;
        },
        removeStation: (state, { payload }) => {
            const updatedStations = [...state.stations];
            const index = updatedStations.findIndex((station) => station.id === payload.id);
            updatedStations.splice(index, 1);
            state.stations = updatedStations;
        },
        loadingStart: state => {
            state.loading = true;
        },
        loadingCompleted: state => {
            state.loading = false;
        }
    }
});

export const useStationActions = () => {
    const dispatch = useDispatch();
    const { setStations,
        addStation,
        updateStationParams,
        removeStation,
        loadingStart,
        loadingCompleted
    } = StationSlice.actions;

    const getStations = async () => {
        dispatch(loadingStart());
        await getStationsApi().then((res) => {
            dispatch(setStations(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const createStation = async (params) => {
        dispatch(loadingStart());
        await createStationApi(params).then((res) => {
            dispatch(addStation(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const updateStation = async (params) => {
        dispatch(loadingStart());
        await updateStationApi(params).then((res) => {
            dispatch(updateStationParams(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const deleteStation = async (id) => {
        dispatch(loadingStart());
        await deleteStationApi(id).then(() => {
            dispatch(removeStation({ id }));
            getStationStats();
        });
        dispatch(loadingCompleted());
    };

    return { getStations, createStation, updateStation, deleteStation };
};

export default StationSlice;