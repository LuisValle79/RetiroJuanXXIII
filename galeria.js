document.addEventListener('DOMContentLoaded', function() {
    const testimonialForm = document.getElementById('testimonialForm');
    const testimonialsContainer = document.getElementById('testimonials-container');
    const maxTestimonials = 20; // Maximum number of testimonials to store

    // Load existing testimonials from localStorage
    const loadTestimonials = () => {
        const savedTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
        testimonialsContainer.innerHTML = ''; // Clear existing content
        savedTestimonials.forEach(testimonial => {
            addTestimonialToDOM(testimonial);
        });
    };

    // Add testimonial to DOM
    const addTestimonialToDOM = (testimonial) => {
        const formattedDate = new Date(testimonial.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const newTestimonial = `
            <div class="col-md-6 mb-4">
                <div class="testimonial-card" data-aos="fade-up">
                    <div class="testimonial-content">
                        <i class="fas fa-quote-left"></i>
                        <p>"${testimonial.testimony}"</p>
                        <div class="testimonial-author">
                            <div>
                                <h4>${testimonial.name}</h4>
                                <p>Compartido el ${formattedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        testimonialsContainer.insertAdjacentHTML('afterbegin', newTestimonial);
    };

    // Character counter for textarea
    const textarea = testimonialForm.querySelector('textarea');
    textarea.addEventListener('input', function() {
        const remaining = 500 - this.value.length;
        let feedbackColor = remaining < 50 ? 'text-danger' : 'text-muted';
        
        // Update or create character counter
        let counter = this.nextElementSibling;
        if (!counter || !counter.classList.contains('char-counter')) {
            counter = document.createElement('small');
            counter.classList.add('char-counter', 'mt-1', 'd-block');
            this.parentNode.appendChild(counter);
        }
        counter.className = `char-counter mt-1 d-block ${feedbackColor}`;
        counter.textContent = `${remaining} caracteres restantes`;
    });

    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = testimonialForm.querySelector('input[type="text"]').value.trim();
            const email = testimonialForm.querySelector('input[type="email"]').value.trim();
            const testimony = testimonialForm.querySelector('textarea').value.trim();

            // Enhanced form validation
            if (name.length < 2) {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, ingrese un nombre válido (mínimo 2 caracteres)',
                    icon: 'error',
                    confirmButtonColor: '#8B0D32'
                });
                return;
            }

            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, ingrese un email válido',
                    icon: 'error',
                    confirmButtonColor: '#8B0D32'
                });
                return;
            }

            if (testimony.length < 10 || testimony.length > 500) {
                Swal.fire({
                    title: 'Error',
                    text: 'El testimonio debe tener entre 10 y 500 caracteres',
                    icon: 'error',
                    confirmButtonColor: '#8B0D32'
                });
                return;
            }

            // Create testimonial object
            const testimonial = {
                name,
                email,
                testimony,
                date: new Date().toISOString()
            };

            // Save to localStorage with limit
            let savedTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
            savedTestimonials.unshift(testimonial);
            
            // Keep only the latest maxTestimonials
            if (savedTestimonials.length > maxTestimonials) {
                savedTestimonials = savedTestimonials.slice(0, maxTestimonials);
            }
            
            localStorage.setItem('testimonials', JSON.stringify(savedTestimonials));

            // Add to DOM
            addTestimonialToDOM(testimonial);

            // Show success message
            Swal.fire({
                title: '¡Gracias por compartir!',
                text: 'Tu testimonio ha sido añadido exitosamente.',
                icon: 'success',
                confirmButtonColor: '#8B0D32'
            });

            // Clear form
            testimonialForm.reset();
            // Clear character counter
            const counter = textarea.nextElementSibling;
            if (counter && counter.classList.contains('char-counter')) {
                counter.remove();
            }
        });
    }

    // Load saved testimonials when page loads
    loadTestimonials();

    // Initialize Fancybox for videos
    Fancybox.bind('[data-fancybox]', {
        // Fancybox options
    });
});