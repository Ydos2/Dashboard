import axios from 'axios';

function getAllUsers(login, password) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/login?mail=' + login + '&pass=' + password).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function setRegisterUsers(login, password, name) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/register?mail=' + login + '&pass=' + password + '&name=' + name).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getAllUsers,
    setRegisterUsers
}