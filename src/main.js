document.addEventListener('DOMContentLoaded', () => {
  // Typewriter effect
  const typewriterElement = document.getElementById('typewriter');
  const textToType = 'I am a Front-end Developer';
  let charIndex = 0;
  
  function typeWriter() {
    if (charIndex < textToType.length) {
      typewriterElement.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    }
  }
  
  // Start the animation with a slight delay
  setTimeout(typeWriter, 500);

  // Progress bar logic
  const progressBar = document.getElementById('progress-bar');
  const updateProgress = () => {
    if (progressBar) {
      const scrollPosition = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }
  };
  window.addEventListener('scroll', updateProgress);
  updateProgress(); // Initial call

  // Particle animation logic
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let isHeroVisible = true;

    const resize = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor((width * height) / 15000), 100);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    };

    const animate = () => {
      if (!isHeroVisible) {
        requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      
      const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLightTheme) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // Draw lines between close particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.globalAlpha = (1 - dist / 100) * 0.2;
            if (isLightTheme) {
                ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
            } else {
                ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
            }
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    
    // Performance optimization: only animate when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        isHeroVisible = entries[0].isIntersecting;
    });
    heroObserver.observe(document.getElementById('section0'));

    resize();
    animate();
  }

  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('#fp-nav a');

  // Update active state in nav based on scroll position
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      } else {
        // Remove the class when scrolling out of view to re-trigger the animation next time
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Smooth scroll for nav links (since CSS scroll-behavior might not perfectly snap without it)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact form validation handling
  const form = document.getElementById('contactForm');
  if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    const validateField = (input, errorId, validationFn, emptyMsg, invalidMsg) => {
      const errorSpan = document.getElementById(errorId);
      const value = input.value.trim();

      if (!value) {
        errorSpan.textContent = emptyMsg;
        input.classList.add('error');
        return false;
      }

      if (validationFn && !validationFn(value)) {
        errorSpan.textContent = invalidMsg;
        input.classList.add('error');
        return false;
      }

      errorSpan.textContent = '';
      input.classList.remove('error');
      return true;
    };

    const handleInput = (e) => {
      if (e.target === nameInput) {
        validateField(nameInput, 'nameError', null, 'Name is required.', '');
      } else if (e.target === emailInput) {
        validateField(emailInput, 'emailError', validateEmail, 'Email is required.', 'Please enter a valid email address.');
      } else if (e.target === messageInput) {
        validateField(messageInput, 'messageError', null, 'Message is required.', '');
      }
    };

    nameInput.addEventListener('input', handleInput);
    emailInput.addEventListener('input', handleInput);
    messageInput.addEventListener('input', handleInput);

    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Always prevent default to handle via fetch

      const isNameValid = validateField(nameInput, 'nameError', null, 'Name is required.', '');
      const isEmailValid = validateField(emailInput, 'emailError', validateEmail, 'Email is required.', 'Please enter a valid email address.');
      const isMessageValid = validateField(messageInput, 'messageError', null, 'Message is required.', '');

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        return; // Stop if invalid
      }

      const submitBtn = document.getElementById('submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          showToast('Message sent successfully!');
        } else {
          showToast('Oops! There was a problem submitting your form.', 'error');
        }
      } catch (error) {
        showToast('Oops! There was a problem submitting your form.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  function showToast(message, type = 'success') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = `show ${type}`;
    
    setTimeout(() => {
      toast.className = toast.className.replace('show', '').trim();
    }, 3000);
  }
});
