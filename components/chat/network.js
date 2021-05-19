const express = require('express')

const router = express.Router();

const response = require('../../network/response');

const controller = require('../user/controller');

router.post('/',function(req,res){
    controller.addUser(req.body.name)
    .then(data=>{
        response.success(req,res,data,201);
    })
    .catch(err=>{
        response.error(req,res,'Internal Error',500,err);
    })
})

router.get('/',function(req,res){
    const filterMessages=req.query.user||null;
    controller.getUsers(filterMessages)
    .then((messageList)=>{
        response.success(req,res,messageList,200);
    })
    .catch(e=>{
        response.error(req,res,'Unexpected Error',500,e);
    })
});