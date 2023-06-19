import jwt from "jsonwebtoken";

export async function resetPasswordPage(req,res){
    const {token} = req.query;
    try{
        const decoded = await jwt.verify(token,'your-secret-key');
        return res.status(200).json({token: token, message: "Token sent successfully"});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message: "Internal server error"});
    }
}