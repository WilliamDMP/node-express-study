
//funcion para capturar los datos del formulario
const addFormListener = () => {
    //constante que guarda la referencia al formulario
    const userForm = document.getElementById('userform');
    //funcion aplicada cuando se ejecuta el submit del boton con la referencia del formulario
    userForm.onsubmit = async (e) => {
        //previene que la pagina se recargue
        e.preventDefault();
        //almacena los datos del formulario de referencia
        const formData = new FormData(userForm);
        //convierte los datos del formulario en un objeto json
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        //promesa que envía los datos a la base de datos desde el formulario con la ruta indicada
        await fetch('v1/api/users', {
            //metodo a utilizar por fetch
            method: 'POST',
            //convierte los datos recibidos a string
            body: JSON.stringify(data),
            //le dice a mongodb que estos datos se envian de tipo json
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //resetea el formulario despues de enviar los datos
        userForm.reset();
        //cada vez que se genera un nuevo elemento, esta funcion lo muestra
        getUsers();
    }
}

const getUsers = async () => {
    //guarda la respuesta de la peticion fetch al endpoint
    const response = await fetch('v1/api/users');
    //guarda la respuesta convertida a json en una constante
    const users = await response.json();
    //crea una funcion que genera una plantilla para agregar en la lista no ordenada de la vista
    //para mostrar los datos recibidos
    const template = (user) => ` 
        <li>
            ${user.username} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
        </li>
    ` 
    //obtiene la referencia del elemento al que queremos modificar en la vista
    const userList = document.getElementById('user-list');
    //el elemento a modificar utiliza users que en este caso seria lo que recibe del fetch y a cada
    //elemento lo pasa la funcion template y los une con el metodo join
    userList.innerHTML = users.map(user => template(user)).join('');
}

//permite que las funciones utilizadas se carguen al terminar de cargar la ventana
window.onload = () => {
    //llamada de la funcion creada anteriormente
    addFormListener();
    //llamada de la funcion para mostrar los elementos existentes
    getUsers();
}