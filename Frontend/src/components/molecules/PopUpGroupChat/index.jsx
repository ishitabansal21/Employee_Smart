import React,{useState,useEffect} from 'react'
import Select from 'react-select';
import axios from 'axios';

function PopUpGroupChat({visible,onClose}) {

    if(!visible)return null;
   
    const [groupName, setGroupName] = useState('');
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    useEffect(() => {
        const fetchNamesOfsameDept = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users/same-department');
                console.log(response.data);
                const res=response.data;
                //const { employees } = response.data;
                const options = res.map(employee => ({
                    value: employee.id,
                    label: employee.employee_name
                }));
                setEmployeeOptions(options);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchNamesOfsameDept();
    }, []);

    const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // This effect will trigger whenever refreshKey changes
    console.log('Component has been refreshed!');
  }, [refreshKey]);

  const refreshPage = () => {
    // Incrementing the key value will trigger the useEffect
    setRefreshKey(prevKey => prevKey + 1);
  };

   


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

       

        try {
            const response = await axios.post('http://localhost:5000/create-chat-groups', {
                group_name:groupName,
                add_all_users: false,
                specific_users:employeeIds
            });
            console.log(response.data);
            refreshPage();
            onClose();
        } catch (error) {
            console.error('Error sending invites:', error);
        }


    }


    const handleSubmitAll= async ()=>{
        //console.log(selectedOptions);
       
      

        try {
            const response = await axios.post('http://localhost:5000/create-chat-groups', {
                group_name:groupName,
                add_all_users: true, // Use sendAllClicked flag
            });
            console.log(response.data);
            refreshPage();
            onClose();
        } catch (error) {
            console.error('Error sending invites:', error);
        }


    }
    
    

  return (
    <div id='closing' onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className="bg-white p-2 rounded w-80">
            <h1 className="font-semibold text-center text-xl text-black">
            Add People To Group
            </h1>
            <p className="text-center text-black mb-5">Make a community</p>

            <div className="flex flex-col">
                     <input
                      
                        type="text"
                        className="border text-black border-black p-2 rounded mb-5"
                        placeholder="Enter Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />


                    <Select
                        className=" text-black font-medium border border-black rounded mb-5"
                        placeholder="Select People"
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
                Add
            </button>
            <button onClick={handleSubmitAll} className="px-4 py-1 bg-black text-white rounded mr-2">
                Add All
            </button>
            <button className="px-4 py-1 bg-black text-white rounded" onClick={onClose}>Cancel</button>
            </div>
      </div>
</div>
  )
}

export default PopUpGroupChat;