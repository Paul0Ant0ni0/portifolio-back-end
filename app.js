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
    const nome = data?.nome;
    const telefone = data?.telefone;
    const subject = data?.subject;
    const text = data?.text;
    const html = data?.html ? data?.html : null;
    if (email === undefined || subject === undefined || text === undefined || nome === undefined)
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

    
    const TEMPLATE_HTML = `
    <body style="background-image: url(https://lh3.googleusercontent.com/drive-viewer/AAOQEOTv5R8D5xnLURMG8mM4ikIIAqYp3L0LmjBj-u6MnkUbZ94Vegc3RTTwQbVsIoYCGUMD3qoB3F1oU1Cj4cXbj7Gc3ebhHA=w1920-h902); background-repeat: no-repeat;
    background-size: cover; display: flex; flex-direction: column; justify-content:center; align-items: center;
    margin: 0; padding: 25px; font-family: Arial, Helvetica, sans-serif; box-sizing: border-box;">
   <div style="background-color: white; width: 85%; box-shadow:  1px 1px 6px 7px rgba(79, 79, 79, 0.13); padding: 25px;
   border-radius: 8px; font-size: 19px; display:flex; flex-direction: row; margin-top: 100px; height: auto; border: 1px solid rgb(109, 109, 109);">
      
       
        <section style="width: 75%;">
            <div class="card-body">
                <p><b>Nome:</b> ${nome}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Assunto:</b> ${subject} </p>

                <p style="text-align:justify; color: rgb(126, 126, 126); width: 65%">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    ${text}</p>
                

            </div>
        </section>
        <section style="width: 68%; background-image: url(https://lh3.googleusercontent.com/drive-viewer/AAOQEOSMHJnpLVTMy3np6y_Ls2-8izyZwRIiyttwVNJqnLQqBG2M-PEGjiOCTd6yru9kc72Fj-O2n5gMwFxKAg6TpKZuvO71zQ=w1920-h902); background-position: center;
         background-repeat: no-repeat; background-size: 100% 100%; display: flex; justify-content: end; align-items: start;">
            <a href="https://wa.me/${telefone}" style="background-image: url(https://lh3.googleusercontent.com/drive-viewer/AAOQEORXEq79U5xit0bl10Jql4yY-mgaehLn2wBUX8DfWRrl6aRwWjTz9vFt5-vq1Rb6_7iyPv92nvgoFfNBM79OBotXbtCPnA=w1920-h902);
            background-position: center  bottom 0.1px; background-repeat: no-repeat; border-radius: 8px; width: 5%;
               padding: 25px 20px; border: 1px solid black; margin: 8px;"></a>
        </section>

       
    </div>

</body>`;

    const mailOptions = {
        from: email,
        to:  process.env.USERNAME,
        subject: subject,
        text: text,
        html: html ? TEMPLATE_HTML : null,
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

app.listen(process.env.PORT || 3000); 