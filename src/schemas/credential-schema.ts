import { url } from "inspector";
import Joi from "joi";
import { CredentialData } from "protocols/credential-types";


const credentialSchema = Joi.object<CredentialData>({
    title: Joi.string().required(),
    url: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
});

export default credentialSchema;


