export const LetterGrade = {
  AA: 'aa',
  BA: 'ba',
  BB: 'bb',
  CB: 'cb',
  CC: 'cc',
  DC: 'dc',
  DD: 'dd',
  FD: 'fd',
  FF: 'ff',
}

export const LetterGrades = [
  {
    label: 'AA',
    value: LetterGrade.AA,
    prevLetterGrade: LetterGrade.BA,
    letterGradeValue: 4.0,
    defaultValue: 90,
    disable: false,
  },
  {
    label: 'BA',
    value: LetterGrade.BA,
    nextLetterGrade: LetterGrade.AA,
    prevLetterGrade: LetterGrade.BB,
    letterGradeValue: 3.5,
    defaultValue: 85,
    disable: false,
  },
  {
    label: 'BB',
    value: LetterGrade.BB,
    nextLetterGrade: LetterGrade.BA,
    prevLetterGrade: LetterGrade.CB,
    letterGradeValue: 3.0,
    defaultValue: 80,
    disable: false,
  },
  {
    label: 'CB',
    value: LetterGrade.CB,
    nextLetterGrade: LetterGrade.BB,
    prevLetterGrade: LetterGrade.CC,
    letterGradeValue: 2.5,
    defaultValue: 75,
    disable: false,
  },
  {
    label: 'CC',
    value: LetterGrade.CC,
    nextLetterGrade: LetterGrade.CB,
    prevLetterGrade: LetterGrade.DC,
    letterGradeValue: 2.0,
    defaultValue: 65,
    disable: false,
  },
  {
    label: 'DC',
    value: LetterGrade.DC,
    nextLetterGrade: LetterGrade.CC,
    prevLetterGrade: LetterGrade.DD,
    letterGradeValue: 1.5,
    defaultValue: 60,
    disable: false,
  },
  {
    label: 'DD',
    value: LetterGrade.DD,
    nextLetterGrade: LetterGrade.DC,
    prevLetterGrade: LetterGrade.FD,
    letterGradeValue: 1.0,
    defaultValue: 55,
    disable: false,
  },
  {
    label: 'FD',
    value: LetterGrade.FD,
    nextLetterGrade: LetterGrade.DD,
    prevLetterGrade: LetterGrade.FF,
    letterGradeValue: 0.5,
    defaultValue: 50,
    disable: false,
  },
  {
    label: 'FF',
    value: LetterGrade.FF,
    nextLetterGrade: LetterGrade.FD,
    letterGradeValue: 0.0,
    defaultValue: 0,
    disable: true,
  },
];

export function getLetterGradeKey(value, index) {
  return LetterGrades.find((item) => {
      return item.value === value;
  })?.[index];
}
