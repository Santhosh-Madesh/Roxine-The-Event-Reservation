const organiserModel = require("../db/schemas/userSchema");



const createOrganiser = async(user) => {

    try{

        const organiser = await organiserModel.create({
            name: user.name,
            email: user.email,
            password: user.password,
            role: "organiser"
        })
        
        return organiser;

    } catch(error) {
        console.log(`Error occurred at createOrganiser model, error:${error}`);
        return false;
    }
}

const updateOrganiser = async(orgId, dataObj) => {

    try{

        await organiserModel.findByIdAndUpdate(orgId, dataObj);

    } catch(error) {
        console.log(`Error occurred at updateOrganiser model, error:${error}`);
        return false;
    }
}

const deleteOrganiser = async(orgId) => {

    try{

        const deletedOrganiser = await organiserModel.deleteOne({_id:orgId});

        return deletedOrganiser;

    } catch(error){
        console.log(`Error occurred at deleteOrganiser model, error:${error}`);
        return false;
    }

}



module.exports = {
    createOrganiser,
    updateOrganiser,
    deleteOrganiser,
}