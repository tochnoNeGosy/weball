async function loadGroupList() {
	clearSchedule();
	const response = await fetch('https://vm.nathoro.ru/timetable/groups');
	const data = await response.json();
	const table = document.getElementById('scheduleTable');
	const headerRow = document.createElement('tr');
	const th = document.createElement('th');
	th.textContent = "Названиее группы";
	headerRow.appendChild(th);
	table.appendChild(headerRow);
	
	data.forEach(group => {
		const row = document.createElement('tr');
		const th = document.createElement('th');
		th.textContent = group.name;
		row.appendChild(th);
		table.appendChild(row);
	});
}

async function loadRoomList() {
	clearSchedule();
	const response = await fetch('https://vm.nathoro.ru/timetable/rooms');
	const data = await response.json();
	const table = document.getElementById('scheduleTable');
	const headerRow = document.createElement('tr');
	const th = document.createElement('th');
	th.textContent = "Номер кабинета";
	headerRow.appendChild(th);
	table.appendChild(headerRow);
	
	data.forEach(group => {
		const row = document.createElement('tr');
		const th = document.createElement('th');
		th.textContent = group.name;
		row.appendChild(th);
		table.appendChild(row);
	});
}

async function loadTeachersList() {
	clearSchedule();
	const response = await fetch('https://vm.nathoro.ru/timetable/teachers');
	const data = await response.json();
	const table = document.getElementById('scheduleTable');
	const headerRow = document.createElement('tr');
	const th = document.createElement('th');
	th.textContent = "ФИО";
	headerRow.appendChild(th);
	table.appendChild(headerRow);
	
	data.forEach(group => {
		const row = document.createElement('tr');
		const th = document.createElement('th');
		th.textContent = group.fullName;
		row.appendChild(th);
		table.appendChild(row);
	});
}

function clearSchedule(){
	const table = document.getElementById('scheduleTable');
	table.innerHTML = '';
	const days = document.getElementById('days');
	days.innerHTML = '';
}

function createTable(day) {
    const table = document.createElement('table');
	const headers = [
		'1-я 8:30-9:50', 
		'2-я 10:10-11:30', 
		'3-я 11:40-13:00', 
		'4-я 13:30-14:50', 
		'5-я 15:05-16:25', 
		'6-я 16:40-18:00', 
		'7-я 18:15-19:35', 
		'8-я 19:50-21:10'
	];
	const daysOfWeek = ['Пара Время', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Суб', 'Вск'];
	
	const headRow = document.createElement('tr');
	const fcell = document.createElement('td');
	fcell.textContent = daysOfWeek[0]
	headRow.appendChild(fcell);
	headers.forEach(head => {
		const cell = document.createElement('td');
		cell.textContent = head;
		headRow.appendChild(cell);
	});
    table.appendChild(headRow);
	

    day.forEach((data, index) => {
        const row = document.createElement('tr');

        // Добавляем ячейку с днем недели
        const dayCell = document.createElement('td');
        dayCell.textContent = daysOfWeek[index + 1]; // +1, чтобы пропустить 'Пара Время'
        row.appendChild(dayCell);

        // Добавляем остальные ячейки с уроками
        const lessons = data.lessons;
        lessons.forEach(lesson => {
            const lessonCell = document.createElement('td');
            if (lesson !== null) {
                lessonCell.textContent = `${lesson.subject.name} (${lesson.subject.type}) - Преподаватель: ${lesson.subject.teacher.fullName}`;
				lessonCell.classList.add('occupied');
            } else {
				lessonCell.classList.add('free');
                lessonCell.textContent = "";
            }
            row.appendChild(lessonCell);
        });

        table.appendChild(row);
    });

    return table;
}

async function generateScheduleGroup(){
	clearSchedule();
	const form = document.getElementById('scheduleForm');
    const formData = new FormData(form);
    const group = formData.get('auditorium');
	
	const test = `https://vm.nathoro.ru/timetable/by-group/${group}`
	
	const response = await fetch(`https://vm.nathoro.ru/timetable/by-group/${group}`);
	const data = await response.json();
	const divV = document.getElementById('days');
	data.forEach(data => {
		const dayData = data.days;
		const table = createTable(dayData);
		divV.appendChild(table);
	});
}

async function generateScheduleTeacher(){
	clearSchedule();
	const form = document.getElementById('scheduleForm');
    const formData = new FormData(form);
    const teacher = formData.get('auditorium');
	
	const test = `https://vm.nathoro.ru/timetable/by-teacher/${teacher}`
	
	const response = await fetch(`https://vm.nathoro.ru/timetable/by-teacher/${teacher}`);
	const data = await response.json();
	const divV = document.getElementById('days');
	data.forEach(data => {
		const dayData = data.days;
		const table = createTable(dayData);
		divV.appendChild(table);
	});
}

async function generateScheduleRoom(){
	clearSchedule();
	const form = document.getElementById('scheduleForm');
    const formData = new FormData(form);
	
	const room = formData.get('auditorium');
	const encodedRoom = room.replace(/\//g, '%2F');
	
	const test = `https://vm.nathoro.ru/timetable/by-room/${encodedRoom}`
	
	const response = await fetch(`https://vm.nathoro.ru/timetable/by-room/${encodedRoom}`);
	const data = await response.json();
	const divV = document.getElementById('days');
	data.forEach(data => {
		const dayData = data.days;
		const table = createTable(dayData);
		divV.appendChild(table);
	});
}