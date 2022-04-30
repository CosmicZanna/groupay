import React from 'react'
import {Container, ListGroup} from 'react-bootstrap'
import Expense from './Expense'

export default function ExpensesList({expenses, total}) {
  return (
    <Container
          className="m-5 border p-0 shadow"
          style={{
            Width: "100%",
            minWidth: "35rem",
            maxHeight: "550px",
            overflow: "scroll s",
          }}
        >
          {
            <h2 className="text-white bg-dark p-3 mb-0">
              Total Spent: €{total.toFixed(2)}
            </h2>
          }
          <ListGroup className="shadow-sm">
            {expenses.length > 0 &&
              expenses.map((expense, i) => (
                <Expense expense={expense} key={i}></Expense>
              ))}
          </ListGroup>
        </Container>
  )
}
