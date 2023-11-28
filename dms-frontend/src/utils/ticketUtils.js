export const statusColorSelector = {
    'Opened': 'primary',
    'In-progress': 'warning',
    'Completed': 'success'
}

export const statusBarCalculator = {
    'Opened': 33,
    'In-progress': 66,
    'Completed': 100
}

export const urgencyColorSelector = {
    'Low': 'info',
    'Medium': 'secondary',
    'High': 'warning',
    'Critical': 'error'
}

export const calculateTicketStats = (stats) => {
    return [
        {
            stats: stats['opened'] || 0,
            title: 'Opened Tickets',
            avatarColor: 'primary',
            icon: 'ph:ticket'
        },
        {
            stats: stats['inProgress'] || 0,
            title: 'In-progress Tickets',
            avatarColor: 'warning',
            icon: 'lets-icons:time-progress-fill'
        },
        {
            stats: stats['completed'] || 0,
            title: 'Completed Tickets',
            avatarColor: 'success',
            icon: 'carbon:task-complete'
        }
    ];
}