const nodemailer = require("nodemailer");
const Mustache = require("mustache");
const { gmail, password } = require("../../config/config");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: gmail,
    pass: password,
  },
});

const verifMail = async (getEmail, data) => {
  try {
    let template = fs.readFileSync("views/email/verifikasi.html", "utf8");

    let message = {
      from: "'WorkOrder HTA' <no-reply@gmail.com>",
      to: getEmail,
      subject: "Verifikasi Work Order",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { verifMail };
