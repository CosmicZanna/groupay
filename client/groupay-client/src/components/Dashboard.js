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
  const [groupButtons, setgroupButtons] = useState([]);
  const { currentUser, token } = useAuth();
  const navigate = useNavigate();

  async function handleGroupClick(group) {
    navigate(`/group/${group.groupName}`, { state: { group: group } });
  }

  useEffect(() => {
    const fetchGroups = async () => {
      let groupResponse = await apiServices.getGroups(token, currentUser.uid);
      let groupList = [];
      if (Array.isArray(groupResponse)) groupList = [...groupResponse];
      setgroupButtons(groupList);
    };

    if (token) fetchGroups();
  }, [token]);

  return (
    <div>
      <NavBar />

      {groupButtons.length ? 
        <h1 className="text-center m-3">Your Groupay Groups:</h1> : 
        <h1 className="text-center m-3">👋 Hey! You don't have any group yet!</h1>
      }

      <Container className="d-flex align-items-center justify-content-around mt-4 mb-3">
        <CreateGroup />
        <JoinGroup />
      </Container>

      <GroupList 
        groupButtons={groupButtons} 
        handleGroupClick={handleGroupClick}
      />
    </div>
  );
}
