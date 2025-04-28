class Users {

    constructor() {
        this.people = []
    }

    addPerson( id, name, room ) {        
        
        let person = { id, name, room }

        this.people.push(person)
        
        return this.people 
    }

    getPerson(id) {
        let person = this.people.filter(per => per.id === id)[0]

        return person
    }

    getPeople() {
        return this.people
    }

    getPeopleForRoom(room) {
        // TODO: Realizar traer personas por salas
        let peopleXRoom = this.people.filter(p => p.room === room)
        return peopleXRoom
    }

    deletePerson(id) {
        
        let deletePerson = this.getPerson( id )

        this.people = this.people.filter(per => per.id !== id)
        
        return deletePerson
    }

}

module.exports = {
    Users
}