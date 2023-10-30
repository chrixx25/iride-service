require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.APP_PORT || 3000;
const UserRouter = require("./routers/user");
const ScheduleRouter = require("./routers/schedule");
const BusRouter = require("./routers/bus");
const HistoryRouter = require("./routers/history");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use("/iride/users", UserRouter);
app.use("/iride/schedules", ScheduleRouter);
app.use("/iride/buses", BusRouter);
app.use("/iride/histories", HistoryRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${port}`);
});
