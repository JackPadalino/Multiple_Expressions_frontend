import { useEffect, useState, useRef } from "react";
import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import "./messagesList.css";

const MessagesList = ({ chatMessages }) => {
  const virtuosoRef = useRef(null);

  useEffect(() => {
    // scroll to the bottom when chatMessages change
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: chatMessages.length - 1,
        behavior: "smooth",
      });
    }
  };

  return (
    <Virtuoso
      ref={virtuosoRef}
      className="virtuosoList"
      style={{ height: 200 }}
      data={chatMessages}
      itemContent={(index, message) => (
        <ListItem
          key={index}
          component="div"
          disablePadding
          className="listItem"
        >
          <ListItemText primary={`${message.username}: ${message.content}`} />
        </ListItem>
      )}
      atBottomStateChange={(atBottom) => {
        // scroll to the bottom if not at bottom of chat
        if (!atBottom) {
          scrollToBottom();
        }
      }}
    />
  );
};

export default MessagesList;
