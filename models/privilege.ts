"use strict";

import { Model, UUIDV4 } from "sequelize";

// used "as const" so the type made from it will be "readonly"
const privilege = {
  0: "Schedule",
  1: "Re-schedule",
  2: "Postpone",
  3: "Reject",
  4: "Request Re-schedule",
  5: "Select",
} as const;

// https://bobbyhadz.com/blog/typescript-create-union-type-from-array
type PrivilegeStatus = keyof typeof privilege;
type PrivilegeValues = (typeof privilege)[keyof typeof privilege];

interface PrivilegeAttributes {
  id: string;
  title: PrivilegeValues;
  status: PrivilegeStatus;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Privilege extends Model<PrivilegeAttributes> implements PrivilegeAttributes {
    id!: string;
    title!: PrivilegeValues;
    status!: PrivilegeStatus;

    static associate(models: any) {
      // 1 Privilege (can have / belongsTo) Many Roles (s) = true
      Privilege.belongsToMany(models.Role, { through: "RolesPrivileges" });
    }
  }
  Privilege.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Privilege",
    }
  );
  return Privilege;
};
