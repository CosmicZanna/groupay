export type Expense = {
  title: string,
  pictureUrl: string,
  value: number,
  currency: string
  tag: string
  payer: string
  payerName: string,
  _id?: string
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
  _id?: string
}


export type Payment = {
  [key: string]: number
}

