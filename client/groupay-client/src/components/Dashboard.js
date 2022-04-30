import React, { useEffect, useState } from "react";
import { Button, Navbar, Container, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiServices from "../services/apiService";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import groupSvg from "../img/people-fill.svg"
import logo from "../img/token_4.png"

export default function Dashboard() {
  const groupList = [];
  const [groupButtons, setgroupButtons] = useState();
  const { currentUser, logout, token } = useAuth();
  const navigate = useNavigate();
  async function handleLogOut() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGroupClick(group) {
    navigate(`/group/${group.groupName}`, { state: { group: group } });
  }

  useEffect(() => {
    //refactor to use async await
    if (token) {
      apiServices.getGroups(token, currentUser.uid).then((items) => {
        let newGroupList = [];
        if (Array.isArray(items)) {
          newGroupList = [...groupList, ...items];
        } else {
          newGroupList = [...groupList];
        }
        let groups = newGroupList.map((group, i) => (
          <>
            <Card
              className="text-white bg-dark m-5 shadow"
              style={{ maxWidth: "18rem", width: "100%", minWidth: "15rem"}}
            >
              <Card.Header className="d-flex align-items-center">
                <img className="" src={groupSvg} alt="users"></img>
                <p className="mb-0 ml-3" style={{marginLeft: "5px"}}>{Math.floor(Math.random() * (5 - 2 + 1) + 2)}</p> {/* //mock data */}
                </Card.Header>
              <Card.Body>
                <Card.Title className="mb-3">{group.groupName}</Card.Title>
                <Button onClick={() => handleGroupClick(group)} key={i}>
                  Go to group
                </Button>
              </Card.Body>
            </Card>
          </>
        ));
        setgroupButtons(groups);
      });
    }
  }, [token]);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
          <img
              alt="Yo"
              src={logo}
              width="100"
              height="40"
              className="d-inline-block align-center"
            />
          </Navbar.Brand>
          <Button className="m-3" onClick={handleLogOut}>
            Log Out
          </Button>
        </Container>
      </Navbar>
      {groupButtons ? <h1 className="text-center m-3">Your Groupay Groups:</h1> : <h1 className="text-center m-3">👋 Hey! You don't have any group yet!</h1>}
      <Container className="border mt-4 shadow">
      <Container className="d-flex align-items-center justify-content-around flex-wrap">
      {groupButtons}
      </Container>
      </Container>
      <Container className="d-flex align-items-center justify-content-around mt-4 mb-3">
        <CreateGroup />
        <JoinGroup />
      </Container>
    </div>
  );
}
