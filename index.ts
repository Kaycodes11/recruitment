import express from "express";
import db from "./models";
import { users } from "./seeders/users";
import { roles } from "./seeders/roles";
import { userRoles } from "./seeders/userroles";
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 8080;

const seedUsers = () => {
  for (const user of users) {
    db.User.create(user);
  }
};

// seedUsers();

const seedRoles = () => {
  for (const role of roles) {
    db.Role.create(role);
  }
};

// seedRoles();

const seedUserRoles = () => {
  try {
    for (const userRole of userRoles) {
      db.UserRole.create(userRole);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

// seedUserRoles();

db.sequelize
  .sync()
  .then(() => {
    // Middleware's
    app.use(express.json());
    
    // Routes
    app.use("/", router);
    
    // Init
    app.listen(PORT, () => console.log(`Server has connected to ${PORT}`));
  })
  .catch((error: any) => {
    console.error(error.message);
  });
