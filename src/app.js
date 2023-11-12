require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.APP_PORT || 5000;
const UserRouter = require("./routers/user");
const ScheduleRouter = require("./routers/schedule");
const BusRouter = require("./routers/bus");
const HistoryRouter = require("./routers/history");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FE_URL,
  }),
);

app.use("/iride/users", UserRouter);
app.use("/iride/schedules", ScheduleRouter);
app.use("/iride/buses", BusRouter);
app.use("/iride/histories", HistoryRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running....`);
});
