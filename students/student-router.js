const router = require('express').Router();
const db = require('./student-model.js');


const restricted = require('../auth/restricted_middleware.js')


router.get('/students', restricted, (req, res) => {
    return db.findStudent()
        .then(student => {
            res.status(200).json({ loggedInUser: req.student.username, student})
        })
        .catch(err => {
            res.status(400).json({ message: 'Could not retrieve student list, make sure you are logged in.' })
        })
})//gives list of students

router.delete('/students/:id', restricted, (req, res) => {
   const {id} = req.params
   db.removeStudent(id)
   .then(student => {
       if(student !== 0){
            res.status(201).json(student)
       }else{
           res.status(404).json({message: 'unable to remove student, check token via restricted users'})
       }
   })
})// deletes student from database

router.post('/students', (req, res) => {
    const student = req.body
    return db.addStudent(student)
        .then(created => {
            res.status(201).json(created)
        }).catch(error => {
            res.status(500).json({ message: 'failed to add user' })
        })
})// add student to database



router.get('/users', restricted, (req, res) => {
    return db.findUser()
        .then(user => {
            res.status(200).json({ loggedInUser: req.student.username, user })
        })
        .catch(err => {
            res.status(400).json({ message: 'Could not retrieve student list, make sure you are logged in.' })
        })
})//create user for database

router.delete('/users/:id', restricted, (req, res) => {
    const { id } = req.params
   db.removeUser(id)
        .then(user => {
            if (user !== 0) {
                res.status(201).json(user)
            } else {
                res.status(404).json({ message: 'unable to remove student, check token via restricted users' })
            }
        })
})//delete user from backend

module.exports = router;