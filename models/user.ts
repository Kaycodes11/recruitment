"use strict";

import { Model, UUIDV4 } from "sequelize";
import * as bcrypt from "bcrypt";

// DataTypes.ENUM<Gender>()

export type Gender = "male" | "female" | "others";

export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  gender: Gender;
  email: string;
  password: string;
  mobile: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: string;
    firstName!: string;
    lastName!: string;
    fullName?: string | undefined;
    gender!: Gender;
    email!: string;
    password!: string;
    mobile!: string;
    static associate(models: any) {
      // one User hasMany Role(s)
      User.belongsToMany(models.Role, { through: "UserRoles" });
      // One User hasMany InterviewQuestion (s)
      User.hasMany(models.InterviewQuestion, { foreignKey: "acceptedBy" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value: string) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
          this.setDataValue("password", bcrypt.hashSync(value, 12));
        },
      },
      gender: {
        // https://stackoverflow.com/questions/57707798/setting-default-value-on-sequelize-enum-type
        // https://stackoverflow.com/questions/62275266/not-able-to-create-enum-type-attribute-using-sequelize-cli
        // https://stackoverflow.com/questions/45437924/drop-and-create-enum-with-sequelize-correctly
        type: DataTypes.ENUM(["male", "female", "others"]),
        defaultValue: "male",
        allowNull: false,
      },
      mobile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
