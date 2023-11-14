const dotenv = require('dotenv');
const Joi = require('joi');//to create object
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });//dot env is a npm file knows how to handle env variables
const envVarSchema = Joi.object()//verifiation tool
    .keys(
        {
            PORT: Joi.number().default(3000),
            MONGODB_URL: Joi.string().required(),//an obj is created default values
        }
    )
    .unknown();
const { value: envVars, error } = envVarSchema.prefs({ errors: { label: 'key' } }).validate(process.env);//fetches tha data from the env file
if (error)
    throw new Error(`config validation error: ${error.message}`);
module.exports = {
    PORT: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: false
        }
    }
};