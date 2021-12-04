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

function getTime(place) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/time?place=' + place).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getWeather(place) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/weather?place=' + place).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getCrypto() {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/trendingCrypto').then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getZeldaSearch(name) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/zeldaSearch?name=' + name).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getZeldaItemRand(blank) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/zeldaItem' + blank).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getNewWorld(server) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/newWorld?server=' + server).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getRandomJoke() {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/randomJoke').then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getYtb(mail) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/subscribtions?mail=' + mail).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getYtbK(key, code) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/setYtbKey?access_token=' + key + '?state' + code).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getRegisterYtb(code, mail) {
    return new Promise(function (resolve, reject) {
        axios.get('http://localhost:8080/registerYtbKey?code=' + code + '?mail' + mail).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getAllUsers,
    setRegisterUsers,
    getTime,
    getWeather,
    getCrypto,
    getZeldaSearch,
    getZeldaItemRand,
    getNewWorld,
    getRandomJoke,
    getYtb,
    getYtbK,
    getRegisterYtb
}