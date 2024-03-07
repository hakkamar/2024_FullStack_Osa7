import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification;
  });

  if (!notification) {
    return null;
  }

  const { message, type } = notification;

  //console.log("Notification");
  //console.log("Notification - message", message);
  //console.log("Notification - type", type);

  const style = {
    backgroundColor: "lightgrey",
    margin: "10px",
    padding: "10px",
    border: "2px solid",
    borderColor: type === "success" ? "green" : "red",
    borderRadius: "5px",
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
