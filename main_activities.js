import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://qnnhtuistcezjagsqzyj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFubmh0dWlzdGNlemphZ3NxenlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTkxNzQsImV4cCI6MjA2NzczNTE3NH0.NSlKBigrZzqAYEQfBIHAAiNY9jgSpL2mjbOnUTfpemc';
const TABLE_NAME = 'activities';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const activitiesContainer = document.getElementById('activities-container');

    const loadActivities = async () => {
        try {
            const { data, error } = await supabase
                .from(TABLE_NAME)
                .select('*')
                .order('fecha', { ascending: false });

            if (error) throw error;

            if (data.length === 0) {
                activitiesContainer.innerHTML = '<p class="text-center">No hay actividades programadas actualmente.</p>';
            } else {
                activitiesContainer.innerHTML = '';
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

    // Inicializar la carga de actividades
    loadActivities();

    // Escuchar eventos de actualización desde el panel (opcional, si usas eventos personalizados)
    window.addEventListener('activitiesUpdated', () => {
        loadActivities();
    });
});