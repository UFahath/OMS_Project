import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Supplier from "../model/supplierModel.js";
import { Customer } from '../model/customer.js';

export const signup = async (req, res) => {

    const { address, email, name, password, phone, role } = req.body;
    console.log(role);

    if (role == "supplier") {
        try {
            const isExist = await Supplier.findOne({ useremail: email });
            if (isExist) {
                res.status(409).json({ msg: "User already exist" })
            } else {
                const hashedPwd = await bcrypt.hash(password, 10);
                const new_user = await Supplier.create({
                    supplier_name: name,
                    contact_number: phone,
                    address: address,
                    useremail: email,
                    password: password
                });
                console.log("New user", new_user);

                const token = jwt.sign(
                    { userid: new_user._id, role: role },
                    process.env.SECRET_KEY,
                    { expiresIn: "2d" }
                )
                console.log(token);
                res.status(201).json({ userid: new_user._id, role: role, name: new_user.supplier_name, token })
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (role == "customer") {
        if (role == "supplier") {
            try {
                const isExist = await Customer.findOne({ useremail: email });
                if (isExist) {
                    res.status(409).json({ msg: "User already exist" })
                } else {
                    const hashedPwd = await bcrypt.hash(password, 10);
                    const new_user = await Customer.create({
                        name: name,
                        phoneNumber: phone,
                        address: address,
                        useremail: email,
                        password: password
                    });
                    const token = jwt.sign(
                        { userid: new_user._id, role: role },
                        process.env.SECRET_KEY,
                        { expiresIn: "2d" }
                    )
                    console.log(token);
                    res.status(201).json({ userid: new_user._id, role: role, name: new_user.name, token })
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

}


export const login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        let user = {};
        if (role === "customer") {
            user = await Customer.findOne({ useremail: email })
        }else{
            user = await Supplier.findOne({ useremail: email })
        }
        // console.log(user);
        if (!user) return res.status(404).json({ msg: "User not exists" });
        const match = bcrypt.compareSync(password, user.password)
        // console.log(match);
        if (!match) res.status(401).json({ msg: "Incorrect password" })
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "2d" }
        )
        console.log(token);
        res.status(200).json({ msg: "Login successfull", token })

    } catch (error) {
        console.log(error);

    }
}
