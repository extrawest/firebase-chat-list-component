import React, { FC } from "react";
import { ListItemText, makeStyles, Box } from "@material-ui/core";
import dayjs from "dayjs";
import clsx from "clsx";
import { MessagePropsItems } from "../../interfaces";

const useStyles = makeStyles(() => ({
  message: {
    width: "auto",
    padding: 16,
    position: "relative",
    maxWidth: "80%",
  },
  messageInfo: {
    marginTop: 5,
  },
  statusText: {
    marginTop: 5
  },
  status: {
    display: "flex",
    alignItems: "center",
    "& p": {
      marginRight: 5,
      lineHeight: "24px",
      fontSize: 12
    }
  }
}));

const ChatBoxMessage: FC<MessagePropsItems> = ( {
  message,
}) => {
  const classes = useStyles();

  const time = dayjs(dayjs.unix(message.timestamp)).format("HH:mm");

  return (
    <>
      <Box className={clsx(
        classes.message,
        "message-body")}>
        <ListItemText primary={message.message} />
      </Box>
      <Box className={clsx(
        classes.messageInfo,
        "message-info"
      )}>
        <ListItemText secondary={time}/>
      </Box>
    </>
  );
};

export default ChatBoxMessage;
