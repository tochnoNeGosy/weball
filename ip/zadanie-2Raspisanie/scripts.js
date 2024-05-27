function generateSchedule() {
    const form = document.getElementById('scheduleForm');
    const formData = new FormData(form);
    const auditorium = formData.get('auditorium');
    const table = document.getElementById('scheduleTable');
    table.innerHTML = ''; // Clear existing table content

    const headers = ['Время', 'Статус'];
    const schedules = {
        '101': [
            { time: '09:00 - 10:00', status: 'Занято' },
            { time: '10:00 - 11:00', status: 'Свободно' },
            { time: '11:00 - 12:00', status: 'Занято' },
            { time: '12:00 - 13:00', status: 'Свободно' },
            { time: '13:00 - 14:00', status: 'Занято' }
        ],
        '102': [
            { time: '09:00 - 10:00', status: 'Свободно' },
            { time: '10:00 - 11:00', status: 'Свободно' },
            { time: '11:00 - 12:00', status: 'Занято' },
            { time: '12:00 - 13:00', status: 'Занято' },
            { time: '13:00 - 14:00', status: 'Свободно' }
        ],
        '103': [
            { time: '09:00 - 10:00', status: 'Занято' },
            { time: '10:00 - 11:00', status: 'Занято' },
            { time: '11:00 - 12:00', status: 'Свободно' },
            { time: '12:00 - 13:00', status: 'Свободно' },
            { time: '13:00 - 14:00', status: 'Свободно' }
        ]
    };

    const scheduleData = schedules[auditorium] || [];

    if (scheduleData.length === 0) {
        alert('Данные для указанной аудитории не найдены.');
        return;
    }

    // Generate table headers
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Generate table rows
    scheduleData.forEach(item => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = item.time;
        row.appendChild(timeCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = item.status;
        statusCell.classList.add(item.status === 'Свободно' ? 'free' : 'occupied');
        row.appendChild(statusCell);

        table.appendChild(row);
    });
}

function clearSchedule() {
    const table = document.getElementById('scheduleTable');
    table.innerHTML = '';
}
