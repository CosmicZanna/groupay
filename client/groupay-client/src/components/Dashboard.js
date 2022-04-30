import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiServices from "../services/apiService";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import { NavBar } from "./NavBar";
import GroupList from "./GroupList";

export default function Dashboard() {
  const groupList = [];
  const [groupButtons, setgroupButtons] = useState([]);
  const { currentUser, token } = useAuth();
  const navigate = useNavigate();

  async function handleGroupClick(group) {
    navigate(`/group/${group.groupName}`, { state: { group: group } });
  }

  useEffect(() => {
    if (token) {
      apiServices.getGroups(token, currentUser.uid).then((items) => {
        let newGroupList = [];
        Array.isArray(items) ? 
          newGroupList = [...groupList, ...items] :
          newGroupList = [...groupList];
        setgroupButtons(newGroupList);
      });
    }
  }, [token]);

  return (
    <div>
      <NavBar />

      {groupButtons.length ? 
        <h1 className="text-center m-3">Your Groupay Groups:</h1> : 
        <h1 className="text-center m-3">👋 Hey! You don't have any group yet!</h1>
      }

      <GroupList 
        groupButtons={groupButtons} 
        handleGroupClick={handleGroupClick}
      />

      <Container className="d-flex align-items-center justify-content-around mt-4 mb-3">
        <CreateGroup />
        <JoinGroup />
      </Container>
    </div>
  );
}
