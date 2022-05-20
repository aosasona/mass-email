import { NextApiRequest, NextApiResponse } from "next";
const nodemailer = require("nodemailer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { title, name, content, signature, people } = req.body;
      //CREATE NODE MAILER TRANSPORTER
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      //EMAIL TEMPLATE
      const Template = `<!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>

      <html
        lang="en"
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <meta charset="UTF-8" /><meta http–equiv=“Content-Type” content=“text/html; charset=UTF-8” />
            <meta http–equiv=“X-UA-Compatible” content=“IE=edge” />
            <meta name=“viewport” content=“width=device-width, initial-scale=1.0 “ />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta name="color-scheme" content="only" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
            integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
            integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900"
            rel="stylesheet"
            type="text/css"
          />
          <title>${title}</title>
      
           <style>
      :root {
        --primary: #ff7605;
        --secondary: #ffefe2;
        --primary-alternate: #ac2c4b;
        --secondary-alternate: #ffd3d0;
      }
      * {
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        font-family: Poppins, Helvetica, Arial, sans-serif !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      html,
      body {
        width: 91% !important;
        margin-inline: auto !important;
        margin-top: 1rem !important;
        background-color: rgb(250 250 250) !important;
        color: rgb(35, 35, 35) !important;
      }
      header {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        background-color: #efefef !important;
        padding-top: 1.4rem !important;
        padding-bottom: 1.4rem !important;
        margin-bottom: 1.25rem !important;
      }
      header img {
        height: 1.75rem !important;
        object-fit: contain !important;
      }
      .HeaderText {
        width: 85% !important;
        font-size: 2.3rem !important;
        padding-inline: 0.2rem !important;
        font-weight: 600 !important;
        line-height: 1.4 !important;
      }
      section.Content {
        background-color: #efefef !important;
        padding-inline: 1.4rem !important;
        padding-top: 1.5rem !important;
        padding-bottom: 1.5rem !important;
        margin-top: 1.25rem !important;
        margin-bottom: 1.4rem !important;
        line-height: 1.75 !important;
        font-weight: 400 !important;
        font-size: 12px !important;
      }
      .Content a {
          color : orange !important;
      }
      .Signature {
        font-size: 0.85rem !important;
        font-weight: 400 !important;
        padding-inline: 0.2rem !important;
      }
      .Signature p {
        font-weight: 500 !important;
        margin-bottom: 0.4rem !important;
      }
      footer {
        border-top: 1px solid #aaa !important;
        text-align: center !important;
        padding-top: 3.5rem !important;
        padding-bottom: 6rem !important;
        margin-top: 4rem !important;
        font-weight: 300 !important;
      }
      footer .Links {
        padding-top: 2.5rem !important;
        padding-bottom: 2.5rem !important;
        width: 100% !important;
        margin-right: auto !important;
        margin-left: auto !important;
      }
      footer h4 {
        font-size: 0.75rem !important;
      }
      footer h5 {
        font-size: 0.7rem !important;
      }
      footer .Copyright {
        font-size: 0.6rem !important;
        padding-top: 2rem !important;
      }
      .LinkImage {
          width: 0.9rem !important;
          aspect-ratio: 1 / 1 !important;
          object-fit: contain !important;
      }
      .code {
        margin-top: 1.2rem !important;
        margin-bottom: 1.2rem !important;
        letter-spacing: 0.4rem !important;
      }
      .footerText {
        font-size: 8px !important;
      }
      @media (min-width: 768px) {
        body,
        html {
          width: 60vw !important;
          margin-right: auto !important;
          margin-left: auto !important;
        }
        footer .Links {
          padding-top: 3rem !important;
          padding-bottom: 3rem !important;
        }
      }
    </style>
        </head>
      
        <body>
          <main class="main">
            <header>
              <img
                src="https://res.cloudinary.com/breege-tech/image/upload/v1653021692/Icons/Logo_siqxnr.png"
                alt="Logo"
              />
            </header>
      
            <div class="content justify-center text-neutral-700 mt-4 text-sm">
              <h4 class="HeaderText">
                <!-- title -->
                ${title}
              </h4>
      
              <section class="Content">
                <!-- CONTENT -->
                ${content}
              </section>
      
              <div class="Signature">
                <p>Regards,</p>
                ${signature}
              </div>
            </div>
      
            <footer>
              <h4>The all-in-one social media for Techies.</h4>
              <div class="Links flex justify-evenly">
                <a href="https://twitter.com/frikax">
                <img src="https://res.cloudinary.com/breege-tech/image/upload/v1653021692/Icons/Twitter_ugzbo7.png" alt="Twitter_icon" class="LinkImage" />
                </a>
                <!-- <a href="https://instagram.com/_frikax"
                  ><img src="https://res.cloudinary.com/breege-tech/image/upload/v1653018283/Icons/Instagram_hobvfx.svg" alt="Instagram_icon" class="LinkImage" /></a> -->
                <a href="https://facebook.com/frikax"
                  ><img src="https://res.cloudinary.com/breege-tech/image/upload/v1653021692/Icons/Facebook_m8hg2i.png" alt="FB_icon" class="LinkImage" /></a>
              
              <a href="https://www.linkedin.com/company/frikax"
                  ><img src="https://res.cloudinary.com/breege-tech/image/upload/v1653021692/Icons/LinkedIn_fizmhk.png" alt="LinkedIn_icon" class="LinkImage" /></a>
              </div>
      
              <h5>
                Join us at
                <a href="https://www.frikax.net" class="underline">Frikax</a>
                or reach out to us on social media.
              </h5>
              <div class="Copyright">&copy; Frikax 2022, All rights reserved.</div>
            </footer>
          </main>
        </body>
      </html>
      `;

      //Loops through data
      people.forEach(async (person: any) => {
        const mail = await transporter.sendMail({
          from: '"' + name + '" <ask@frikax.net>',
          to: `${person.email}`,
          subject: title,
          text: "Sorry you can not view this message on your current device!",
          html: Template,
        });

        if (!mail) {
          throw { status: 500, message: "Something went wrong" };
        }
      });

      return res
        .status(200)
        .json({ status: "success", message: "All mails have been sent!" });
    } catch (err: any) {
      console.error(err);
      return res
        .status(err?.status || 500)
        .json({ status: "error", message: "Something went wrong" });
    }
  }
}
