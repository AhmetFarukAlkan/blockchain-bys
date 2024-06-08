export const Semester = {
  FALL: 1 ,
  SPRING: 2,
  SUMMER: 3,
}

export const Semesters = [
  {
    label: 'Güz Dönemi',
    value: Semester.FALL,
  },
  {
    label: 'Bahar Dönemi',
    value: Semester.SPRING,
  },
  {
    label: 'Yaz Dönemi',
    value: Semester.SUMMER,
  }
];

export function getSemesterKey(value, index) {
  return Semesters.find((item) => {
      return item.value === value;
  })?.[index];
}
