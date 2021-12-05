# Dashboard <br>

this is a simple app made in react/js, it makes requests on differents APIs to have a constent flow of informations! <br><br>

## Why react/js ? <br>

We were interested in this language and framework and JS looked pretty usefull to make web request and handling the back-end part, as for React it is flexible and easy to make beautifull front-end while handling some back-end part

## [Install] <br>

- choco install -y --force nodejs
- npm install react-scripts --save

## [Launch without Docker] <br>
- npm start
- Open new terminal
- cd client
- npm start

## [With Docker-compose]
- docker-compose build
- docker-compose up

## Misc... <br>
if you need to do functional testing please refer to [functionalTests.md](./functionalTests.md) if you wish to do testing or you just want to understand how the program works.

# Server Documentation <br>

The server is located on the port 8080 of the machine's localhost.<br>
If you wish to run the server just type `npm start` on your terminal and voila! <br><br>

## See informations <br>

To see informations about widgets you can call `http://localhost:8080/about.json` on your browser.<br>
A JSON file will be returned to you that will tell you wich services have been implemented, if you implement a service, please update that route in `src/index.mjs` <br> <br>

## Services

Here is a list of the actual services, how to use them and how to extract data from them, all these data will be a simple JSON.<br>
All the calls have to be with the method GET and will return a 200 on success, otherwise see the `on error` section <br> <br>

`/time`<br>
Gives you the time from this place, always funny to know.<br>
**params**<br>
`place`=(City or country to check) \=> default: Toulouse<br>
**return value**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;`city:`The city (or the capital of the targeted country)<br>
&nbsp;&nbsp;&nbsp;&nbsp;`region:`The region of the targeted place<br>
&nbsp;&nbsp;&nbsp;&nbsp;`country:`The targeted country<br>
&nbsp;&nbsp;&nbsp;&nbsp;`date:`The current date in the targeted city<br>
&nbsp;&nbsp;&nbsp;&nbsp;`time:`Current time in targeted city<br>
}<br>
**on error**<br>
The response code is `404` in case no city was found<br><br>

`/weather`<br>
Gives you the weather from this place, so you can be jealous because its raining in you country \>\:\).<br>
**params**<br>
`place`=(City or country to check) \=> default: Toulouse<br>
**return value**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;`weather:`The current weather in this country<br>
&nbsp;&nbsp;&nbsp;&nbsp;`icon:`A link to a cute image that shows the weather<br>
&nbsp;&nbsp;&nbsp;&nbsp;`temperature:`The actual temperature in this place in Celsius<br>
&nbsp;&nbsp;&nbsp;&nbsp;`feelslike:`The temperature you feel when you actually go out (in Celsius)<br>
&nbsp;&nbsp;&nbsp;&nbsp;`humidity:`The humidity of the air in per cent<br>
}<br>
**on error**<br>
The response code is `404` in case no city was found<br><br>
`/RandomJoke` <br>
This route gives you a random "dad joke" from a wide variety <br>
**return value** <br>
{ <br>
&nbsp;&nbsp;&nbsp;&nbsp;`setup:` the setup of the joke  <br>
&nbsp;&nbsp;&nbsp;&nbsp;`punchline:` The punchline of the joke AKA the funny<br>
} <br><br>

`/newWorld`<br>
This route gives you the status of the server from the MMO __new world__<br>
**params**<br>
`name`=(The name of the server you want to know the status)<br>
**return value**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;`name:`The name of the server<br>
&nbsp;&nbsp;&nbsp;&nbsp;`status:`The status of the server<br>
}<br><br>

`/zeldaSearch`<br>
Gives you informations about an item from any TLoZ game<br>
**params**<br>
`name`=(The name of the item)<br>
**return value**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;`name:`The name of the item<br>
&nbsp;&nbsp;&nbsp;&nbsp;`description:`A small description about the item<br>
}<br>
**on error**<br>
The API may be instable and return a `404` to you, i can't do anything about that<br><br>

`/zeldaItem`<br>
Gives you informations about a random item from any TLoZ game<br>
**return value**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;`name:`The name of the item<br>
&nbsp;&nbsp;&nbsp;&nbsp;`description:`A small description about the item<br>
}<br>
**on error**<br>
The API may be instable and return a `404` to you, i can't do anything about that<br><br>

`/trendingCrypto`<br>
Gives you the price of the current trending crypto B)<br>
**return value**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;`currency:` it is a tab containing multiple cryptos<br>
&nbsp;&nbsp;&nbsp;&nbsp;`currency.name:` the name of the crypto<br>
&nbsp;&nbsp;&nbsp;&nbsp;`currency.price:` the price of the crypto<br>
}<br>

`/subscriptions`
Gives you the price of the current trending crypto B)<br>
**params**<br>
&nbsp;&nbsp;&nbsp;&nbsp;`mail:` The user's mail, he must have been logged-in using OAuth2 session.<br>
**return value**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;`subs:` list of the user's subscriptions<br>
&nbsp;&nbsp;&nbsp;&nbsp;`subs.name:` The name of the channel<br>
&nbsp;&nbsp;&nbsp;&nbsp;`subs.description:` The description of the channel<br>
&nbsp;&nbsp;&nbsp;&nbsp;`subs.image.url:` The thumbnail of the channel.<br>
}<br>
**on error**<br>
`400:` The mail haven't been provided<br>
`401:` The provided mail haven't been logged in with OAuth2 meaning he is unauthorized, or that the key has expired, meaning he should get a new one<br>
`404:` The request failed and the package i used crashed, alas i can't do anything about it, just try sending another request.<br>