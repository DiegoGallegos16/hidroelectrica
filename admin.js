// Almacenar administradores en el Local Storage
const defaultAdmin = {
    username: 'admin',
    password: 'admin123'
};

// Inicializar el almacenamiento de administradores si está vacío
if (!localStorage.getItem('admins')) {
    localStorage.setItem('admins', JSON.stringify([defaultAdmin]));
}

// Manejo del inicio de sesión del administrador
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    const admin = existingAdmins.find(admin => admin.username === username && admin.password === password);

    if (admin) {
        document.getElementById('admin-actions').style.display = 'block';
        alert('Inicio de sesión exitoso');
        loadAdminAttendance(); // Cargar la lista de asistencia
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Manejo del formulario de registro de administradores
document.getElementById('admin-registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const registerUsername = document.getElementById('register-username').value;
    const registerPassword = document.getElementById('register-password').value;

    const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    if (existingAdmins.some(admin => admin.username === registerUsername)) {
        alert('El nombre de usuario ya está en uso.');
        return;
    }

    // Agregar nuevo administrador
    existingAdmins.push({ username: registerUsername, password: registerPassword });
    localStorage.setItem('admins', JSON.stringify(existingAdmins));
    alert(`Administrador ${registerUsername} registrado exitosamente`);
});

// Manejo del cambio de contraseña
document.getElementById('change-password-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newPassword = document.getElementById('new-password').value;

    // Cambiar la contraseña del administrador por defecto
    const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    const adminIndex = existingAdmins.findIndex(admin => admin.username === 'admin');

    if (adminIndex !== -1) {
        existingAdmins[adminIndex].password = newPassword;
        localStorage.setItem('admins', JSON.stringify(existingAdmins));
        alert('Contraseña cambiada exitosamente');
    } else {
        alert('No se pudo cambiar la contraseña.');
    }
});

// Manejo del cierre de sesión
document.getElementById('logout-button').addEventListener('click', function() {
    document.getElementById('admin-actions').style.display = 'none';
    alert('Has cerrado sesión');
});

// Función para cargar la asistencia en el panel de administración
function loadAdminAttendance() {
    const attendanceList = JSON.parse(localStorage.getItem('attendance')) || [];
    const adminListElement = document.getElementById('admin-list');

    // Limpiar la lista
    adminListElement.innerHTML = '';

    // Cargar asistencia en la lista de administración
    attendanceList.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.attendance}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td><button onclick="deleteAttendance('${item.name}')">Eliminar</button></td>
        `;
        adminListElement.appendChild(row);
    });
}

// Función para eliminar asistencia
function deleteAttendance(name) {
    const attendanceList = JSON.parse(localStorage.getItem('attendance')) || [];
    const updatedList = attendanceList.filter(item => item.name !== name);
    localStorage.setItem('attendance', JSON.stringify(updatedList));
    loadAdminAttendance();
}

// Cargar asistencia al inicio del panel de administración
loadAdminAttendance();