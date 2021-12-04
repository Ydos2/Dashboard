# Functional tests <br>

This documents will guide you to make manual testing to make sure the program wont break after you add stuff into it <br><br>

## Server <br>

The server is the simplest one to test.<br>
Go to the root directory then execute `npm start` the server should be on and the quote "Server running on port 8080" should be visible.<br>
Then make sure all routes works correctly, to do so, open your browser and tests all routes by going to the url [http://localhost:8080/](http://localhost:8080/about.json) change the route by adding anything from `doc.md` file.<br>
Check if all the return values specified works, make sure to use _FireFox_ as it has an integrated JSON reader by default.<br><br>

## Client <br>

First make sure the __**server is started**__ before testing the client.<br>
Then the client, here is the list of commands to launch a base client<br>
`npm run build`<br>
`cd client`<br>
`npm start`<br>
After that it will automaticaly open your broser to [this adress](http://localhost:3000) if not, there may be a problem with your computer, or the program notre correctly compiling.<br>
Once you are on the website try anything, register, login, wrong password, login without confirming your email etc...<br>
once you have tested the login system, try removing, adding, changing widgets to tickle the server a bit, if you see a value that should not be there (refer to [doc.md](./doc.md)) then take a look at the code. <br>

## Docker <br><br>

You can also launch the program with docker using: <br>
`docker compose buid` then `docker compose up`<br>
Both server and client must be up after those two commands otherwise there are thing to fix.