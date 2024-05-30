import React, { useContext, useEffect, useState } from "react";
//import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import { IconButton } from "@mui/material";
//import PersonAddIcon from "@mui/icons-material/PersonAdd";
//import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import NightlightIcon from "@mui/icons-material/Nightlight";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
//import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { toggleTheme } from "../Features/themeSlice";
import axios from "axios";
// import { refreshSidebarFun } from "../Features/refreshSidebar";
// import { myContext } from "./MainContainer";

import { AiOutlineUsergroupAdd } from "react-icons/ai"
import { FaSearch } from "react-icons/fa";

import PopUpGroupChat from '../../components/molecules/PopUpGroupChat';
import "./myStyles.css";


var socket,selectedChatCompare;

function Sidebar() {
 
  const [showMyModal,setShowMyModal]=useState(false);
    const [chatGroups, setChatGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [selectedGroupName, setSelectedGroupName] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [sendMessageResponse, setSendMessageResponse] = useState('');
    const [groupMessages, setGroupMessages] = useState([]);
    const [socketConnected,setSocketConnected]=useState(false);
    const { user } = useSelector((state) => state.auth);
    console.log("user logged in groupChat",user)

  const handleOnClose=()=>setShowMyModal(false)

  const fetchChatGroups = async () => {
    try {
        const response = await axios.get('http://localhost:5000/get-all-chat-groups');
        const { data } = response.data;
        setChatGroups(data);
    } catch (error) {
        console.error('Error fetching chat groups:', error);
    }
};

//     fetchChatGroups();
// }, []);

useEffect(() => {
fetchChatGroups();

if (selectedGroupId) {
    fetchGroupMessages(selectedGroupId); // Call the fetchAllMessages function
  console.log("selected group id is" ,selectedGroupId);
  // socket.emit("join chat",chatId);
  selectedChatCompare=selectedGroupId;
}
}, [selectedGroupId]);



const handleSendMessage = async () => {
  try {
      const response = await axios.post(`http://localhost:5000/chat-groups/${selectedGroupId}/send-message`, {
          content: messageContent
      });
      setSendMessageResponse(response.data);
      console.log("handlesendmsg ka response",response.data);
      // Clear the message input field after sending
      //socket.emit('new message',messageContent);
      setMessageContent('');
      fetchGroupMessages(selectedGroupId);
      
  } catch (error) {
      console.error('Error sending message:', error);
      setSendMessageResponse('Failed to send message');
  }
 
};


const fetchGroupMessages = async (groupId) => {
  
  try {
      const response = await axios.get(`http://localhost:5000/chat-groups/${groupId}/messages`);
      setGroupMessages(response.data);
      console.log("setgroupmessages",response.data);
  } catch (error) {
      console.error('Error fetching group messages:', error);
  }
 // socket.emit("join chat",groupId);
};

  return (
    <div className="flex">

    <div className="sidebar-container">
      <div className="sb-header">
        <div className="other-icons">
        <p className="text-black">Add New Group +</p>
        <AiOutlineUsergroupAdd className="icon text-black size={20}" onClick={()=>setShowMyModal(true)}/>
        <PopUpGroupChat onClose={handleOnClose} visible={showMyModal}/>
        </div>
      </div>
      <div className="sb-search">
        {/* <IconButton className="icon"> */}
          <FaSearch className="icon text-black"/>
        {/* </IconButton> */}
        <input
          placeholder="Search"
          className="search-box  text-black"
        />
      </div>


      
                {chatGroups.map((group) => (
                  <div className="sb-conversations" key={group.group_id} >
                  <div onClick={() => { setSelectedGroupId(group.group_id); fetchGroupMessages(group.group_id); setSelectedGroupName(group.group_name)}}>
                    <div className="conversation-container">
                      <p className="con-icon">
                        G
                      </p>
                      <p className="con-title  text-black">
                      {group.group_name}
                      </p>
    
                      <p className="con-lastMessage  text-black">
                      {group.department}
                      </p>
                      
                     
                    </div>
                  </div>
            
          </div>
                    
                ))}
            
     
    </div>
{/* workarea */}
<div className="chatArea-container-mine">
        <div className="chatArea-header">
          <p className="con-icon">
            G
          </p>
          <div className="header-text">
            <p className="con-title text-black">
             {selectedGroupName}
            </p>
            <p className="con-timeStamp">
              Online
            </p>
          </div>
          
        </div>
        <div className="messages-container">
         
          {selectedGroupId && (
                <div>
                    {/* <h2>Selected Group: {selectedGroupId}</h2> */}

                    <div>
                        {/* <h3>Group Messages:</h3> */}
                        <ul>
                            {groupMessages.map((message) => (
                                <li className="flex gap-2 items-center text-black" key={message.message_id}>
                                  <img className="rounded-full w-10 lg:h-10 m-2" src={`http://localhost:5000/images/${message.sender_photo}`} alt="yo"/>
                                  <div className="flex justify-around gap-13 items-center">

                                   <p className="font-bold text-xs italic">{message.sender_name}</p>
                                   <p class="font-sans font-bold text-black items-center">{message.content}</p>
                                  </div>
                                </li>
                            ))}
                        </ul>
                    </div>


                    
                </div>
            )}

          {/* {allMessages
            .slice(0)
            .reverse()
            .map((message, index) => {
              const sender = message.sender;
              const self_id = userData.data._id;
              if (sender._id === self_id) {
                // console.log("I sent it ");
                return <MessageSelf props={message} key={index} />;
              } else {
                // console.log("Someone Sent it");
                return <MessageOthers props={message} key={index} />;
              }
            })} */}
        </div>
        <div className="BOTTOM" />
        <div className="text-input-area">
          <input
            placeholder="Type a Message"
            className="search-box text-black"
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
           
          />
          <button className="px-4 py-1 bg-black text-white rounded" onClick={handleSendMessage}>Send Message</button>
          {/* <FaSearch className="icon"/> */}
            {/* <SendIcon />
          </IconButton> */}
        </div>
      </div>







    </div>
  );
}

export default Sidebar;