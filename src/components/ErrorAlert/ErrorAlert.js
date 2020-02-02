import React from "react";
import "./ErrorAlert.css";

export default function ErrorAlert(props) {
  return <div className={"Error"}>{props.text}</div>;
}
