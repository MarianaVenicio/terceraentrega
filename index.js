


const productos = [
    { id: 1, nombre: 'serum', precio: 100, img: "" },
    { id: 2, nombre: 'crema mora', precio: 800, img: "" },
    { id: 3, nombre: 'micelar ', precio: 150, img: "" },
    { id: 4, nombre: 'jabon', precio: 100, img: "" }

]

let carrito = localStorage.getItem("storageCarrito") ? JSON.parse(localStorage.getItem("storageCarrito")) : []
let iconoCarrito = document.getElementById("carritoContenedor");
let listaCarrito = document.getElementById("listaCarrito")
let totalCarrito = 0;
iconoCarrito.innerHTML = carrito.length;

const contenedor = document.querySelector('#contenedor')
productos.forEach((facial) => {

    const { id, nombre, precio, img } = facial

    contenedor.innerHTML += `
    <div class="col">
    <div class="card" style="width: 18rem;">
  <img src="imagenes/${img}" class="card-img-top mt-2" alt="imagen de productos">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">Precio: $${precio}</p>
   
    
    <button data-id="${id}" class="btn btn-primary agregar">Agregar al carrito</button>
  </div>
</div>
</div>
    `
});

let botones = document.querySelectorAll(".agregar");

//console.log(botones);
botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        const item = productos.find((facial) => facial.id === parseInt(boton.dataset.id))
        //console.log(item)
        //console.log(boton.dataset.id)
        carrito.push(item);
        //console.log(carrito);

        iconoCarrito.innerHTML = carrito.length;
        localStorage.setItem("storageCarrito", JSON.stringify(carrito))
    })
});

iconoCarrito.addEventListener("click", () => {
    listaCarrito.innerHTML = "";
    carrito.forEach(facial) => {
        //console.log(facial);
        const { nombre, precio, img, id } = facial
        //console.log(nombre);
        listaCarrito.innerHTML += `
        <li>
      <img class="img-carrito" src="imagenes/${img}" alt="imagen de productos">
        <p> ${nombre} Precio: $${precio}</p>
        <a class="eliminar" data-id="${id}" data-precio="${precio}"> x </a>
        </li> 
        `
        totalCarrito += parseInt(precio);
    }
});
listaCarrito.innerHTML += `<li id="totalLista">Total: $${totalCarrito}</li>`;
let botonesEliminar = document.querySelectorAll(".eliminar");
botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const item = carrito.find((facial) => facial.id === parseInt(boton.dataset.id));
        const index = carrito.indexOf(item);
        if (index > -1) {
            carrito.splice(index, 1);
        }
        totalCarrito -= parseInt(boton.dataset.precio)
        document.getElementById("totalLista").innerHTML = `Total: $${totalCarrito}`;
        localStorage.removeItem("storageCarrito");
        localStorage.setItem("storageCarrito", JSON.stringify(carrito));
        boton.parentElement.remove();
        iconoCarrito.innerHTML = carrito.length;

    })
})





























































































