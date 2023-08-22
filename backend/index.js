const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models/user');
const userRoutes = require('./routes/user.routes.js');
const examRoutes = require('./routes/exam.routes.js');
const questionRoutes = require('./routes/question.routes.js');
const answerRoutes = require('./routes/answer.routes.js');
const resultsRoutes = require('./routes/results.routes.js');
const studentAnswerRoutes = require('./routes/student_answer.routes.js');
const examTimeRoutes = require('./routes/exam_time.routes.js')
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/exams', examRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);
app.use('/results', resultsRoutes);
app.use('/student-answer', studentAnswerRoutes);
app.use('/exam-time', examTimeRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('Error syncing database:', error));

module.exports = app;