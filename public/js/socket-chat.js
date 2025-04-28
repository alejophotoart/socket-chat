var socket = io();

var params = new URLSearchParams(window.location.search)

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html'
    throw new Error("El nombre y sala son requerido")
}

const user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enter-chat', user, ( resp ) => {
        console.log('Usuarios conectados', resp);
    })
});



// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Enviar información
// socket.emit('sendMessage', {
//     message: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('create-message', function(message) {
    console.log('Servidor:', message);
});

// Escuchar cambios de usuarios
// Cuando un usuario entra o sale del chat
socket.on('people-list', function(people) {
    console.log("people-list", people);
});

// Mensajes privados
socket.on('private-message', (message) => {
    console.log("mensaje privado:", message);
})