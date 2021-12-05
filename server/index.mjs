// server/index.js

import path, { dirname } from 'path';
import express from "express";
import cors from "cors";
import crypto from 'crypto';
import { SMTPClient } from 'emailjs';
import { fileURLToPath } from 'url';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { initializeApp } from "firebase/app";
import fetch from 'node-fetch';
import { getSystemErrorMap } from 'util';

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

const fbase = initializeApp(firebaseConfig);
const db = getDatabase();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;
const app = express();
const cryptoKey = "4c4a16e6-f008-4c89-8409-ece68dc8a13d"
var ytbKey = new Map();
var waitingYtbKey = new Map();

app.use(cors());

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

const client = new SMTPClient ({
	user: 'joojnathan.popolaf@gmail.com',
	password: 'Hu7,!PlYtG',
	host: 'smtp.gmail.com',
	ssl: true,
});

function sendPasswordMail(mail, token)
{
    client.send( {
        from: "joojnathan.popolaf@gmail.com",
        to: mail,
        subject: "[DashBob] > Password reset",
        text: "Hello, it seems that u forgor 💀 your password click on the following link to reset it\n\nhttp://localhost:8080/verifyToken?" + token,
    })
}

function sendOAuthMail(mail, confirmation, token) {
    client.send({
    from : "joojnathan.popolaf@gmail.com",
    to : mail,
	subject : "[DashBob] > " + (confirmation === true ? "Account confirmation" : "Login confirmation"),
	text : "Hello, click on the following link to confirm that this is you, if its not, please ignore this mail\n\nhttp://localhost:8080/confirmRegister?token=" + token + "&mail=" + mail,
    attachment: {
        path: "./assets/mailgif.gif",
        type: "image/gif",
        headers: {"Content-ID": "<my-gif>"},
        },
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
    var path = "users/" + mail.replaceAll(".", "_");
    get(child(dbref, path)).then((snapshot) => {
        if (snapshot.exists() === false) {
            res.status(401).json ({ message : "Unregistered user"});
            return;
        }
        var currToken = snapshot.child("registerKey").val();
        var savedPass = snapshot.child("password").val();
        var _username = snapshot.child("name").val();
        if (savedPass != pass || currToken !== "") {
            res.status(401).json ({ message : "Token or password differs"});
            return;
        }
        crypto.randomBytes(21).toString("hex");
        res.status(200).json ({ username : _username});
    });
});

app.get("/confirmRegister", (req, res) => {
    var mail = req.query.mail;
    var token = req.query.token;
    var path = "users/" + mail.replaceAll(".", "_");
    const dbRef = ref(getDatabase());
    get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists()) {
            var currToken = snapshot.child("registerKey").val();
            var pass = snapshot.child("password").val();
            if (currToken != token) {
                res.status(401).json({ message: "unknown user"});
                return;
            } else {
                set(ref(db, path), {
                    mail: mail,
                    name: snapshot.child("name").val(),
                    password: pass,
                    registerKey: ""
                });
                res.status(200).json({message: "Go back to login page (express.redirect isn't working we can't do anything about that)"}  );
                return;
            }
        } else
            res.status(401).json({ message: "unknown user"});
            return;
    });
});

app.get("/resetPassword", (req, res) => {
    var token = req.query.token;
    var mail = req.query.mail;
    var newPass = req.query.pass;
    var path = "users/" + mail.replaceAll(".", "_");
    if (mail === undefined || token === undefined || newPass === undefined) {
        res.status(401).json({message: "Something is missing"});
        return;
    }
    const dbRef = ref(getDatabase());
    get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists() && snapshot.child("registerKey").val == token) {
            set(ref(db, path), {
                mail: mail,
                registerKey: snapshot.child("registerKey").val(),
                password: newPass,
                name: snapshot.child("name").val(),
                registerKey: ""
            });
            res.status(200).json({message: "ok"});
        } else {
            res.status(404).json({error: "unknown user"});
            return;
        }
    });
});

app.get("/register", (req, res) => {
    var pass = req.query.pass;
    var mail = req.query.mail;
    var name = req.query.name;

    if (!pass || !mail || !name)
        res.json({ message: "empty password or mail"});
    var token = crypto.randomBytes(15).toString("hex");
    var path = mail.replaceAll(".", "_");
    try {
        set(ref(db, 'users/' + path), {
            mail: mail,
            name: name,
            password: pass,
            registerKey : token
        });
        sendOAuthMail(mail, true, token);
        res.status(200).json({ message: "c\'est ok"});
    } catch (e) {
        console.log(e);
        res.status(401);
    }
});

app.get("/forgotPassword", (req, res) => {
    var mail = req.query.mail;
    var path = "users/" + mail.replaceAll(".", "_");
    const dbRef = ref(getDatabase());
    get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists()) { 
            var key = crypto.randomBytes(20).toString("hex");
            set(ref(db, path), {
                mail: mail,
                password: snapshot.child("password").val(),
                registerKey: snapshot.child("registerKey").val(),
                name: snapshot.child("name").val(),
                passChangeKey: key 
            });
            sendPasswordMail(mail, key);
            res.status(200).redirect("http://localhost:3000/login");
            return;
        } else {
            res.status(404).json({message: "unknown user"});
            return
        }
    });
});

app.get("/time", async (req, res) => {
    try {
        var q = req.query.place;
        if (q === undefined) {
            q = "Toulouse";
        }
        var response = await fetch("http://api.weatherapi.com/v1/current.json?key=25e457af789d4d3fb7d175313210911&q=" + q, {
            method: 'get',
        })
        var json = await response.json();
        if (response.status == 200) {
            var time = JSON.stringify(json.location.localtime).replace("\"", "").split(" ");
            time[1] = time[1].replace("\"", "");
            res.json({city: json.location.name,
            region: json.location.region,
            country: json.location.country,
            date: time[0],
            time: time[1]});
        } else {
            res.status(400).json({error: "not found"});
        }
    } catch (e) {
        res.status(401).json({error: "unknown error"});
    }
});

app.get("/weather", async (req, res) => {
    try {
        var q = req.query.place;
        if (q === undefined) {
            q = "Toulouse";
        }
        var response = await fetch("http://api.weatherapi.com/v1/current.json?key=25e457af789d4d3fb7d175313210911&q=" + q, {
            method: 'get',
        })
        var json = await response.json();
        if (response.status === 200) {
            var time = JSON.stringify(json.location.localtime).replace("\"", "").split(" ");
            time[1] = time[1].replace("\"", "");
            res.json({
                weather: json.current.condition.text,
                icon: json.current.condition.icon,
                temperature: json.current.temp_c,
                feelslike: json.current.feelslike_c,
                humidity: json.current.humidity
            });
        } else {
            res.status(404).json( { error: "not found"});
        }
    } catch (e) {
        res.status(401).json({error: "unknown error"});
    }
});

app.get("/trendingCrypto", async (req, res) => {
    try {
        var rsp = await fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10&convert=EUR&start=1", {
            method: "GET",
            headers: {
                "X-CMC_PRO_API_KEY": cryptoKey
            }
        });
        var json = await rsp.json();
        var jsonpush = {};
        jsonpush.currency = [];
        for(var i = 0; i < json.data.length; i++) {
            var obj = json.data[i];
            jsonpush.currency.push({
                name: obj.name,
                price: obj.quote.EUR.price
            });
        }
        res.status(200).json(jsonpush);
    } catch (e) {
        res.status(401).json({error: "unknown error"});
    }
});

app.get("/subscribtions", async (req, res) => {
    var mail = req.query.mail;
    if (mail === undefined) {
        res.status(400).json({ error: "no mail provided"});
        return;
    }
    var key = ytbKey.get(mail);
    if (key === undefined) {
        res.status(401).json({ error: "user not logged in"});
        return;
    }
    try {
        var rsp = await fetch("https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50", {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + key
            }
        });
        var json = await rsp.json();
        var jsonpush = {};
        jsonpush.subs = [];
        if (json.items !== undefined) {
            for(var i = 0; i < json.items.length; i++) {
                var obj = json.items[i].snippet;
                jsonpush.subs.push({
                    name: obj.title,
                    description: obj.description,
                    image: obj.thumbnails.default
                });
            }
        }
        res.status(200).json({jsonpush});
    } catch (e) {
        console.log(e);
        res.status(404).json({error: "unknown error"});
    }
});

app.post("/setYtbKey", (req, res) => {
    var key = req.query.access_token;
    var mail = req.query.mail;
    if (key === undefined || mail === undefined) {
        res.status(401).json({ error: "NO"});//res.redirect("http://localhost:3000/#/app/dashboard");
        return;
    }
    ytbKey.set(mail, key);
    res.status(200).json({message: "ok"});
});

app.get("/zeldaSearch", async(req, res) => {
    try {
        var item = req.query.name;
        var rsp = await fetch("https://the-legend-of-zelda.p.rapidapi.com/items?limit=1&name=" + item, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "the-legend-of-zelda.p.rapidapi.com",
                "x-rapidapi-key": "6906c4a149mshd38212a0846a409p171065jsnf107f9262463"
            }
        });
        var json = await rsp.json();
        var item = json.count;
        if (rsp.status != 200)  {
            res.status(404).json({error: "api failed"});
            return;
        }
        if (item == 0) {
            res.json({name: "not found"});
            return;
        }
        res.json({name: json.data[0].name,
        description: json.data[0].description});
    } catch (e) {
        res.status(401).json({error: "unknown error"});
    }
})

app.get("/zeldaItem", async(req, res) => {
    try {
        var itemNb = Math.floor((Math.random() * 150) + 1);
        var rsp = await fetch("https://the-legend-of-zelda.p.rapidapi.com/items?limit=1&page=" + itemNb, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "the-legend-of-zelda.p.rapidapi.com",
                "x-rapidapi-key": "6906c4a149mshd38212a0846a409p171065jsnf107f9262463"
            }
        });
        var json = await rsp.json();
        var item = json.count;
        if (item == 0) {
            res.json({name: "not found"});
            return;
        } else if (json.data === undefined) {
            res.status(404).json({error: "api failed"});
            return;
        }
        if (res.statusCode == 200)
            res.json({ name: json.data[0].name,
                    description: json.data[0].description});
        else {
            res.status(404).json({error: "api failed"});
        }
    } catch (e) {
        res.status(401).json({error: "unknown error"});
    }
});

app.get("/newWorld", async (req, res) => {
    try {
        var srv = req.query.server;
        var rsp = await fetch("https://new-world-server-status.p.rapidapi.com/server/" + srv, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "new-world-server-status.p.rapidapi.com",
                "x-rapidapi-key": "6906c4a149mshd38212a0846a409p171065jsnf107f9262463"
            }
        });
        if (rsp.status == 200) {
            var json = await rsp.json();
            res.json({name: json.ServerName,
            status: json.ServerStatus});
        } else {
            res.json({ error: "not found"});
        }
    } catch (e) {
        res.status(401).json({error: "unknown error"});
    }
});

app.get("/randomJoke", async (req, res) => {
    try {
        var rsp = await fetch("https://dad-jokes.p.rapidapi.com/random/joke/png", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
                "x-rapidapi-key": "6906c4a149mshd38212a0846a409p171065jsnf107f9262463"
            }
        });
        var js = await rsp.json();
        res.json({setup: js.body.setup,
        punchline: js.body.punchline});
    } catch {
        res.status(401).json({error: "Api calls overload"});
    }
});

app.get("/about.json", (req, res) => {
    var ip = req.socket.remoteAddress;
    var time = + new Date();
    res.json({ client: {
        host: ip
    },
    current_time: time,
    "services": [{
        name: "weather",
        widgets: [{
            name: "localWeather",
            description: "displays the local weather of the focused city",
            params: [{
                name: "place",
                type: "string"
            }],    
        },{
            name: "time",
            widgets: [{
                name: "localTime",
                description: "Displays the time in the targeted location",
                params: [{
                    name: "place",
                    type: "string"
                }],
            }],
        }],
        },{
        name: "crypto",
        widgets: [{
            name: "Tendencies",
            description: "Displays the most valuable current cryptocurrencies",
        }],
    },{
        name: "zelda",
        widgets: [{
            name: "RandomItem",
            descritpion: "Give a random item of the legend of zelda's series",
        },{
            name: "SearchItem",
            description: "Search for an item from TLOZ series",
            params: [{
                name: "name",
                type: "string"
            }]
        }]
    },{
        name: "RandomJoke",
        widgets: [{
            name: "random",
            description: "gives you a random joke from a wide variety"
        }]
    },{
        name: "new World",
        widgets: [{
            name: "ServerStatus",
            description: "Know if your favorite server is up.",
            params: [{
                name: "name",
                type: "string"
            }]
        }]
    },{
        name: "crypto",
        widgets: [{
            name: "trending",
            description: "Check the price of the new trending cryptos"
        }]
    },{
        name: "Youtube",
        type: "OAuth2",
        widgets: [{
            name: "Subscriptions",
            description: "Sends the current subscription of the logged-in user"
        }]
    }]
});
});

app.get('*', (req, res) => {
    res.json({ message: "idk mate" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});