import { configureStore } from "@reduxjs/toolkit";
import TicketSlice from "./slices/TicketsSlice";

export default configureStore({
    reducer: {
        [TicketSlice.name]: TicketSlice.reducer
    },
    devTools: true
});