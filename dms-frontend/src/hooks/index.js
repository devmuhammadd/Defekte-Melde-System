import { useSelector } from "react-redux";
import { useTicketActions } from "src/redux/slices/TicketsSlice";

export const useTickets = () => ({
    ...useSelector(state => state.tickets),
    ...useTicketActions()
});