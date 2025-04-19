document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Stats counter animation
    const counters = document.querySelectorAll('.counter');
    const options = {
        threshold: 1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.innerText;
                let count = 0;
                const updateCount = () => {
                    const increment = target.includes('K') ? 100 : 1;
                    if (count < parseInt(target)) {
                        count += increment;
                        counter.innerText = count + (target.includes('K') ? 'K' : '');
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
});


function sendWhatsApp(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    const text = `*Nuevo mensaje de contacto*%0A%0A*Nombre:* ${nombre}%0A*Email:* ${email}%0A*Mensaje:* ${mensaje}`;
    
    window.open(`https://wa.me/51993672236?text=${text}`, '_blank');
    
    // Limpiar el formulario
    document.getElementById('contactForm').reset();
}