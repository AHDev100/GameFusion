import User from "../../db/models/User.js";

function parseJWT(token : String | null) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export async function getUserDetails(token : String | null){
    const userId : Number | null = parseJWT(token).id;
    if (userId) {
        const user = await User.findOne({where : {id: userId}}); 
        let userInfo = {
            id: userId,
            username: user.dataValues.username,
            password: user.dataValues.password, 
            pfp: user.dataValues.pfp, 
        }; 
        return userInfo;
    }
};