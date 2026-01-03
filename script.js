// Background Music Auto-Play
document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    // Set initial volume
    music.volume = 0.3;

    // Try to auto-play immediately
    setTimeout(() => {
        music.play().then(() => {
            musicToggle.classList.add('playing');
            isPlaying = true;
            console.log('🎵 Music auto-playing!');
        }).catch(error => {
            console.log('Auto-play blocked by browser. Click anywhere to start music.');
            // If auto-play fails, play on first user interaction
            document.body.addEventListener('click', function startMusic() {
                music.play().then(() => {
                    musicToggle.classList.add('playing');
                    isPlaying = true;
                }).catch(err => console.log('Music play failed:', err));
                document.body.removeEventListener('click', startMusic);
            }, { once: true });
        });
    }, 500);

    // Music toggle functionality
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isPlaying) {
            music.pause();
            musicToggle.classList.remove('playing');
            isPlaying = false;
        } else {
            music.play().then(() => {
                musicToggle.classList.add('playing');
                isPlaying = true;
            }).catch(error => {
                console.log('Play error:', error);
            });
        }
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Masonry items hover effect - reduce rotation
    const masonryItems = document.querySelectorAll('.masonry-item');
    masonryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });

    // Image lazy loading with fade-in
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in';

                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                }
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Video controls
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
        });
        video.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    // Page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);

    // Vintage paper texture animation
    function addPaperTexture() {
        const sections = document.querySelectorAll('.letter-card');
        sections.forEach(section => {
            section.style.backgroundImage = `
                radial-gradient(circle at 20% 50%, transparent 0%, rgba(139, 115, 85, 0.05) 100%),
                radial-gradient(circle at 80% 80%, transparent 0%, rgba(139, 115, 85, 0.05) 100%)
            `;
        });
    }
    addPaperTexture();

});

console.log('📜 Vintage gallery loaded!');
console.log('🎵 Background music ready!');