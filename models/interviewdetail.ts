"use strict";
import { Model, UUIDV4 } from "sequelize";

interface InterviewDetailAttr {
  id: string;
  roundType: string;
  roundName: string;
  roundDuration: string;
  roundStart: string;
  roundEnd: string;
  joiningLink?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class InterviewDetail extends Model<InterviewDetailAttr> implements InterviewDetailAttr {
    id!: string;
    roundType!: string;
    roundName!: string;
    roundDuration!: string;
    roundStart!: string;
    roundEnd!: string;
    joiningLink?: string | undefined;

    static associate(models: any) {
      // below code written just to do joining from InterviewDetail side
      InterviewDetail.belongsTo(models.Interview, { foreignKey: "interviewId" });
    }
  }
  InterviewDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      roundType: { type: DataTypes.STRING, allowNull: false },
      roundName: { type: DataTypes.STRING, allowNull: false },
      roundDuration: { type: DataTypes.STRING, allowNull: false },
      roundStart: { type: DataTypes.STRING, allowNull: false },
      roundEnd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      joiningLink: { type: DataTypes.STRING, defaultValue: "" },
    },
    {
      sequelize,
      modelName: "InterviewDetail",
    }
  );
  return InterviewDetail;
};
