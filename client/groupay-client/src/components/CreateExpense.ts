import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Dropdown } from "react-bootstrap";
import apiServices from "../services/apiService";
import { useAuth } from "../context/AuthContext";

export default function CreateExpense({ group, setExpenses }) {
  const [curr, setCurr] = useState('Currency')
  const [tag, setTag] = useState('🏷️ Tag')
  const [activeUser, setActiveUser] = useState({})
  const titleRef = useRef();
  const valueRef = useRef();
  const currRef = useRef();
  ///const imgRef = useRef(); NOT MVP
  const { currentUser, token } = useAuth();


  useEffect(() => {
    if(currentUser){
      console.log('currentUser exists');
    apiServices
        .getUser(token, currentUser.uid)
        .then((user) => {setActiveUser(user)});}
  }, [token, currentUser]);
  
  async function createExpense(e) {
    e.preventDefault();
    console.log(activeUser, 'activeUser');
    if (titleRef.current.value.length > 1 && valueRef.current.value > 0) {
      try {
        const newExpense = {
          title: titleRef.current.value,
          value: Number(valueRef.current.value),
          curr: curr, 
          tag: tag,
          payer: currentUser.uid,
          payerName: activeUser.name
        }
        await apiServices.createNewExpense(
          token,
          currentUser.uid,
          group._id, 
          newExpense
        );
        console.log(newExpense, '<- new expense');
        setExpenses((oldExpenses => [...oldExpenses, newExpense]))
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="shadow">
      <Card>
        <Card.Body>
          <Form onSubmit={createExpense}>
            <Form.Group className="mb-3" controlId="formExpense">
              <Form.Label>Create new expense</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter expense name"
                ref={titleRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formExpense">
              <Form.Control
                type="number"
                placeholder="Enter amount"
                ref={valueRef}
                required
                step="0.01"
              />
            </Form.Group>
            <Dropdown className="mb-3" role="dropdown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {curr}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>setCurr('EUR')} >EUR</Dropdown.Item>
                <Dropdown.Item onClick={()=>setCurr('GBP')}>GBP</Dropdown.Item>
                <Dropdown.Item onClick={()=>setCurr('USD')}>USD</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mb-3" role="dropdown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                 {tag}
              </Dropdown.Toggle>
              <Dropdown.Menu ref={currRef}>
              <Dropdown.Item onClick={()=>setTag('💵')} >💵 Bill</Dropdown.Item>
                <Dropdown.Item onClick={()=>setTag('🏠')}>🏠 House</Dropdown.Item>
                <Dropdown.Item onClick={()=>setTag('⚽')}>⚽ Fun</Dropdown.Item>
                <Dropdown.Item onClick={()=>setTag('🍕')}>🍕 Restaurant</Dropdown.Item>
                <Dropdown.Item onClick={()=>setTag('🥦')}>🥦 Groceries</Dropdown.Item>
                <Dropdown.Item onClick={()=>setTag('🏷️')}>🏷️ Other</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
           
            <Button variant="primary" type="submit" id="submit_button">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
