const { sendMail } = require("../Utils/sendmailApp");
const { where } = require("firebase/firestore");

const COLLECTION_NAME = "Users";
const ACCESS_TOKEN = "35a13d0981240725efd860364d8023b50ee1c457394e6c319f1a0235e118df86e1bb3a33c163406847e8d455356996558d18a0846e042c4b00ae354832c623d2"
const db = require("../DbManager/database");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
    try {
        const employees = await db.findAll(COLLECTION_NAME);
        res.status(201).json(employees)
    } catch (error) {
        console.log(error);
    }
}
const getEmployee = async (req, res) => {
    try {
        const { id } = req.body;
        const employee = await db.findDoc(COLLECTION_NAME, id);
        res.status(201).json(employee)
    } catch (error) {
        console.log(error);
    }
}

// const login = async (req, res) => {
//     try {
//         const { userName, password } = req.body;
//         const user = await db.findOne(COLLECTION_NAME, where("userName", "==", userName));

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch)
//             return res.status(400).json({ message: "Your email or password is not correct!" });

//         const token = jwt.sign({ userId: user._id, userEmail: user.email, userName: user.userName }, ACCESS_TOKEN, {
//             expiresIn: '1h'
//         });

//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: false,
//             samesite: 'strict'
//         }).status(200).json({
//             message: "Login successfully",
//             token,
//             user: { _id: user._id, userEmail: user.email, userName: user.userName }
//         })
//         // res.status(201).json(user)
//     } catch (error) {
//         console.log(error);
//     }
// }

const verifyEmail = async (req, res) => {
    try {
        const { token, userName, password } = req.body;

        const user = await db.findOne(COLLECTION_NAME, where("verificationToken", "==", token));
        if (!user)
            return res.status(400).json({ message: "Invalid or expired verification token" });

        console.log(userName);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user.userName = userName;
        user.password = hashPassword;
        user.isVerified = true;
        user.verificationToken = null;
        user.role = "employee";

        await db.update(COLLECTION_NAME, user._id, user);
        return res.status(200).json({ message: "Email verified successful" });
    } catch (error) {
        console.log(error);
    }
}


const insert = async (req, res) => {
    try {
        const employee = req.body;

        const user = await db.findOne(COLLECTION_NAME, where("email", "==", employee.email))
        if (user)
            return res.status(400).json({ message: "User already exists!" });

        employee.verificationToken = crypto.randomBytes(32).toString('hex');
        const result = await db.insert(COLLECTION_NAME, employee);

        const verificationLink = `${process.env.CLIENT_URL}/emailverify/${employee.verificationToken}`;
        // const verificationLink = `http://localhost:4200/api/employees/verifyemail/${employee.verificationToken}`;
        const emailContent = `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}" target="_blank">${verificationLink}</a>
        <p>This link will expire in 15 minutes</p>
        `
        sendMail(employee.email, "Successfully created account on Employee Task Management", emailContent)
        res.status(201).json({ success: true, employeeId: result.id });
    } catch (error) {
        console.log(error);
    }
}

const update = async (req, res) => {
    try {
        const employee = req.body;
        const result = await db.update(COLLECTION_NAME, employee._id, employee);
        res.status(201).json(employee)
    } catch (error) {
        console.log(error);
    }
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await db.deleteById(COLLECTION_NAME, id);
        res.status(201).json({
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAll,
    getEmployee,
    // login,
    verifyEmail,
    insert,
    update,
    deleteById
}