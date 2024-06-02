document.addEventListener('DOMContentLoaded', function () {
  const users = [
    {
      email: 'camiloacunacz@gmail.com',
      password: '123',
      type: 'admin',
      name: 'Camilo',
      last_name: 'Acuña',
      address: 'Providencia 123, Santiago, RM',
    },
    {
      email: 'camil.acunac@duocuc.cl',
      password: '321',
      type: 'customer',
      name: 'Pepe',
      last_name: 'The Frog',
      address: 'Arauco 24, Valdivia, Los Rios',
    },
  ];

  const loadRegisteredUsers = () => {
    if (localStorage.getItem('registered-users')) {
      const registeredUsers = JSON.parse(
        localStorage.getItem('registered-users')
      );
      registeredUsers.map((user) => {
        users.push(user);
      });
    }
  };

  const form = document.getElementById('login-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const formDetails = {};

    formData.forEach((value, key) => {
      formDetails[key] = value;
    });
    const anchorIndex = document.getElementById('anchor-to-index');
    let isValidUser = false;
    users.map((user) => {
      if (
        user.email === formDetails.email &&
        user.password === formDetails.password
      ) {
        localStorage.setItem('actual_user', JSON.stringify(user));
        isValidUser = true;
      }
      return user;
    });
    if (isValidUser) {
      anchorIndex.click();
    } else {
      alert('Email o contraseña incorrecto');
    }
  });

  loadRegisteredUsers();
});
