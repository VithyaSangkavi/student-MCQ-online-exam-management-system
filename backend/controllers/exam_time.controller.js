const ExamTime  = require('../models/exam_time.js'); 

const createExamTime = async (req, res) => {
  try {
    const { timeID, examStartTime, examEndTime} = req.body;
    userID = req.user.userID;
    const newExamTime = await ExamTime.create({ timeID, examStartTime, examEndTime, userID });
    res.status(201).json(newExamTime);
  } catch (error) {
    console.error('Error creating exam time:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllExamTime = async (req, res) => {
  try {
    const examTimes = await ExamTime.findAll();
    res.status(200).json(examTimes);
  } catch (error) {
    console.error('Error fetching exam times:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getExamTimeById = async (req, res) => {
  const { id } = req.params;
  try {
    const examTime = await ExamTime.findByPk(id);
    if (examTime) {
      res.status(200).json(examTime);
    } else {
      res.status(404).json({ error: 'Exam time not found' });
    }
  } catch (error) {
    console.error('Error fetching exam time:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateExamTimeById = async (req, res) => {
  const { id } = req.params;
  const { timeID, examStartTime, examEndTime, userID } = req.body;
  try {
    const examTime = await ExamTime.findByPk(id);
    if (examTime) {
      await exam.update({
        timeID, 
        examStartTime, 
        examEndTime, 
        userID
      });
      res.status(200).json(examTime);
    } else {
      res.status(404).json({ error: 'Exam not found' });
    }
  } catch (error) {
    console.error('Error updating exam time:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteExamTimeById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExamTime = await ExamTime.destroy({
      where: { timeID: id },
    });
    if (deletedExamTime === 1) {
      res.status(200).json({ message: 'Exam time deleted successfully' });
    } else {
      res.status(404).json({ error: 'Exam time not found' });
    }
  } catch (error) {
    console.error('Error deleting exam time:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createExamTime,
  getAllExamTime,
  getExamTimeById,
  updateExamTimeById,
  deleteExamTimeById,
};
