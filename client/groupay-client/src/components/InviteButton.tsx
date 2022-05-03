import React from 'react'
import {Container, Button} from 'react-bootstrap'
import { Group } from '../@types/types'

type InviteButtonProps = {
  group: Group,
  copyToClipBoard: () => void
}


export default function InviteButton({group, copyToClipBoard}: InviteButtonProps) {
  return (
    <Container
        className="d-flex justify-content-center align-items-center border shadow"
        style={{ width: "max-content", maxWidth: "100%", paddingRight: "0" }}
      >
        <h4 className="mb-0" style={{ marginRight: "5px" }}>
          Invite your friends with this Groupin: {group.password}
        </h4>
        <Button onClick={copyToClipBoard}>Copy</Button>
      </Container>
  )
}
