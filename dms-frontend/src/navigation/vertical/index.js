const navigation = () => {
  return [
    {
      title: 'Personalverwaltung',
      path: '/',
      icon: 'mdi:human-queue',
    },
    {
      title: 'Fahrzeugverwaltung',
      path: '/',
      icon: 'tdesign:vehicle',
    },
    {
      title: 'DMS',
      path: '/dms',
      icon: 'uil:setting',
    },
    {
      title: 'Einheiten',
      path: '/',
      icon: 'ant-design:deployment-unit-outlined',
    },
    {
      title: 'Objekte',
      path: '/',
      icon: 'ic:baseline-data-object',
    },
    {
      title: 'Sensoren',
      path: '/',
      icon: 'tabler:photo-sensor-2',
    },
    {
      title: 'Kalender',
      path: '/',
      icon: 'mdi:calendar-outline',
    },
    {
      title: 'Statistik',
      path: '/',
      icon: 'gridicons:stats-alt',
    },
    {
      title: 'Benutzerverwaltung',
      path: '/',
      icon: 'ph:user',
    },
    {
      title: 'Administration',
      path: '/',
      icon: 'eos-icons:admin-outlined',
    },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'tabler:shield',
    // }
  ]
}

export default navigation
