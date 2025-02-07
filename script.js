function loadAttendance() {
    const attendanceList = JSON.parse(localStorage.getItem('attendance')) || [];
    const listElement = document.getElementById('list');

    // Limpiar la lista
    listElement.innerHTML = '';

    // Cargar asistencia en la lista de usuarios
    attendanceList.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.attendance}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
        `;
        listElement.appendChild(row);
    });
}

function saveAttendance(name, attendance) {
    const attendanceList = JSON.parse(localStorage.getItem('attendance')) || [];
    const now = new Date();
    const date = now.toLocaleDateString('es-ES'); // Formato de fecha
    const time = now.toLocaleTimeString('es-ES'); // Formato de hora

    attendanceList.push({ name, attendance, date, time });
    localStorage.setItem('attendance', JSON.stringify(attendanceList));
}

// Manejo del formulario de asistencia
document.getElementById('attendance-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;

    // Guardar en Local Storage
    saveAttendance(name, attendance);

    // Actualizar la lista en la interfaz
    loadAttendance();

    // Limpiar el formulario
    this.reset();
});

// Cargar la lista de asistencia al cargar la página
window.onload = loadAttendance;