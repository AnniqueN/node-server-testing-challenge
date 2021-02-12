const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development)

module.exports = {
    findUser,
    findStudent,
    findBy,
    addUser,
    addStudent,
   removeUser,
   removeStudent,
}

function findUser() {
    return db('users')

} //get full list of created student(restricted)
function findStudent() {
    return db('student')

}//get students

function findBy(body) {
    return db('users').where(body)
} //login

function addUser(users) {
    return db('users')
        .insert(users)
        .then(ids => ({
            id: ids[0]
}) )
} //create add user

function addStudent(students) {
    return db('students')
        .insert(students)
        .then(ids => ({
            id: ids[0]
}) )
} //create add user

function removeUser(id) {
    return db('users')
        .where('id', Number(id))
        .del()
}// delete by id

function removeStudent(id){
return db('students')
.where('id', Number(id))
.del()
}// delete by id