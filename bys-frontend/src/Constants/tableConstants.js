export const perPageOptions = [
  {
    label: 10,
    value: 10
  },
  {
    label: 20,
    value: 20,
  },
  {
    label: 50,
    value: 50
  },
]

export const initialQueryState = {
  page: 1,
  perPage: 20,
  sort: 'id',
  dir: 'desc',
  query: '',
  query_type: ''
};
