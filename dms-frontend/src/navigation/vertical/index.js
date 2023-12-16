const navigation = () => {
  return [
    {
      title: 'DMS',
      path: '/dms',
      icon: 'ion:ticket-outline',
      'authority': 'everyone'
    },
    {
      title: 'Station Management',
      path: '/stations',
      icon: 'mdi:fire-station',
      'authority': 'admin'
    },
    {
      title: 'Vehicle Management',
      path: '/vehicles',
      icon: 'tdesign:vehicle',
      'authority': 'admin'
    },
    {
      title: 'Room Management',
      path: '/rooms',
      icon: 'fluent-mdl2:room',
      'authority': 'admin'
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
