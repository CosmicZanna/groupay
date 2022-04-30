import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import apiServices from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  Container,
} from "react-bootstrap";
import { NavBar } from "./NavBar";

import splitPayments from "../services/paymentService"
import ExpensesForm from './ExpensesForm';
import ExpensesList from './ExpensesList';
import OwesList from './OwesList';
import InviteButton from './InviteButton';

export default function GroupPage() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  // const [totals, setTotals] = useState({});
  const [owes, setOwes] = useState([]);
  const [groupWithUsers, setgroupWithUsers] = useState({});
  const { currentUser, token} = useAuth();
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
        <ExpensesForm clearExpenses={clearExpenses} group={group} setExpenses={setExpenses}/>
        <ExpensesList total={total} expenses={expenses}/>
        <OwesList owes={owes}/>
      </div>
      <InviteButton group={group} copyToClipBoard={copyToClipBoard}/>
    </>
  );
}
