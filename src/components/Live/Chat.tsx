import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MessagesList from "./MessagesList";
import "./chat.css";

const Chat = ({ isPlaying }) => {
  const [chatConnection, setChatConnection] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatError, setChatError] = useState(null);
  const [firstMessageSent, setFirstMessageSent] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const updateChat = (newMessage) => {
    setChatMessages((prevChatMessages) => [...prevChatMessages, newMessage]);
  };

  const handleSendMessage = (e) => {
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

  const handleJoinChat = async (e) => {
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
              timestamp: data.SendTime,
            });
          };
          setChatConnection(connection);
          setChatError(null);
        } catch (error) {
          if (error.response) {
            // a request was made, but the server responded with an error status
            console.error(
              `Server responded with status ${error.response.status}`
            );
            console.error(error.response.data); // response data from the server
          } else if (error.request) {
            // a request was made, but no response was received
            console.error("No response received from the server");
          } else {
            // something happened in setting up the request that triggered an Error
            console.error("Error setting up the request:", error.message);
          }
          setChatError("Oops! Something went wrong.");
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
