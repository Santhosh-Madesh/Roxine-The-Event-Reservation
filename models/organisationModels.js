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

        const organisationRequest = await organizationModel.findOne({user_id:userId});

        return organisationRequest;

    } catch (error) {
        console.log(`Error occurred at retriveOrgById, error:${error}`);
        return false;
    }
}


module.exports = {
    createOrgRequest,
    retriveOrgByUserId,
}