import React from 'react'
import {Container, ListGroup} from 'react-bootstrap'
import Owes from './Owes'

type OwesListProps = {
  owes: [string]
}

export default function OwesList({owes}: OwesListProps) {
  return (
    <Container
          className="m-5 border shadow p-0"
          style={{ maxWidth: "18rem" }}
        >
          <ListGroup className="shadow-sm">
            {owes.length > 0 &&
              owes.map((owe: string, i: number) => (
                <Owes owe={owe} key={i}></Owes>
              ))}
          </ListGroup>
        </Container>
  )
}
