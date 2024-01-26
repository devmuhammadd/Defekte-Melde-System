import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
    getTicketsApi,
    getTicketStatsApi,
    createTicketApi,
    updateTicketApi,
    deleteTicketApi
} from 'src/repository/TicketsRepository';

const TicketSlice = createSlice({
    name: 'ticketSlice',
    initialState: {
        tickets: [],
        ticketStats: {},
        loading: false
    },
    reducers: {
        setTickets: (state, { payload }) => {
            state.tickets = payload;
        },
        setTicketStats: (state, { payload }) => {
            state.ticketStats = payload;
        },
        addTicket: (state, { payload }) => {
            const updatedTickets = [...state.tickets];
            updatedTickets.push(payload);
            state.tickets = updatedTickets;
        },
        updateTicketParams: (state, { payload }) => {
            const updatedTickets = [...state.tickets];
            const index = updatedTickets.findIndex((ticket) => ticket.id === payload.id);
            updatedTickets[index] = payload;
            state.tickets = updatedTickets;
        },
        removeTicket: (state, { payload }) => {
            const updatedTickets = [...state.tickets];
            const index = updatedTickets.findIndex((ticket) => ticket.id === payload.id);
            updatedTickets.splice(index, 1);
            state.tickets = updatedTickets;
        },
        loadingStart: state => {
            state.loading = true;
        },
        loadingCompleted: state => {
            state.loading = false;
        }
    }
});

export const useTicketActions = () => {
    const dispatch = useDispatch();
    const { setTickets,
        setTicketStats,
        addTicket,
        updateTicketParams,
        removeTicket,
        loadingStart,
        loadingCompleted
    } = TicketSlice.actions;

    const getTickets = async () => {
        await getTicketsApi().then((res) => {
            dispatch(setTickets(res?.data));
        });
    };

    const getTicketStats = async () => {
        await getTicketStatsApi().then((res) => {
            dispatch(setTicketStats(res?.data));
        });
    };

    const loadDmsData = async () => {
        dispatch(loadingStart());
        getTickets();
        getTicketStats();
        dispatch(loadingCompleted());
    };

    const createTicket = async (params) => {
        dispatch(loadingStart());
        await createTicketApi(params).then((res) => {
            dispatch(addTicket(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const updateTicket = async (params) => {
        dispatch(loadingStart());
        await updateTicketApi(params).then((res) => {
            dispatch(updateTicketParams(res?.data));
        });
        dispatch(loadingCompleted());
    };

    const deleteTicket = async (params) => {
        dispatch(loadingStart());
        await updateTicketApi(params).then((res) => {
            dispatch(removeTicket({ id: params?.id }));
            getTicketStats();
        });
        dispatch(loadingCompleted());
    };

    const completeTicket = async (params) => {
        dispatch(loadingStart());
        await updateTicketApi(params).then((res) => {
            dispatch(updateTicketParams(res?.data));
            getTicketStats();
        });
        dispatch(loadingCompleted());
    };

    return { loadDmsData, createTicket, updateTicket, deleteTicket, completeTicket };
};

export default TicketSlice;