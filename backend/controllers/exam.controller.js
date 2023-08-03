const Exam  = require('../models/exam.js'); 

const createExam = async (req, res) => {
  try {
    const { examID, examName, startDateAndTime, duration, examStatus, totalMarks, userID} = req.body;
    const newExam = await Exam.create({ examID, examName, startDateAndTime, duration, examStatus, totalMarks, userID });
    res.status(201).json(newExam);
  } catch (error) {
    console.error('Error creating exam:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createExam
};
