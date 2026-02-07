import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Supplier from "../model/supplierModel.js";
import { Customer } from '../model/customer.js';

// Signup handler 
export const signup = async (req, res) => {

    const { address, email, name, password, phone, role } = req.body;
    if (!address || !email || !name || !password || !phone || !role) {
        return res.status(400).json({ msg: "Enter all the requireed fields" })
    }
    if (role == "supplier") {
        try {
            const isExist = await Supplier.findOne({ useremail: email });
            if (isExist) {
                return res.status(409).json({ msg: "User already exist" })
            } else {
                const hashedPwd = await bcrypt.hash(password, 10);
                const new_user = await Supplier.create({
                    supplier_name: name,
                    contact_number: phone,
                    address: address,
                    useremail: email,
                    password: hashedPwd
                });
                const token = jwt.sign(
                    { userid: new_user._id, role: role },
                    process.env.SECRET_KEY,
                    { expiresIn: "2d" }
                )

                return res.status(201).json({ userid: new_user._id, role: role, token })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Server error" });
        }
    }

    if (role == "customer") {
        try {
            const isExist = await Customer.findOne({ useremail: email });
            if (isExist) {
                return res.status(409).json({ msg: "User already exist" })
            } else {
                const hashedPwd = await bcrypt.hash(password, 10);
                const new_user = await Customer.create({
                    name: name,
                    phoneNumber: phone,
                    address: address,
                    useremail: email,
                    password: hashedPwd
                });
                const token = jwt.sign(
                    { userid: new_user._id, role: role },
                    process.env.SECRET_KEY,
                    { expiresIn: "2d" }
                )
                return res.status(201).json({ userid: new_user._id, role: role, token })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Server error" });
        }
    }
}

// Login handler
export const login = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ msg: "Enter all the requireed fields" })
    }
    try {
        let user = {};
        if (role === "customer") {
            user = await Customer.findOne({ useremail: email })
        } else {
            user = await Supplier.findOne({ useremail: email })
        }
        if (!user) return res.status(404).json({ msg: "User not exists" });
        const match = bcrypt.compareSync(password, user.password)
        if (!match) return res.status(401).json({ msg: "Incorrect password" })
        const token = jwt.sign(
            process.env.SECRET_KEY,
            { expiresIn: "2d" }
        )
        return res.status(200).json({ userid: user._id, role: role, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server error" });
    }
}
