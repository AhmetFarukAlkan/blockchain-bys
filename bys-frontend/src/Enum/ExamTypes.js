export const ExamType = {
  MIDTERM: 'midterm',
  FINAL: 'final',
  MAKEUP: 'makeup',
}

export const ExamTypes = [
  {
    label: 'Vize',
    value: ExamType.MIDTERM,
    color: 'amber'
  },
  {
    label: 'Final',
    value: ExamType.FINAL,
    color: 'blue'
  },
  {
    label: 'Bütünleme',
    value: ExamType.MAKEUP,
    color: 'red'
  },
];

export function getExamTypeKey(value, index) {
  return ExamTypes.find((item) => {
      return item.value === value;
  })?.[index];
}
