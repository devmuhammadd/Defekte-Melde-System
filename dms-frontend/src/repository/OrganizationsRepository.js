import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export const createOrganizationApi = (params) => axios.post(ApiRoutes.createOrganizationUrl, params).then(res => res);