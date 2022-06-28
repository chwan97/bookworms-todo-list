import classnames from "classnames";
import { css } from "@emotion/css";

function Button(props) {
  const { text, onClick, className } = props;
  return (
    <div onClick={onClick} className={classnames(className, "button")}>
      {text}
    </div>
  );
}

function FilterBtn(props) {
  const { className, checked = false, ...rest } = props;
  return (
    <Button
      className={classnames(
        className,
        "filterButton",
        css`
          background-color: ${checked ? "#6296ff" : "#f3f4fb"};
          color: ${checked ? "#fff" : "#000"};
        `
      )}
      {...rest}
    />
  );
}

function SetBtn(props) {
  const { className, ...rest } = props;
  return (
    <Button
      className={classnames(
        className,
        css`
          background-color: #fff;
          width: 55px;
          text-align: center;
        `
      )}
      {...rest}
    />
  );
}

function SwitchStatusBtn(props) {
  const { className, ...rest } = props;
  return (
    <Button className={classnames(className, "switchStatusButton")} {...rest} />
  );
}

export default Button;
export { FilterBtn, SwitchStatusBtn, SetBtn };
