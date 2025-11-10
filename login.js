// js/login.js
// 1. index.html hariç tüm sayfalar login gerektirir
// 2. Giriş yapılmadıysa → login.html'ye yönlendir
// 3. Giriş yapıldıysa → kullanıcı adı + hover'da "Çıkış Yap"
// 4. 60 dk işlem yapılmazsa → otomatik çıkış

const PUBLIC_PAGES = ['login.html', 'index.html']; // Sadece bunlar login olmadan açılır
const LOGIN_PAGE = 'login.html';
const IDLE_TIMEOUT = 60 * 60 * 1000; // 60 dakika
let idleTimer;

// === 1. Sayfa yüklendiğinde oturum kontrolü ===
function initAuth() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 1. Public sayfalarda → sadece kullanıcı adı göster
    if (PUBLIC_PAGES.includes(currentPage)) {
        if (currentPage === 'index.html') {
            setupUserDropdown(); // Sadece index.html'de dropdown
        }
        resetIdleTimer();
        return;
    }

    // 2. Diğer sayfalarda → oturum kontrolü
    const userName = localStorage.getItem('userName');
    const loginTime = localStorage.getItem('loginTime');

    if (!userName || !loginTime) {
        redirectToLogin();
        return;
    }

    const elapsed = Date.now() - parseInt(loginTime);
    if (elapsed > IDLE_TIMEOUT) {
        forceLogout('Oturum süreniz doldu. Lütfen tekrar giriş yapın.');
        return;
    }

    // Oturum geçerli → dropdown göster + zamanlayıcı sıfırla
    setupUserDropdown();
    resetIdleTimer();
}

// === 2. Kullanıcı Dropdown (Hover + Çıkış Yap) ===
function setupUserDropdown() {
    const userName = localStorage.getItem('userName');
    const userBtn = document.getElementById('user-btn');
    const userNameSpan = document.getElementById('user-name');
    const userArrow = document.getElementById('user-arrow');
    const userMenu = document.getElementById('user-menu');
    const logoutBtn = document.getElementById('logout-btn');

    if (!userBtn || !userNameSpan || !userMenu) return;

    if (userName) {
        // Giriş yapıldı
        userNameSpan.textContent = userName;
        userArrow.style.display = 'inline';
        userMenu.style.cssText = 'display:none; opacity:0; transition:opacity 0.3s ease;';

        const dropdown = userBtn.parentElement;

        // Hover'da aç
        dropdown.addEventListener('mouseenter', () => {
            userMenu.style.display = 'block';
            setTimeout(() => userMenu.style.opacity = '1', 10);
        });

        // Hover'dan çıkınca kapat
        dropdown.addEventListener('mouseleave', () => {
            userMenu.style.opacity = '0';
            setTimeout(() => userMenu.style.display = 'none', 300);
        });

        // Çıkış yap
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                forceLogout('Güvenli çıkış yapıldı.');
            });
        }
    } else {
        // Giriş yapılmadı
        userArrow.style.display = 'none';
        userMenu.style.display = 'none';
        userBtn.onclick = () => window.location.href = LOGIN_PAGE;
    }
}

// === 3. Otomatik Çıkış (60 dk) ===
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        forceLogout('60 dakika işlem yapılmadı. Oturum kapatıldı.');
    }, IDLE_TIMEOUT);
}

// Kullanıcı etkileşimlerini dinle
['mousemove', 'keydown', 'scroll', 'touchstart', 'click'].forEach(evt => {
    document.addEventListener(evt, resetIdleTimer, { passive: true });
});

// === 4. Zorla Çıkış ===
function forceLogout(message) {
    localStorage.removeItem('userName');
    localStorage.removeItem('loginTime');
    if (message) alert(message);
    redirectToLogin();
}

// === 5. Giriş sayfasına yönlendir ===
function redirectToLogin() {
    const current = window.location.pathname.split('/').pop();
    if (current !== LOGIN_PAGE) {
        window.location.replace(LOGIN_PAGE); // replace → geri tuşu engeller
    }
}

// === 6. Sayfa yüklendiğinde başlat ===
document.addEventListener('DOMContentLoaded', initAuth);

// Sayfa kapanırken temizle
window.addEventListener('beforeunload', () => clearTimeout(idleTimer));