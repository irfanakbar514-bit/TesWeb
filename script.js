/**
 * UNDANGAN DIGITAL ALEK GADANG IRFAN & VIA
 * Khusus Mobile-Fixed & Anti-Zoom
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // 1. DEFINISI ELEMEN
    const loader = document.getElementById('loader');
    const btnOpen = document.getElementById('btnOpen');
    const mainContent = document.getElementById('main-content');
    const coverSection = document.getElementById('cover');
    const musicBtn = document.getElementById('musicBtn');
    const audio = document.getElementById('weddingAudio');
    const guestNameElement = document.getElementById('guestName');
    const body = document.body;

    // 2. LOGIKA NAMA TAMU (URL PARAMETER)
    // Link: index.html?to=Nama+Tamu
    const urlParams = new URLSearchParams(window.location.search);
    const receiver = urlParams.get('to');
    if (receiver) {
        guestNameElement.innerText = receiver.replace(/\+/g, ' ');
    }

    // 3. FORCE HILANGKAN LOADER (Mencegah Mentok)
    // Jika dalam 4 detik halaman belum selesai load, paksa hilangkan loader
    const forceHideLoader = setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 600);
        }
    }, 4000);

    window.addEventListener('load', function() {
        clearTimeout(forceHideLoader);
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 600);
        }
    });

    // 4. LOGIKA TOMBOL BUKA UNDANGAN (PENTING)
    if (btnOpen) {
        btnOpen.addEventListener('click', function() {
            // Hilangkan kunci scroll
            body.classList.remove('no-scroll');
            body.style.overflow = 'auto';

            // Tampilkan Konten Utama
            mainContent.classList.remove('hidden');
            mainContent.style.display = 'block';

            // Putar Musik Otomatis
            if (audio) {
                audio.play().catch(function(error) {
                    console.log("Autoplay diblokir browser, musik akan jalan setelah interaksi.");
                });
                musicBtn.classList.remove('paused');
            }

            // Animasi Transisi Cover (Geser ke Atas)
            coverSection.style.transition = 'all 1.2s cubic-bezier(0.77, 0, 0.175, 1)';
            coverSection.style.transform = 'translateY(-100%)';
            coverSection.style.opacity = '0';

            // Inisialisasi AOS (Animasi Muncul saat Scroll)
            setTimeout(() => {
                coverSection.style.display = 'none';
                if (typeof AOS !== 'undefined') {
                    AOS.init({
                        duration: 1000,
                        once: true,
                        offset: 120
                    });
                }
                window.scrollTo(0, 0);
            }, 1200);
        });
    }

    // 5. KONTROL MUSIK (PLAY/PAUSE)
    if (musicBtn) {
        musicBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                musicBtn.classList.remove('paused');
                musicBtn.querySelector('.music-icon i').className = 'fas fa-compact-disc fa-spin';
            } else {
                audio.pause();
                musicBtn.classList.add('paused');
                musicBtn.querySelector('.music-icon i').className = 'fas fa-compact-disc';
            }
        });
    }

    // 6. LOGIKA COUNTDOWN TIMER (TANGGAL ACARA)
    const weddingDate = new Date("August 15, 2026 09:00:00").getTime();
    
    const timerFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        // Update ke HTML
        if(document.getElementById("days")) document.getElementById("days").innerText = d < 10 ? "0"+d : d;
        if(document.getElementById("hours")) document.getElementById("hours").innerText = h < 10 ? "0"+h : h;
        if(document.getElementById("minutes")) document.getElementById("minutes").innerText = m < 10 ? "0"+m : m;
        if(document.getElementById("seconds")) document.getElementById("seconds").innerText = s < 10 ? "0"+s : s;

        if (distance < 0) {
            clearInterval(timerFunction);
            document.getElementById("countdown").innerHTML = "<h4 style='color:#d4af37'>ACARA SEDANG BERLANGSUNG</h4>";
        }
    }, 1000);

    // 7. FUNGSI SALIN NOMOR REKENING
    window.copyRekening = function(id, btn) {
        const rekNumber = document.getElementById(id).innerText;
        const originalText = btn.innerHTML;

        navigator.clipboard.writeText(rekNumber).then(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Berhasil';
            btn.style.background = '#28a745';
            btn.style.color = '#fff';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 2000);
        });
    };

    // 8. PENGUNCI ZOOM & DOUBLE TAP HP
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    let lastClick = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastClick <= 300) {
            event.preventDefault();
        }
        lastClick = now;
    }, false);

    console.log("Wedding Logic Irfan & Via siap dijalankan.");
});
