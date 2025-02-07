// Lista de nombres permitidos
const allowedNames = [
    "Diego Muñoz",
    "Cristian Velasquez",
    "Raul Flores",
    "Claudio Villegas",
    "Rodrigo Huaitro",
    "Diego Gallegos"
];

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

// Función para descargar el PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf; // Obtener la referencia a jsPDF
    const doc = new jsPDF();

    // Agregar título
    doc.setFontSize(18);
    doc.text('Lista de Asistencia', 14, 20);

    // Obtener la lista de asistencia
    const attendanceList = JSON.parse(localStorage.getItem('attendance')) || [];
    let y = 30; // Posición vertical inicial

    // Agregar encabezados de la tabla
    doc.setFontSize(12);
    doc.text('Nombre', 14, y);
    doc.text('Asistencia', 60, y);
    doc.text('Fecha', 100, y);
    doc.text('Hora', 140, y);
    y += 10; // Espacio entre encabezados y datos

    // Agregar datos de asistencia
    attendanceList.forEach(item => {
        doc.text(item.name, 14, y);
        doc.text(item.attendance, 60, y);
        doc.text(item.date, 100, y);
        doc.text(item.time, 140, y);
        y += 10; // Espacio entre filas
    });

    // Descargar el PDF
    doc.save('lista_asistencia.pdf');
}

// Manejo del formulario de asistencia
document.getElementById('attendance-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    // Verificar si el nombre está en la lista de permitidos
    if (!allowedNames.includes(name)) {
        alert('El nombre ingresado no está permitido. Por favor, ingrese un nombre válido.');
        return;
    }

    const attendanceList = JSON.parse(localStorage.getItem('attendance')) || [];
    attendanceList.push({ name, attendance, date, time });
    localStorage.setItem('attendance', JSON.stringify(attendanceList));

    alert('Asistencia marcada exitosamente');
    loadAttendance();
});

// Manejo del botón de descarga de PDF
document.getElementById('download-pdf').addEventListener('click', downloadPDF);

// Cargar asistencia al inicio
loadAttendance();