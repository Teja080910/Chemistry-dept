import cors from "cors";
import crypto from 'crypto';
import express from 'express';
import session from 'express-session';
import nodemailer from 'nodemailer';
import { db1 } from "../db.js";
import { CheckHackathon } from "./hacthonday/checkhackathon.js";
import { EndHackathon } from "./hacthonday/hackathonend.js";
import { StartHackathon } from "./hacthonday/hackathonstart.js";
import { message } from "./message/message.js";
import { checkUser } from "./user/checkuser.js";
import { UpdateGender } from "./user/updategender.js";
import { PSS } from "./problemstatements/pss.js";
import { SignUp } from "./user/signup.js";
import { SignIn } from "./user/sigin.js";
import { UpdatePasswordLink } from "./updateuser/updatelink.js";
import { SendOtp } from "./updateuser/senotp.js";
import { UpdatePassword } from "./updateuser/updatepassword.js";
import { CreateTeam } from "./Teams/createteams.js";
import { Tasks } from "./bootcamp/tasks/tasks.js";
import { Resend } from 'resend';

const resend = new Resend(process.env.Resend_Key);
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.get('/hackathon', async (req, res) => {
    res.send("Ok hacthon");
})

app.use(session({
    secret: 'ast-team',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/start-hackathon', async (req, res) => {
    await StartHackathon(req.body, res);
})

app.post('/end-hackathon', async (req, res) => {
    await EndHackathon(req.body, res);
})

app.post('/check-hackathon/:mail', async (req, res) => {
    await CheckHackathon(req.params.mail, res);
})

app.post('/updategender/:regd/:gender', async (req, res) => {
    await UpdateGender(req.params.regd, req.params.gender, res);
})

app.post('/statements', async (req, res) => {
    await PSS(res);
})

app.post('/signup/:email/:name/:regd/:num/:year/:branch/:section', async (req, res) => {
    await SignUp(req,res)
})

app.post('/signin', async (req, res) => {
    await SignIn(req,resend,res)
});

app.post('/authuser/:regd', async (req, res) => {
    await checkUser(req.params.regd, res)
})

app.post('/updatepasswordlink', async (req, res) => {
    await UpdatePasswordLink(req,resend,res)
});

app.post('/sendotp', async (req, res) => {
    await SendOtp(req,resend,res);
});

app.post('/updatepassword', async (req, res) => {
    await UpdatePassword(req,res)
});

app.post('/createteam/:team/:gmail/:code/:phone', async (req, res) => {
    await CreateTeam(req,res);
})

app.post('/bootcamptasks', async (req, res) => {
    await Tasks(res)
});
export default app