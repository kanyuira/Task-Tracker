const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});