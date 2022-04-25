import { createTransport } from "nodemailer";
import { mailConfig } from "./config/mailConfig";

export const mailSender = async (
  name: string,
  email: string
): Promise<void> => {
  try {
    const transporter = createTransport(mailConfig);

    const info = await transporter.sendMail({
      from: '"Team KriptoNita 🤑" <team@kriptonita.com>', // sender address
      to: email, // list of receivers
      subject: "KriptoNita Newsletter", // Subject line
      text: `Hi ${name},\n\nWelcome to KriptoNita Newsletter.\n\nKriptoNita Team.`, // plain text body
      html: `<h4>Hi ${name},</h4><br/><p>Welcome to <strong>KriptoNita</strong> Newsletter.<p><br /><p>KriptoNita Team.</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err.message);
  }
};
