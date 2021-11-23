// server/index.js

import path, { dirname } from 'path';
import express from "express";
import fs from 'fs';
import { application } from 'express';
import crypto from 'crypto';
import { SMTPClient } from 'emailjs';
import { fileURLToPath } from 'url';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { RSA_PKCS1_OAEP_PADDING } from 'constants';
//import { http } from 'http';

const firebaseConfig = {
    apiKey: "AIzaSyDlBOlNSbS7qDhpvzdFtLI_s1F_L-Z_74U",
    authDomain: "dashboard-331720.firebaseapp.com",
    databaseURL: "https://dashboard-331720-default-rtdb.firebaseio.com",
    projectId: "dashboard-331720",
    storageBucket: "dashboard-331720.appspot.com",
    messagingSenderId: "213049852255",
    appId: "1:213049852255:web:8e54e0c26a89abc2f6b6ea",
    measurementId: "G-99M7JLHJNM"
};

const database = initializeApp(firebaseConfig);
//const analytics = getAnalytics(database);
const __dirname = dirname(fileURLToPath(import.meta.url));

const fbase = initializeApp(firebaseConfig);
const db = getDatabase();
var users = new Map();
const PORT = process.env.PORT || 8080;
const app = express();

const client = new SMTPClient ({
	user: 'joojnathan.popolaf@gmail.com',
	password: 'Hu7,!PlYtG',
	host: 'smtp.gmail.com',
	ssl: true,
});

function sendOAuthMail(mail, confirmation, token) {
	client.send({
    from : "joojnathan.popolaf@gmail.com",
    to : mail,
	subject : "[DashBob] > " + (confirmation === true ? "Account confirmation" : "Login confirmation"),
	text : "Hello, click on the following link to confirm that this is you, if its not, please ignore this mail\n\nhttp://localhost:8080/confirmRegister?token=" + token + "&mail=" + mail,
	},
	(err, message) => {
		console.log(err || message);
    });
}

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/login", (req, res) => {
    var pass = req.query.pass;
    var mail = req.query.mail;
    if (!pass || !mail)
        res.status(401);
    var dbref = ref(getDatabase());
    var mailPath = mail.replace(mail.replace(".", "_"));
    get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists() === false) {
            res.status = 401;
            return;
        }
        var currToken = snapshot.child("registerKey").val();
        var savedPass = snapshot.child("password").val();
        if (savedPass != pass || token !== "") {
            res.status = 401;
            return;
        }
        res.status = 200;
    });
    });

app.get("/confirmRegister", (req, res) => {
    const dbRef = ref(getDatabase());
    var mail = req.query.mail;
    var path = "users/" + mail.replace(".", "_");
    var token = req.query.token;
    get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists()) {
            var currToken = snapshot.child("registerKey").val();
            var pass = snapshot.child("password").val();
            if (currToken != token) {
                res.status(401)
            } else {
                set(ref(db, path), {
                    mail: mail,
                    password: pass,
                    registerKey: ""
                });
                res.status(200);
            }
        } else
            res.status(401);
    });
});

app.get("/register", (req, res) => {
    var pass = req.query.pass;
    var mail = req.query.mail;
    if (!pass || !mail)
        res.json({ message: "empty password or mail"});
    var token = crypto.randomBytes(15).toString("hex");
    var path = mail.replace(".", "_");
    set(ref(db, 'users/' + path), {
        mail: mail,
        password: pass,
        registerKey : token
      });
      sendOAuthMail(mail, true, token);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/weather", (req, res) => {
    res.json({ message: "I need to do that" });
});

app.post("/registerYtbKey", (req, res) => {
    var state = crypto.randomBytes(20).toString('hex');
    var currUrl = ytbLogUrl + state;
    window.location.replace(currUrl);
});

app.get('*', (req, res) => {
    res.json({ message: "idk mate" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});