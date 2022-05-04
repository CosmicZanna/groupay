import React from 'react'
import {Container, ListGroup} from 'react-bootstrap'
import { Expense } from '../@types/types';
import ExpenseComponent from './Expense'

type ExpensesListProp = {
  expenses: Expense[],
  total: number
}

export default function ExpensesList({expenses, total}: ExpensesListProp) {
  return (
    <Container
      className="m-5 border p-0 shadow"
      style={{
        width: "100%",
        minWidth: "35rem",
        maxHeight: "550px",
        overflow: "scroll s",
      }}
    >
      {
        <h2 id="group-title" className="text-white bg-dark p-3 mb-0">
          Total Spent: €{total.toFixed(2)}
        </h2>
      }
      <ListGroup className="shadow-sm">
        {expenses.length > 0 &&
          expenses.map((expense: Expense, i: number) => (
            <ExpenseComponent expense={expense} key={i}></ExpenseComponent>
          ))}
      </ListGroup>
    </Container>
  )
}
