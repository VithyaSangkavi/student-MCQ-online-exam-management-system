const StudentAnswer = require('../models/student_answer');

const createStudentAnswer = async (req, res) => {
  try {
    const { student_answerID, questionID, answerID, resultsID } = req.body;
    const newStudentAnswer = await StudentAnswer.create({ student_answerID, questionID, answerID, resultsID });
    res.status(201).json(newStudentAnswer);
  } catch (error) {
    console.error('Error creating student answer:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllStudentAnswers = async (req, res) => {
  try {
    const studentAnswers = await StudentAnswer.findAll();
    res.status(200).json(studentAnswers);
  } catch (error) {
    console.error('Error fetching student answers:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getStudentAnswerById = async (req, res) => {
  const { id } = req.params;
  try {
    const studentAnswer = await StudentAnswer.findByPk(id);
    if (studentAnswer) {
      res.status(200).json(studentAnswer);
    } else {
      res.status(404).json({ error: 'Student answer not found' });
    }
  } catch (error) {
    console.error('Error fetching student answer:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateStudentAnswerById = async (req, res) => {
  const { id } = req.params;
  const { questionID, answerID, resultsID } = req.body;
  try {
    const studentAnswer = await StudentAnswer.findByPk(id);
    if (studentAnswer) {
      await studentAnswer.update({ questionID, answerID, resultsID });
      res.status(200).json(studentAnswer);
    } else {
      res.status(404).json({ error: 'Student answer not found' });
    }
  } catch (error) {
    console.error('Error updating student answer:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteStudentAnswerById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudentAnswer = await StudentAnswer.destroy({
      where: { studentAnswerID: id },
    });
    if (deletedStudentAnswer === 1) {
      res.status(200).json({ message: 'Student answer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student answer not found' });
    }
  } catch (error) {
    console.error('Error deleting student answer:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createStudentAnswer,
  getAllStudentAnswers,
  getStudentAnswerById,
  updateStudentAnswerById,
  deleteStudentAnswerById,
};
