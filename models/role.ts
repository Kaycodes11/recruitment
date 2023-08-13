"use strict";
import { Model, UUIDV4 } from "sequelize";

type RoleType = "developer" | "interviewer" | "hr" | "interviewee";

export interface RoleAttributes {
  id: string;
  title: RoleType;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Role extends Model<RoleAttributes> implements RoleAttributes {
    id!: string;
    title!: RoleType;

    static associate(models: any) {
      // one Role can / hasMany  User (s)
      Role.belongsToMany(models.User, { through: "UserRoles" });
      // one Role can / hasMany  Privilege (s)
      Role.belongsToMany(models.Privilege, { through: "RolesPrivileges" });
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
