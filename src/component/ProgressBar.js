import { css } from "@emotion/css";

export default function ProgressBar(props) {
  // val -> 0 ~ 100
  const { val } = props;
  return (
    <div
      className={css`
        padding: 15px;
      `}
    >
      <div
        className={css`
          position: relative;
          height: 15px;
          background-color: #f3f4fb;
          width: 100%;
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: ${val}%;
            background-color: #6296ff;
          `}
        >
          <div
            className={css`
              position: absolute;
              height: 40px;
              width: 40px;
              right: 0;
              bottom: 0;
              transform: translate(50%, 100%);
              display: flex;
              flex-flow: column;
              align-items: center;
            `}
          >
            <div
              className={css`
                border: 10px solid transparent;
                border-bottom-width: 17px;
                border-bottom-color: #6296ff;
                background-color: transparent;
                margin-top: -10px;
              `}
            />
            {val}%
          </div>
        </div>
      </div>
    </div>
  );
}
