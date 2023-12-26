import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export const createOrganizationApi = (params) => axios.post(ApiRoutes.createOrganizationUrl, params).then(res => res);
export const getAvailableRoles = (organizationId) => axios.get(ApiRoutes.getAvailableRolesUrl(organizationId)).then(res => res);
export const getAvailableStations = (organizationId, role) => axios.get(ApiRoutes.getAvailableStationsUrl(organizationId, role)).then(res => res);