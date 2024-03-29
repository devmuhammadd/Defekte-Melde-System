import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export const getRoomsApi = () => axios.get(ApiRoutes.roomsUrl).then(res => res);
export const createRoomApi = (params) => axios.post(ApiRoutes.createRoomUrl, params).then(res => res);
export const updateRoomApi = (params) => axios.put(ApiRoutes.roomUrl(params.id), params).then(res => res);
export const deleteRoomApi = (id) => axios.delete(ApiRoutes.roomUrl(id)).then(res => res);
