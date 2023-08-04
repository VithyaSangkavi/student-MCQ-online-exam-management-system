const Result = require('../models/results');

const createResult = async (req, res) => {
  try {
    const { resultsID, marks, examStatusStudent, examID, userID } = req.body;
    const newResult = await Result.create({ resultsID, marks, examStatusStudent, examID, userID });
    
    //association with user and exam
    await newResult.addUsers(userID);
    await newResult.addExams(examID);
    
    res.status(201).json(newResult);
  } catch (error) {
    console.error('Error creating result:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllResults = async (req, res) => {
  try {
    const results = await Result.findAll();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getResultById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Result.findByPk(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    console.error('Error fetching result:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateResultById = async (req, res) => {
  const { id } = req.params;
  const { marks, examStatusStudent, examID, userID } = req.body;
  try {
    const result = await Result.findByPk(id);
    if (result) {
      await result.update({ marks, examStatusStudent });
      
      //association with user and exam
      await result.setUsers(userID);
      await result.setExams(examID);
      
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    console.error('Error updating result:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteResultById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedResult = await Result.destroy({
      where: { resultsID: id },
    });
    if (deletedResult === 1) {
      res.status(200).json({ message: 'Result deleted successfully' });
    } else {
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    console.error('Error deleting result:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createResult,
  getAllResults,
  getResultById,
  updateResultById,
  deleteResultById,
};
