document.addEventListener('DOMContentLoaded', function() {
    // Initialize Fancybox
    Fancybox.bind('[data-fancybox]', {
        // Your custom options
    });

    // Handle testimonial form submission
    const testimonialForm = document.getElementById('testimonialForm');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            Swal.fire({
                title: '¡Gracias por compartir!',
                text: 'Tu testimonio ha sido enviado exitosamente.',
                icon: 'success',
                confirmButtonColor: '#8B0D32'
            });
            testimonialForm.reset();
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});