const userModel = require("../db/schemas/userSchema");

const createUser = async(user) => {

    try{

        const newUser = await userModel.create({
        name : user.name,
        email : user.email,
        password : user.password

    })

    return newUser;

    } catch(error){

        console.log(`Error occured at createUser model, error : ${error}`);
        return false;

    }
}

const retriveUser = async(email) => {

    try{

        const user = await userModel.findOne({email:email});

        return user;


    } catch(error){

        console.log(`Error occured at retriveUser model, error : ${error}`);
        return false;
    }

}

const retriveUserById = async(id) => {

    try{

        const user = await userModel.findById(id);

        return user;


    } catch(error){

        console.log(`Error occured at retriveUserById model, error : ${error}`);
        return false
    }
}

module.exports = {
    createUser,
    retriveUser,
    retriveUserById,
}