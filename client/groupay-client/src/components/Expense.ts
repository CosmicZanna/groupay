import React from 'react'
import {ListGroup} from "react-bootstrap";

export default function Expense({expense}) {
  return (
    <ListGroup.Item
                  
                  className="m-0 d-flex justify-content-between align-items-center"
                >
                  <div className="p-2">
                    <h3>
                      {expense.tag} {expense.title}
                    </h3>
                    <p className="mb-0 text-muted">
                      Paid by: {expense.payerName}
                    </p>
                  </div>
                  <h3 className="border rounded p-3 bg-dark text-white">
                    €{expense.value}
                  </h3>
                </ListGroup.Item>
  )
}
