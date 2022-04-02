const User = require('../models/user')
const bcrypt = require("bcrypt")
const Joi = require('joi');
const { exist } = require('joi');
const CreateUser = async (req, res) => {
    const Schema = Joi.object({
        Name: Joi.string()
            .min(5)
            .max(30)
            .required(),
        Email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .required(),
        password: Joi.string()
            .min(8)
            .max(16)
            .required()
    });
    let validateSchema = Schema.validate(req.body)
    let userpayload;
    let data;
    if (validateSchema.error) {
        return res.status(400).json({
            massage: validateSchema.error.massage || "Bad Request",
            code: 400
        })

    } else {      
        userpayload = validateSchema.value;
        data = {
            Name: userpayload.Name,
            Email: userpayload.Email,
            password: bcrypt.hashSync(userpayload.password, 10)
        }
    }
    try {
        const exits = await User.findOne({ where: { Email: userpayload.Email } })
        console.log(exits);
        if (exits) {
            return res.status(200).send({
                massage: "user already exits",
                status: 422,
                data: exits

            })
        } else {
            const result = await User.create(data)
            return res.status(201).send({
                massage: "user added successfully",
                status: 201,
                data: result
            })

        }
    } catch {
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
}

const login=async(req,res)=>{
    // object pass
    const Schema = Joi.object({
        Email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .required(),
        password: Joi.string()
            .min(8)
            .max(16)
            .required()
    });
    let validateSchema = Schema.validate(req.body)
    let userpayload;
    let data;
    if (validateSchema.error) {
        return res.status(400).json({
            massage: validateSchema.error.massage || "Bad Request",
            code: 400
        })

    } else {      
        userpayload = validateSchema.value;
    }
    try{
        const exits = await User.findOne({ where: { Email: userpayload.Email } })
        if (!exits) {
            return res.status(404).send({
                massage: "data not found",
                status: 404,
            })
        }
        else{
            let password= await bcrypt.compareSync(req.body.password,exits.password)
            console.log(password,".Purnima@123");
            if(password){
                return res.status(200).send({
                    massage: "login successfully",
                    status: 200,
                    data: exits
                })
            }else{
                return res.status(404).send({
                    massage: "password or email invalid",
                    status: 404,
                })
            }
        }
    }catch(err){

    }
}
module.exports={CreateUser,login}