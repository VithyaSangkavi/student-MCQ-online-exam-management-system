const Question = require('../models/question');

const createQuestion = async (req, res) => {
  try {
    const { questionID, questionNo, questionText, examID } = req.body;
    const newQuestion = await Question.create({ questionID, questionNo, questionText, examID });
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findByPk(id);
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    console.error('Error fetching question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateQuestionById = async (req, res) => {
  const { id } = req.params;
  const { questionNo, questionText, examID } = req.body;
  try {
    const question = await Question.findByPk(id);
    if (question) {
      await question.update({ questionNo, questionText, examID });
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    console.error('Error updating question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.destroy({
      where: { questionID: id },
    });
    if (deletedQuestion === 1) {
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    console.error('Error deleting question:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getQuestionByExamId = async(req, res) => {
  const { examID } = req.params;
  
  try {
    const questions = await Question.findAll({
      where: { examID }, 
    });
    
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions by exam ID:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
  getQuestionByExamId
};
