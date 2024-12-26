import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/globalContext";
import ExpenseForm from "../Form/ExpenseForm";
import ExpenseItem from "../ExpenseItem/ExpenseItem";

const Expense = () => {
  const { addExpense, getExpenses, Expenses, deleteExpense, TotalExpense } =
    useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-Expense">
          Total Expense : <span>${TotalExpense()}</span>
        </h2>
        <div className="Expense-content">
          <div className="form-container">
            <ExpenseForm/>
          </div>
          <div className="Expenses">
            {Expenses.map((expense) => {
              const { _id, title, amount, type, date, category, description } =
                expense;
              return (
                <ExpenseItem
                  key={_id}
                  id={_id}
                  title={title}
                  amount={amount}
                  type={type}
                  date={date}
                  category={category}
                  description={description}
                  indicatorColor="var(--color-delete)"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
};

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-Expense {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fcf6f9;
    border: 2px solid white;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size : 2rem;
    gap : .5rem;
    span{
      font-size : 2.5rem;
      font-weight : 800;
      color : var(--color-delete);
    }
  }
  .Expense-content {
    display: flex;
    gap: 2rem;
    .Expenses {
      flex: 1;
    }
  }
`;

export default Expense;
