import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export const getVehiclesApi = (organizationId) => axios.get(ApiRoutes.vehiclesUrl(organizationId)).then(res => res);
export const createVehicleApi = (params) => axios.post(ApiRoutes.createVehicleUrl, params).then(res => res);
export const updateVehicleApi = (params) => axios.put(ApiRoutes.vehicleUrl(params.id), params).then(res => res);
export const deleteVehicleApi = (id) => axios.delete(ApiRoutes.vehicleUrl(id)).then(res => res);
