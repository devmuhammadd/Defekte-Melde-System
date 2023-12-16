import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export const getStationsApi = () => axios.get(ApiRoutes.stationsUrl).then(res => res);
export const createStationApi = (params) => axios.post(ApiRoutes.stationsUrl, params).then(res => res);
export const updateStationApi = (params) => axios.put(ApiRoutes.stationUrl(params.id), params).then(res => res);
export const deleteStationApi = (id) => axios.delete(ApiRoutes.stationUrl(id)).then(res => res);
