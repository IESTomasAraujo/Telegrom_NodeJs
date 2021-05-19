
const Model = require('./model');
//mongodb://db_user:Tomas2020@cluster0-shard-00-00.qwyc5.mongodb.net:27017,cluster0-shard-00-01.qwyc5.mongodb.net:27017,cluster0-shard-00-02.qwyc5.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-gtxf62-shard-0&authSource=admin&retryWrites=true&w=majority


console.log('[db] conectada con exito.')

function addChats(message){
   
    const myMessage = new Model(message);
    myMessage.save();
}

async function getChats(filterUser){
    return new Promise((resolve,reject)=>{
        let filter={};
    if(filterUser!==null){
        filter={user:filterUser};
    }
    const messages=Model.find(filter)
        .populate('user')
        .exec((error,populated)=>{
            if(error){
                reject(error);
                return false
            }
            resolve(populated);
        })
       
    })
    
}

async function updateText(id,message){
    const foundMessage=await Model.findOne({
        _id:id,
    })
    
    foundMessage.message=message;
    const newMessage=await foundMessage.save();
    return newMessage;
}

function removeMessage(id){
    return Model.deleteOne({
        _id:id
    })
}
module.exports={
    add:addMessage,
    list:getMessages,
    updateText:updateText,
    remove:removeMessage,
    //get,update,delete
}