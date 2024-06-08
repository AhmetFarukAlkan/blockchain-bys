const StudentCourseStatus = {
  IN_ADVISOR_REVIEW: 'in_advisor_review',
  ADVISOR_APPROVED: 'advisor_approved',
  APPROVED: 'approved'
}

const StudentCourseStatuses = [
  {
    label: 'Danışman İncelemesinde',
    value: StudentCourseStatus.IN_ADVISOR_REVIEW,
    color: 'amber'
  },
  {
    label: 'Danışman Onayladı',
    value: StudentCourseStatus.ADVISOR_APPROVED,
    color: 'blue'
  },
  {
    label: 'Kesin Kayıt',
    value: StudentCourseStatus.APPROVED,
    color: 'green'
  }
];

function getStudentCourseStatusKey(value, index) {
  return StudentCourseStatuses.find((item) => {
      return item.value === value;
  })?.[index];
}

module.exports = {
  StudentCourseStatus,
  StudentCourseStatuses,
  getStudentCourseStatusKey,
};
