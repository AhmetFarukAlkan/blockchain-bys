export const CourseStatus = {
  ACTIVE: 1,
  PASSIVE: 0,
}

export const CourseStatuses = [
  {
    label: 'Aktif',
    value: CourseStatus.ACTIVE,
    color: 'blue'
  },
  {
    label: 'Pasif',
    value: CourseStatus.PASSIVE,
    color: 'red'
  },
];

export function getCourseStatusKey(value, index) {
  return CourseStatuses.find((item) => {
      return item.value === value;
  })?.[index];
}
