const navigation = () => {
  return [
    {
      title: 'Tickets',
      path: '/tickets',
      icon: 'ion:ticket-outline',
      'authority': 'Everyone'
    },
    {
      title: 'Fire Stations',
      path: '/stations',
      icon: 'mdi:fire-station',
      'authority': 'Admin'
    },
    {
      title: 'Vehicles',
      path: '/vehicles',
      icon: 'tdesign:vehicle',
      'authority': 'Admin'
    },
    {
      title: 'Rooms',
      path: '/rooms',
      icon: 'fluent-mdl2:room',
      'authority': 'Admin'
    },
    {
      title: 'Users',
      path: '/users',
      icon: 'mdi:human-queue',
      'authority': 'Admin'
    },
    // {
    //   title: 'Personalverwaltung',
    //   path: '/',
    //   icon: 'mdi:human-queue',
    // },
    // {
    //   title: 'Fahrzeugverwaltung',
    //   path: '/',
    //   icon: 'tdesign:vehicle',
    // },
    // {
    //   title: 'Einheiten',
    //   path: '/',
    //   icon: 'ant-design:deployment-unit-outlined',
    // },
    // {
    //   title: 'Objekte',
    //   path: '/',
    //   icon: 'ic:baseline-data-object',
    // },
    // {
    //   title: 'Sensoren',
    //   path: '/',
    //   icon: 'tabler:photo-sensor-2',
    // },
    // {
    //   title: 'Kalender',
    //   path: '/',
    //   icon: 'mdi:calendar-outline',
    // },
    // {
    //   title: 'Statistik',
    //   path: '/',
    //   icon: 'gridicons:stats-alt',
    // },
    // {
    //   title: 'Benutzerverwaltung',
    //   path: '/',
    //   icon: 'ph:user',
    // },
    // {
    //   title: 'Administration',
    //   path: '/',
    //   icon: 'eos-icons:admin-outlined',
    // },
  ]
}

export default navigation
