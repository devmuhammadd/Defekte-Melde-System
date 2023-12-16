import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export const getUsersApi = () => axios.get(ApiRoutes.getUsersUrl).then(res => res);
