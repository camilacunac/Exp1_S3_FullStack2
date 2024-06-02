document.addEventListener('DOMContentLoaded', function () {
  const btnSession = document.getElementById('btn-session');
  const anchorBtnSession = document.getElementById('anchor-btn-session');
  const myProfileItem = document.getElementById('my-profile-item');

  function loadSession() {
    if (localStorage.getItem('actual_user')) {
      btnSession.innerHTML = 'Cerrar sesión';
      btnSession.addEventListener('click', () => {
        localStorage.removeItem('actual_user');
        location.reload();
        alert('Cerraste sesión');
        if (window.location.pathname.includes('mi-perfil')) {
          const anchorToIndex = document.getElementById('anchor-index');
          anchorToIndex.click();
        }
      });
      anchorBtnSession.setAttribute('href', '#');
      myProfileItem.classList.remove('invisible');
    } else {
      btnSession.innerHTML = 'Iniciar sesión';
      btnSession.removeEventListener('click', () => {});
      anchorBtnSession.setAttribute('href', 'login.html');
      myProfileItem.classList.add('invisible');
    }
  }

  loadSession();
});
