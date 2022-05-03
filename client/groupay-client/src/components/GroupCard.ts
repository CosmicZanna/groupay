import React from 'react';
import { Button, Card } from "react-bootstrap";
import groupSvg from "../img/people-fill.svg";

export function GroupCard({ handleGroupClick, group, handleDelete }) {



  return (
    <div>
      <Card
        className="text-white bg-dark m-5 shadow"
        style={{ maxWidth: "18rem", width: "100%", minWidth: "15rem" }}
      >
        <Card.Header className="d-flex align-items-center">
          <img className="" src={groupSvg} alt="users"></img>
          <p className="mb-0 ml-3" style={{ marginLeft: "5px" }}>{Math.floor(Math.random() * (5 - 2 + 1) + 2)}</p> {/* //mock data */}
        </Card.Header>
        
        <Card.Body>
          <Card.Title className="mb-3">{group.groupName}</Card.Title>
          <Button onClick={() => handleGroupClick(group)}>
            Go to group
          </Button>
          <Button className="mx-4" onClick={() => handleDelete(group._id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
