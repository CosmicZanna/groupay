import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiServices from "../services/apiService";
import CreateGroup from "../components/CreateGroup";
import JoinGroup from "../components/JoinGroup";
import { NavBar } from "../components/NavBar";
import GroupList from "../components/GroupList";
import { Group } from "../@types/types";

export default function Dashboard() {
  const [groupButtons, setgroupButtons] = useState<Group[]>([]);
  const { currentUser, token } = useAuth();
  const navigate = useNavigate();

  async function handleGroupClick(group: Group) {
    navigate(`/group/${group.groupName}`, { state: { group: group } });
  }

  async function handleDelete (groupId: string) {
    const groupt = await apiServices.deleteGroup(token!, currentUser!.uid, groupId);
    setgroupButtons(prev => prev.filter((g: Group) => g._id !== groupId));
  }

  useEffect(() => {
    const fetchGroups = async () => {
      let groupResponse = await apiServices.getGroups(token!, currentUser!.uid);
      let groupList: Group[] = [];
      if (Array.isArray(groupResponse)) groupList = [...groupResponse];
      setgroupButtons(groupList);
    };

    if (token && currentUser!.uid) fetchGroups();
  }, [token, currentUser]);

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
        handleDelete={handleDelete}
      />
    </div>
  );
}
