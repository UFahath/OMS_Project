export const signup = async (req, res) => {
    console.log(req.body);
    
    const { address, email, name, password, phone, role } = req.body;

    // try {
    //     const isExist = await Users.findOne({ email });
    //     if (isExist) {
    //         res.status(409).json({ msg: "User already exist" })
    //     } else {
    //         const hashedPwd = await bcrypt.hash(password, 10);
    //         await Users.create({ username, email, password: hashedPwd });
    //         res.status(201).json({ msg: "User created" })
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}