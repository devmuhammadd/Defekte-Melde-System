export default {
    //Tickets
    TicketsUrl: '/tickets',
    TicketStatsUrl: '/tickets/stats',
    TicketUrl: id => `/tickets/${id}`,
    NewTicketDataUrl: '/tickets/new',
    StationDataUrl: id => `/stations/${id}`,
    //Organizations
    createOrganizationUrl: '/organizations',
    //Users
    getUsersUrl: organizationId => `/users?organization_id=${organizationId}`,
    userUrl: id => `/users/${id}`,
    //Stations
    stationDataUrl: id => `/stations/${id}/data`,
    stationsUrl: (organizationId) => `/stations?organization_id=${organizationId}`,
    createStationUrl: '/stations',
    stationUrl: id => `/stations/${id}`,
    newStationDataUrl: '/stations/new',
    //Vehicles
    vehiclesUrl: (organizationId) => `/vehicles?organization_id=${organizationId}`,
    createVehicleUrl: '/vehicles',
    vehicleUrl: id => `/vehicles/${id}`,
    newVehicleDataUrl: '/vehicles/new',
    //Rooms
    roomsUrl: (organizationId) => `/rooms?organization_id=${organizationId}`,
    createRoomUrl: '/rooms',
    roomUrl: id => `/rooms/${id}`,
    newRoomDataUrl: '/rooms/new',
};