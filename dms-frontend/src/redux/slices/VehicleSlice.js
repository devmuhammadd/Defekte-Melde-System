import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
    getVehiclesApi,
    createVehicleApi,
    updateVehicleApi,
    deleteVehicleApi
} from 'src/repository/VehiclesRepository';

const VehicleSlice = createSlice({
    name: 'vehicleSlice',
    initialState: {
        vehicles: [],
        loading: false
    },
    reducers: {
        setVehicles: (state, { payload }) => {
            state.vehicles = payload;
        },
        addVehicle: (state, { payload }) => {
            const updatedVehicles = [...state.vehicles];
            updatedVehicles.push(payload);
            state.vehicles = updatedVehicles;
        },
        updateVehicleParams: (state, { payload }) => {
            const updatedVehicles = [...state.vehicles];
            const index = updatedVehicles.findIndex((vehicle) => vehicle.id === payload.id);
            updatedVehicles[index] = payload;
            state.vehicles = updatedVehicles;
        },
        removeVehicle: (state, { payload }) => {
            const updatedVehicles = [...state.vehicles];
            const index = updatedVehicles.findIndex((vehicle) => vehicle.id === payload.id);
            updatedVehicles.splice(index, 1);
            state.vehicles = updatedVehicles;
        },
        loadingStart: state => {
            state.loading = true;
        },
        loadingCompleted: state => {
            state.loading = false;
        }
    }
});

export const useVehicleActions = () => {
    const dispatch = useDispatch();
    const { setVehicles,
        addVehicle,
        updateVehicleParams,
        removeVehicle,
        loadingStart,
        loadingCompleted
    } = VehicleSlice.actions;

    const getVehicles = async (organizationId) => {
        dispatch(loadingStart());
        await getVehiclesApi(organizationId).then((res) => {
            dispatch(setVehicles(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const createVehicle = async (params) => {
        dispatch(loadingStart());
        await createVehicleApi(params).then((res) => {
            dispatch(addVehicle(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const updateVehicle = async (params) => {
        dispatch(loadingStart());
        await updateVehicleApi(params).then((res) => {
            dispatch(updateVehicleParams(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const deleteVehicle = async (id) => {
        dispatch(loadingStart());
        await deleteVehicleApi(id).then(() => {
            dispatch(removeVehicle({ id }));
            getVehicleStats();
        });
        dispatch(loadingCompleted());
    };

    return { getVehicles, createVehicle, updateVehicle, deleteVehicle };
};

export default VehicleSlice;