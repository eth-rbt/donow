// DOM elements
const numberInput = document.getElementById('numberInput');
const submitBtn = document.querySelector('.submit-btn');
const inputFeedback = document.getElementById('inputFeedback');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    numberInput.addEventListener('keypress', handleKeyPress);
    numberInput.addEventListener('input', handleInput);
    
    // Add smooth scrolling for navigation links
    addSmoothScrolling();
    
    // Add intersection observer for animations
    addScrollAnimations();
    
    // Add particle effect
    createParticles();
});

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSubmit();
    }
}

// Handle input changes
function handleInput(event) {
    const value = event.target.value;
    
    // Clear feedback when user starts typing
    if (inputFeedback.textContent) {
        inputFeedback.textContent = '';
        inputFeedback.className = 'input-feedback';
    }
    
    // Add visual feedback for valid numbers
    if (value && !isNaN(value) && parseInt(value) > 0) {
        numberInput.style.borderColor = '#4caf50';
    } else if (value) {
        numberInput.style.borderColor = '#f44336';
    } else {
        numberInput.style.borderColor = 'transparent';
    }
}

// Handle form submission
function handleSubmit() {
    const value = numberInput.value.trim();
    
    if (!value) {
        showFeedback('Please enter a number', 'error');
        return;
    }
    
    if (isNaN(value) || parseInt(value) <= 0) {
        showFeedback('Please enter a valid positive number', 'error');
        return;
    }
    
    // Show loading state
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div>';
    submitBtn.disabled = true;
    
    // Simulate processing (replace with actual API call)
    setTimeout(() => {
        processNumber(parseInt(value));
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }, 1500);
}

// Process the number
function processNumber(number) {
    // This is where you would typically make an API call
    // For now, we'll just show a success message with some calculations
    
    const result = number * 2; // Example calculation
    const message = `Success! Your number ${number} has been processed. Result: ${result}`;
    
    showFeedback(message, 'success');
    
    // Add some visual effects
    addSuccessEffects();
    
    // Clear input after successful submission
    setTimeout(() => {
        numberInput.value = '';
        numberInput.style.borderColor = 'transparent';
    }, 2000);
}

// Show feedback message
function showFeedback(message, type) {
    inputFeedback.textContent = message;
    inputFeedback.className = `input-feedback ${type}`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            inputFeedback.textContent = '';
            inputFeedback.className = 'input-feedback';
        }, 5000);
    }
}

// Add success effects
function addSuccessEffects() {
    // Create confetti effect
    createConfetti();
    
    // Add pulse animation to the input
    const inputWrapper = document.querySelector('.input-wrapper');
    inputWrapper.style.animation = 'pulse 0.6s ease-in-out';
    
    setTimeout(() => {
        inputWrapper.style.animation = '';
    }, 600);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd700'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 5000);
        }, i * 50);
    }
}

// Add smooth scrolling for navigation links
function addSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add scroll animations
function addScrollAnimations() {
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
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Create particle effect
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

// Create individual particle
function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
    
    container.appendChild(particle);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add some interactive features
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
});

// Reset card transforms when mouse leaves
document.addEventListener('mouseleave', function() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.style.transform = '';
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Clear any active feedback
        inputFeedback.textContent = '';
        inputFeedback.className = 'input-feedback';
        numberInput.value = '';
        numberInput.style.borderColor = 'transparent';
    }
});

// Add some fun Easter eggs
let clickCount = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', function() {
    clickCount++;
    
    if (clickCount === 5) {
        // Easter egg: Change the gradient colors
        const gradientText = document.querySelector('.gradient-text');
        const colors = [
            'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
            'linear-gradient(45deg, #ff9a9e, #fecfef, #fecfef, #ff9a9e)',
            'linear-gradient(45deg, #a8edea, #fed6e3, #fed6e3, #a8edea)',
            'linear-gradient(45deg, #ffecd2, #fcb69f, #fcb69f, #ffecd2)',
            'linear-gradient(45deg, #ff9a9e, #fad0c4, #fad0c4, #ff9a9e)'
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        gradientText.style.background = randomColor;
        
        // Reset counter after a delay
        setTimeout(() => {
            clickCount = 0;
        }, 3000);
    }
}); 