import { useSelector } from "react-redux";
import { useTicketActions } from "src/redux/slices/TicketSlice";
import { useStationActions } from "src/redux/slices/StationSlice";
import { useUserActions } from "src/redux/slices/UserSlice";
import { useVehicleActions } from "src/redux/slices/VehicleSlice";
import { useRoomActions } from "src/redux/slices/RoomSlice";
import { useCommentActions } from "src/redux/slices/CommentSlice";

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

export const useVehicle = () => ({
    ...useSelector(state => state.vehicleSlice),
    ...useVehicleActions()
});

export const useRoom = () => ({
    ...useSelector(state => state.roomSlice),
    ...useRoomActions()
});

export const useComment = () => ({
    ...useSelector(state => state.commentSlice),
    ...useCommentActions()
});