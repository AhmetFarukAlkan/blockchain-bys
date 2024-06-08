// ExamController.js

const { MESSAGES } = require("../Constants/MessageConstant.js");
const { accountAddress } = require("../Constants/contractConstants.js");
const ExamContract = require("../Blockchain/Contracts/Exam/ExamContract.js");
const { getDepartmentWalletAddress } = require("../Utils/utils.js");

async function createExam(req, res) {
  const { courseId, examType, startTime, endTime, location, departmentId } = req.body;

  try {
    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);

    await ExamContract.methods
      .addExam( courseId, examType, startTime, endTime, location )
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.EXAM_CREATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function updateExam(req, res) {
  const examId = req.params.id;
  const { examType, startTime, endTime, location, departmentId } = req.body;

  try {
    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);

    await ExamContract.methods
      .updateExam(examId, examType, startTime, endTime, location )
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.EXAM_UPDATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function deleteExam(req, res) {
  const examId = req.params.id;
  const { departmentId } = req.body;

  try {
    const departmentWalletAddress = await getDepartmentWalletAddress(departmentId);

    await ExamContract.methods
      .deleteExam(examId)
      .send({ from: departmentWalletAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.EXAM_DELETE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
  createExam,
  updateExam,
  deleteExam,
};
