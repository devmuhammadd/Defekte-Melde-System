import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export const getUsersApi = (organizationId) => axios.get(ApiRoutes.getUsersUrl(organizationId)).then(res => res);
