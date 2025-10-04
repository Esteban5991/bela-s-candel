// === Carrito de Compras ===
let carrito = [];

document.querySelectorAll(".producto-card button").forEach((boton) => {
  boton.addEventListener("click", () => {
    const tarjeta = boton.closest(".producto-card");
    const nombre = tarjeta.querySelector("h3").textContent;
    const precioTexto = tarjeta.querySelector(".precio").textContent;
    const precio = parseFloat(precioTexto.replace("$", "").replace(" MXN", ""));

    const producto = { nombre, precio, cantidad: 1 };
    agregarAlCarrito(producto);
  });
});

function agregarAlCarrito(productoNuevo) {
  const existente = carrito.find(p => p.nombre === productoNuevo.nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push(productoNuevo);
  }

  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  const lista = document.getElementById("lista-carrito");
  const totalElem = document.getElementById("total-carrito");
  const contador = document.getElementById("carrito-contador");

  lista.innerHTML = "";

  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach(producto => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad} MXN`;
    lista.appendChild(li);
    total += producto.precio * producto.cantidad;
    cantidadTotal += producto.cantidad;
  });

  totalElem.textContent = `Total: $${total} MXN`;
  contador.textContent = cantidadTotal;
}

// === Carrusel de Galería ===
const carrusel = document.querySelector(".carrusel-imagenes");
const btnIzquierda = document.querySelector(".carrusel-btn.izquierda");
const btnDerecha = document.querySelector(".carrusel-btn.derecha");

let indice = 0;

btnIzquierda.addEventListener("click", () => {
  if (indice > 0) {
    indice--;
    actualizarCarrusel();
  }
});

btnDerecha.addEventListener("click", () => {
  const total = carrusel.children.length;
  if (indice < total - 1) {
    indice++;
    actualizarCarrusel();
  }
});

function actualizarCarrusel() {
  const anchoImagen = carrusel.children[0].clientWidth + 16; // imagen + gap
  carrusel.style.transform = `translateX(-${indice * anchoImagen}px)`;
}
