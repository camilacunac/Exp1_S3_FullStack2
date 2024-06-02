document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.getElementById('input-name');
  const lastNameInput = document.getElementById('input-last-name');
  const addressInput = document.getElementById('input-address');

  const loadUserData = () => {
    if (localStorage.getItem('actual_user')) {
      const actualUser = JSON.parse(localStorage.getItem('actual_user'));
      nameInput.value = actualUser.name;
      lastNameInput.value = actualUser.last_name;
      addressInput.value = actualUser.address;
    }
  };

  const handleChangeDataProfile = (data) => {
    let actualUser = JSON.parse(localStorage.getItem('actual_user'));
    const registeredUsers = localStorage.getItem('registered-users')
      ? JSON.parse(localStorage.getItem('registered-users'))
      : [];
    actualUser.name = data.name;
    actualUser.last_name = data.last_name;
    actualUser.address = data.address;
    localStorage.setItem('actual_user', JSON.stringify(actualUser));
    registeredUsers.map((user) => {
      if (user.email === actualUser.email) {
        user.name = data.name;
        user.last_name = data.last_name;
        user.address = data.address;
      }
      return user;
    });
    localStorage.setItem('registered-users', JSON.stringify(registeredUsers));
  };

  const validateData = (data) => {
    let alertMsg = '';

    const validations = [
      {
        condition: data.name === '' || data.name.length < 3,
        message:
          'El nombre no debe estar vacío y debe tener un mínimo de 3 caracteres.',
      },
      {
        condition: data.last_name === '' || data.last_name.length < 3,
        message:
          'El apellido no debe estar vacío y debe tener un mínimo de 3 caracteres.',
      },
      {
        condition: data.address === '' || data.address.length < 10,
        message:
          'La dirección no debe estar vacía y debe tener un mínimo de 10 caracteres.',
      },
    ];

    for (let validation of validations) {
      if (validation.condition) {
        alertMsg = validation.message;
        break;
      }
    }

    if (alertMsg) {
      alert(alertMsg);
      return false;
    }

    return true;
  };

  const form = document.getElementById('profile-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const formDetails = {};

    formData.forEach((value, key) => {
      formDetails[key] = value;
    });
    if (validateData(formDetails)) {
      handleChangeDataProfile(formDetails);
      alert('Perfil modificado con exito');
    }
  });

  loadUserData();
});
