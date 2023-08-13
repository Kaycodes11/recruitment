"use strict";

import { Model, UUIDV4 } from "sequelize";

interface InterviewSchedulerAttr {
  id: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class InterviewScheduler extends Model {
    id!: string;
    instruction: any;

    static associate(models: any) {
      // One Interview hasMany InterviewSchedule (s)
      InterviewScheduler.belongsTo(models.Interview, { foreignKey: "interviewScheduleId" });
    }
  }
  InterviewScheduler.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      instruction: {
        type: DataTypes.JSON,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "InterviewScheduler",
    }
  );
  return InterviewScheduler;
};
