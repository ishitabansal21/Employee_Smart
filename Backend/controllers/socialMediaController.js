// import { Post, Comment, Like } from '../models/socialMediaModel.js';
// import EmployeeData from '../models/EmployeeDataModel.js';
// import multer from 'multer';
// import path from 'path';


// // Set storage engine
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Initialize upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * 10 }, // Set file size limit (10MB in this example)
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single("media"); // 'media' is the name of the field in the form

// // Check file type
// function checkFileType(file, cb) {
//     // Allowed extensions
//     const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
//     // Check extension
//     const extensionName = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check MIME type
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extensionName) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images and videos only!');
//     }
// }

// const PostController = {

//     // Get all posts with comments and likes
//     // async getAllPosts(req, res) {
//     //     try {
//     //         const posts = await Post.findAll({
//     //             include: [
//     //                 { model: Comment },
//     //                 { model: Like }
//     //             ]
//     //         });
//     //         res.status(200).json(posts);
//     //     } catch (error) {
//     //         console.error('Error fetching posts:', error);
//     //         res.status(500).json({ message: 'Internal server error' });
//     //     }
//     // },
// //     async getAllPosts(req, res) {
// //         try {
// //             const posts = await Post.findAll({
// //                 include: [
// //                     {
// //                         model: Comment,
// //                         include: [{ model: EmployeeData, attributes: ['employee_name', 'photo'] }]
// //                     },
// //                     {
// //                         model: Like,
// //                         include: [{ model: EmployeeData, attributes: ['employee_name', 'photo'] }]
// //                     }
// //                 ]
// //             });

// //             // Process the posts to include employee_name and photo for comments and likes
// //             const postsWithEmployeeInfo = posts.map(post => {
// //                 // Include employee_name and photo for comments
// //                 const commentsWithEmployeeInfo = post.comments.map(comment => ({
// //                     id: comment.id,
// //                     content: comment.content,
// //                     employee_id: comment.employee_id,
// //                     employee_name: comment.EmployeeData.employee_name,
// //                     photo: comment.EmployeeData.photo,
// //                     created_at: comment.created_at,
// //                     updated_at: comment.updated_at
// //                 }));

// //                 // Include employee_name and photo for likes
// //                 const likesWithEmployeeInfo = post.likes.map(like => ({
// //                     id: like.id,
// //                     employee_id: like.employee_id,
// //                     employee_name: like.EmployeeData.employee_name,
// //                     photo: like.EmployeeData.photo,
// //                     created_at: like.created_at,
// //                     updated_at: like.updated_at
// //                 }));

// //                 return {
// //                     id: post.id,
// //                     //title: post.title,
// //                     content: post.content,
// //                     // Include comments and likes with employee info
// //                     comments: commentsWithEmployeeInfo,
// //                     likes: likesWithEmployeeInfo,
// //                     created_at: post.created_at,
// //                     updated_at: post.updated_at
// //                 };
// //             });

// //             res.status(200).json(postsWithEmployeeInfo);
// //         } catch (error) {
// //             console.error('Error fetching posts:', error);
// //             res.status(500).json({ message: 'Internal server error' });
// //         }
// //     },
// async getAllPosts(req, res) {
//     try {
//         const posts = await Post.findAll({
//             include: [
//                 {
//                     model: Comment,
//                     include: [{ model: EmployeeData, as: 'Employee', attributes: ['employee_name', 'photo'] }]
//                 },
//                 {
//                     model: Like,
//                     include: [{ model: EmployeeData, as: 'Employee', attributes: ['employee_name', 'photo'] }]
//                 }
//             ]
//         });

//         // Process the posts to include employee_name and photo for comments and likes
//         const postsWithEmployeeInfo = posts.map(post => {
//             // Include employee_name and photo for comments
//             const commentsWithEmployeeInfo = post.comments.map(comment => ({
//                 id: comment.id,
//                 content: comment.content,
//                 employee_id: comment.employeeId,
//                 employee_name: comment.Employee.employee_name,
//                 photo: comment.Employee.photo,
//                 created_at: comment.created_at,
//                 updated_at: comment.updated_at
//             }));

//             // Include employee_name and photo for likes
//             const likesWithEmployeeInfo = post.likes.map(like => ({
//                 id: like.id,
//                 employee_id: like.employeeId,
//                 employee_name: like.Employee.employee_name,
//                 photo: like.Employee.photo,
//                 created_at: like.created_at,
//                 updated_at: like.updated_at
//             }));

//             return {
//                 postId: post.id,
//                 content: post.content,
//                 // Include comments and likes with employee info
//                 comments: commentsWithEmployeeInfo,
//                 likes: likesWithEmployeeInfo,
//                 created_at: post.created_at,
//                 updated_at: post.updated_at
//             };
//         });

//         res.status(200).json(postsWithEmployeeInfo);
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// },

//     // Create a new post
//     // async createPost(req, res) {
//     //     upload(req, res, async (err) => {
//     //         if (err) {
//     //             console.error('Error uploading file:', err);
//     //             res.status(400).json({ message: err });
//     //         } else {
//     //             const { content } = req.body;
//     //             console.log(content);
//     //             const employeeId = req.session.userId;
//     //             const name = req.session.employee_name;
//     //             const photo = req.session.photo;
//     //             // console.log(employeeId);
//     //             const media_url = req.file ? req.file.path : null;
//     //             try {
//     //                 const newPost = await Post.create({ content, employeeId, media_url, name, photo });
//     //                 res.status(201).json(newPost);
//     //             } catch (error) {
//     //                 console.error('Error creating post:', error);
//     //                 res.status(500).json({ message: 'Internal server error' });
//     //             }
//     //         }
//     //     });
//     // },
//     async createPost(req, res) {
//         upload(req, res, async (err) => {
//             if (err) {
//                 console.error('Error uploading file:', err);
//                 res.status(400).json({ message: err });
//             } else {
//                 const { content } = req.body;
//                 console.log(content);
//                 const employeeId = req.session.userId;
//                 // Fetch employee data from the database using employee_id
//                 try {
//                     const employee = await EmployeeData.findOne({ where: { employee_id: employeeId } });
//                     if (!employee) {
//                         return res.status(404).json({ message: 'Employee not found' });
//                     }
//                     const { employee_name, photo } = employee;
//                     const media_url = req.file ? req.file.path : null;
//                     const newPost = await Post.create({ content, employeeId, media_url });
//                     const responsePost = {
//                         content: newPost.content,
//                         employeeId: newPost.employeeId,
//                         media_url: newPost.media_url,
//                         employee_name,
//                         photo
//                     }
//                     res.status(201).json(responsePost);
//                 } catch (error) {
//                     console.error('Error creating post:', error);
//                     res.status(500).json({ message: 'Internal server error' });
//                 }
//             }
//   });
// },

//     // Get details of a specific post
//     async getPostById(req, res) {
//         const postId = req.params.postId;
//         try {
//             const post = await Post.findByPk(postId, {
//                 include: [
//                     { model: Comment },
//                     { model: Like }
//                 ]
//             });
//             if (!post) {
//                 return res.status(404).json({ message: 'Post not found' });
//             }
//             res.status(200).json(post);
//         } catch (error) {
//             console.error('Error fetching post details:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     },

//     // Update a specific post
//     async updatePost(req, res) {
//         const postId = req.params.postId;
//         const { content, media_url } = req.body;
//         const currentUserId = req.session.userId;
//         console.log(currentUserId);

//         try {
//             const post = await Post.findByPk(postId);
//             if (!post) {
//                 return res.status(404).json({ message: 'Post not found' });
//             }

//             if (post.employeeId !== currentUserId) {
//                 return res.status(403).json({ message: 'Unauthorized: You are not the owner of this post' });
//             }
//             await post.update({ content, media_url });
//             res.status(200).json({ message: 'Post updated successfully' });
//         } catch (error) {
//             console.error('Error updating post:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     },


//     // Delete a specific post
//     async deletePost(req, res) {
//         const postId = req.params.postId;
//         const currentUserId = req.session.userId;

//         try {
//             const post = await Post.findByPk(postId);
//             if (!post) {
//                 return res.status(404).json({ message: 'Post not found' });
//             }

//             // Check if the current user is the owner of the post
//             if (post.employeeId !== currentUserId) {
//                 return res.status(403).json({ message: 'Unauthorized: You are not the owner of this post' });
//             }

//             // If the user is the owner, proceed with the deletion
//             await post.destroy();
//             res.status(200).json({ message: 'Post deleted successfully' });
//         } catch (error) {
//             console.error('Error deleting post:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     },

//     // Get comments for a specific post (already implemented)

//     // Create a new comment for a specific post
//     // async createCommentForPost(req, res) {
//     //     const postId = req.params.postId;
//     //     const { content } = req.body;
//     //     const employeeId = req.session.userId;
//     //     const name = req.session.employee_name;
//     //     const photo = req.session.photo;
//     //     // console.log("hdhdhddhhdhdhdhdhdhdhdhdhdhdhdhhdhdhdhddhdhdhhddhdhdh")
//     //     // console.log("name",name);
//     //     // console.log("photo",photo);


//     //     try {
//     //         const post = await Post.findByPk(postId);
//     //         if (!post) {
//     //             return res.status(404).json({ message: 'Post not found' });
//     //         }

//     //         const newComment = await Comment.create({ content, postId, employeeId, name, photo });
//     //         res.status(201).json(newComment);
//     //     } catch (error) {
//     //         console.error('Error creating comment:', error);
//     //         res.status(500).json({ message: 'Internal server error' });
//     //     }
//     // },

//     async createCommentForPost(req, res) {
//         const postId = req.params.postId;
//         const { content } = req.body;
//         const employeeId = req.session.userId;
    
//         try {
//             const post = await Post.findByPk(postId);
//             if (!post) {
//                 return res.status(404).json({ message: 'Post not found' });
//             }
    
//             // Fetch employee data based on employeeId
//             const employee = await EmployeeData.findOne({ where: { employee_id: employeeId } });
//             if (!employee) {
//                 return res.status(404).json({ message: 'Employee not found' });
//             }
    
//             const { employee_name, photo } = employee;
//             console.log("name",employee_name);
//             console.log("photo",photo)
    
//             // Create new comment
//             const newComment = await Comment.create({ content, postId, employeeId });
    
//             // Construct the response object with employee name and photo
//             const responseData = {
//                 content: newComment.content,
//                 postId: newComment.postId,
//                 employeeId: newComment.employeeId,
//                 employee_name,
//                 photo
//             };
            
    
//             res.status(201).json(responseData);
//         } catch (error) {
//             console.error('Error creating comment:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     },

//     // // Add a like to a specific post
//     // async addLikeToPost(req, res) {
//     //     const postId = req.params.postId;
//     //     const employeeId = req.session.userId;
//     //     try {
//     //         const post = await Post.findByPk(postId);
//     //         if (!post) {
//     //             return res.status(404).json({ message: 'Post not found' });
//     //         }
//     //         // Create a new like
//     //         const newLike = await Like.create({ postId, employeeId });
//     //         await post.increment('likeCount');
//     //         res.status(201).json(newLike);
//     //     } catch (error) {
//     //         console.error('Error adding like:', error);
//     //         res.status(500).json({ message: 'Internal server error' });
//     //     }
//     // },

//     // // Remove a like from a specific post
//     // async removeLikeFromPost(req, res) {
//     //     const postId = req.params.postId;
//     //     const likeId = req.params.id;
//     //     console.log(likeId);
//     //     try {
//     //         const like = await Like.findByPk(likeId);
//     //         if (!like || like.postId !== postId) {
//     //             return res.status(404).json({ message: 'Like not found for this post' });
//     //         }
//     //         await like.destroy();
//     //         const post = await Post.findByPk(postId);
//     //         await post.decrement('likeCount');
//     //         res.status(200).json({ message: 'Like removed successfully' });
//     //     } catch (error) {
//     //         console.error('Error removing like:', error);
//     //         res.status(500).json({ message: 'Internal server error' });
//     //     }
//     // },
//     // Toggle like for a specific post

//     async toggleLike(req, res) {
//         const postId = req.params.postId;
//         const employeeId = req.session.userId;

//         try {
//             const existingLike = await Like.findOne({
//                 where: {
//                     postId: postId,
//                     employeeId: employeeId
//                 }
//             });
//             if (existingLike) {
//                 await existingLike.destroy();
//                 // Decrement the like count
//                 await Post.decrement('likeCount', { where: { id: postId } });
//                 res.status(200).json({ message: 'Like removed successfully' });
//             } else {
//                 const newLike = await Like.create({ postId, employeeId });
//                 // Increment the like count 
//                 await Post.increment('likeCount', { where: { id: postId } });
//                 res.status(201).json(newLike);
//             }
//         } catch (error) {
//             console.error('Error toggling like:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     },
//     // Get all comments for a specific post
//     // async getAllCommentsForPost(req, res) {
//     //     const postId = req.params.postId;
//     //     try {
//     //         const post = await Post.findByPk(postId, {
//     //             include: [{ model: Comment }]
//     //         });
//     //         if (!post) {
//     //             return res.status(404).json({ message: 'Post not found' });
//     //         }
//     //         const comments = post.comments;
//     //         res.status(200).json(comments);
//     //     } catch (error) {
//     //         console.error('Error fetching comments:', error);
//     //         res.status(500).json({ message: 'Internal server error' });
//     //     }
//     // },
//     async getAllCommentsForPost(req, res) {
//         const postId = req.params.postId;
//         try {
//             const post = await Post.findByPk(postId, {
//                 include: [{ model: Comment }]
//             });
//             if (!post) {
//                 return res.status(404).json({ message: 'Post not found' });
//             }

//             // Extract comment data
//             const comments = post.comments;

//             // Extract employee IDs from comments
//             const employeeIds = comments.map(comment => comment.employee_id);

//             // Fetch employee data based on employee IDs
//             const employees = await EmployeeData.findAll({
//                 where: { employee_id: employeeIds },
//                 attributes: ['employee_id', 'employee_name', 'photo']
//             });

//             // Create a mapping of employee IDs to their corresponding employee data
//             const employeeMap = {};
//             employees.forEach(employee => {
//                 employeeMap[employee.employee_id] = {
//                     employee_name: employee.employee_name,
//                     photo: employee.photo
//                 };
//             });

//             // Add employee name and photo to comments
//             const commentsWithEmployeeInfo = comments.map(comment => ({
//                 comment_id: comment.comment_id,
//                 content: comment.content,
//                 employee_id: comment.employee_id,
//                 // Include employee name and photo from the employeeMap
//                 employee_name: employeeMap[comment.employee_id].employee_name,
//                 photo: employeeMap[comment.employee_id].photo,
//                 created_at: comment.created_at,
//                 updated_at: comment.updated_at
//             }));

//             res.status(200).json(commentsWithEmployeeInfo);
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     },

//     async getLikesForPost(req, res) {
//         const postId = req.params.postId;
//         try {
//             const post = await Post.findByPk(postId, {
//                 include: [{ model: Like }]
//             });
//             if (!post) {
//                 return res.status(404).json({ message: 'Post not found' });
//             }
//             const likes = post.likes;
//             res.status(200).json(likes);
//         } catch (error) {
//             console.error('Error fetching likes:', error);
//             res.status(500).json({ message: 'Internal server error' });
//         }
//     },
// };

// export default PostController;
import { Post, Comment, Like } from '../models/socialMediaModel.js';
import EmployeeData from '../models/EmployeeDataModel.js';
import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // Set file size limit (10MB in this example)
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single("media"); // 'media' is the name of the field in the form

// Check file type
function checkFileType(file, cb) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
    // Check extension
    const extensionName = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check MIME type
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extensionName) {
        return cb(null, true);
    } else {
        cb('Error: Images and videos only!');
    }
}

const PostController = {

    // Get all posts with comments and likes

    async getAllPosts(req, res) {
        try {
            const posts = await Post.findAll({
                include: [
                    { model: Comment },
                    { model: Like }
                ]
            });
            res.status(200).json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Create a new post
    async createPost(req, res) {
        upload(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                res.status(400).json({ message: err });
            } else {
                const { content } = req.body;
                console.log('Content:', content);
                console.log('Session:', req.session);

                const employeeId = req.session.userId;
                const media_url = req.file ? req.file.path : null;

                try {
                    // Fetch employeeName and employeePhoto from EmployeeData based on employeeId
                    const employeeData = await EmployeeData.findOne({ where: { employee_id: employeeId } });
                    const employeeName = employeeData ? employeeData.employee_name : null;
                    const employeePhoto = employeeData ? employeeData.photo : null;

                    // console.log('Employee Name:', employeeName);
                    // console.log('Employee Photo:', employeePhoto);

                    // Create a new post with retrieved employeeName and employeePhoto
                    const newPost = await Post.create({ content, employeeId, media_url, employeeName, employeePhoto });

                    res.status(201).json(newPost);
                } catch (error) {
                    console.error('Error creating post:', error);
                    res.status(500).json({ message: 'Internal server error' });
                }
            }
        });
    },

    // Get details of a specific post
    async getPostById(req, res) {
        const postId = req.params.postId;
        try {
            const post = await Post.findByPk(postId, {
                include: [
                    { model: Comment },
                    { model: Like }
                ]
            });
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(post);
        } catch (error) {
            console.error('Error fetching post details:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Update a specific post
    async updatePost(req, res) {
        const postId = req.params.postId;
        const { content, media_url } = req.body;
        const currentUserId = req.session.userId;
        console.log(currentUserId);

        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            if (post.employeeId !== currentUserId) {
                return res.status(403).json({ message: 'Unauthorized: You are not the owner of this post' });
            }
            await post.update({ content, media_url });
            res.status(200).json({ message: 'Post updated successfully' });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },


    // Delete a specific post
    async deletePost(req, res) {
        const postId = req.params.postId;
        const currentUserId = req.session.userId;

        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Check if the current user is the owner of the post
            if (post.employeeId !== currentUserId) {
                return res.status(403).json({ message: 'Unauthorized: You are not the owner of this post' });
            }

            // If the user is the owner, proceed with the deletion
            await post.destroy();
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Get comments for a specific post (already implemented)

    // Create a new comment for a specific post

    async createCommentForPost(req, res) {
        const postId = req.params.postId;
        const { content } = req.body;
        const employeeId = req.session.userId;

        try {
            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Fetch employee data based on employeeId
            const employee = await EmployeeData.findOne({ where: { employee_id: employeeId } });
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            console.log('Employee Name:', employee.employee_name);
            console.log('Employee Photo:', employee.photo);
            // Create new comment with employee's name and photo
            const newComment = await Comment.create({ content, postId, employeeId, employeeName: employee.employee_name, employeePhoto: employee.photo });

            res.status(201).json(newComment);
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // async createCommentForPost(req, res) {
    //     const postId = req.params.postId;
    //     const { content } = req.body;
    //     const employeeId = req.session.userId;

    //     try {
    //         const post = await Post.findByPk(postId);
    //         if (!post) {
    //             return res.status(404).json({ message: 'Post not found' });
    //         }

    //         const newComment = await Comment.create({ content, postId, employeeId });
    //         const responseComment = {
    //             content: newComment.content,
    //             postId: newComment.postId,
    //             employeeId: newComment.employeeId,
    //             employee_name,
    //             photo
    //         };
    //         res.status(201).json(responseComment);
    //     } catch (error) {
    //         console.error('Error creating comment:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // },

    // // Add a like to a specific post
    // async addLikeToPost(req, res) {
    //     const postId = req.params.postId;
    //     const employeeId = req.session.userId;
    //     try {
    //         const post = await Post.findByPk(postId);
    //         if (!post) {
    //             return res.status(404).json({ message: 'Post not found' });
    //         }
    //         // Create a new like
    //         const newLike = await Like.create({ postId, employeeId });
    //         await post.increment('likeCount');
    //         res.status(201).json(newLike);
    //     } catch (error) {
    //         console.error('Error adding like:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // },

    // // Remove a like from a specific post
    // async removeLikeFromPost(req, res) {
    //     const postId = req.params.postId;
    //     const likeId = req.params.id;
    //     console.log(likeId);
    //     try {
    //         const like = await Like.findByPk(likeId);
    //         if (!like || like.postId !== postId) {
    //             return res.status(404).json({ message: 'Like not found for this post' });
    //         }
    //         await like.destroy();
    //         const post = await Post.findByPk(postId);
    //         await post.decrement('likeCount');
    //         res.status(200).json({ message: 'Like removed successfully' });
    //     } catch (error) {
    //         console.error('Error removing like:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // },
    // Toggle like for a specific post
    async toggleLike(req, res) {
        const postId = req.params.postId;
        const employeeId = req.session.userId;

        try {
            const existingLike = await Like.findOne({
                where: {
                    postId: postId,
                    employeeId: employeeId
                }
            });
            if (existingLike) {
                await existingLike.destroy();
                // Decrement the like count
                await Post.decrement('likeCount', { where: { id: postId } });
                res.status(200).json({ message: 'Like removed successfully' });
            } else {
                const newLike = await Like.create({ postId, employeeId });
                // Increment the like count 
                await Post.increment('likeCount', { where: { id: postId } });
                res.status(201).json(newLike);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    // Get all comments for a specific post
    // async getAllCommentsForPost(req, res) {
    //     const postId = req.params.postId;
    //     try {
    //         const post = await Post.findByPk(postId, {
    //             include: [{ model: Comment }]
    //         });
    //         if (!post) {
    //             return res.status(404).json({ message: 'Post not found' });
    //         }
    //         const comments = post.comments;
    //         res.status(200).json(comments);
    //     } catch (error) {
    //         console.error('Error fetching comments:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // },

    // async getAllCommentsForPost(req, res) {
    //     const postId = req.params.postId;
    //     try {
    //         const post = await Post.findByPk(postId, {
    //             include: [{ model: Comment }]
    //         });
    //         if (!post) {
    //             return res.status(404).json({ message: 'Post not found' });
    //         }

    //         // Extract comment data
    //         const comments = post.comments;

    //         // Extract employee IDs from comments
    //         const employeeIds = comments.map(comment => comment.employee_id);

    //         // Fetch employee data based on employee IDs
    //         const employees = await EmployeeData.findAll({
    //             where: { employee_id: employeeIds },
    //             attributes: ['employee_id', 'employee_name', 'photo']
    //         });

    //         // Create a mapping of employee IDs to their corresponding employee data
    //         const employeeMap = {};
    //         employees.forEach(employee => {
    //             employeeMap[employee.employee_id] = {
    //                 employee_name: employee.employee_name,
    //                 photo: employee.photo
    //             };
    //         });

    //         // Add employee name and photo to comments
    //         const commentsWithEmployeeInfo = comments.map(comment => ({
    //             comment_id: comment.comment_id,
    //             content: comment.content,
    //             employee_id: comment.employee_id,
    //             // Include employee name and photo from the employeeMap
    //             employee_name: employeeMap[comment.employee_id].employee_name,
    //             photo: employeeMap[comment.employee_id].photo,
    //             created_at: comment.created_at,
    //             updated_at: comment.updated_at
    //         }));

    //         res.status(200).json(commentsWithEmployeeInfo);
    //     } catch (error) {
    //         console.error('Error fetching comments:', error);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // },
    async getAllCommentsForPost(req, res) {
        const postId = req.params.postId;
        try {
            // Retrieve the post along with its comments
            const post = await Post.findByPk(postId, {
                include: [Comment]
            });

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Extract comments with necessary fields
            const commentsWithInfo = post.comments.map(comment => ({
                comment_id: comment.id,
                content: comment.content,
                employee_id: comment.employeeId,
                employee_name: comment.employeeName,
                employee_photo: comment.employeePhoto,
                created_at: comment.created_at,
                updated_at: comment.updated_at
            }));

            res.status(200).json(commentsWithInfo);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ message: 'Internal server error' });
    }
    },

    async getLikesForPost(req, res) {
        const postId = req.params.postId;
        try {
            const post = await Post.findByPk(postId, {
                include: [{ model: Like }]
            });
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            const likes = post.likes;
            res.status(200).json(likes);
        } catch (error) {
            console.error('Error fetching likes:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

export default PostController;