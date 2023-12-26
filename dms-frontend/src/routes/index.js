export default {
    //Tickets
    TicketsUrl: '/tickets',
    TicketStatsUrl: '/tickets/stats',
    TicketUrl: id => `/tickets/${id}`,
    NewTicketDataUrl: '/tickets/new',
    StationDataUrl: id => `/stations/${id}`,
    //Organizations
    createOrganizationUrl: '/organizations',
    getAvailableRolesUrl: (organizationId) => `/organizations/${organizationId}/available_roles`,
    getAvailableStationsUrl: (organizationId, role) => `/organizations/${organizationId}/available_stations?role=${role}`,
    //Users
    getUsersUrl: organizationId => `/users?organization_id=${organizationId}`,
    userUrl: id => `/users/${id}/role`,
    //Stations
    stationDataUrl: id => `/stations/${id}/data`,
    stationsUrl: (organizationId, stationId) => `/stations?organization_id=${organizationId}&station_id=${stationId || -1}`,
    createStationUrl: '/stations',
    stationUrl: id => `/stations/${id}`,
    newStationDataUrl: '/stations/new',
    //Vehicles
    vehiclesUrl: (organizationId, stationId) => `/vehicles?organization_id=${organizationId}&station_id=${stationId || -1}`,
    createVehicleUrl: '/vehicles',
    vehicleUrl: id => `/vehicles/${id}`,
    newVehicleDataUrl: '/vehicles/new',
    //Rooms
    roomsUrl: (organizationId, stationId) => `/rooms?organization_id=${organizationId}&station_id=${stationId || -1}`,
    createRoomUrl: '/rooms',
    roomUrl: id => `/rooms/${id}`,
    newRoomDataUrl: '/rooms/new',
};