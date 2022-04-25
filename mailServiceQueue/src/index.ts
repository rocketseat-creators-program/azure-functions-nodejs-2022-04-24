import { AzureFunction, Context } from "@azure/functions";
import { createTransport } from "nodemailer";
import { mailConfig } from "./config/mailConfig";

interface IQueueItem {
  name: string;
  email: string;
}

const queueTrigger: AzureFunction = async function (
  context: Context,
  queueItem: IQueueItem
): Promise<void> {
  const { name, email } = queueItem;
  const transporter = createTransport(mailConfig);

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Team KriptoNita 🤑" <team@kriptonita.com>', // sender address
      to: email, // list of receivers
      subject: "KriptoNita Newsletter", // Subject line
      text: `Hi ${name},\n\nWelcome to KriptoNita Newsletter.\n\nKriptoNita Team.`, // plain text body
      html: `<h4>Hi ${name},</h4><br/><p>Welcome to <strong>KriptoNita</strong> Newsletter.<p><br /><p>KriptoNita Team.</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    context.log(err.message);
  }
};

export default queueTrigger;
