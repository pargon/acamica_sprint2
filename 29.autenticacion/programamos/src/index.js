const {config} = require("dotenv");
const express = require("express");
const {prepareMidd} = require("./controller/midd");
const { loadRouters } = require("./controller/routers");
const {connect} = require("./model");

async function main(){

    config();
    const server = express();
    const PORT = global.process.env.PORT;
    const models = await connect();

    prepareMidd(server, models);
    loadRouters(server, models);

    server.listen(PORT, ()=> {
        console.log("SERVER READY");
    });
    
};

main();