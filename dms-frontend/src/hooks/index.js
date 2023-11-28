import { useSelector } from "react-redux";
import { useTicketActions } from "src/redux/slices/TicketsSlice";

export const useTicket = () => ({
    ...useSelector(state => state.ticketSlice),
    ...useTicketActions()
});