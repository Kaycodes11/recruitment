"use strict";

import { Model, UUIDV4 } from "sequelize";

interface InterviewStatusAttr {
  id: string;
  type: number;
  title: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class InterviewStatus extends Model<InterviewStatusAttr> implements InterviewStatusAttr {
    id!: string;
    type!: number;
    title!: string;

    static associate(models: any) {
      // define association here
    }
  }

  InterviewStatus.init(
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

      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "InterviewStatus",
      freezeTableName: true
    }
  );
  return InterviewStatus;
};
