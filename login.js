// === KULLANICI GİRİŞ / ÇIKIŞ SİSTEMİ (HOVER'DA ÇIKIŞ YAP GÖRÜNÜR) ===
const userName = localStorage.getItem('userName');
const userBtn = document.getElementById('user-btn');
const userNameSpan = document.getElementById('user-name');
const userArrow = document.getElementById('user-arrow');
const userMenu = document.getElementById('user-menu');
const logoutBtn = document.getElementById('logout-btn');

if (userName) {
    // GİRİŞ YAPILDI
    userNameSpan.textContent = userName;
    userArrow.style.display = 'inline';
    userMenu.style.display = 'none'; // Başta kapalı

    // Hover'da menü açılır
    userBtn.parentElement.addEventListener('mouseenter', () => {
        userMenu.style.display = 'block';
        setTimeout(() => userMenu.style.opacity = '1', 10);
    });
    userBtn.parentElement.addEventListener('mouseleave', () => {
        userMenu.style.opacity = '0';
        setTimeout(() => userMenu.style.display = 'none', 300);
    });

    // Çıkış
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userName');
        alert('Çıkış yapıldı.');
        window.location.reload();
    });
} else {
    // GİRİŞ YAPILMADI
    userArrow.style.display = 'none';
    userMenu.style.display = 'none';
    userBtn.onclick = () => window.location.href = 'login.html';
}