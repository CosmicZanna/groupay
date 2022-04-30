import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import apiServices from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  Container,
  ListGroup,
} from "react-bootstrap";
import { NavBar } from "./NavBar";

import CreateExpense from "./CreateExpense";
import splitPayments from "../services/paymentService"
import Expense from './Expense';
import Owes from './Owes';

export default function GroupPage() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  // const [totals, setTotals] = useState({});
  const [owes, setOwes] = useState([]);
  const [groupWithUsers, setgroupWithUsers] = useState({});
  const { currentUser, token, logout } = useAuth();
  const { state } = useLocation();
  const group = state.group;

  

  useEffect(() => {
    try {
      apiServices
        .getExpenses(token, currentUser.uid, group._id)
        .then((newExpenses) => {
          setExpenses([...newExpenses]);
        });
      apiServices
        .getGroup(token, currentUser, group.password)
        .then((newGroup) => setgroupWithUsers(newGroup));
    } catch (error) {
      console.log(error);
    }
  }, [currentUser]);

  useEffect(() => {
    if (expenses.length > 0 && groupWithUsers.users.length > 0) {
      let newTotal = 0;
      // let othersExpenses = 0;
      let newTotals = {};
      for (let expense of expenses) {
        newTotal += expense.value;
        if (newTotals[expense.payerName])
          newTotals[expense.payerName] += expense.value;
        else newTotals[expense.payerName] = expense.value;
        // if (expense.payer !== currentUser.uid) {
        //   othersExpenses += expense.value;
        // }
      }
      // setTotals(newTotals);
      setTotal(newTotal);
      setOwes(splitPayments(newTotals));
    }
  }, [expenses, groupWithUsers]);


  async function clearExpenses(e) {
    e.preventDefault();
    try {
      await apiServices.cancelExpenses(
        token,
        currentUser.uid,
        group._id);
      setExpenses([]);
    } catch (e) {}
  }

  function copyToClipBoard() {
    navigator.clipboard.writeText(group.password);
  }

  return (
    <>
      <NavBar/>
      <div className="d-flex">
        <Container className="m-5" style={{ maxWidth: "18rem" }}>
          <CreateExpense
            group={group}
            setExpenses={setExpenses}
          />
          <div className="mt-3 text-center">
            <Button
              variant="dark"
              className="shadow"
              style={{ fontSize: "25px" }}
              onClick={clearExpenses}
            >
              ✔️ All paid?
            </Button>
          </div>
        </Container>
        <Container
          className="m-5 border p-0 shadow"
          style={{
            Width: "100%",
            minWidth: "35rem",
            maxHeight: "550px",
            overflow: "scroll s",
          }}
        >
          {
            <h2 className="text-white bg-dark p-3 mb-0">
              Total Spent: €{total.toFixed(2)}
            </h2>
          }
          <ListGroup className="shadow-sm">
            {expenses.length > 0 &&
              expenses.map((expense, i) => (
                <Expense expense={expense} key={i}></Expense>
              ))}
          </ListGroup>
        </Container>
        <Container
          className="m-5 border shadow p-0"
          style={{ maxWidth: "18rem" }}
        >
          <ListGroup className="shadow-sm">
            {owes.length > 0 &&
              owes.map((owe, i) => (
                <Owes owe={owe} key={i}></Owes>
              ))}
          </ListGroup>
        </Container>
      </div>
      <Container
        className="d-flex justify-content-center align-items-center border shadow"
        style={{ width: "max-content", maxWidth: "100%", paddingRight: "0" }}
      >
        <h4 className="mb-0" style={{ marginRight: "5px" }}>
          Invite your friends with this Groupin: {group.password}
        </h4>
        <Button onClick={copyToClipBoard}>Copy</Button>
      </Container>
    </>
  );
}
