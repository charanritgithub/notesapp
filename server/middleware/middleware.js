import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const middleware = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if(!token){
            return res.status(401).json({success:false,message:"Unauthorised"})
        }

        const decoded = jwt.verify(token, "screatKeyofnoteapp@8688")

        if(!decoded){
            return res.status(401).json({success:false,message:"Wrong token"})

        }

        const user = await User.findById({_id: decoded.id})

        if(!user){
            return res.status(401).json({success:false,message:"No User"})
            
        }

        const newUser = {name: user.name, id: user._id}
        req.user = newUser
        next()
    } catch (error) {
        return res.status(401).json({success:false,message:"Please login"})
        
    }
}

export default middleware