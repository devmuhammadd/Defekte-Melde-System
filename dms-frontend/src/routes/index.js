export default {
    //Tickets
    TicketsUrl: '/tickets',
    TicketStatsUrl: '/tickets/stats',
    TicketUrl: id => `/tickets/${id}`,
    NewTicketDataUrl: '/tickets/new',
    StationDataUrl: id => `/stations/${id}`,
    //Organizations
    createOrganizationUrl: '/organizations',
    getOrganizationByNameUrl: name => `/organizations/${name}`,
    getUsersUrl: id => `/users?organizationId=${id}`,
    //Stations
    stationDataUrl: id => `/stations/${id}/data`,
    stationsUrl: '/stations',
    stationUrl: id => `/stations/${id}`,
    newStationDataUrl: '/stations/new',
};