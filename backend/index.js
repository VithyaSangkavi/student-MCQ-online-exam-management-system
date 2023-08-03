const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models/user');
const userRoutes = require('./routes/user.routes.js');
const examRoutes = require('./routes/exam.routes.js');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/exams', examRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('Error syncing database:', error));

module.exports = app;