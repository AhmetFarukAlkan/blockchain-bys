// FacultyController.js

const { MESSAGES } = require("../Constants/MessageConstant.js");
const FacultyContract = require("../Blockchain/Contracts/Faculty/FacultyContract.js");
const { accountAddress } = require("../Constants/contractConstants.js");
const DepartmentContract = require("../Blockchain/Contracts/Department/DepartmentContract.js");

async function getFaculty(req, res) {
  try {
    const facultyId = req.params.id;

    const faculty = await FacultyContract.methods
      .getFaculty(facultyId)
      .call();
  
    const data = {
      id: faculty.id.toString(),
      name: faculty.name,
      email: faculty.email,
      phoneNumber: faculty.phoneNumber,
      location: faculty.location,
    };

    res.status(200).json({
      message: MESSAGES.FACULTY_GET_SUCCESS,
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}

async function createFaculty(req, res) {
  const { name = '', email = '', phone_number = '', location = '' } = req.body;

  try {
    await FacultyContract.methods
      .addFaculty(name, email, phone_number, location )
      .send({ from: accountAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.FACULTY_CREATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function updateFaculty(req, res) {
  const facultyId = req.params.id;
  const { name = '', email = '', phone_number = '', location = '' } = req.body;

  try {
    await FacultyContract.methods
      .updateFaculty(facultyId, name, email, phone_number, location )
      .send({ from: accountAddress, gas: 500000 });

    res.status(200).json({
      message: MESSAGES.FACULTY_UPDATE_SUCCESS,
      success: true,
    });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function getAllFaculties(req, res) {
  try {
    const facultyInfo = await FacultyContract.methods.getAllFaculties().call();

    const sanitizedFacultyInfo = facultyInfo.map((faculty) => {
      return {
        id: faculty.facultyId.toString(),
        name: faculty.name,
        email: faculty.email,
        phone_number: faculty.phoneNumber,
        location: faculty.location,
      };
    });

    res.status(200).json({
      data: sanitizedFacultyInfo,
      total: sanitizedFacultyInfo.length,
      message: MESSAGES.FACULTY_INDEX_SUCCESS,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}

async function getDepartments(req, res){
  const facultyId = req.params.id;

  try {
    const departmentInfo = await DepartmentContract.methods.getDepartmentsByFaculty(facultyId).call();

    const sanitizedDepartmentInfo = departmentInfo.map((department) => {
      return {
        id: department.departmentId.toString(),
        name: department.name,
        email: department.email,
        phone_number: department.phoneNumber,
        location: department.location,
        faculty_id: department.facultyId.toString(),
        degree_level: department.degreeLevel,
        wallet_address: department.walletAddress,
      };
    });

    res.status(200).json({
      data: sanitizedDepartmentInfo,
      total: sanitizedDepartmentInfo.length,
      message: MESSAGES.FACULTY_DEPARTMENT_INDEX_SUCCESS,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
  getFaculty,
  createFaculty,
  updateFaculty,
  getAllFaculties,
  getDepartments
};
