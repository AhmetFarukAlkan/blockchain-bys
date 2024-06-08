export const AbstenceStatuses = [
  {
    label: 'Devamlı',
    value: 0,
    color: 'blue'
  },
  {
    label: 'Devamsız',
    value: 1,
    color: 'red'
  },
];

export function getAbstenceStatusKey(value, index) {
  return AbstenceStatuses.find((item) => {
      return item.value === value;
  })?.[index];
}
