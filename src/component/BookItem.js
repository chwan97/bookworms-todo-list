import { css } from "@emotion/css";
import classnames from "classnames";
import { SwitchStatusBtn } from "./Buttons";
import { Status } from "../constant";
import { useContext } from "react";
import globalContext from "../Context";

export default function BookItem(props) {
  const { book } = props;
  const { name, id, status } = book;
  const isRead = status === Status.read;
  const globalContextVal = useContext(globalContext);
  // console.log("globalContextVal.showOptBtn", globalContextVal.showOptBtn);
  return (
    <div
      className={css`
        display: flex;
        position: relative;
        font-size: 20px;
        padding: 0px 15px;
        margin-bottom: 8px;
        border-left: 15px solid ${isRead ? "#6296ff" : "#dbd9d9"};
        font-weight: 400;
        line-height: 32px;

        &:hover .optBtn {
          display: inline-block;
        }
      `}
    >
      {name}
      <div
        className={css`
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 15px;
          transform: translateX(-100%);
        `}
        onClick={() => {
          globalContextVal.markBookReadStatusById(
            id,
            isRead ? Status.unread : Status.read
          );
        }}
      />
      <SwitchStatusBtn
        className={classnames(
          "optBtn",
          css`
            display: ${globalContextVal.showOptBtn ? "inline-block" : "none"};

            margin-left: auto;
            margin-right: 0;
            height: 32px;
            border: 1px solid #dbd9d9;
            border-color: ${!isRead ? "#81abff" : "#dbd9d9"};
          `
        )}
        text={isRead ? "标记为未读" : "标记为已读"}
        onClick={() => {
          globalContextVal.markBookReadStatusById(
            id,
            isRead ? Status.unread : Status.read
          );
        }}
      />
    </div>
  );
}
