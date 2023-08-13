"use strict";

import { Model } from "sequelize";

interface RolesPrivilegeAttributes {
  RoleId: string;
  PrivilegeId: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class RolesPrivilege extends Model<RolesPrivilegeAttributes> implements RolesPrivilegeAttributes {
    RoleId!: string;
    PrivilegeId!: string;

    static associate(models: any) {
      // define association here
    }
  }
  RolesPrivilege.init(
    {
      RoleId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Roles",
          key: "id",
        },
      },
      PrivilegeId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Privileges",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "RolesPrivilege",
    }
  );
  return RolesPrivilege;
};
