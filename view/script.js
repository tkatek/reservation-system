 
        // Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 0';
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Set minimum date for check-in to today
const today = new Date().toISOString().split('T')[0];
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');

if (checkInInput) {
    checkInInput.setAttribute('min', today);
    
    // Update check-out minimum date when check-in changes
    checkInInput.addEventListener('change', (e) => {
        const checkInDate = new Date(e.target.value);
        checkInDate.setDate(checkInDate.getDate() + 1);
        const minCheckOut = checkInDate.toISOString().split('T')[0];
        checkOutInput.setAttribute('min', minCheckOut);
        
        // Reset check-out if it's before new minimum
        if (checkOutInput.value && checkOutInput.value < minCheckOut) {
            checkOutInput.value = '';
        }
    });
}

// Reservation Form Handler
const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            guests: document.getElementById('guests').value,
            roomType: document.getElementById('roomType').value
        };
        
        // Show loading state
        const submitBtn = reservationForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Checking...';
        submitBtn.disabled = true;
        
        // Here you would normally send the data to your backend
        console.log('Reservation Data:', formData);
        
        // Simulate API call
        setTimeout(() => {
            // Remove any existing success messages
            const existingMessage = reservationForm.querySelector('.form-success');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Availability confirmed! We will contact you shortly to complete your reservation.';
            reservationForm.appendChild(successMessage);
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Reset form after 3 seconds
            setTimeout(() => {
                reservationForm.reset();
                successMessage.remove();
            }, 3000);
            
            // TODO: Replace this with actual backend API call
            // Example:
            /*
            fetch('/api/check-availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success response
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error
            });
            */
        }, 1500);
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Here you would normally send the data to your backend
        console.log('Contact Form Data:', formData);
        
        // Simulate API call
        setTimeout(() => {
            // Remove any existing success messages
            const existingMessage = contactForm.querySelector('.form-success');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
            contactForm.appendChild(successMessage);
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                successMessage.remove();
            }, 3000);
            
            // TODO: Replace this with actual backend API call
            // Example:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success response
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error
            });
            */
        }, 1500);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.room-card, .amenity-card, .offer-card, .award-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Price calculation helper (for future use)
function calculateTotalPrice(checkIn, checkOut, roomType) {
    const prices = {
        'luxury': 200,
        'deluxe': 250,
        'studio': 300,
        'executive': 350,
        'premier': 450,
        'penthouse': 600
    };
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const pricePerNight = prices[roomType] || 200;
    
    return {
        nights: nights,
        pricePerNight: pricePerNight,
        total: nights * pricePerNight
    };
}

// Add hover effect to room cards
document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
    
    card.addEventListener('click', function() {
        // Get room type from card
        const roomTitle = this.querySelector('.room-title').textContent;
        const roomType = roomTitle.toLowerCase().replace(' ', '');
        
        // Scroll to reservation section
        const reservationSection = document.getElementById('reservation');
        reservationSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-select room type
        setTimeout(() => {
            const roomTypeSelect = document.getElementById('roomType');
            if (roomTypeSelect) {
                // Try to match the room type
                const options = roomTypeSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].textContent.toLowerCase().includes(roomTitle.split(' ')[0].toLowerCase())) {
                        roomTypeSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }, 800);
    });
});

// Log ready state
console.log('Vista Suites - Luxury Hotel Website Loaded');
console.log('Backend integration required for:');
console.log('1. Reservation form submission');
console.log('2. Contact form submission');
console.log('3. Availability checking');
console.log('4. Payment processing');
