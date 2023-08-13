"use strict";
import { Model, UUIDV4 } from "sequelize";

type Priority = "high" | "medium" | "low" | string;

interface InterviewAttr {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Interview extends Model<InterviewAttr> implements InterviewAttr {
    id!: string;
    title!: string;
    description!: string;
    category!: string;
    priority!: Priority;

    static associate(models: any) {
      Interview.belongsTo(models.User, { foreignKey: "intervieweeId" });
      // One Interview hasOne InterviewDetail
      Interview.hasOne(models.InterviewDetail, { foreignKey: "interviewId" });
      // One Interview hasOne InterviewStatus
      Interview.hasOne(models.InterviewStatus, { foreignKey: "interviewStatus" });
      // One Interview hasMany InterviewScheduler (s)
      Interview.hasMany(models.InterviewScheduler, { foreignKey: "interviewScheduleId" });
      // One Interview hasMany InterviewQuestion (s)
      Interview.hasMany(models.InterviewQuestion, { foreignKey: "interviewId" });
    }
  }
  Interview.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      priority: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Interview",
    }
  );
  return Interview;
};
