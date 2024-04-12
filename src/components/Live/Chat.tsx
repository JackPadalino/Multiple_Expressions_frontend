import { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import MessagesList from "./MessagesList";
import "./chat.css";

interface ChatProps {
  isPlaying: boolean;
}

export interface ChatMessage {
  username: string;
  content: string;
}

const Chat = ({ isPlaying }: ChatProps) => {
  const [chatConnection, setChatConnection] = useState<null>(null);
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatError, setChatError] = useState<string | null>(null);
  const [firstMessageSent, setFirstMessageSent] = useState<boolean>(false);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const updateChat = (newMessage: ChatMessage) => {
    setChatMessages((prevChatMessages) => [...prevChatMessages, newMessage]);
  };

  const handleSendMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    // check for empty strings or white spaces before sending
    if (message.trim() !== "") {
      // send message if a token has been generated and we are currently broadcasting
      if (chatConnection && isPlaying) {
        const payload = {
          Action: "SEND_MESSAGE",
          Content: message,
        };
        try {
          // @ts-expect-error: TS ignore error
          chatConnection.send(JSON.stringify(payload));
          if (!firstMessageSent) setFirstMessageSent(true); // checking if the user has sent their first message yet
          setChatError(null); // reset chat error message
          setMessage(""); // reset message input
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      // handle the case where userId is empty or contains only whitespaces
      console.error("Cannot send empty messages");
      setChatError("Enter a message!");
    }
  };

  const handleJoinChat = async (e: SyntheticEvent) => {
    e.preventDefault();
    let url;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }
    // check that userId is not an empty string or contains only whitespaces
    if (username.trim() !== "") {
      const body = {
        username: username.trim(), // remove any white space from beginning or end of username
        role: "user",
      };
      // try to create a token if we are currently broadcasting
      // prevents new people from joining if there is no stream
      if (isPlaying) {
        try {
          const response = await axios.post(`${url}/api/chat/join`, body);
          const connection = new WebSocket(
            import.meta.env.VITE_AWS_SOCKET,
            response.data.token
          );
          // attach the updateChat function to the newly made connection to
          // listen for new messages
          connection.onmessage = (event) => {
            const data = JSON.parse(event.data);
            updateChat({
              username: data.Sender.Attributes.username,
              content: data.Content,
              // timestamp: data.SendTime,
            });
          };
          // @ts-expect-error: TS ignore error
          setChatConnection(connection);
          setChatError(null);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              console.error(
                "Request failed with status code:",
                error.response.status
              );
            } else if (error.request) {
              console.error("No response received:", error.request);
            } else {
              console.error("Error setting up the request:", error.message);
            }
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      }
    } else {
      // handle the case where userId is empty or contains only whitespaces
      console.error("userId is empty or contains only whitespaces");
      setChatError("Enter a valid username");
    }
  };

  return (
    <Box className="chatMainContainer">
      {!chatConnection && isPlaying && (
        <Box>
          <h4>Join the chat</h4>
          <form className="chatForm" onSubmit={handleJoinChat}>
            <input
              className="chatFormElement"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Create username"
            />
            <button className="chatFormElement" type="submit">
              Submit
            </button>
          </form>
          {chatError && <p>{chatError}</p>}
        </Box>
      )}
      {chatConnection && isPlaying && (
        <Box className="chatFeed">
          {firstMessageSent ? <h4>Chat</h4> : <h4>Say hello to everyone!</h4>}
          <Box className="messagesContainer">
            <MessagesList chatMessages={chatMessages} />
          </Box>
          <form className="chatForm" onSubmit={handleSendMessage}>
            <input
              className="chatFormElement"
              type="text"
              value={message}
              placeholder="Say something nice"
              onChange={handleMessageChange}
            />
            <button className="chatFormElement" type="submit">
              Submit
            </button>
          </form>
          {chatError && <p>{chatError}</p>}
        </Box>
      )}
    </Box>
  );
};

export default Chat;
