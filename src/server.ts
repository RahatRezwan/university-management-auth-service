import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function universityDatabase() {
   try {
      await mongoose.connect(`${config.databaseURL}`);
      console.log(`Database is connected successfully`);
      app.listen(config.port, () => {
         console.log(`Example app listening on port ${config.port}`);
      });
   } catch (error) {
      console.log(`Failed to connect`, error);
   }
}

universityDatabase();
