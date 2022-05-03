import React from 'react'
import {ListGroup} from "react-bootstrap";

type OwesProps = {
  owe: string
}

export default function Owes({owe}: OwesProps) {
  return (
    <ListGroup.Item >
                  <h3 className="m-0" >
                    {owe}
                  </h3>
                </ListGroup.Item>
  )
}
