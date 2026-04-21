/**
 * PROJECT: UNDANGAN DIGITAL ALEK GADANG IRFAN & VIA
 * VERSION: 4.0.0 (Premium Build)
 * LOGIC: MOBILE-FIXED ENGINE
 * DESCRIPTION: Menangani interaksi, musik, hitung mundur, dan keamanan layar.
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================================
    // 1. INisialisasi VARIABEL & DOM ELEMENTS
    // ============================================================
    const loader = document.getElementById('loader');
    const btnOpen = document.getElementById('btnOpen');
    const mainContent = document.getElementById('main-content');
    const coverSection = document.getElementById('cover');
    const musicBtn = document.getElementById('musicBtn');
    const audio = document.getElementById('weddingAudio');
    const guestNameElement = document.getElementById('guestName');
    const rsvpForm = document.getElementById('rsvpForm');
    const commentList = document.getElementById('commentList');

    // ============================================================
    // 2. SISTEM NAMA TAMU OTOMATIS (URL PARAMETER)
    // ============================================================
    // Cara pakai: index.html?to=Nama+Tamu+Anda
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    
    if (guestName) {
        guestNameElement.innerText = guestName;
    } else {
        guestNameElement.innerText = "Tamu Undangan";
    }

    // ============================================================
    // 3. LOADER & PAGE READY
    // ============================================================
    window.onload = function() {
        // Simulasi loading agar animasi loader terlihat elegan
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2000);
    };

    // ============================================================
    // 4. LOGIKA BUKA UNDANGAN (THE GRAND OPENING)
    // ============================================================
    btnOpen.addEventListener('click', function() {
        // Aktifkan Konten Utama
        mainContent.classList.remove('hidden');
        document.body.classList.remove('no-scroll');
        
        // Putar Audio Otomatis
        playWeddingMusic();

        // Animasi Keluar untuk Cover
        coverSection.classList.add('animate__animated', 'animate__fadeOutUp');
        
        // Inisialisasi AOS (Animation on Scroll)
        // Pastikan library AOS sudah dipanggil di HTML
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1200,
                once: true,
                offset: 100
            });
        }

        // Hapus Cover dari DOM setelah animasi selesai agar tidak makan memori
        setTimeout(() => {
            coverSection.style.display = 'none';
            window.scrollTo(0, 0);
        }, 1000);
    });

    // ============================================================
    // 5. SISTEM MUSIK SALUANG (AUDIO CONTROL)
    // ============================================================
    function playWeddingMusic() {
        audio.play().catch(error => {
            console.log("Autoplay dicegah oleh browser, menunggu interaksi user.");
        });
        musicBtn.classList.remove('paused');
    }

    musicBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            this.classList.remove('paused');
            this.querySelector('.music-info').innerText = "Playing Saluang";
        } else {
            audio.pause();
            this.classList.add('paused');
            this.querySelector('.music-info').innerText = "Music Paused";
        }
    });

    // ============================================================
    // 6. COUNTDOWN TIMER (HITUNG MUNDUR ALEK)
    // ============================================================
    const targetDate = new Date("August 15, 2026 09:00:00").getTime();

    const updateCountdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Perhitungan Waktu
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        // Update ke DOM
        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;

        // Jika waktu habis
        if (distance < 0) {
            clearInterval(updateCountdown);
            document.getElementById("countdown").innerHTML = "<h3 class='text-gold'>ACARA SEDANG BERLANGSUNG</h3>";
        }
    }, 1000);

    // ============================================================
    // 7. SISTEM SALIN REKENING (CLIPBOARD API)
    // ============================================================
    window.copyRekening = function(id, btn) {
        const text = document.getElementById(id).innerText;
        const originalText = btn.innerHTML;

        navigator.clipboard.writeText(text).then(() => {
            // Beri feedback visual pada tombol
            btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
            btn.style.background = '#28a745';
            btn.style.color = '#fff';

            // Kembalikan tombol ke asal setelah 2 detik
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = 'transparent';
                btn.style.color = 'var(--gold)';
            }, 2000);
        }).catch(err => {
            alert('Gagal menyalin teks: ', err);
        });
    };

    // ============================================================
    // 8. RSVP & UCAPAN HANDLING (SISTEM BUKU TAMU)
    // ============================================================
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitRsvp');
            const name = document.getElementById('name').value;
            const attend = document.querySelector('input[name="attendance"]:checked').value;
            const message = document.getElementById('message').value;

            // Efek Loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;

            // Simulasi pengiriman data ke server/database
            setTimeout(() => {
                // Tambahkan ucapan baru ke daftar (Dinamis)
                const newComment = document.createElement('div');
                newComment.className = 'comment-item animate__animated animate__fadeInUp';
                newComment.innerHTML = `
                    <strong>${name}</strong>
                    <p>${message}</p>
                    <small><i class="fas fa-check-circle"></i> ${attend} · Baru saja</small>
                `;

                // Masukkan ke bagian paling atas list
                commentList.prepend(newComment);

                // Feedback Sukses
                alert('Terima kasih atas doa dan konfirmasinya, ' + name + '!');
                
                // Reset Form
                rsvpForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Ucapan';
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ============================================================
    // 9. PENGUNCI LAYAR HP (ANTI-ZOOM & SCROLL SMOOTHING)
    // ============================================================
    // Mencegah zoom saat double tap di HP
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // ============================================================
    // 10. SCROLL PROGRESS INDICATOR
    // ============================================================
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.querySelector(".scroll-progress");
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

    console.log("Patriot Digital Wedding Engine Operational...");
});
