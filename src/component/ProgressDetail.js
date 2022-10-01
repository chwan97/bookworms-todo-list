import {css} from "@emotion/css";
import React from "react";

export default function ProgressDetail(props) {
  const {unreadNum, readNum, total} = props;
  return (
    <div
      className={css`
        font-size: 35px;
        display: flex;
        justify-content: space-between;
        max-width: 700px;
        justify-items: center;
        margin: auto;
        @media (max-width: 500px) {
          font-size: 25px;
        }
      `}
    >
      <span>已读({readNum})</span>
      <span>+</span>
      <span>未读({unreadNum})</span>
      <span>=</span>
      <span>共 {total} 本</span>
    </div>
  );
}
