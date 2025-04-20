const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "1010101100110101";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#888";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 35);

    window.addEventListener("resize", () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    });

    // Add this to your existing script
    // Replace the existing initParticles function with this improved version
    function initParticles() {
      const canvas = document.getElementById('particleCanvas');
      const ctx = canvas.getContext('2d');

      let width = window.innerWidth;
      let height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      const particles = [];
      const particleCount = 150; // Adjusted count

      class Particle {
        constructor() {
          this.reset();
        }

        reset() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 2;
          this.vy = (Math.random() - 0.5) * 2;
          this.radius = Math.random() * 2 + 1; // Increased size
          this.opacity = Math.random() * 0.5 + 0.5; // Increased opacity
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > width) this.vx = -this.vx;
          if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }
      }

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p1, i) => {
          p1.update();

          // Draw connections with increased visibility
          particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) { // Increased connection distance
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 0, 0, ${(1 - dist / 200) * 0.5})`; // Increased opacity
              ctx.lineWidth = 1;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });

          // Draw particle
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 0, 0, ${p1.opacity})`;
          ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        requestAnimationFrame(animate);
      }

      animate();

      window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        particles.forEach(p => p.reset());
      });
    }
    // Call the function after window loads
    window.addEventListener('load', initParticles);

    // Add fade-in animation to sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    // Add this to your script section
    document.addEventListener('DOMContentLoaded', function () {
      // Skill progress animation
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-progress');
          }
        });
      });

      document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
      });

      // Typing effect for landing page
      const text = "Crafting Future-Ready Tech with Stealth and Precision";
      const typingElement = document.querySelector('#landing p');
      let i = 0;

      function typeWriter() {
        if (i < text.length) {
          typingElement.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      }

      typeWriter();
    });
