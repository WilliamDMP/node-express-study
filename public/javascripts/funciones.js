
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
    }
}

//permite que las funciones utilizadas se carguen al terminar de cargar la ventana
window.onload = () => {
    //llamada de la funcion creada anteriormente
    addFormListener();
}