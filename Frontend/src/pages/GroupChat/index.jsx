
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';

//import io from 'socket.io-client';
//import PopUpGroupChat from '../../components/molecules/PopUpGroupChat';
import Sidebar from './Sidebar';

// const ENDPOINT="http://localhost:5000";

// var socket,selectedChatCompare;


const GroupChat = () => {
    const [showMyModal,setShowMyModal]=useState(false);
    const [chatGroups, setChatGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [sendMessageResponse, setSendMessageResponse] = useState('');
    const [groupMessages, setGroupMessages] = useState([]);
    const [socketConnected,setSocketConnected]=useState(false);
    const { user } = useSelector((state) => state.auth);
    console.log("user logged in groupChat",user)

    // useEffect(()=>{
    //     socket=io(ENDPOINT);
    //     socket.emit("setup",user);
    //     socket.on("connection",()=>setSocketConnected(true));
    // },[]);
    

   // useEffect(() => {
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

    //   useEffect(() => {
    //     socket.on("message received", (data) => {
    //     //   if (
    //     //     !selectedChatCompare || // if chat is not selected or doesn't match current chat
    //     //     selectedChatCompare !== newMessageReceived.group_id
    //     //   ) {
    //     //     // if (!notification.includes(newMessageReceived)) {
    //     //     //   setNotification([newMessageReceived, ...notification]);
    //     //     //   setFetchAgain(!fetchAgain);
    //     //     // }
    //     // } else {
    //         // setGroupMessages([...messages, newMessageReceived]);
    //        // setGroupMessages(prevMessages => [...prevMessages,data]);
    //         console.log("ishitass msg reiecd isssss",data);
            

    //       //}
    //     });
    //   });


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


  const handleOnClose=()=>setShowMyModal(false)
    // const [message, setMessage] = useState('');
    // const [receivedMessages, setReceivedMessages] = useState([]);
    // const [socket, setSocket] = useState(null);

    // useEffect(() => {
    //     // Establish WebSocket connection
    //     const newSocket = io("http://localhost:5000"); // Replace with your server URL

    //     // Handle incoming messages
    //     newSocket.on('message', (message) => {
    //         setReceivedMessages((prevMessages) => [...prevMessages, message]);
    //     });

    //     setSocket(newSocket);

    //     // Clean up the WebSocket connection when the component unmounts
    //     return () => {
    //         newSocket.disconnect();
    //     };
    // }, []);

    // const sendMessage = () => {
    //     if (message.trim() !== '' && socket) {
    //         // Emit the message to the server
    //         socket.emit('message', message);
    //         setMessage(''); // Clear the input field
    //     }
    // };

    return (
        <div>
            <Sidebar/>
            {/* <button onClick={()=>setShowMyModal(true)} className="px-4 py-1 bg-black text-white rounded m-3">Create Group</button> */}

            {/* <PopUpGroupChat onClose={handleOnClose} visible={showMyModal}/> */}

            {/* <h1 className="text-2xl font-semibold mb-3">All Chat Groups</h1>
            <ul>
                {chatGroups.map((group) => (
                    <li key={group.group_id}>
                        <strong>Name:</strong> {group.group_name}, <strong>Department:</strong> {group.department}
                        <button className="px-4 py-1 bg-black text-white rounded m-3"  onClick={() => { setSelectedGroupId(group.group_id); fetchGroupMessages(group.group_id); }}>Select</button>
                    </li>
                ))}
            </ul> */}

            {/* {selectedGroupId && (
                <div>
                    <h2>Selected Group: {selectedGroupId}</h2>

                    <div>
                        <h3>Group Messages:</h3>
                        <ul>
                            {groupMessages.map((message) => (
                                <li key={message.message_id}>
                                    <strong>Sender:</strong> {message.sender_name}, <strong>Content:</strong> {message.content}
                                </li>
                            ))}
                        </ul>
                    </div>


                    <input
                        type="text"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send Message</button>
                    
                </div>
            )} */}




                    
            {/* <div>
                
                {receivedMessages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
          
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div> */}
        </div>
    );
};

export default GroupChat;
