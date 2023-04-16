const express =require('express');
const colors =require("colors");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors =require ('cors');

require("dotenv").config();
const port = process.env.PORT ||5000 ;
console.log(process.env.WEATHER_API_KEY);
const connectDB = require('./config/db');


//"test": "echo \"Error: no test specified\" && exit 1"

const app =express();
// Connect to database
connectDB();
app.use(cors());
app.listen(port, console.log(`Server running on port ${port}`));
app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: process.env.NODE_ENV === 'development',
    })
  );
  //197.1.75.166/32