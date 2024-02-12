import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export const getCommentsApi = (ticketId) => axios.get(ApiRoutes.commentsUrl(ticketId)).then(res => res);
export const createCommentApi = (ticketId, params) => axios.post(ApiRoutes.commentsUrl(ticketId), params).then(res => res);
