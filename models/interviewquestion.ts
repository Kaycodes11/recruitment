"use strict";

import { CreationOptional, InferAttributes, InferCreationAttributes, Model, UUIDV4 } from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class InterviewQuestion extends Model<
    InferAttributes<InterviewQuestion>,
    InferCreationAttributes<InterviewQuestion>
  > {
    id!: CreationOptional<string>;
    question!: string;
    answer!: string;
    isAccepted!: boolean;

    static associate(models: any) {
      // this setup to do join query from `InterviewQuestion` with `Interview`
      InterviewQuestion.belongsTo(models.Interview, { foreignKey: "interviewId" });
      // this setup to do join query from `InterviewQuestion` with `User`
      InterviewQuestion.belongsTo(models.User, { foreignKey: "acceptedBy" });
    }
  }
  InterviewQuestion.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAccepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "InterviewQuestion",
    }
  );
  return InterviewQuestion;
};
