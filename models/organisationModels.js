const organizationModel = require("../db/schemas/organizationSchema");



const createOrgRequest = async(name, userId) => {

    try{

        const organisation = await organizationModel.create(
            {
            name:name, user_id:userId
            }
        );

        return organisation;

    } catch(error){
        console.log(`Error occurred at createOrgRequest, error:${error}`);
        return false;
    }
}

const retriveOrgByUserId = async(userId) => {

    try{

        const organisationRequest = await organizationModel.findOne({user_id:userId, status:"accepted"});

        return organisationRequest;

    } catch (error) {
        console.log(`Error occurred at retriveOrgById, error:${error}`);
        return false;
    }
}


const updateOrgByUserId = async(userId, newData) => {

    try{

        const updatedData = await organizationModel.updateOne({user_id:userId}, newData);

        return updatedData;

    } catch(error){
        console.log(`Error occurred at updateOrgByUserId, error:${error}`);
        return false;
    }
}

module.exports = {
    createOrgRequest,
    retriveOrgByUserId,
    updateOrgByUserId,
}