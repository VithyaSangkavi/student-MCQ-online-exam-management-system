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

const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll();
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getExamById = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findByPk(id);
    if (exam) {
      res.status(200).json(exam);
    } else {
      res.status(404).json({ error: 'Exam not found' });
    }
  } catch (error) {
    console.error('Error fetching exam:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateExamById = async (req, res) => {
  const { id } = req.params;
  const { examName, startDateAndTime, duration, examStatus, totalMarks, userID } = req.body;
  try {
    const exam = await Exam.findByPk(id);
    if (exam) {
      await exam.update({
        examName,
        startDateAndTime,
        duration,
        examStatus,
        totalMarks,
        userID,
      });
      res.status(200).json(exam);
    } else {
      res.status(404).json({ error: 'Exam not found' });
    }
  } catch (error) {
    console.error('Error updating exam:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteExamById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExam = await Exam.destroy({
      where: { examID: id },
    });
    if (deletedExam === 1) {
      res.status(200).json({ message: 'Exam deleted successfully' });
    } else {
      res.status(404).json({ error: 'Exam not found' });
    }
  } catch (error) {
    console.error('Error deleting exam:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  updateExamById,
  deleteExamById,
};
