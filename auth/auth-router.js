const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js');
const students = require('../students/student-model.js');



router.post('/register', (req, res) => {
    const student = req.body
    const hash = bcrypt.hashSync(student.password, 14)
    student.password = hash
    return students.addUser(student)
        .then(created => {
            res.status(201).json(created)
        }).catch(error => {
            res.status(500).json({ message: 'failed to add user' })
        })
})


router.post('/login', (req, res) => {
    let { password, username } = req.body
    students.findBy({ username })
        .first()//takes first item out of object
        //passing it the password guess in plain text and the password hash obtained from the database to validate credentials.
        //If the password guess is valid, the method returns true, otherwise it returns false.The library will hash the password guess first and then compare the hashes
        .then(student => {
            if (students && bcrypt.compareSync(password, student.password)) {
                const token = generateToken(student)
                res.status(200).json({ message: `Hello ${student.username}, You've successfully logged in`, token })
            } else {
                res.status(401).json({ message: 'invalid login info, try again.' })
            }
        }).catch(error => {
            res.status(500).json({ message: 'Hey backend, you messed up, login failed' })
        })
})

function generateToken(student) {
    const payload = {
        subject: student.id,
        username: student.username,
    }
    const option = {
        expiresIn: '8h'
    }
    return jwt.sign(payload, secret.jwtSecret, option)
}


module.exports = router;