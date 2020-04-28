# METOCEAN APPLICATION
Interactive metocean application to help marine professionals to make decisions based on the weather.

[DEMO](http://felipepavanela78601.ipage.com/metocean/)

## How to run this app
Clone project and install dependencies
```
$ git clone https://github.com/felipe-mapa/met-ocean-app.git
$ cd met-ocean-app
$ npm install
```
Import 'metocean.sql' database

Open another terminal tab and run backend server.
```
$ php -S 127.0.0.1:8000
```

To run frontend server.
```
$ npm run start
```

To build the app.
```
$ npm run build
```

*if using XAMPP, make sure main directory (or just backend) is inside /xampp/htdocs

## Technologies
Initially I planned to build the app with Laravel and React, however I had about 24 hours to finish the app so I decided to go with plain PHP which I am more familiar with, and if I had time at the end, migrate to Laravel for security purpose.

So, for this application I mainly used:
- React (with Typescript), Redux, PHP, MySQL and Victory (for the charts).

## Database
I created 2 tables on MySQL:

1. hourly_data -> the hourly data saved on file metocean-data.txt
2. columns -> all the columns present on hourly_data table with its description and the measurement used for the variables (eg. %, C, deg, kts, m).

## Challenges

#### 1. Data visualization
The biggest challenge for me was to work with data visualizer since I have never used a library like that before.

Initially, I was going to use d3.js because of it's reputation, after some research I found that it's not as easy to use with React. I only had about 24 hours to finish the project, so I decided to a find a React-focused library, and the one I ended up using was [Victory](https://formidable.com/open-source/victory/). After few hours playing around with it I got the hang of the library and start finding it really easy and intuitive to use.

#### 2. Understand ASCII text file with metocean variables
The first time I looked at the document I didn't know where to start, because of the amount of content it had. So, to be able to visualize and understand what I was dealing with I decoded the doc to have it clear how the data looks and is organised.