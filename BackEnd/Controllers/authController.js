const { where } = require("firebase/firestore");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const db = require("../DbManager/database");
const COLLECTION_NAME = "Users";

const { sendVerificationCode, checkVerificationCode } = require("../Utils/twililoApp");

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtKey, { expiresIn: "1d" });
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await db.findOne(COLLECTION_NAME, where("email", "==", email));

        if (user)
            return res.status(400).json({ message: "User alread exist" });
        if (!name || !email || !password)
            return res.status(400).json({ message: "All field required" });
        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Email is invalid" });

        const newUser = { name, email, password }
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await db.insert(COLLECTION_NAME, newUser)
        res.status(200).json({ message: "Register successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        let user = await db.findOne(COLLECTION_NAME, where("email", "==", email));

        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return res.status(400).json({ message: "Password is not correct" });

        const token = createToken(user._id);
        res.status(200).json({ _id: user._id, name: user.userName, email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await db.findDoc(COLLECTION_NAME, userId);
        res.status(200).json(user);
    } catch (error) {
        console.log("findUser", error);
        res.status(500).json(error);
    }
};
const findUsers = async (req, res) => {
    try {
        const users = await db.findAll(COLLECTION_NAME);
        res.status(200).json(users);
    } catch (error) {
        console.log("findUsers", error);
        res.status(500).json(error);
    }
};

const createNewAccessCode = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        // const verification = await checkVerificationCode("+84" + phoneNumber, 356535);
        const accessCode = await sendVerificationCode("+84" + phoneNumber, "sms");
        let data = await db.findOne(COLLECTION_NAME, where("phoneNumber", "==", phoneNumber));
        if (data) {
            // data.accessCode = accessCode;
            await db.update(COLLECTION_NAME, data._id, data);
            return res.status(200).json({ accessCode: accessCode })
        }

        data = {
            phoneNumber: phoneNumber,
            role: "owner",
            isValid: false,
        }

        await db.insert("PhoneVerify", data);
        res.status(200).json({ accessCode: accessCode })
    } catch (error) {
        console.log(COLLECTION_NAME, error);
        res.status(500).json(error);
    }
}

const validateAccessCode = async (req, res) => {
    try {
        const { accessCode, phoneNumber } = req.body;

        const verification = await checkVerificationCode("+84" + phoneNumber, accessCode);
        const user = await db.findOne(COLLECTION_NAME, where("phoneNumber", "==", phoneNumber));
        if (verification.valid) {
            user.isValid = verification.valid;
            await db.update(COLLECTION_NAME, data._id, data);
            const token = createToken(user._id);
            res.status(200).json({ success: true, user: { _id: user._id, name: user.name, token } })
        }
        else
            res.status(200).json({ success: false })
    } catch (error) {
        console.log("validateAccessCode", error);
        res.status(500).json(error);
    }
}


module.exports = {
    registerUser,
    login,
    findUser,
    findUsers,
    createNewAccessCode,
    validateAccessCode
}