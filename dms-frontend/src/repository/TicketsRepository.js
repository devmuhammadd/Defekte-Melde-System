import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export const getTicketsApi = () => axios.get(ApiRoutes.TicketsUrl).then(res => res);
export const getTicketStatsApi = () => axios.get(ApiRoutes.TicketStatsUrl).then(res => res);
export const createTicketApi = (params) => axios.post(ApiRoutes.TicketsUrl, params).then(res => res);
export const updateTicketApi = (params) => axios.put(ApiRoutes.TicketUrl(params.id), params).then(res => res);
export const deleteTicketApi = (id) => axios.delete(ApiRoutes.TicketUrl(id)).then(res => res);
export const getNewTicketData = () => axios.get(ApiRoutes.NewTicketData).then(res => res);