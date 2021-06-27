import React, { FC, useEffect } from "react";
import { List, ListItem } from "@material-ui/core";
import { animateScroll } from "react-scroll";
import ChatBoxMessage from "../ChatBoxMessage";
import { MessageProps, ScrollableListProps } from './../../interfaces';
import firebase from "firebase/app";

const ScrollableList: FC<ScrollableListProps> = ({ messages, style, ...props }) => {  
  const scrollToBottom = () => {
     animateScroll.scrollToBottom({
      containerId: "chat-message"
    });
  };

  useEffect( () => {
    if ( messages ) {
      scrollToBottom();
    }
  }, [messages] );

  return (
    <List id="chat-message" {...props} style={style}>
      {messages && messages.map( ( snapshot: firebase.database.DataSnapshot, index: number ) => {
        const message: MessageProps = snapshot.val();

        const type = message?.type;

        return (
          <ListItem
            key={`${index}_${message.author}`}
            className={`chatbox-${type.toLowerCase()}`}
          >
            <ChatBoxMessage message={message} />
          </ListItem>
        );
      } )}
    </List>
  );
};

export default ScrollableList;