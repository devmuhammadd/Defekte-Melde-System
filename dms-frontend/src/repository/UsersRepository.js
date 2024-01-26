import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export const getUsersApi = (organizationId) => axios.get(ApiRoutes.getUsersUrl(organizationId)).then(res => res);
export const updateUserApi = (params) => axios.put(ApiRoutes.userUrl(params.id), params).then(res => res);
export const getMechanicsApi = (stationId) => axios.get(ApiRoutes.getMechanicsUrl(stationId)).then(res => res);
