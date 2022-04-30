import React from 'react'
import {ListGroup} from "react-bootstrap";

export default function Owes({owe}) {
  return (
    <ListGroup.Item >
                  <h3 className="m-0" >
                    {owe}
                  </h3>
                </ListGroup.Item>
  )
}
