import React, { useState} from "react";
import { Form, Button, Card } from "react-bootstrap";
import apiServices from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CreateGroup() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const { currentUser, token } = useAuth();

  function onInput({ target: { value } }) {
    setValue(value);
  }

  async function createGroup(e) {
    e.preventDefault();
    if(value.length > 1){
    try {
      const result = await apiServices.createNewGroup(
        token,
        currentUser.uid,
        value,
      );
      setValue('');
      if (result.status >= 400) throw new Error('Group Not created');
      navigate(`/group/${value}`, { state: { group: result.data } })
    } catch (error) {
      console.log(error);
    }}
  }

  return (
    <div>
      <Card className='shadow'>
        <Card.Body>
          <Form onSubmit={createGroup}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Create new group</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group name"
                onChange={onInput}
                value={value}
              />
            </Form.Group>
            <Button disabled={value.length < 2} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
