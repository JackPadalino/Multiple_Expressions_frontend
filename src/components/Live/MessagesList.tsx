import { useEffect, useRef } from "react";
import { ListItem, ListItemText } from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import { ChatMessage } from "./Chat";
import "./messagesList.css";

interface MessagesListProps {
  chatMessages: ChatMessage[];
}

const MessagesList = ({ chatMessages }: MessagesListProps) => {
  const virtuosoRef = useRef(null);

  useEffect(() => {
    // scroll to the bottom when chatMessages change
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (virtuosoRef.current) {
      // @ts-expect-error: TS ignore error
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
      itemContent={(index: number, message: ChatMessage) => (
        <ListItem
          key={index}
          component="div"
          disablePadding
          className="listItem"
        >
          <ListItemText primary={`${message.username}: ${message.content}`} />
        </ListItem>
      )}
      atBottomStateChange={(atBottom: boolean) => {
        // scroll to the bottom if not at bottom of chat
        if (!atBottom) {
          scrollToBottom();
        }
      }}
    />
  );
};

export default MessagesList;
