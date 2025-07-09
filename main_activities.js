const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwi6mXFPnMbonfF3UwKO-Txrwvc3v8fyKcwphtE1sPfnmhmQdQRJFdqQTjySwJ1jcOy/exec';

document.addEventListener('DOMContentLoaded', () => {
    const activitiesContainer = document.getElementById('activities-container');

    const loadActivities = async () => {
        try {
            const response = await fetch(APPS_SCRIPT_URL);
            const data = await response.json();

            if (data.length === 0) {
                activitiesContainer.innerHTML = '<p class="text-center">No hay actividades programadas actualmente.</p>';
            } else {
                activitiesContainer.innerHTML = ''; // Limpiar el mensaje de "no hay actividades"
                data.forEach(activity => {
                    const activityCard = document.createElement('div');
                    activityCard.classList.add('col-md-4');
                    activityCard.innerHTML = `
                        <div class="card activity-card">
                            <img src="${activity.imagenUrl}" class="card-img-top" alt="${activity.titulo}">
                            <div class="card-body">
                                <h5 class="card-title">${activity.titulo}</h5>
                                <p class="card-text"><small class="text-muted">${activity.fecha} - ${activity.ubicacion}</small></p>
                                <p class="card-text">${activity.descripcion}</p>
                            </div>
                        </div>
                    `;
                    activitiesContainer.appendChild(activityCard);
                });
            }
        } catch (error) {
            console.error('Error al cargar actividades:', error);
            activitiesContainer.innerHTML = '<p class="text-center text-danger">Error al cargar actividades. Por favor, inténtalo de nuevo más tarde.</p>';
        }
    };

    loadActivities();
});