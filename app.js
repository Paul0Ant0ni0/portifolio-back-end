require('dotenv').config();
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(express.json());


app.post("/send-email", cors(), async (req, res) => {
    const data = req.body
    const email = data?.email;
    const subject = data?.subject;
    const text = data?.text;
    const html = data?.html ? data?.html : null;
    if (email === undefined || subject === undefined || text === undefined)
    res.send("Dados inválidos!!!");

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.USERNAME,
          pass: process.env.PASSWORD,
        },
      });

 

    const mailOptions = {
        from: email,
        to: "pauloantonio785@gmail.com",
        subject: subject,
        text: text,
        html: html ? html : null,
    };
    await transport.sendMail(mailOptions)
    .then(() => {
        console.log("Sucesso")
    })
    .catch(erro => {
        console.log(erro)
    });

    return res.json({
        erro: false,
        mensagem: "Email enviado com sucesso"

    });
});

app.listen(3000); 