import React from 'react';
import { Container } from "react-bootstrap";
import { Group } from '../@types/types';
import { GroupCard } from "./GroupCard";

type GroupListProps = {
  groupButtons: Group[], 
  handleGroupClick: (group: Group) => void, 
  handleDelete: (groupId: string) => void
}

export default function GroupList({ groupButtons, handleGroupClick, handleDelete }: GroupListProps) {

  return (
    <Container className="border mt-4 shadow">
      <Container className="d-flex align-items-center justify-content-around flex-wrap">
        {groupButtons.map(group => (
          <GroupCard
            key={group._id} 
            group={group} 
            handleGroupClick={handleGroupClick} 
            handleDelete={handleDelete}
          />
        ))}
      </Container>
    </Container>
  );
}
