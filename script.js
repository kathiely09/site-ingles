// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const firstSection = document.querySelector('#overview');
            if (firstSection) {
                const offsetTop = firstSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
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
    const animatedElements = document.querySelectorAll('.feature-card, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Navigation background on scroll
    const navigation = document.querySelector('.navigation');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navigation.style.background = 'rgba(139, 69, 19, 0.98)';
            navigation.style.backdropFilter = 'blur(15px)';
        } else {
            navigation.style.background = 'rgba(139, 69, 19, 0.95)';
            navigation.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = translateY(${rate}px);
        }
        
        if (scrollIndicator) {
            const opacity = Math.max(0, 1 - (scrolled / window.innerHeight));
            scrollIndicator.style.opacity = opacity;
        }
    });
    
    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, 20);
    }
    
    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const impactSection = document.querySelector('.impact-section');
    if (impactSection) {
        statsObserver.observe(impactSection);
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Stagger animation for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    });
    
    // Mobile menu toggle (for future enhancement)
    const createMobileMenu = () => {
        const nav = document.querySelector('.navigation');
        const navContainer = nav.querySelector('.nav-container');
        
        // Create mobile menu button
        const mobileButton = document.createElement('button');
        mobileButton.className = 'mobile-menu-btn';
        mobileButton.innerHTML = '☰';
        mobileButton.style.display = 'none';
        mobileButton.style.background = 'none';
        mobileButton.style.border = 'none';
        mobileButton.style.color = 'var(--warm-white)';
        mobileButton.style.fontSize = '1.5rem';
        mobileButton.style.cursor = 'pointer';
        
        navContainer.appendChild(mobileButton);
        
        // Show/hide mobile button based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                mobileButton.style.display = 'block';
            } else {
                mobileButton.style.display = 'none';
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };
    
    createMobileMenu();
});
