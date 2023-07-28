function obtenerProductos() {   
    fetch('https://localhost:7254/api/Productos')
    .then(respuesta => respuesta.json())
    .then(data => mostrarProductos(data))
    .catch(error => console.error("No se pudo acceder a la api.", error));
}
function mostrarProductos(data) {
    const tbody = document.getElementById ('productos');
    tbody.innerHTML = "";

    data.forEach(element => {
        let tr = tbody.insertRow();

        let esNuevoCheckbox = document.createElement('input');
        esNuevoCheckbox.type = 'checkbox';
        esNuevoCheckbox.disabled = true;
        esNuevoCheckbox.checked = element.esNuevo;

        let tdEsNuevoCheckbox = tr.insertCell(0);
        tdEsNuevoCheckbox.appendChild(esNuevoCheckbox);
        
        
        let nombre = document.createTextNode(element.nombre);

        let tdNombre = tr.insertCell(1);
        tdNombre.appendChild(nombre);
        tdNombre.id = "tdNombre";

        let precio = document.createTextNode(element.precio);

        let tdPrecio = tr.insertCell(2);
        tdPrecio.appendChild(precio);
        tdPrecio.id = "tdPrecio";

        
        let editar = document.createElement('button');
        editar.title = "Editar producto";
        // editar.textContent = "Editar";
        editar.classList.add("bg-primary");
        editar.style.border = "none"; 
        editar.style.borderRadius = "2px";
        editar.setAttribute('onclick', `BuscarValorProducto(${element.id})`);


        var iconEditar = document.createElement('i');
        iconEditar.classList.add('fa-solid', 'fa-pen-to-square');
        iconEditar.style.fontSize = "1.2rem";
        iconEditar.style.color = "white";

        editar.appendChild(iconEditar);
        document.body.appendChild(editar);

        let tdEditar = tr.insertCell(3);
        tdEditar.appendChild(editar);



        let eliminar = document.createElement('button');
        eliminar.title = "Eliminar producto";
        // eliminar.textContent = "Eliminar";
        eliminar.classList.add("bg-danger");
        eliminar.style.border = "none"; 
        eliminar.style.borderRadius = "2px";
        eliminar.setAttribute('onclick', `ValidacionEliminarProducto(${element.id})`);

        var iconEliminar = document.createElement('i');
        iconEliminar.classList.add('fa-solid', 'fa-trash');
        iconEliminar.style.fontSize = "1.2rem";
        iconEliminar.style.color = "white";

        eliminar.appendChild(iconEliminar);
        document.body.appendChild(eliminar);

        let tdEliminar = tr.insertCell(4);
        tdEliminar.appendChild(eliminar);
    });
}
function ValidacionEliminarProducto(id) {
    var siElimina = confirm("¿Esta seguro de eliminar este producto?");
    if (siElimina == true)
    {
        EliminarProducto(id);
    }
}
function EliminarProducto(id) {
    fetch(`https://localhost:7254/api/Productos/${id}`, 
    {
        method: 'DELETE'
    })
    .then(() => {obtenerProductos();})
    .catch(error => console.error("No se pudo acceder a la api.", error));
}

function AgregarProducto() {
    var nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        esNuevo: document.getElementById('esNuevo').checked
    }

    fetch('https://localhost:7254/api/Productos',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        }
    )
    .then(respuesta => respuesta.json())
    .then(() => {
        document.getElementById('nombre').value = "";
        document.getElementById('precio').value = "";
        document.getElementById('esNuevo').checked = false;
        $('#agregarProducto').modal('hide');
        obtenerProductos();
    })
    .catch(error => console.error("No se pudo insertar el nuevo producto", error));
}

function BuscarValorProducto(id) {
    fetch(`https://localhost:7254/api/Productos/${id}`,{
         method: 'GET'
    })
    .then(respuesta => respuesta.json())
    .then( data => 
    {
         document.getElementById('idEditar').value = data.id;   
         document.getElementById('nombreEditar').value = data.nombre;
         document.getElementById('precioEditar').value = data.precio;
         document.getElementById('esNuevoEditar').checked = data.esNuevo;
         $('#editarProducto').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api.", error));
}

function EditarProducto() {
    let id = document.getElementById('idEditar').value;
    
    let editarProducto = {
        id: document.getElementById('idEditar').value,
        nombre: document.getElementById('nombreEditar').value,
        precio: document.getElementById('precioEditar').value,
        esNuevo: document.getElementById('esNuevoEditar').checked

    }

    fetch(`https://localhost:7254/api/Productos/${id}`,
    {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(editarProducto)
    }
    )
    .then(() => {
        document.getElementById('idEditar').value = 0;
        document.getElementById('nombreEditar').value = "";
        document.getElementById('precioEditar').value = "";
        document.getElementById('esNuevoEditar').checked = false;
        $('#editarProducto').modal('hide');
        obtenerProductos();
    })
    .catch(error => console.error("No se pudo editar el producto", error));
}
  
