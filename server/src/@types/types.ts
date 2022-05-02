export type Expense = {
  title: string,
  pictureUrl: string,
  value: number,
  currency: string
  tag: string
  payer: string
  payerName: string
}

export type Group = {
  groupName: string
  users?: string[],
  password: number,
  expenses?: Expense[],
  _id?: string
}

export type User = {
  name: string,
  uid: string,
  groups?: Group[],
}
