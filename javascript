// ====================================================
// NAVBAR HAMBURGER TOGGLE
// ====================================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ====================================================
// NAVBAR SCROLL EFFECT
// ====================================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
    }
});

// ====================================================
// ACTIVE NAV LINK
// ====================================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// ====================================================
// ANIMASI SCROLL (Intersection Observer)
// ====================================================
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.feature-card, .materi-card, .hero-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ====================================================
// COUNTER ANIMATION
// ====================================================
const animateCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.ceil(current);
            }
        }, 30);
    });
};

// Run counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ====================================================
// FORM VALIDATION & SUBMIT (Refleksi)
// ====================================================
const refleksiForm = document.getElementById('refleksiForm');
if (refleksiForm) {
    refleksiForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = document.getElementById('namaSiswa')?.value;
        const link = document.getElementById('linkVideo')?.value;
        const refleksi = document.getElementById('refleksi')?.value;

        if (!nama || !refleksi) {
            alert('Mohon isi nama dan jurnal refleksi!');
            return;
        }

        // Simple validation for YouTube link
        if (link && !link.includes('youtube.com') && !link.includes('youtu.be')) {
            alert('Mohon masukkan link YouTube yang valid (pastikan video sudah diunggah)!');
            return;
        }

        // Show success message
        const submitBtn = refleksiForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = '✓ Berhasil Dikirim!';
        submitBtn.style.background = '#43a047';
        submitBtn.style.borderColor = '#43a047';
        submitBtn.disabled = true;

        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            refleksiForm.reset();

            // Show popup message
            alert('Terima kasih! Jurnal refleksi dan video Think-Aloud berhasil dikirim.');
        }, 2000);
    });
}

// ====================================================
// QUIZ SUBMIT
// ====================================================
const kuisForm = document.getElementById('kuisForm');
if (kuisForm) {
    kuisForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const answers = {};
        const questions = kuisForm.querySelectorAll('.soal');
        let answered = 0;

        questions.forEach((soal, index) => {
            const selected = soal.querySelector('input[type="radio"]:checked');
            if (selected) {
                answers[index] = selected.value;
                answered++;
            }
        });

        if (answered < questions.length) {
            alert(`Anda baru menjawab ${answered} dari ${questions.length} soal. Mohon jawab semua soal!`);
            return;
        }

        // Show result
        const submitBtn = kuisForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = '✓ Mengirim...';
        submitBtn.disabled = true;

        // Simulate processing
        setTimeout(() => {
            let correct = 0;
            // This is where you'd check answers against a key
            // For demo, just show a message
            alert(`Selamat! Anda telah menyelesaikan kuis. Jawaban Anda telah tercatat.`);
            submitBtn.textContent = '✓ Selesai';
            submitBtn.style.background = '#43a047';
            submitBtn.style.borderColor = '#43a047';
        }, 1500);
    });
}

// ====================================================
// SIMULASI PHET IFRAME LOADING
// ====================================================
const phetIframe = document.getElementById('phetSimulasi');
if (phetIframe) {
    phetIframe.addEventListener('load', () => {
        const loading = document.querySelector('.simulasi-loading');
        if (loading) {
            loading.style.display = 'none';
        }
    });
}

// ====================================================
// SCROLL TO TOP BUTTON (Optional)
// ====================================================
const createScrollTopBtn = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.position = 'fixed';
    btn.style.bottom = '30px';
    btn.style.right = '30px';
    btn.style.zIndex = '999';
    btn.style.background = 'var(--primary)';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '50%';
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.fontSize = '1.2rem';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 5px 20px rgba(26,35,126,0.3)';
    btn.style.transition = 'all 0.3s ease';
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(20px)';

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        } else {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
        }
    });
};

// Only create if page is long enough
if (document.body.scrollHeight > window.innerHeight * 2) {
    createScrollTopBtn();
}

// ====================================================
// CONSOLE WELCOME
// ====================================================
console.log('%c🚀 E-Worksheet Fluida Dinamis', 'font-size: 24px; font-weight: bold; color: #1a237e;');
console.log('%cBerbasis Deep Learning | Terintegrasi PhET | Metode Think-Aloud', 'font-size: 14px; color: #00bcd4;');
console.log('%cSMA Negeri 1 Medan - Semester Ganjil 2025/2026', 'font-size: 12px; color: #666;');
