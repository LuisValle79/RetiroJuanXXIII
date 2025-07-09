const activityForm = document.getElementById('activityForm');
    const activitiesList = document.getElementById('activitiesList');
    const noActivitiesMessage = document.getElementById('noActivitiesMessage');

    let activities = JSON.parse(localStorage.getItem('activities')) || [];

    const renderActivities = () => {
        activitiesList.innerHTML = '';
        if (activities.length === 0) {
            noActivitiesMessage.classList.remove('d-none');
        } else {
            noActivitiesMessage.classList.add('d-none');
            activities.forEach((activity, index) => {
                const activityItem = document.createElement('div');
                activityItem.classList.add('list-group-item', 'activity-list-item');
                activityItem.innerHTML = `
                    <div class="activity-info">
                        <h5>${activity.title}</h5>
                        <small>${activity.date} - ${activity.location}</small>
                        <p>${activity.description}</p>
                        <small>Image: <img src="${activity.image}" alt="${activity.title}" style="max-width: 50px; max-height: 50px;"></small>
                    </div>
                    <div class="activity-actions">
                        <button class="btn btn-sm btn-warning edit-btn" data-index="${index}">Editar</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Eliminar</button>
                    </div>
                `;
                activitiesList.appendChild(activityItem);
            });
        }
    };

    const saveActivities = () => {
        localStorage.setItem('activities', JSON.stringify(activities));
        renderActivities();
    };

    activityForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('activityTitle').value;
        const description = document.getElementById('activityDescription').value;
        const date = document.getElementById('activityDate').value;
        const location = document.getElementById('activityLocation').value;
        const imageFile = document.getElementById('activityImage').files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const image = event.target.result;
                const newActivity = { title, description, date, location, image };
                activities.push(newActivity);
                saveActivities();
                activityForm.reset();
            };
            reader.readAsDataURL(imageFile);
        } else {
            alert('Por favor, selecciona una imagen.');
        }
    });

    activitiesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            activities.splice(index, 1);
            saveActivities();
        } else if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            const activityToEdit = activities[index];

            document.getElementById('activityTitle').value = activityToEdit.title;
            document.getElementById('activityDescription').value = activityToEdit.description;
            document.getElementById('activityDate').value = activityToEdit.date;
            document.getElementById('activityLocation').value = activityToEdit.location;
            // For file input, you cannot set its value directly for security reasons.
            // You might want to display the current image or a placeholder.
            // document.getElementById('activityImage').value = activityToEdit.image;

            // Remove the activity from the array to re-add it after editing
            activities.splice(index, 1);
            saveActivities();
        }
    });

    renderActivities();
