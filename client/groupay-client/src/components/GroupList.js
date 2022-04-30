import React from 'react';
import { Container } from "react-bootstrap";
import { GroupCard } from "./GroupCard";

export default function GroupList({ groupButtons, handleGroupClick }) {

  return (
    <Container className="border mt-4 shadow">
      <Container className="d-flex align-items-center justify-content-around flex-wrap">
        {groupButtons.map(group => (
          <GroupCard key={group._id} group={group} handleGroupClick={handleGroupClick} />
        ))}
      </Container>
    </Container>
  );
}
