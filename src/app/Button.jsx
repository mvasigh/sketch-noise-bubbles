import cx from "classnames";

function Button({ children, className = "", ...props }) {
  return <button className={cx("button__root", className)} {...props}>{children}</button>;
}

export default Button;