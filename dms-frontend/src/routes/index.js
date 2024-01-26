export default {
    //Tickets
    TicketsUrl: '/tickets',
    TicketStatsUrl: '/tickets/stats',
    TicketUrl: id => `/tickets/${id}`,
    StationDataUrl: id => `/stations/${id}`,
    //Organizations
    createOrganizationUrl: '/organizations',
    //Users
    getUsersUrl: organizationId => `/users?organization_id=${organizationId}`,
    userUrl: id => `/users/${id}/role`,
    getMechanicsUrl: stationId => `/mechanics?station_id=${stationId}`,
    //Stations
    stationDataUrl: id => `/stations/${id}/data`,
    stationsUrl: '/stations',
    createStationUrl: '/stations',
    stationUrl: id => `/stations/${id}`,
    newStationDataUrl: '/stations/new',
    //Vehicles
    vehiclesUrl: '/vehicles',
    createVehicleUrl: '/vehicles',
    vehicleUrl: id => `/vehicles/${id}`,
    newVehicleDataUrl: '/vehicles/new',
    //Rooms
    roomsUrl: '/rooms',
    createRoomUrl: '/rooms',
    roomUrl: id => `/rooms/${id}`,
    newRoomDataUrl: '/rooms/new',
};