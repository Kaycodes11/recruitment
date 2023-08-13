"use strict";

import { Model } from "sequelize";

export interface UserRoleAttributes {
  UserId: string;
  RoleId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class UserRole extends Model<UserRoleAttributes> implements UserRoleAttributes {
    UserId!: string;
    RoleId!: string;
    static associate(models: any) {}
  }
  UserRole.init(
    {
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      RoleId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Roles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "UserRole",
    }
  );
  return UserRole;
};
