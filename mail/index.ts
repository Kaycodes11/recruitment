import nodemailer from "nodemailer";
import { SendMailOptions } from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  requireTLS: true,
  auth: {
    user: "b91e2f7af858f2",
    pass: "a3ebc2267fd2cc",
  },
  debug: process.env.MODE === "development",
  logger: process.env.MODE === "development",
});

export const sendPlainEmail = async (options: Partial<SendMailOptions>) => {
  try {
    const emailReceipt = await transporter.sendMail({
      from: '"Sender Name" <from@example.net>',
      to: "to@example.com",
      ...options,
    });
    console.log(`Mail Sent! \n ${JSON.stringify(emailReceipt)}`);
  } catch (error) {
    console.error(`Mail not send! \n ${JSON.stringify(error)}`);
    throw error;
  }
};
