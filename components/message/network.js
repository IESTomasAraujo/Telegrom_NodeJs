const express = require('express')

const router = express.Router();

const response = require('../../network/response');

const controller = require('./controller')

router.get('/',function(req,res){
    const filterMessages=req.query.user||null;
    controller.getMessages(filterMessages)
    .then((messageList)=>{
        response.success(req,res,messageList,200);
    })
    .catch(e=>{
        response.error(req,res,'Unexpected Error',500,e);
    })
});

// app.use('/',function(req,res){
//     res.send('Hola');
// });

router.post('/',function(req,res){
    
    controller.addMessage(req.body.user,req.body.message)
    .then((fullMessage)=>{
        response.success(req,res,fullMessage,201);
    })
    .catch(e=>{
        response.error(req,res,'Informacion invalida',400,'Error en el controlador');
    })


    // res.status(201).send([{error:'',body:'Creado Correctamente'}]);
    
});

router.patch('/:id',function(req,res){
    
    console.log(req.params.id);

    controller.updateMessage(req.params.id,req.body.message)
        .then((data)=>{
            response.success(req,res,data,200);
        })
        .catch((e)=>{
            response.error(req,res,'Error Interno',500,'Error en el controlador');
        })
    
});

router.delete('/:id',function(req,res){
    controller.deleteMessage(req.params.id)
    .then(()=>{
        response.success(req,res,`Usuario ${req.params.id} eliminado` ,200);
        
    })
    .catch(e=>{
        response.error(req,res,'Error interno',500,e);
    })
})


module.exports = router;