import axios from "src/utils/axios";
import ApiRoutes from 'src/routes';

export default {
    getTicketsApi: () => axios.get(ApiRoutes.TicketsUrl).then(res => res),
    getTicketStatsApi: () => axios.get(ApiRoutes.TicketStatsUrl).then(res => res),
    createTicketApi: (params) => axios.post(ApiRoutes.TicketsUrl, params).then(res => res),
    updateTicketApi: (params) => axios.put(ApiRoutes.TicketUrl(params.id), params).then(res => res),
    deleteTicketApi: (params) => axios.delete(ApiRoutes.TicketUrl(params.id), params).then(res => res),
}