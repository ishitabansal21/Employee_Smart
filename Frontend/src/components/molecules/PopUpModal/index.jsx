import React,{useState,useEffect} from 'react'
import Select from 'react-select';
import axios from 'axios';

function PopUpModel({visible,onClose}) {

    if(!visible)return null;
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [sendAllClicked, setSendAllClicked] = useState(false);

    useEffect(() => {
        const fetchEmailsOfsameDept = async () => {
            try {
                const response = await axios.get('http://localhost:5000/employees/invite-employee');
                const { employees } = response.data;
                const options = employees.map(employee => ({
                    value: employee.id,
                    label: employee.email
                }));
                setEmployeeOptions(options);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmailsOfsameDept();
    }, []);


    const handleOnClose=(e)=>{
        if(e.target.id==="closing")
            onClose();
    };

   
    const handleChange=(selectedOptions)=>{
        setSelectedOptions(selectedOptions);
    }

    const handleSubmitSelected= async ()=>{
        console.log(selectedOptions);
        const employeeIds = selectedOptions.map(option => option.value);

        const message = "you have been added to  kanban board";

        try {
            const response = await axios.post('http://localhost:5000/employee/send-invites', {
                sendToAll: false, // Use sendAllClicked flag
                message,
                employeeIds
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error sending invites:', error);
        }


    }


    const handleSubmitAll= async ()=>{
        console.log(selectedOptions);
       
        const message = "you have been added by your manager";

        try {
            const response = await axios.post('http://localhost:5000/employee/send-invites', {
                sendToAll: true, // Use sendAllClicked flag
                message,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error sending invites:', error);
        }


    }
    // const options=[
    //     {value:"india",label:"India"},
    //     {value:"pakistan",label:"Pakistan"},
    //     {value:"china",label:"china"},

    // ]

  return (
    <div id='closing' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className="bg-white p-2 rounded w-80">
            <h1 className="font-semibold text-center text-xl text-black">
            Add People To My Kanban
            </h1>
            <p className="text-center text-black mb-5">Make a community</p>

            <div className="flex flex-col">
        

                    <Select
                        className="text-blue-800 font-medium border border-black rounded mb-5"
                        placeholder="Select email(s)"
                        options={employeeOptions}
                        value={selectedOptions}
                        onChange={handleChange}
                        isMulti={true}
                    />

            {/* <input
                type="text"
                className="border border-black p-2 rounded mb-5"
                placeholder="********"
            /> */}
            </div>
            <div className="text-center">
            <button onClick={handleSubmitSelected} className="px-4 py-1 bg-black text-white rounded mr-2">
                Send
            </button>
            <button onClick={handleSubmitAll} className="px-4 py-1 bg-black text-white rounded mr-2">
                Send All
            </button>
            <button className="px-4 py-1 bg-black text-white rounded"onClick={onClose}>Cancel</button>
            </div>
      </div>
</div>
  )
}

export default PopUpModel;