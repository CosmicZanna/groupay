import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import apiServices from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import { NavBar } from "../components/NavBar";
import {Container} from "react-bootstrap"
import splitPayments from "../services/paymentService"
import ExpensesForm from '../components/ExpensesForm';
import ExpensesList from '../components/ExpensesList';
import OwesList from '../components/OwesList';
import InviteButton from '../components/InviteButton';
import { Expense, Group, Payment } from "../@types/types";

export default function GroupPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState(0);
  // const [totals, setTotals] = useState({});
  const [owes, setOwes] = useState<string[]>([]);
  const [groupWithUsers, setgroupWithUsers] = useState<Group>();
  const { currentUser, token} = useAuth();


  const { state }: any = useLocation();
  const group = state.group;

  

  useEffect(() => {
    try {
      apiServices
        .getExpenses(token!, currentUser!.uid, group._id)
        .then((newExpenses) => {
          setExpenses([...newExpenses]);
        });
      apiServices
        .getGroup(token!, group.password)
        .then((newGroup) => setgroupWithUsers(newGroup));
    } catch (error) {
      console.log(error);
    }
  }, [currentUser]);

  useEffect(() => {
    if (expenses.length > 0 && groupWithUsers!.users!.length > 0) {
      let newTotal = 0;
      // let othersExpenses = 0;
      let newTotals: Payment = {};
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


  async function clearExpenses(e: any) {
    e.preventDefault();
    try {
      await apiServices.cancelExpenses(
        token!,
        currentUser!.uid,
        group._id);
      setExpenses([]);
      setTotal(0);
    } catch (e) {}
  }

  function copyToClipBoard() {
    navigator.clipboard.writeText(group.password);
  }

  function expensesHelper (newExpense: Expense) {
    setExpenses([...expenses, newExpense])
  }
  return (
    <Container>
      <NavBar/>
      <div className="d-flex">
        <ExpensesForm clearExpenses={clearExpenses} group={group} setExpenses={expensesHelper}/>
        <ExpensesList total={total} expenses={expenses}/>
        <OwesList owes={owes}/>
      </div>
      <InviteButton group={group} copyToClipBoard={copyToClipBoard}/>
    </Container>
  );
}
