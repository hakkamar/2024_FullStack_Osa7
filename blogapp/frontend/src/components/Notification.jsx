import { useSelector } from "react-redux";

import { Ilmoitus, Errori } from "../tyylit";

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification;
  });

  if (!notification) {
    return null;
  }

  const { message, type } = notification;

  if (type === "success") {
    return <Ilmoitus>{message}</Ilmoitus>;
  } else {
    return <Errori>{message}</Errori>;
  }
};

export default Notification;
