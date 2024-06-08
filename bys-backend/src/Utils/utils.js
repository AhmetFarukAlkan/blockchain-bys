const DepartmentContract = require("../Blockchain/Contracts/Department/DepartmentContract");
const { secret } = require("../Constants/contractConstants");
const { baseWeeklySchedule } = require("../Constants/weeklyScheduleConstants");
const { getDayKey } = require("../Enum/Days");
const { getHourKey, Hours } = require("../Enum/Hours");
const { getLetterGradeKey } = require("../Enum/LetterGrades");
const CryptoJS = require('crypto-js');
const crypto = require('crypto');

const unixTimeStampToDateTime = (unixTimeStamp) => {
  var unixTimeStampInMilliseconds = unixTimeStamp * 1000;
  var dateTime = new Date(unixTimeStampInMilliseconds);
  var dateTimeString = dateTime.toUTCString();

  return dateTimeString;
}

const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

const calculateInfo = (courses) => {
  let totalCredit = 0;
  let calculateTotalCredit = 0;
  let totalGradeCredit = 0;

  courses.forEach(course => {
    totalCredit += course.credit;
    if (getLetterGradeKey(course.letterGrade, 'letterGradeValue')) {
      calculateTotalCredit += course.credit;
      totalGradeCredit += course.credit * getLetterGradeKey(course.letterGrade, 'letterGradeValue');
    }
  });

  const gano = totalGradeCredit !== 0 ? totalGradeCredit / calculateTotalCredit : 0;

  return {
    totalCredit,
    gano
  };
};

const getWeeklySchedule = (courses) => {
  const weeklySchedule = JSON.parse(JSON.stringify(baseWeeklySchedule));

  courses.forEach(course => {
      const schedule = JSON.parse(course.schedules);
      schedule.forEach(slot => {
          const hourIndex = getHourKey(slot.hours, 'value');
          const dayIndex = getDayKey(slot.day, 'key');

          weeklySchedule[hourIndex][dayIndex]?.push(course);
      });
  });

  return weeklySchedule;
};

const getDepartmentWalletAddress = async (departmentId) => {
  const walletAddress = await DepartmentContract.methods
                              .getDepartmentWalletAddress(Number(departmentId))
                              .call();

  return walletAddress;
};

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync('your-secure-password', 'salt', 32);
const iv = Buffer.from('your-iv-12345678');

const encrypt = (text) => {
  if (isEmpty(text)){
    return null;
  }

  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

const decrypt = (text) => {
  if (isEmpty(text)){
    return null;
  }

  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  unixTimeStampToDateTime,
  isEmpty,
  calculateInfo,
  getWeeklySchedule,
  getDepartmentWalletAddress,
  encrypt,
  decrypt,
  delay,
};
