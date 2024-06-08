import { ROLE } from "../Constants/roleConstants";

export const Roles = [
  {
    label: 'Admin',
    value: ROLE.ADMIN,
  },
  {
    label: 'Öğretim Üyesi',
    value: ROLE.TEACHER,
  },
  {
    label: 'Öğrenci',
    value: ROLE.STUDENT,
  }
];

export function getRoleKey(value, index) {
  return Roles.find((item) => {
      return item.value === value;
  })?.[index];
}
