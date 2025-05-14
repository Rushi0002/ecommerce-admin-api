import mongooseConnect from "./config/db.config.js";
import app from "./app.js";

mongooseConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("DB Connection Error:", err));
