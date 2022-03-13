import { User } from "../models/user.model";

export async function getUser(req, res, next) {
    try {
        const user_u = await User.findById(req.params.user_id);
        console.log("#sada")
        res.status(201).json(user_u);
    } catch (e) {
        res.status(404).json({ message: "We cannot get this user, ERROR" });
        next();
    }
}


export async function updateUser(req, res,next) {
    try {
        const {name,email,password} = req.body;
        await User.findOneAndUpdate({_id:req.params.user_id},{
            name: name,
            email: email,
            password: password
        })
        res.status(201).json({ message: "User updated" });
    } catch (e) {
        console.log(e)
        res.status(404).json({ message: "We cannot update this user, ERROR" });
        next();
    }
}

export async function deleteUser(req, res, next) {
    try {
        await User.findByIdAndDelete(req.params.user_id)
        res.status(201).json({message: "User Deleted"});
    } catch (e) {
        res.status(404).json({ message: "We cannot delete this user, ERROR" });
        next();
    }
}
