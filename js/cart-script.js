document.addEventListener('DOMContentLoaded', function () {
  const allProducts = [
    {
      id: 1,
      description:
        'Una novela distópica que explora los peligros del totalitarismo y la vigilancia gubernamental.',
      name: '1984',
      stock: 10,
      author: 'George Orwell',
      category: 'Social politico',
      price: 37000,
      image: 'img/libros/1984.webp',
    },
    {
      id: 2,
      description:
        'Un manifiesto político que presenta los principios del comunismo y la lucha de clases.',
      name: 'Manifiesto Comunista',
      author: 'Karl Marx',
      stock: 5,
      category: 'Social politico',
      price: 22000,
      image: 'img/libros/manifiesto-comunista.webp',
    },
    {
      id: 3,
      description:
        'Un libro pionero en el movimiento ambientalista que destaca los efectos perjudiciales de los pesticidas.',
      name: 'Primavera Silenciosa',
      author: 'Rachel Carson',
      stock: 3,
      category: 'Social politico',
      price: 10000,
      image: 'img/libros/primavera-silenciosa.webp',
    },
    {
      id: 4,
      description:
        'Una novela que combina misterio y romance en la Barcelona de posguerra.',
      name: 'La Sombra del Viento',
      author: 'Carlos Ruiz Zafón',
      stock: 1,
      category: 'Literatura',
      price: 50000,
      image: 'img/libros/la-sombra-del-viento.webp',
    },
    {
      id: 5,
      description:
        'Una novela mágica sobre un circo itinerante que solo aparece de noche y los dos jóvenes magos atrapados en una competencia.',
      name: 'El Circo de la Noche',
      author: 'Erin Morgenstern',
      stock: 7,
      category: 'Literatura',
      price: 25000,
      image: 'img/libros/circo-de-la-noche.webp',
    },
    {
      id: 6,
      description:
        'La historia de un joven náufrago que sobrevive en el océano Pacífico acompañado por un tigre de Bengala.',
      name: 'La Vida de Pi',
      author: 'Yann Martel',
      stock: 55,
      category: 'Literatura',
      price: 6000,
      image: 'img/libros/vida-de-pi.webp',
    },
    {
      id: 7,
      description:
        'Un clásico de la literatura infantil que narra las aventuras de un pequeño príncipe que viaja de planeta en planeta.',
      name: 'El Principito',
      author: 'Antoine de Saint-Exupéry',
      stock: 100,
      category: 'Infantil',
      price: 20000,
      image: 'img/libros/el-principito.webp',
    },
    {
      id: 8,
      description:
        'La historia de una niña prodigio que usa sus poderes para superar las dificultades de su vida.',
      name: 'Matilda',
      author: 'Roald Dahl',
      stock: 0,
      category: 'Infantil',
      price: 15000,
      image: 'img/libros/matilda.webp',
    },
  ];

  function loadCart() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  const cart = loadCart();

  function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    let allProductsCount = 0;
    cart.map((product) => {
      allProductsCount += product.cantidad;
      return product;
    });
    cartCount.textContent = allProductsCount;
  }

  const validateData = (data) => {
    const regionSelector = document.getElementById('select-region');
    const countrySelector = document.getElementById('select-country');
    let alertMsg = '';

    const validations = [
      {
        condition: data.rut === '' || data.rut.length < 3,
        message: 'El rut debe tener una longitud minima de 9 caracteres.',
      },
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
        condition: regionSelector.value === '',
        message: 'Debe seleccionar una región',
      },
      {
        condition: countrySelector.value === '',
        message: 'Debe seleccionar una ciudad',
      },
      {
        condition: data.address === '' || data.address.length < 10,
        message:
          'La dirección no debe estar vacía y debe tener un mínimo de 10 caracteres.',
      },
      {
        condition: !/^\d+$/.test(data.phone),
        message: 'El teléfono solo debe contener números.',
      },
    ];

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

    for (let validation of validations) {
      if (validation.condition) {
        alertMsg = validation.message;
        break;
      }
    }

    if (alertMsg === '') {
      alertMsg = validateEmail(data.email);
    }

    if (alertMsg) {
      alert(alertMsg);
      return false;
    }

    return true;
  };

  const updateOrderInfo = () => {
    const orderItems = document.getElementById('pedido-info-cart');
    const orderForm = document.getElementById('order-form');
    orderItems.innerHTML = '';
    let subTotal = 0;
    cart.forEach((item) => {
      subTotal += item.price;
      const cartItem = `
                <div class="cart-item border">
                    <img src="${item.image}">
                    <div class="item-detail p-2 d-flex flex-column justify-content-center align-items-center text-center">
                        <span><strong>Nombre:</strong> ${item.name}</span>
                        <span><strong>Autor:</strong> ${item.author}</span>
                        <span><strong>Precio:</strong> ${item.price}</span>
                        <span><strong>Cantidad:</strong> ${item.cantidad}</span>
                    </div>
                    <div class="d-flex justify-content-center align-items-center p-2">
                        <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">&times;</button>
                    </div>
                </div>
            `;
      orderItems.innerHTML += cartItem;
    });
    const subTotalItem = `
        <div class="row mt-3">
            <div class="col d-flex justify-content-center">
              <h3 class="lead">Total: $${subTotal}</h3>
            </div>
        </div>
        <div class="row">
          <p class="lead">Envio </p>
          <div class="col">
            <div class="form-check">
            <input class="form-check-input" type="radio" name="check-envio" id="check-envio-1">
            <label class="form-check-label" for="flexRadioDefault1">
              Retiro en tienda
            </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="check-envio" id="check-envio-2" checked>
              <label class="form-check-label" for="flexRadioDefault2">
                Despacho a domicilio
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <p class="lead">Medio de pago </p>
          <div class="col">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="medio-pago" id="check-pago-1">
              <label class="form-check-label" for="flexRadioDefault1">
                WebPay
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="medio-pago" id="check-pago-2">
              <label class="form-check-label" for="flexRadioDefault1">
                Mercado pago
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="medio-pago" id="check-pago-3" checked>
              <label class="form-check-label" for="flexRadioDefault2">
                Tarjeta de credito, debito, prepago
              </label>
            </div>
          </div>
        </div>
        <div class="row mt-5">
            <div class="col d-flex justify-content-center">
              <button type="submit" class="btn btn-primary">
                Finalizar pedido
              </button>
            </div>
        </div>
    `;
    orderItems.innerHTML += subTotalItem;

    document.querySelectorAll('.remove-from-cart').forEach((button) => {
      button.addEventListener('click', removeFromCart);
    });

    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(orderForm);

      const formDetails = {};

      formData.forEach((value, key) => {
        formDetails[key] = value;
      });
      console.log({ formDetails });
      if (validateData(formDetails)) {
        alert('Compra realizada');
      }
    });
  };

  function updateCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item) => {
      const cartItem = `
                <div class="cart-item border">
                    <img src="${item.image}">
                    <div class="item-detail p-2 d-flex flex-column justify-content-center align-items-center text-center">
                        <span><strong>Nombre:</strong> ${item.name}</span>
                        <span><strong>Autor:</strong> ${item.author}</span>
                        <span><strong>Precio:</strong> ${item.price}</span>
                        <span><strong>Cantidad:</strong> ${item.cantidad}</span>
                    </div>
                    <div class="d-flex justify-content-center align-items-center p-2">
                        <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">&times;</button>
                    </div>
                </div>
            `;
      cartItems.innerHTML += cartItem;
    });

    if (cart.length > 0) {
      let totalPrice = 0;
      cart.map((productCart) => {
        totalPrice += productCart.price;
        return productCart;
      });
      const totalPriceItem = `
        <hr class="mt-5"/>
        <div class="row">
            <div class="col d-flex justify-content-center">
              <h3 class="lead">Total: $${totalPrice}</h3>
            </div>
        </div>
        <hr class="mb-2"/>
        <div class="row">
            <div class="col d-flex justify-content-center">
              <a href="pedido.html">
                <button class="btn btn-primary" type="button">
                  Finalizar compra
                </button>
              </a>
            </div>
        </div>
    `;
      cartItems.innerHTML += totalPriceItem;
    } else {
      const cartEmptyItem = `
      <div class="d-flex flex-column align-items-center justify-content-center">
        <i style="font-size: 50px" class="fa-solid fa-cart-shopping mb-3"></i>
        <p class="lead"><strong>El carrito esta vacio.</strong></p>
      </div>
      `;
      cartItems.innerHTML += cartEmptyItem;
    }

    document.querySelectorAll('.remove-from-cart').forEach((button) => {
      button.addEventListener('click', removeFromCart);
    });
  }

  function validateProductQuantity(cartProduct) {
    let isQuantityLessThanStock = false;
    allProducts.map((product) => {
      if (cartProduct.id === product.id) {
        if (cartProduct.cantidad < product.stock) {
          isQuantityLessThanStock = true;
        }
      }
      return product;
    });
    return isQuantityLessThanStock;
  }

  function validateProductAlreadyExist(productId) {
    const cartProductIds = cart.map((product) => product.id);
    return !!cartProductIds.includes(productId);
  }

  function displayAddMsgAndUpdateCart(product) {
    updateCartCount();
    updateCartItems();
    saveCart();
    alert(`${product.name} añadido al carrito`);
  }

  function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    let product = allProducts.find((p) => p.id === productId);
    if (validateProductAlreadyExist(productId)) {
      cart.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (validateProductQuantity(cartProduct)) {
            cartProduct.cantidad += 1;
            product = cartProduct;
          }
        }
        return cartProduct;
      });
      if (!validateProductQuantity(product)) {
        alert(`${product.name} no tiene stock suficiente`);
        return;
      }
      displayAddMsgAndUpdateCart(product);
      return;
    }
    cart.push({ ...product, ...{ cantidad: 1 } });
    displayAddMsgAndUpdateCart(product);
  }

  function loadProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product) => {
      const productCard = `
                            <div class="card mb-4 col-sm-12 col-md-12 col-lg-3 m-3">
                                <img class="card-img-top" src="${
                                  product.image
                                }" alt="${product.name}">
                                <div class="card-body">
                                    <h4 class="card-title">${product.name}</h4>
                                    <h5 class="card-title">${
                                      product.author
                                    }</h5>
                                    <p class="card-text primary-color lead"><strong>$${
                                      product.price
                                    }</strong></p>
                                    <p class="card-text">${
                                      product.stock === 0
                                        ? 'Sin stock'
                                        : 'Stock: ' + product.stock
                                    }</p>
                                    <button ${
                                      product.stock === 0 && 'disabled'
                                    } class="btn btn-primary add-to-cart" data-id="${
        product.id
      }">Añadir al carrito</button>
                                </div>
                            </div>
                    `;
      productList.innerHTML += productCard;
    });

    // Añadir eventos a los botones de "Añadir al carrito"
    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', addToCart);
    });
  }

  const filterProduct = () => {
    const selectCategory = document.getElementById('select-categoria').value;

    let filteredProducts = allProducts;

    if (selectCategory !== 'Todas') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectCategory
      );
    }

    if (document.getElementById('input-name')?.value) {
      const inputNombreLibro = document
        .getElementById('input-name')
        .value.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(inputNombreLibro)
      );
    }

    if (document.getElementById('input-autor')?.value) {
      const inputAutor = document
        .getElementById('input-autor')
        .value.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        product.author.toLowerCase().includes(inputAutor)
      );
    }

    if (filteredProducts.length === 0) {
      alert('No se encontro coincidencia');
      loadProducts(allProducts);
    } else {
      loadProducts(filteredProducts);
    }
  };

  function removeFromCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const productIndex = cart.findIndex((p) => p.id === productId);
    cart.splice(productIndex, 1);
    updateCartCount();
    updateCartItems();
    if (window.location.pathname.includes('pedido')) {
      updateOrderInfo();
    }
    saveCart();
  }
  function openNav() {
    document.getElementById('mySidenav').style.width = '350px';
  }

  function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  if (!window.location.pathname.includes('pedido')) {
    document.getElementById('cart-btn').addEventListener('click', openNav);
    document.getElementById('close-btn').addEventListener('click', closeNav);
  }

  updateCartCount();
  updateCartItems();

  if (window.location.pathname.includes('pedido')) {
    updateOrderInfo();
  }

  if (window.location.pathname.includes('tienda')) {
    const btnFiltrar = document.getElementById('btn-filter');
    btnFiltrar.addEventListener('click', filterProduct);
    loadProducts(allProducts);
  }
});
