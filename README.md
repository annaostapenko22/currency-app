# Currency Conversion App

Currency Conversion App is a dashboard that shows the current value of a EUR amount in CHF and USD. Also there is an overview of the last two weeks conversion rates in a graphical chart.

## Launch project

Add Currency-Layer API key to the .env file in src directory.
Run `yarn` or `npm install` to install all dependencies and `yarn start` or `npm start` to start the project. It will be opened on http://localhost:3000.

## Features

You can:
* Convert currencies from and to the target currencies (EUR, USD, CHF)
* Retrieve historical currency conversion rates for two weeks
* See a chart of daily currency rates for a selected list of target currencies

Programm can:
* Cache historical currency conversion rates not to send unnecessary requests
