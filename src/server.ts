import mongooseConnect from "./config/db.config.js";
import app from "./app.js";
import logger from "utils/logger.js";

mongooseConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => logger.error(err, "DB Connection Error"));
