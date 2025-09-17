// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle CTA button click
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('books');
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.book-card, .stat-item, .contact-link');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Image loading effect
    const bookImages = document.querySelectorAll('.book-image');
    bookImages.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hologram-effect, .nebula');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('nebula') ? 0.5 : 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        let index = 0;
        
        // Only run typing effect on first load
        if (!sessionStorage.getItem('titleAnimated')) {
            heroTitle.textContent = '';
            
            function typeWriter() {
                if (index < originalText.length) {
                    heroTitle.textContent += originalText.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                } else {
                    sessionStorage.setItem('titleAnimated', 'true');
                }
            }
            
            setTimeout(typeWriter, 1000);
        }
    }

    // Dynamic star field animation
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        const starCount = 50;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.backgroundColor = '#fff';
            star.style.borderRadius = '50%';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.opacity = Math.random();
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
            
            starsContainer.appendChild(star);
        }
    }

    // Add twinkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.3; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Create additional stars
    createStars();

    // Mobile menu toggle (if needed)
    const navMenu = document.querySelector('.nav-menu');
    const navBrand = document.querySelector('.nav-brand');
    
    // Add mobile menu button if screen is small
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: none;
        `;
        
        navBrand.appendChild(menuButton);
        
        menuButton.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none';
        });
        
        // Show/hide menu button based on screen size
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                menuButton.style.display = 'block';
                navMenu.style.display = 'none';
            } else {
                menuButton.style.display = 'none';
                navMenu.style.display = 'flex';
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }
});

// Enhanced cursor effect for sci-fi feel
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) {
        const glowCursor = document.createElement('div');
        glowCursor.className = 'cursor-glow';
        glowCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(glowCursor);
    }
    
    const glowElement = document.querySelector('.cursor-glow');
    glowElement.style.left = e.clientX - 10 + 'px';
    glowElement.style.top = e.clientY - 10 + 'px';
});

// Console easter egg
console.log(`
🚀 Welcome to Carl P. Williams' Sci-Fi Universe! 🚀

    ╔══════════════════════════════════════╗
    ║  "The Missing Linc" - Now Available  ║
    ║     Journey into the future...       ║
    ╚══════════════════════════════════════╝

Interested in the code behind this site? 
Check out the source - it's built with love for sci-fi!
`);