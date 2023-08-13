import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const SUPER_PRIVATE_KEY = "secret";

export const generateJwtToken = (
  data: Record<string, any>,
  options: Partial<SignOptions> = { expiresIn: "30m" }
) => {
  return jwt.sign(data, SUPER_PRIVATE_KEY, options);
};

export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, SUPER_PRIVATE_KEY) as JwtPayload;
};
