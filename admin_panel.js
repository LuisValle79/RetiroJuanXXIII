const activityForm = document.getElementById('activityForm');
    const activitiesList = document.getElementById('activitiesList');
    const noActivitiesMessage = document.getElementById('noActivitiesMessage');

    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwi6mXFPnMbonfF3UwKO-Txrwvc3v8fyKcwphtE1sPfnmhmQdQRJFdqQTjySwJ1jcOy/exec';

let activities = [];

    const renderActivities = async () => {
    activitiesList.innerHTML = '';
    try {
        const response = await fetch(APPS_SCRIPT_URL);
        const data = await response.json();
        activities = data; // Actualiza la variable global de actividades

        if (activities.length === 0) {
            noActivitiesMessage.classList.remove('d-none');
        } else {
            noActivitiesMessage.classList.add('d-none');
            activities.forEach((activity, index) => {
                const activityItem = document.createElement('div');
                activityItem.classList.add('list-group-item', 'activity-list-item');
                activityItem.innerHTML = `
                    <div class="activity-info">
                        <h5>${activity.titulo}</h5>
                        <small>${activity.fecha} - ${activity.ubicacion}</small>
                        <p>${activity.descripcion}</p>
                        <small>Image: <img src="${activity.imagenUrl}" alt="${activity.titulo}" style="max-width: 50px; max-height: 50px;"></small>
                    </div>
                    <div class="activity-actions">
                        <button class="btn btn-sm btn-warning edit-btn" data-index="${index}">Editar</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Eliminar</button>
                    </div>
                `;
                activitiesList.appendChild(activityItem);
            });
        }
    } catch (error) {
        console.error('Error al cargar actividades:', error);
        noActivitiesMessage.classList.remove('d-none'); // Mostrar mensaje de error o no hay actividades
        noActivitiesMessage.textContent = 'Error al cargar actividades. Por favor, inténtalo de nuevo más tarde.';
    }
};

    const saveActivityToSheet = async (newActivity) => {
    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Necesario para evitar errores CORS con Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newActivity),
        });
        // Apps Script con mode: 'no-cors' no devuelve una respuesta JSON parseable
        // Solo podemos verificar que la petición se envió sin errores de red.
        console.log('Actividad enviada a Google Sheets.');
        renderActivities(); // Vuelve a renderizar para mostrar la actividad recién añadida
    } catch (error) {
        console.error('Error al guardar actividad en Google Sheets:', error);
        alert('Error al guardar actividad. Por favor, inténtalo de nuevo.');
    }
};

    activityForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('activityTitle').value;
        const description = document.getElementById('activityDescription').value;
        const date = document.getElementById('activityDate').value;
        const location = document.getElementById('activityLocation').value;
        const imageFile = document.getElementById('activityImage').files[0];

    if (title && description && date && location && imageFile) { // Validar que todos los campos estén llenos
        const reader = new FileReader();
        reader.onload = function(event) {
            const image = event.target.result; // Data URL de la imagen
            const newActivity = {
                id: Date.now(), // Un ID único para la actividad
                titulo: title,
                descripcion: description,
                fecha: date,
                ubicacion: location,
                imagenUrl: image // Usamos imagenUrl para que coincida con el Apps Script
            };
            saveActivityToSheet(newActivity); // Llama a la nueva función para guardar en Sheets
            activityForm.reset();
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('Por favor, completa todos los campos y selecciona una imagen.');
    }
    });

    activitiesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
        alert('La función de eliminar no está implementada con Google Sheets en esta versión.');
        // Aquí iría la lógica para eliminar de Google Sheets si el Apps Script lo soportara
    } else if (e.target.classList.contains('edit-btn')) {
        alert('La función de editar no está implementada con Google Sheets en esta versión.');
        // Aquí iría la lógica para editar en Google Sheets si el Apps Script lo soportara
    }
    });

    renderActivities();
