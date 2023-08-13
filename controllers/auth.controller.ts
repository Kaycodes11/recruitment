import { Request, Response } from "express";
import { compare } from "bcrypt";
import db from "../models";
import { sendPlainEmail } from "../mail";
import { generateJwtToken, verifyJwtToken } from "../utilities/encryption";

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, gender, email, password, mobile } = req.body;

  try {
    await db.User.create({
      firstName,
      lastName,
      gender,
      email,
      password,
      mobile,
    });
    res.status(201).json({ message: "User successfully created!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to process the request at the moment!" });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = (
      await db.User.findOne({
        where: {
          email,
        },
      })
    )?.toJSON();

    if (!user || !(await compare(password.toString(), user?.password || ""))) {
      return res.status(400).json({
        message: "Incorrect credentials. Please check and try again!",
      });
    }

    const encoded = {
      id: user.id,
      email: user.email,
    };

    const tokens = {
      accessToken: generateJwtToken(encoded),
      refreshToken: generateJwtToken(encoded, { expiresIn: "7d" }),
    };

    res.status(200).json(tokens);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to process your request at the moment!" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const user = (
      await db.User.findOne({ where: { email: req.body.email } })
    )?.toJSON();

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const encoded = {
      id: user.id,
      email: user.email,
    };

    const resetPasswordToken = generateJwtToken(encoded, { expiresIn: "30m" });

    const html = `<a href=${resetPasswordToken}>Click here to reset password</a>`;
    await sendPlainEmail({ html });

    res.status(200).json({
      message: "Please check your mail for password reset instructions!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to process your request at the moment!" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const decoded = verifyJwtToken(req.body.token);

    await db.User.update(
      { password: req.body.password },
      { where: { id: decoded.id, email: decoded.email } }
    );

    res.status(200).json({
      message: "Account password updated. Please login again!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to process your request at the moment!" });
  }
};
