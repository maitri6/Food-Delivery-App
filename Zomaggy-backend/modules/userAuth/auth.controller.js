const UserModel = require('./user.model');
const bcrypt = require('bcrypt');

const sendResponse = require('../../helpers/requestHandler.helper');
const sendMail = require('../../helpers/mail.helper');
const { generateJwt,verifyToken } = require('../../helpers/jwt.helper');


exports.register = async (req, res, next) => {
    try {
        let message, subject, otp;
        const checkUser = await UserModel.findOne({ email: req.body.email });
        if (checkUser)
            return sendResponse(res, true, 400, "Email already exists");
        let saveUser = await UserModel.create(req.body);

        //otp function

        otp = generateOTP();
        subject = "Here is 6 digit OTP";
        message = otp;
        await UserModel.updateOne({ _id: saveUser._id }, { $set: { otp: otp, } });

        //send email

        sendMail(saveUser.email, subject, message);



        return sendResponse(res, true, 200, "User registered successfully", saveUser);

    }
    catch (err) {
        console.log(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        let message, subject, otp;
        const getUser = await UserModel.findOne({ email: req.body.email });
        if (!getUser)
            return sendResponse(res, true, 400, "User not found");

        // generating the token for user

        let token = await generateJwt({
            userId: getUser._id,
            role: getUser.role
        });

        if (token === undefined) {
            return sendResponse(res, true, 401, "Something went wrong please try again");
        }

        // generating otp

        otp = await generateOTP();
        subject = "Here is your 6 digit otp";
        meassage = otp;
        await UserModel.updateOne({ _id: getUser._id }, { $set: { otp: otp } });
        sendMail(getUser.email, subject, message);

        // cookie

        req.session.jwt = token;
        // console.log(req.session.jwt)
         console.log(req.session)
        // console.log(token)
        return sendResponse(res, true, 200, "Otp send successfully", {
            getUser,
            token
        });
    }
    catch (error) {
        console.log(error);
    }
};

exports.currentUser = async(req, res, next) =>{
    try{
        console.log(req.session)
        if(!req.session?.jwt){
            return res.send({ currentUser: null})
        }
        

        let verify = verifyToken(req.session.jwt);
        res.send({ currentUser: verify});

    }catch(err){
        res.send({currentUser: null});

    }

};

exports.sendOtp = async (req, res) => {
    try {
        let subject, message
        const getUser = await UserModel.findById(req.body.userId);
        if (!getUser) return sendResponse(res, true, 400, "User not found");
        if (req.body.type == 'resendOtp') {
            otp = await generateOTP();
            subject = "Here is your 6 digits OTP";
            message = otp;
            sendMail(getUser.email, subject, message);
            await UserModel.updateOne({ _id: getUser._id }, { $set: { otp: otp } });
            return sendResponse(res, true, 200, "OTP send successfully");
        }
        const checkOtp = await UserModel.findOne({
            _id: req.body.userId,
            otp: req.body.otp
        });

        if (!checkOtp) return sendResponse(res, true, 401, "Invalid otp");
        await UserModel.updateOne({ _id: checkOtp._id }, { $set: { status: true } });
        return sendResponse(res, true, 200, "User verified successfully");
    } catch (error) { }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const getUser = await UserModel.findById(req.user.userId);
        if (!getUser) {
            return sendResponse(
                res,
                true,
                400,
                "User not found"
            );
        }
        await UserModel.updateOne({ _id: getUser._id }, { $set: { ...req.body } });
        return sendResponse(
            res,
            true,
            200,
            "Profile updated successfully"
        )
    } catch (err) {
        console.log(err);
    }
};

exports.logout = async (req, res, next) => {
    try {

        const getUser = await UserModel.aggregate([{

            $match: { _id: req.session.userId }
        }]);
        req.session.destroy((err) => {
            if (err) {
                cosole.log(err);
                return sendResponse(res, true, 400, "Failed to destroy session");
            } else {
                console.log("session destroyed", req.session);
                return sendResponse(res, true, 200, "User logged out successfully");
            }

        });

    } catch (err) {
        console.log(err);
    }
}
function generateOTP() {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}