const mongoose = require("mongoose");

const URI = `mongodb+srv://roxine359_db_user:${process.env.DB_PASSWORD}@roxineclustor.xow22rn.mongodb.net/?appName=RoxineClustor`


const connectDB = async() => {

    try{

        const connection = await mongoose.connect(URI);

        console.log("Database connected successfully!");



    } catch (error) {

        console.log("Database failed to connect, error : "+ error);
        process.exit(1);

    } finally{

        mongoose.disconnect();

    }

}

module.exports = connectDB;