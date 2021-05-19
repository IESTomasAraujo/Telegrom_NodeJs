const Model=require('./model');

function addUser(user){
    const myUser=new Model(user);
    return myUser.save();
}

async function getUsers(filterUser){
    let filter={};
    if(filterUser!==null){
        filter={user:filterUser};
    }
    const messages=await Model.find(filter);
    return messages;
}

module.exports={
    add:addUser,
    list:getUsers,
}
