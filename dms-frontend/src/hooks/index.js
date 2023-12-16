import { useSelector } from "react-redux";
import { useTicketActions } from "src/redux/slices/TicketsSlice";
import { useStationActions } from "src/redux/slices/StationSlice";
import { useUserActions } from "src/redux/slices/UserSlice";

export const useTicket = () => ({
    ...useSelector(state => state.ticketSlice),
    ...useTicketActions()
});

export const useStation = () => ({
    ...useSelector(state => state.stationSlice),
    ...useStationActions()
});

export const useUser = () => ({
    ...useSelector(state => state.userSlice),
    ...useUserActions()
});