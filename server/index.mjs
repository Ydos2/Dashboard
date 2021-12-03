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
    var path = "users/" + mail.replace(".", "_");
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
    const dbRef = ref(getDatabase());
    var mail = req.query.mail;
    var token = req.query.token;
    var path = "users/" + mail.replace(".", "_");
    get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists()) {
            var currToken = snapshot.child("registerKey").val();
            var pass = snapshot.child("password").val();
            if (currToken != token) {
                res.status(401).json({ message: "unknown user"});
            } else {
                set(ref(db, path), {
                    mail: mail,
                    password: pass,
                    registerKey: ""
                });
                res.status(200).json({ message: "Sucess"});

            }
        } else
            res.status(401).json({ message: "unknown user"});;
    });
});

app.get("/register", (req, res) => {
    var pass = req.query.pass;
    var mail = req.query.mail;
    var name = req.query.name;
    if (!pass || !mail || !name)
        res.json({ message: "empty password or mail"});
    var token = crypto.randomBytes(15).toString("hex");
    var path = mail.replace(".", "_");
    set(ref(db, 'users/' + path), {
        mail: mail,
        name: name,
        password: pass,
        registerKey : token
      });
      sendOAuthMail(mail, true, token);
      res.status(200).json({ message: "c\'est ok"});
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/time", async (req, res) => {
    var q = req.query.place;
    if (q === undefined) {
        q = "Toulouse";
    }
    var response = await fetch("http://api.weatherapi.com/v1/current.json?key=25e457af789d4d3fb7d175313210911&q=" + q, {
        method: 'get',
    })
    var json = await response.json();
    var time = JSON.stringify(json.location.localtime).replace("\"", "").split(" ");
    time[1] = time[1].replace("\"", "");
    if (response.status == 200) {
        res.json({city: json.location.name,
        region: json.location.region,
        country: json.location.country,
        date: time[0],
        time: time[1]});
    }
});

app.get("/weather", async (req, res) => {
    var q = req.query.place;
    if (q === undefined) {
        q = "Toulouse";
    }
    var response = await fetch("http://api.weatherapi.com/v1/current.json?key=25e457af789d4d3fb7d175313210911&q=" + q, {
        method: 'get',
    })
    var json = await response.json();
    if (response.status === 200) {
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
});

app.get("/trendingCrypto", async (req, res) => {
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
});

app.get("/subscribtions", (req, res) => {
    var mail = req.query.mail;
    if (mail === undefined) {
        res.status(401).json({ error: "no mail provided"});
        return;
    }
    var key = ytbKey.get(mail);
    if (key === undefined) {
        res.status(401).json({ error: "user not logged in"});
        return;
    }
});

app.get("/setYtbKey", (req, res) => {
    req.url = req.originalUrl.replace("#", "?")
    var key = req.query.access_token;
    var code = req.query.state;
    var mail = waitingYtbKey.get(code);

    if (key === undefined || mail === undefined || code === undefined) {
        res.status(200).json({ error: "NO"});//res.redirect("http://localhost:3000/#/app/dashboard");
        return;
    }
    ytbKey.set(mail, key);
    res.redirect("http://localhost:3000/#/app/dashboard");
});

app.post("/registerYtbKey", (req, res) => {
    var state = crypto.randomBytes(20).toString('hex');
    var code = req.query.code;
    var mail = req.query.mail;
    if (mail === undefined || code === undefined) {
        res.status(401).json({message: "no password or code sent"});
        return;
    }
//    var currUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=213049852255-7lr2e9v67g3ahhon6i072l2a2o4shgtj.apps.googleusercontent.com&redirect_uri=http://localhost:8080/setYtbKey&response_type=token&scope=https://www.googleapis.com/auth/youtube&state=" + state + "";
       
    waitingYtbKey.set(code, mail);
    console.log(waitingYtbKey.get(code));
    res.status(200).json({message: "Ok"});
});

app.get("/zeldaSearch", async(req, res) => {
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
})

app.get("/zeldaItem", async(req, res) => {
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
    }
    if (res.statusCode == 200)
        res.json({ name: json.data[0].name,
                description: json.data[0].description});
    else {
        res.status(404).json({error: "api failed"});
    }
})

app.get("/newWorld", async (req, res) => {
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
})

app.get("/randomJoke", async (req, res) => {
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
    }]
});
})

app.get('*', (req, res) => {
    res.json({ message: "idk mate" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});