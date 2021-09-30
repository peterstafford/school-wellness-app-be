const nodemailer = require("nodemailer");
var config = require("config");
const { Admin } = require("../model/admin");
const moment = require("moment");

const sendAdminEmail = async (subject, text) => {
  let date = new Date();
  let FDate = moment(date).format("MM-DD-YYYY");
  var transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    auth: {
      user: config.get("email"),
      pass: config.get("password"),
    },
  });
  let admin = await Admin.find();
  let sendAdminEmail = [];
  admin.map((item) => {
    sendAdminEmail.push(item.email);
  });
  message = {
    from: "VCS - Vista Christian Hospital <no-reply@blog.com> ",
    to: sendAdminEmail,
    subject: "Warning!!!",
    html: `<h4>Please follow up with the following party on Wellness Screening. <a src=${text}></a> </h4>`,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
module.exports = sendAdminEmail;
