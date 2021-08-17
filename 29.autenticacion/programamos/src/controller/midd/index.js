const express = require("express");
const { setModels, verifyJWT } = require("./auth");

function prepareMidd(server, models){
    setModels(models);

    server.use(express.json());
    server.use(express.urlencoded({extended: false}));
    
    //server.use(verifyJWT);
}

module.exports = {prepareMidd};