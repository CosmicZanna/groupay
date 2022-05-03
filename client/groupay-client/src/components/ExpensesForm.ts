import React from 'react'
import {Container, Button} from 'react-bootstrap'
import CreateExpense from "./CreateExpense";


export default function ExpensesForm({group, setExpenses, clearExpenses}) {
  return (
    <Container className="m-5" style={{ maxWidth: "18rem" }}>
          <CreateExpense
            group={group}
            setExpenses={setExpenses}
          />
          <div className="mt-3 text-center">
            <Button
              variant="dark"
              className="shadow"
              style={{ fontSize: "25px" }}
              onClick={clearExpenses}
            >
              ✔️ All paid?
            </Button>
          </div>
        </Container>
  )
}
