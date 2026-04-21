/**
 * PATRIOT CCTV - Professional Interactive Engine
 * Version: 2.1.0
 * Lead Developer: Irfan (Big Data Specialist)
 * Logic: Vanilla JavaScript (No Dependencies)
 */

(function() {
    'use strict';

    // Inisialisasi variabel global untuk performa
    const doc = document;
    const win = window;

    /**
     * 1. MOBILE NAVIGATION LOGIC
     * Menangani interaksi menu hamburger pada perangkat seluler.
     */
    const initMobileMenu = () => {
        const hamburger = doc.getElementById('hamburger');
        const navMenu = doc.getElementById('navMenu');
        const body = doc.body;

        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Mencegah bubbling
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle Scroll Lock: User tidak bisa scroll saat menu terbuka
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'visible';
            }
        });

        // Menutup menu jika user mengklik di luar area menu
        doc.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'visible';
            }
        });

        // Menutup menu saat salah satu link navigasi diklik
        const links = doc.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'visible';
            });
        });
    };

    /**
     * 2. STICKY HEADER & SCROLL SPY
     * Mengatur perubahan tampilan header saat scroll dan mendeteksi section aktif.
     */
    const handleScrollEffects = () => {
        const header = doc.querySelector('.main-header');
        const scrollThreshold = 50;

        win.addEventListener('scroll', () => {
            // Efek Sticky
            if (win.scrollY > scrollThreshold) {
                header.classList.add('header-scrolled');
                // Manipulasi gaya langsung jika CSS belum mencakup ini
                header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                header.style.padding = '10px 0';
            } else {
                header.classList.remove('header-scrolled');
                header.style.boxShadow = 'none';
                header.style.padding = '15px 0';
            }

            // Scroll to Top Button Visibility (Akan kita buat di bagian selanjutnya)
            updateScrollProgress();
        });
    };

    /**
     * 3. SCROLL PROGRESS BAR
     * Menampilkan bar indikator di bagian atas seberapa jauh user telah membaca.
     */
    const updateScrollProgress = () => {
        const progressBar = doc.getElementById('scrollProgress');
        if (!progressBar) return;

        const winScroll = doc.body.scrollTop || doc.documentElement.scrollTop;
        const height = doc.documentElement.scrollHeight - doc.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + "%";
    };

    // Jalankan fungsi saat DOM sudah siap
    doc.addEventListener('DOMContentLoaded', () => {
        initMobileMenu();
        handleScrollEffects();
        console.log("Patriot CCTV Core Engine Started...");
    });

})();
    /**
     * 4. FAQ & ACCORDION SYSTEM
     * Logika untuk membuka dan menutup pertanyaan pada section FAQ.
     */
    const initAccordions = () => {
        const faqQuestions = document.querySelectorAll('.faq-question');
        const aiHeaders = document.querySelectorAll('.accordion-header');

        // Fungsi Umum Toggle Accordion
        const toggleAccordion = (elements, activeClass) => {
            elements.forEach(btn => {
                btn.addEventListener('click', function() {
                    const parent = this.parentElement;
                    
                    // Jika ingin sistem "Single Open" (klik satu, yang lain tutup)
                    elements.forEach(otherBtn => {
                        const otherParent = otherBtn.parentElement;
                        if (otherParent !== parent) {
                            otherParent.classList.remove(activeClass);
                        }
                    });

                    // Toggle status aktif pada elemen yang diklik
                    parent.classList.toggle(activeClass);
                });
            });
        };

        // Jalankan untuk FAQ
        if (faqQuestions.length > 0) toggleAccordion(faqQuestions, 'active');
        
        // Jalankan untuk Fitur AI
        if (aiHeaders.length > 0) toggleAccordion(aiHeaders, 'active');
    };

    /**
     * 5. PRODUCT FILTER SYSTEM
     * Mengatur penyaringan katalog CCTV berdasarkan kategori (Dahua, Hikvision, IP Cam, dll)
     */
    const initProductFilter = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.catalog-card, .product-card');

        if (filterBtns.length === 0) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Hapus class active dari semua tombol filter
                filterBtns.forEach(b => b.classList.remove('active'));
                // Tambah class active ke tombol yang diklik
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                productCards.forEach(card => {
                    // Animasi keluar singkat
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';

                    setTimeout(() => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                            // Animasi masuk kembali
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    };

    /**
     * 6. SMOOTH SCROLL FOR ANCHOR LINKS
     * Membuat perpindahan antar section terasa halus saat menu diklik.
     */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = 80; // Sesuaikan dengan tinggi navbar
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    };

    // Tambahkan ke event listener DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        initAccordions();
        initProductFilter();
        initSmoothScroll();
    });
    /**
     * 7. STATS COUNTER ANIMATION
     * Membuat angka statistik (seperti "500+ Client") bertambah secara otomatis saat terlihat di layar.
     */
    const initCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // Semakin kecil angka, semakin cepat animasinya

        const startCounting = (targetCounter) => {
            const updateCount = () => {
                const target = +targetCounter.getAttribute('data-target');
                const count = +targetCounter.innerText;
                const increment = target / speed;

                if (count < target) {
                    targetCounter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 15);
                } else {
                    targetCounter.innerText = target;
                }
            };
            updateCount();
        };

        // Intersection Observer: Menjalankan animasi hanya saat elemen muncul di layar
        const observerOptions = { threshold: 0.8 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting(entry.target);
                    observer.unobserve(entry.target); // Hanya jalankan satu kali
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    };

    /**
     * 8. DARK MODE TOGGLE SYSTEM
     * Memungkinkan user mengganti tema website antara terang dan gelap.
     */
    const initDarkMode = () => {
        const themeBtn = document.getElementById('themeToggle');
        if (!themeBtn) return;

        // Cek apakah user sebelumnya sudah memilih tema gelap
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            // Simpan pilihan user di local storage agar tidak berubah saat refresh
            let theme = 'light';
            if (document.body.classList.contains('dark-theme')) {
                theme = 'dark';
            }
            localStorage.setItem('theme', theme);
        });
    };

    /**
     * 9. ADVANCED CONTACT FORM HANDLING
     * Menangani pengiriman pesan dan memberikan feedback visual.
     */
    const initContactForm = () => {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Simulasi State Loading
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Memproses...';
            btn.disabled = true;

            // Ambil data (untuk dikirim ke Email atau WhatsApp)
            const name = form.querySelector('#name').value;
            const message = form.querySelector('#message').value;

            // Contoh: Mengarahkan ke WhatsApp setelah klik kirim
            setTimeout(() => {
                const waUrl = `https://wa.me/628123456789?text=Halo Patriot CCTV, saya ${name}. ${message}`;
                
                // Tampilkan notifikasi sukses sebelum redirect
                alert('Pesan Anda telah kami terima. Anda akan diarahkan ke WhatsApp kami.');
                
                btn.innerHTML = originalText;
                btn.disabled = false;
                window.open(waUrl, '_blank');
                form.reset();
            }, 1500);
        });
    };

    // Integrasikan semua fungsi ke dalam DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        initCounters();
        initDarkMode();
        initContactForm();
        
        // Log penutup untuk memastikan sistem berjalan
        console.log("Patriot CCTV - All Systems Operational. Build 2026-04.");
    });
