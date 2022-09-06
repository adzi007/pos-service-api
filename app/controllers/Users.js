import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    try {
        
        const users = await Users.findAll({
            attributes: ['id', 'name', 'username']
        });
        res.json(users);

    } catch (error) {
        
    }
}

export const Register = async (req, res) => {

    const { name, email, username, password, confPassword } = req.body;

    if(password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    const match = await bcrypt.compare(password, hashPassword);

    console.log("name", name);
    console.log("email", email);
    console.log("username", username);
    console.log("password", password);
    console.log("confPassword", confPassword);


    console.log("match login", match);

    try {
        
        await Users.create({
            name: name,
            email:email,
            username: username,
            password: hashPassword
        });

        res.json({ msg: "Register berhasil...!!!", match: match });

    } catch (error) {
        
    }

}

export const Login = async (req, res) => {

    try {
        
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({ msg: "Wrong password...!!!" });
        const userId = user[0].id;
        const name = user[0].name;
        const username = user[0].username;

        const accessToken = jwt.sign({ userId, name, username }, process.env.ACCESS_TOKEN_SECRET, { 
            expiresIn: '15s'
        });

        const refreshToken = jwt.sign({ userId, name, username }, process.env.REFRESH_TOKEN_SECRET, { 
            expiresIn: '1d'
        });

        await Users.update({ refresh_token: refreshToken }, {
            where:{
                id: userId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // const refreshTokenx = req.cookies;
        // console.log('refreshToken login',refreshTokenx)

        res.json({ accessToken });

    } catch (error) {

        console.log("errorxxxx", error);
        res.status(404).json({ msg: "username tidak ditemukan...!" });
    }

}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}