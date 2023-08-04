const Answer = require('../models/answer');

const createAnswer = async (req, res) => {
  try {
    const { answerID, answerValue, correctAnswer, questionID } = req.body;
    const newAnswer = await Answer.create({ answerID, answerValue, correctAnswer, questionID });
    res.status(201).json(newAnswer);
  } catch (error) {
    console.error('Error creating answer:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.findAll();
    res.status(200).json(answers);
  } catch (error) {
    console.error('Error fetching answers:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAnswerById = async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await Answer.findByPk(id);
    if (answer) {
      res.status(200).json(answer);
    } else {
      res.status(404).json({ error: 'Answer not found' });
    }
  } catch (error) {
    console.error('Error fetching answer:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateAnswerById = async (req, res) => {
  const { id } = req.params;
  const { answerValue, correctAnswer, questionID } = req.body;
  try {
    const answer = await Answer.findByPk(id);
    if (answer) {
      await answer.update({ answerValue, correctAnswer, questionID });
      res.status(200).json(answer);
    } else {
      res.status(404).json({ error: 'Answer not found' });
    }
  } catch (error) {
    console.error('Error updating answer:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAnswerById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAnswer = await Answer.destroy({
      where: { answerID: id },
    });
    if (deletedAnswer === 1) {
      res.status(200).json({ message: 'Answer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Answer not found' });
    }
  } catch (error) {
    console.error('Error deleting answer:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswerById,
  deleteAnswerById,
};
