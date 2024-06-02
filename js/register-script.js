document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('register-form');

  const cleanFormFields = () => {
    const nameInput = document.getElementById('input-nombre');
    const lastNameInput = document.getElementById('input-apellido');
    const addressInput = document.getElementById('input-direccion');
    const emailInput = document.getElementById('input-email');
    const passwordInput = document.getElementById('input-password');
    const confirmPasswordInput = document.getElementById(
      'input-confirm-password'
    );
    nameInput.value = '';
    lastNameInput.value = '';
    addressInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
  };

  const validateData = (data) => {
    let alertMsg = '';

    const validatePassword = (password) => {
      const minLength = 8;
      const maxLength = 20;
      const specialCharRegex = /[!@#$%^&*]/;
      const numberRegex = /[0-9]/;
      const letterRegex = /[a-zA-Z]/;

      if (password.length < minLength) {
        return 'La contraseña es demasiado corta, debe tener un mínimo de 8 caracteres.';
      }

      if (password.length > maxLength) {
        return 'La contraseña es demasiado larga, debe tener un máximo de 20 caracteres.';
      }

      if (!specialCharRegex.test(password)) {
        return 'La contraseña debe contener al menos un carácter especial.';
      }

      if (!numberRegex.test(password)) {
        return 'La contraseña debe contener al menos un número.';
      }

      if (!letterRegex.test(password)) {
        return 'La contraseña debe contener al menos una letra.';
      }

      return '';
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return 'El correo electrónico no es válido.';
      }
      if (localStorage.getItem('registered-users')) {
        const registeredUsers = JSON.parse(
          localStorage.getItem('registered-users')
        );
        if (registeredUsers.map((user) => user.email).includes(email)) {
          return 'Elige un correo diferente.';
        }
      }
      return '';
    };

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
      {
        condition: data.password !== data.confirm_password,
        message: 'Las contraseñas deben coincidir.',
      },
    ];

    for (let validation of validations) {
      if (validation.condition) {
        alertMsg = validation.message;
        break;
      }
    }

    if (alertMsg === '') {
      alertMsg = validateEmail(data.email);
    }

    if (alertMsg === '') {
      alertMsg = validatePassword(data.password);
    }

    if (alertMsg) {
      alert(alertMsg);
      return false;
    }

    return true;
  };

  const handleRegisterUser = (user) => {
    const registeredUsers = localStorage.getItem('registered-users')
      ? JSON.parse(localStorage.getItem('registered-users'))
      : [];
    registeredUsers.push(user);
    localStorage.setItem('registered-users', JSON.stringify(registeredUsers));
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const formDetails = {};

    formData.forEach((value, key) => {
      formDetails[key] = value;
    });
    if (validateData(formDetails)) {
      handleRegisterUser({ ...formDetails, ...{ type: 'customer' } });
      cleanFormFields();
      alert('Usuario creado con exito');
    }
  });
});
