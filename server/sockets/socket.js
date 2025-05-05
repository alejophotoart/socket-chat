const { io } = require('../server');
const { Users } = require('../classes/users')
const { createMessage } = require('../utils/utils')

const users = new Users()

io.on('connection', (socket) => {

    socket.on('enter-chat', (user, callback) => {

        if (!user.name || !user.room) {
            return callback({
                error: true,
                message: 'El nombre/sala es necesario'
            })
        }

        socket.join(user.room)

        const people = users.addPerson(socket.id, user.name, user.room)

        socket.broadcast.to(user.room).emit('people-list', users.getPeopleForRoom(user.room))
        socket.broadcast.to(user.room).emit('create-message', createMessage('Admin', `${user.name} se unió`))
        
        return callback( people )
    })

    socket.on('create-message', (data, callback) => {

        const person = users.getPerson( socket.id )

        const message = createMessage(person.name, data.message)
        socket.broadcast.to(person.room).emit('create-message', message)

        callback(message)
    })

    socket.on('disconnect', () => {

        const deletePerson = users.deletePerson(socket.id)
        
        socket.broadcast.to(deletePerson.room).emit('create-message', createMessage('Admin', `${deletePerson.name} salió`))
        socket.broadcast.to(deletePerson.room).emit('people-list', users.getPeopleForRoom( deletePerson.room ))
        
    })

    // Mensajes privados
    socket.on('private-message', (data) => {

        const person = users.getPerson( socket.id )

        socket.broadcast.to(data.to).emit('private-message', createMessage( person.name, data.message ))

    })

});