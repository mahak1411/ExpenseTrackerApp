import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

const History = () => {
  const { transactionHistory } = useGlobalContext();
  const [...history] = transactionHistory();
  return (
    <HistoryStyled>
      <h2>Recent Trannsactions</h2>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div key={_id} className="history-items">
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {title}
            </p>
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {type === "expense" ? `-${amount}` : `+${amount}`}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
};

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-items {
    background: #fcf6f9;
    border: 2px solid white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
  display: flex;
    align-items : center;
    justify-content : space-between;
  }
`;

export default History;
