import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createPost,getAllPosts } from "../../config/redux/action/socialMedia";
import { formatDistanceToNow } from "date-fns";
import { FaRegEdit,FaComment} from 'react-icons/fa'
import { BsTrash3 } from 'react-icons/bs'
import { BsFileImage } from "react-icons/bs";

function SocialMedia(){
    console.log("in social media")
    const { user } = useSelector((state) => state.auth);
    console.log("in socialmedia logged in user console",user)
    //const { makePost } = useSelector((state) => state.makePost);
    const { posts, isLoading, error } = useSelector((state) => state.makePost);
    console.log("post is see its field",posts);
    const [editingPostId, setEditingPostId] = useState(null); // Track the post being edited
    const [formData, setFormData] = useState({
        content: "",
        media: null,
        preview:""
    });
    
    const { content, media,preview } = formData;
    const [showComments, setShowComments] = useState({});
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState({});
    const [likeStatus, setLikeStatus] = useState({});

    // const { user } = useSelector((state) => state.auth);
    // const [employeeData, setEmployeeData] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const { isError, user } = useSelector((state) => state.auth);

    

    const onLoadImageUpload = (e) => {
        const image = e.target.files[0];
        if (image) {
            setFormData({
                ...formData,
                media: image,
                preview: URL.createObjectURL(image),
            });
        }
    };

    const imageCancel = () => {
        setFormData({
            ...formData,
            file: null,
            preview: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(content);
        console.log(media);
        const formData = new FormData();
        formData.append("content", content);
        if (media) {
            formData.append("media", media);
        } // "media" should match the backend field name
        await dispatch(createPost(formData, navigate)); // Wait for post creation
        dispatch(getAllPosts()); // Fetch posts again to include the newly created one
        setFormData({ // Clear form data after submission
            content: "",
            media: null,
            preview: ""
        });
     
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleEdit = (postId) => {
        setEditingPostId(postId); // Set the id of the post being edited
    };

    const handleSave = async (postId) => {
        try {
            await axios.patch(`http://localhost:5000/posts/${postId}`, {
                content: content // Use the new content from the form
            });
            dispatch(getAllPosts()); // Fetch posts again to reflect the changes
            setEditingPostId(null); // Clear editing state
            setFormData({ // Clear form data after submission
                content: "",
                media: null,
                preview: ""
            });
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const handleDelete = async (postId) => {
        console.log(postId)
        try {
            await axios.delete(`http://localhost:5000/posts/${postId}`);
            dispatch(getAllPosts());
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleLikePost=async(postId)=>{
       
        try{
            await axios.post(`http://localhost:5000/posts/${postId}/likes`);
            // Fetch all posts again to ensure you have the latest data
        dispatch(getAllPosts());
        setLikeStatus({ ...likeStatus, [postId]: !likeStatus[postId] }); // Toggle like status
            console.log("like posted for",postId)

        }catch(error){
            console.log("Error in like",error);
        }
    }
    const handleToggleComments = async (postId) => {
        try {
            if (!showComments[postId]) {
                const response = await axios.get(`http://localhost:5000/posts/${postId}/all-comments`);
                const comments = response.data;
                // Store comments for the specific post in state
                setComments((prevComments) => ({
                    ...prevComments,
                    [postId]: comments
                }));
            }
            setShowComments((prevShowComments) => ({
                ...prevShowComments,
                [postId]: !prevShowComments[postId] // Toggle the visibility for the specific post
            }));
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleSubmitComment = async (postId) => {
        try {
            const response =await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
                content: newComment
            });
            // Get the newly added comment from the response
        const newCommentData = response.data;
        // Update the comments state to include the new comment along with the existing comments
        setComments((prevComments) => ({
            ...prevComments,
            [postId]: [newCommentData,...(prevComments[postId] || [])]
        }));
        // Fetch posts again to reflect the new comment
        getAllPosts();
        // Clear the input field
        setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    // useEffect(() => {
    //     const getDataEmployee = async () => {
    //       try {
    //         console.log('h1')
    //         if (user && user.employee_name) {
    //           const response = await axios.get(
    //             `http://localhost:5000/employee_data/name/${user.employee_name}`
    //           );
    //           const data = response.data;
    //           console.log(data);
    //           setEmployeeData(data);
              
    //         }
    //       } catch (error) {
    //         console.log('h2')
    //         console.log(error);
    //       }
    //     };
    
    //     getDataEmployee();
    //   }, [user]);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    function formatDate(dateString) {
        // Parse the date string into a Date object
        const date = new Date(dateString);
      
        let formattedDate = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
            // Remove the "about" prefix
            formattedDate = formattedDate.replace(/^about\s+/, "");

            return formattedDate;
    }

    return(
        <div>
           <div className="flex justify-center items-center"> {/* Center horizontally and vertically */}
    <div className="w-full max-w-[640px]"> {/* Limit width to max-md and center horizontally */}
      <div className="bg-black px-4 flex flex-col gap-6 overflow-y-auto rounded-lg mt-4">


            <form className="bg-black px-4 rounded-lg" onSubmit={handleSubmit}>
                <div className="w-full flex-col items-center gap-2 py-4 border-b border-[#66666645]">
                {/* Content input */}
                <div className="flex gap-4 items-center">
                    
                {/* <img className="w-14 h-14 rounded-full object-cover" src="https://www.w3schools.com/images/w3schools_green.jpg"/> */}
                <input
                className="w-full rounded-full py-5 text-black"
                placeholder="What's On Your Mind...."
                    type="text"
                    name="content"
                    value={content}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="flex items-center py-4 justify-between">
                    <div className="flex items-center">
                    <label htmlFor="imgUpload" className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
                    <input
                    id="imgUpload"
                    type="file"
                    name="media"
                    onChange={onLoadImageUpload}
                    className="hidden"
                    accept=".jpg,.png,.jpeg"
                    
                />
                 {/* Image upload */}
                
                <BsFileImage/>
                <span>Image</span>
                    </label>
                     {/* Preview of the uploaded image */}
                {preview && (
                    <img src={preview} alt="Preview" className="w-10 h-10 mx-3"/>
                )}
                </div>
                 <button type="submit" className="border-2 border-gray-800 rounded-lg px-3 py-1 text-gray-400 cursor-pointer hover:bg-gray-800 hover:text-white">Post</button>
                </div>
               
               
               
                </div>
            </form>
            </div>
            </div>
            </div>
           
            {posts.slice().reverse().map((post) => (
                
                 <div key={post.id} className="flex justify-center">
                    
                {editingPostId === post.id ? ( // Check if the post is being edited
                    <>
                        <input
                            type="text"
                            name="content"
                            value={content}
                            onChange={handleChange}
                            required
                        />
                        <button onClick={() => handleSave(post.id)}>Save</button>
                    </>
                ) : (
                    <>


    <div className="post-card m-5">
                <div className="flex-between">
                    <div className="flex items-center gap-3">
                    
            <img className="rounded-full w-12 lg:h-12" src={`http://localhost:5000/images/${post.employeePhoto}`}/>
            {/* show all posts */}
            <div className="flex flex-col">
                <p className="base-medium lg:body-bold text-light-1">{post.employeeName}</p>
                <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">{formatDate(post.created_at)}</p>
                </div>
            </div>
            </div>
                    {/* <button className={`${user.employee_id!=post.employeeId && "hidden"}`}>
                    <FaRegEdit className="text-primary text-xl hover:text-black dark:hover:text-white" />

                    </button> */}
                    {/* <FaRegEdit className="text-primary text-xl hover:text-black dark:hover:text-white" /> */}

                        <button onClick={()=>handleDelete(post.id)} className='hover:text-black'>
                                <BsTrash3 className="text-danger text-xl hover:text-black dark:hover:text-white" />
                        </button>
                    



            </div>
            <div className="small-medium lg:base-medium py-5">
                    <p>{post.content}</p>

            </div>
            {post.media_url && (
    <img className="post-card_img" src={`http://localhost:5000/${post.media_url.split('\\').pop()}`} alt="Post Media"/>
)}

<div className="flex justify-between mr-5">
         <div onClick={()=>handleLikePost(post.id)} className="flex gap-3 justify-center items-center">
                <img  src={likeStatus[post.id] ? "/public/liked.svg": "/public/like.svg"} width={20} height={20} className="cursor-pointer"/>
                {/* src={likeStatus[post.id] ? likedIcon : likeIcon} */}

                <p className="small-medium lg:base-medium">{post.likeCount}</p>
        </div>           
        <div className="flex gap-3 justify-center items-center">
            <button className="flex gap-3 justify-center items-center" onClick={() => handleToggleComments(post.id)}>
                                <FaComment/>
                                <p className="hover:text-blue-800 ">Comment</p>
            </button>
        </div>

</div>
           {showComments[post.id] && (
                        <div>
                            {/* Render comments for the current post */}
                            <div className="w-full flex items-center gap-2 py-4">
                            {/* <img className="rounded-full w-12 lg:h-12" src="https://www.w3schools.com/images/w3schools_green.jpg"/> */}
                                <input

                                className="w-full rounded-full py-3 text-black"
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="write a comment"
                                />
                                <button onClick={() => handleSubmitComment(post.id)} className="border-2 border-blue-800 rounded-lg px-3 py-1 text-blue-800 cursor-pointer hover:bg-gray-800 hover:text-white">Submit</button>
                            </div>

                            {comments[post.id] && comments[post.id].map((comment) => (
                                
                                <div className="flex gap-2 items-center" key={comment.id}>
                                    {/* Display each comment */}
                                    
                                    <img className="rounded-full w-11 lg:h-11 mb-2" src={`http://localhost:5000/images/${comment.employeePhoto}`}/>
                                    <p className="italic text-sm font-bold mr-5">{comment.employeeName}</p>
                                    <p className="font-bold">{comment.content}</p>
                                    
                                </div>
                               
                            ))}
                            {/* Input field to add a new comment */}
                           
                        </div>
                    )}

            </div>
                        {/* <h3>{post.content}</h3>
                        <img src={`http://localhost:5000/${post.media_url.split('\\').pop()}`} alt="Post Media"/>
                        <button onClick={() => handleEdit(post.id)}>Edit</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button> */}
                        {/* <FaRegEdit className="text-primary text-xl hover:text-black dark:hover:text-white" />
                        <button onClick={() => onDeletePosition(data.id)} className='hover:text-black'>
                                <BsTrash3 className="text-danger text-xl hover:text-black dark:hover:text-white" />
                        </button> */}
                    </>
                )}
                </div>
             ))}
                    
                
            
        </div>
        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <div className='p-6.5'>
        //         <div className='w-full xl:w-1/2'>
        //                 <label className='mb-2.5 block text-black dark:text-white'>
        //                     Content <span className='text-meta-1'>*</span>
        //                 </label>
        //                 <input
        //                     type='text'
        //                     id='content'
        //                     name='content'
        //                     value={content}
        //                     onChange={handleChange}
        //                     required
        //                     placeholder='Enter Content'
        //                     className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
        //                 />
        //             </div>



        //         <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        //                 <div className="w-full xl:w-1/2">
        //                     <label className="mb-2.5 block text-black dark:text-white ">
        //                         Upload Photo (<span className='text-meta-1'> File format: png, jpg, jpeg, Max 2 MB </span>)
        //                         <span className="text-meta-1"> *</span>
        //                     </label>
        //                     <input
        //                         type="file"
        //                         className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke dark:file:border-strokedark file:bg-[#EEEEEE] dark:file:bg-white/30 dark:file:text-white file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
        //                         onChange={onLoadImageUpload}
        //                         required={true}
        //                     />
        //                 </div>
        //                 <div className="flex justify-center items-center">
        //                     {preview ? (
        //                         <figure className="relative w-64 h-64 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 animate-fadeIn">
        //                             <img
        //                                 src={preview}
        //                                 alt="People Image"
        //                                 className="object-cover w-full h-full shadow-6 rounded-xl"
        //                             />
        //                             <button
        //                                 onClick={imageCancel}
        //                                 className="absolute top-2 right-2 bg-white dark:bg-black/30 rounded-full p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
        //                             >
        //                                 <AiOutlineClose className="h-5 w-5" />
        //                             </button>
        //                         </figure>
        //                     ) : (
        //                         ""
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //     </form>
        // </div>
    )
}

export default SocialMedia;